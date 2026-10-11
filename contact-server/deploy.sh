#!/usr/bin/env bash
# Despliega la API de contacto de matelabs.site (corre en tu máquina).
# Uso: bash contact-server/deploy.sh   (desde la raíz de landingweb)
set -euo pipefail
cd "$(dirname "$0")/.."
tar czf /tmp/contact-server.tgz --exclude=.env contact-server
gcloud compute scp /tmp/contact-server.tgz matelabs-app-server-1:/tmp/
gcloud compute ssh matelabs-app-server-1 -- bash -s <<'REMOTE'
set -euo pipefail
D=/opt/matelabs/apps/matelabs-landing
sudo tar xzf /tmp/contact-server.tgz -C $D
sudo chown -R mateapp: $D/contact-server

# 1) Sistema + API key propios en MateMessaging (se guarda en .env, no se imprime)
if ! sudo grep -q '^MATEMESSAGING_API_KEY=ml_msg' $D/contact-server/.env 2>/dev/null; then
  cd /opt/matelabs/apps/matemessaging/backend
  KEY=$(sudo -u mateapp env -i bash -c 'set -a; . ./.env; set +a; ../venv/bin/python - <<PY
from app.db.session import SessionLocal
from app.models.system import System
from app.services import api_keys
db = SessionLocal()
s = db.query(System).filter(System.code=="MATELABS_LANDING").first()
if not s:
    s = System(code="MATELABS_LANDING", name="Landing matelabs.site", currency="USD")
    db.add(s); db.commit(); db.refresh(s)
_, full = api_keys.create_for_system(db, s.id, "contact-server")
print(full)
PY')
  sudo cp $D/contact-server/.env.example $D/contact-server/.env
  sudo sed -i "s|^MATEMESSAGING_API_KEY=.*|MATEMESSAGING_API_KEY=$KEY|" $D/contact-server/.env
  sudo chown mateapp: $D/contact-server/.env; sudo chmod 600 $D/contact-server/.env
fi

# 2) Servicio
sudo cp $D/contact-server/matelabs-contact.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable matelabs-contact
sudo systemctl restart matelabs-contact
sleep 1
curl -fs http://127.0.0.1:8011/health && echo

# 3) nginx: /api/ -> 8011 (backup fuera de sites-enabled)
F=/etc/nginx/sites-enabled/matelabs.site
sudo mkdir -p /etc/nginx/backups
sudo cp $F /etc/nginx/backups/matelabs.site.$(date +%Y%m%d%H%M%S)
sudo sed -i '/location \/api\//,/}/ s|proxy_pass http://127.0.0.1:8001;|proxy_pass http://127.0.0.1:8011;|' $F
sudo nginx -t && sudo systemctl reload nginx
echo "OK: matelabs.site/api -> :8011"
REMOTE

echo "--- prueba desde afuera (manda un mail real a hola@matelabs.com.ar) ---"
curl -s -XPOST https://matelabs.site/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Deploy test","email":"test@matelabs.site","message":"Prueba del deploy","topic":"","source":"deploy"}'; echo
