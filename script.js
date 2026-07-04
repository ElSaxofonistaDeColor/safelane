const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

const consult = document.querySelector('[data-consult]');

if (consult) {
  const steps = [...consult.querySelectorAll('.question-step')];
  const next = consult.querySelector('[data-next]');
  const prev = consult.querySelector('[data-prev]');
  const bar = consult.querySelector('.progress-bar');
  let current = 0;

  function update() {
    steps.forEach((step, index) => step.classList.toggle('active', index === current));
    prev.disabled = current === 0;
    next.textContent = current === steps.length - 1 ? 'Ver orientación' : 'Continuar';
    bar.style.width = `${((current + 1) / steps.length) * 100}%`;
  }

  function value(name) {
    const input = consult.querySelector(`[name="${name}"]:checked`);
    return input ? input.value : 'No especificado';
  }

  function renderResult() {
    const profile = value('perfil');
    const urgent = value('urgencia');
    const situation = value('situacion');
    const power = value('poder');
    const impact = value('impacto');
    const category = urgent.includes('riesgo') ? 'Atención prioritaria' : power.includes('asimetrica') || impact.includes('repite') ? 'Señales relevantes que conviene comunicar' : 'Orientación preventiva y seguimiento';
    const result = consult.querySelector('[data-result]');
    result.innerHTML = `
      <div class="result-box">
        <p class="eyebrow">Resultado orientativo</p>
        <h3>${category}</h3>
        <p><strong>Resumen:</strong> perfil ${profile}, situación descrita como ${situation}, con ${power} y ${impact}.</p>
        <p><strong>Por qué conviene prestarle atención:</strong> en el deporte pueden existir dependencia, autoridad, presión de grupo o miedo a perder oportunidades. Estas dinámicas pueden hacer que una situación se silencie, minimice o normalice.</p>
        <p><strong>Qué hacer ahora:</strong> registra lo observado con fechas, evita investigar por tu cuenta, busca una persona responsable de protección o canal formal y prioriza la seguridad si existe riesgo inmediato.</p>
        <p><strong>Adaptado a tu perfil:</strong> si eres ${profile}, actúa desde tu rol, sin sustituir a profesionales ni forzar relatos. Escucha, acompaña y comunica por vías seguras.</p>
        <p class="small"><strong>Límites:</strong> esta herramienta no diagnostica, no determina hechos y no sustituye atención jurídica, psicológica, sanitaria, de emergencia ni canales formales.</p>
        <div class="cta-row"><a class="button primary" href="como-actuar.html">Ver cómo actuar</a><a class="button secondary" href="recursos.html">Ir a recursos</a></div>
      </div>`;
  }

  next.addEventListener('click', () => {
    if (current < steps.length - 1) {
      current += 1;
      update();
    } else {
      renderResult();
      consult.querySelector('[data-result]').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  prev.addEventListener('click', () => {
    if (current > 0) current -= 1;
    update();
  });

  update();
}
