// Envío del formulario de contacto al endpoint existente (/api/contact).
// Sirve para todos los formularios con [data-contact-form] (hero y sección #contacto).
// Solo muestra «enviado» si el servidor responde OK.
export function initContactForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-contact-form]').forEach((form) => {
    const status = form.querySelector<HTMLElement>('[data-ct-status]')!;
    const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    const source = form.dataset.contactForm || 'formulario';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.classList.add('hidden');
      const en = document.documentElement.lang === 'en';
      const get = (n: string) => form.querySelector<HTMLInputElement>(`[name="${n}"]`);
      const fields = ['name', 'email', 'message'].map(get).filter(Boolean) as HTMLInputElement[];
      let firstBad: HTMLInputElement | null = null;
      fields.forEach((f) => {
        const v = f.value.trim();
        const bad = !v || (f.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
        f.setAttribute('aria-invalid', String(bad));
        if (bad && !firstBad) firstBad = f;
      });
      if (firstBad) {
        status.textContent = en ? 'Please complete your name, a valid email and your message.' : 'Completá tu nombre, un email válido y tu mensaje.';
        status.className = 'ct-status is-error';
        (firstBad as HTMLInputElement).setAttribute('aria-describedby', status.id);
        (firstBad as HTMLInputElement).focus();
        return;
      }
      submitBtn.disabled = true;
      const origHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="animate-pulse">...</span>';

      const body = {
        name: get('name')!.value,
        email: get('email')!.value,
        message: get('message')!.value,
        topic: get('topic')?.value || '',
        source,
      };

      try {
        const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        if (res.ok) {
          status.textContent = en ? 'Message sent successfully!' : 'Mensaje enviado correctamente!';
          status.className = 'ct-status is-ok';
          form.reset();
          fields.forEach((f) => f.removeAttribute('aria-invalid'));
        } else if (res.status === 429) {
          status.textContent = en ? 'Too many attempts. Try again in a few minutes.' : 'Demasiados intentos. Intentá de nuevo en unos minutos.';
          status.className = 'ct-status is-warn';
        } else {
          throw new Error();
        }
      } catch {
        status.textContent = en ? 'Something went wrong. Try again or email us directly.' : 'Algo salió mal. Intentá de nuevo o escribinos directamente.';
        status.className = 'ct-status is-error';
      }
      status.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = origHTML;
    });
  });
}
