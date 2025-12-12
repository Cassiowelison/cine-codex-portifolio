// 1. Inicializa o Slide Vertical (Site Principal)
var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 0,
  mousewheel: true,
  speed: 800,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  keyboard: { enabled: true },
});

// 2. Inicializa o Slide Horizontal (Projetos)
var projectSwiper = new Swiper(".projectSwiper", {
  direction: "horizontal",
  slidesPerView: "auto",
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination-h",
    clickable: true,
  },
});

// 3. Lógica do Cursor Personalizado
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Aumentar cursor em links
document.querySelectorAll('a, button, .hex-item, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// 4. Envio de Email (EmailJS)
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Impede a página de recarregar

  // --- IMPORTANTE: SUBSTITUA ABAIXO PELOS SEUS CÓDIGOS REAIS DO EMAILJS ---
  const serviceID = 'service_xxxxxx';   // Ex: service_z9...
  const templateID = 'template_xxxxxx'; // Ex: template_x7...

  const btn = this.querySelector('button');
  const originalText = btn.innerText;

  btn.innerText = 'Enviando...';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.innerText = 'Enviado! 🚀';
      alert('Mensagem enviada com sucesso!');
      this.reset();
      setTimeout(() => btn.innerText = originalText, 3000);
    }, (err) => {
      btn.innerText = 'Erro :(';
      alert('Erro ao enviar. Verifique o console para mais detalhes.');
      console.log(JSON.stringify(err));
      setTimeout(() => btn.innerText = originalText, 3000);
    });
});