'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     MENÚ HAMBURGUESA
  ========================================================= */
  const menuBtn = document.getElementById('menuBtn');
  const navbar = document.getElementById('navbar');

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuBtn.classList.toggle('change');
    navbar.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
      navbar.classList.remove('open');
      menuBtn.classList.remove('change');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const href = this.getAttribute('href');
      const target = document.querySelector(href);

      navbar.classList.remove('open');
      menuBtn.classList.remove('change');

      setTimeout(() => {
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });
  });

  /* =========================================================
     FORMULARIO WHATSAPP
  ========================================================= */
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;

    const texto =
`Hola, me comunico desde la página web de La Llave del Camino.

Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}

Mensaje:
${mensaje}`;

    const whatsappURL = 'https://wa.me/5493412710103?text=' + encodeURIComponent(texto);
    window.open(whatsappURL, '_blank');
  });

  /* =========================================================
     AÑOS DE TRAYECTORIA
  ========================================================= */
  const trayectoriaCalculada = new Date().getFullYear() - 2012;
  ['hero-trayectoria', 'anios-trayectoria'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = trayectoriaCalculada;
  });

  /* =========================================================
     MODO ALTO CONTRASTE
  ========================================================= */
  const toggleBtn = document.getElementById('contrast-toggle');
  const icon = document.getElementById('theme-icon');
  const body = document.body;
  const systemPrefersContrast = window.matchMedia('(prefers-contrast: more)');

  const ICON_SOL = '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
  const ICON_ACCESIBLE = '<circle cx="12" cy="12" r="10"></circle><path d="M12 2v20"></path>';

  function updateContrast(isHigh) {
    body.classList.toggle('high-contrast', isHigh);
    icon.innerHTML = isHigh ? ICON_ACCESIBLE : ICON_SOL;
  }

  toggleBtn.addEventListener('click', () => {
    const isHigh = !body.classList.contains('high-contrast');
    localStorage.setItem('user-preference', isHigh ? 'high' : 'none');
    updateContrast(isHigh);
  });

  systemPrefersContrast.addEventListener('change', (e) => {
    if (!localStorage.getItem('user-preference')) updateContrast(e.matches);
  });

  const savedPreference = localStorage.getItem('user-preference');
  const shouldBeHigh = savedPreference === 'high' || (!savedPreference && systemPrefersContrast.matches);
  updateContrast(shouldBeHigh);

  /* =========================================================
     GRILLA DE TALLERES
  ========================================================= */
  const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  // Cada taller ya trae su índice (idx) para no depender de indexOf()
  const TALLERES = [
    { dia: 'Lunes', turno: 'Mañana', icono: 'bi-palette', titulo: 'Talleres de Arteterapia para Mujeres', desc: 'Un espacio de creatividad y expresión pensado para el bienestar emocional y el encuentro comunitario.', cta: 'Quiero sumarme' },
    { dia: 'Lunes', turno: 'Tarde', icono: 'bi-scissors', titulo: 'Tejido Artesanal', desc: 'Espacio de aprendizaje y formación en técnicas de tejido, promoviendo la producción artesanal y el apoyo mutuo.', cta: 'Reservar mi lugar' },
    { dia: 'Martes', turno: 'Mañana', icono: 'bi-basket', titulo: 'ABC Panificación para Emprender', desc: 'Capacitación práctica orientada al aprendizaje y formación en oficios para el desarrollo de microemprendimientos autónomos.', cta: 'Anotarme al taller' },
    { dia: 'Martes', turno: 'Tarde', icono: 'bi-music-note-beamed', titulo: 'Taller de Música', desc: 'Un lugar de encuentro a través de la creatividad y expresión musical para descubrir y potenciar capacidades sonoras.', cta: 'Quiero participar' },
    { dia: 'Miércoles', turno: 'Mañana', icono: 'bi-people', titulo: 'Grupo de Prevención de Recaídas para Mujeres', desc: 'Un entorno seguro enfocado en la contención y apoyo integral, brindando herramientas grupales de acompañamiento.', cta: 'Solicitar unirme' },
    { dia: 'Miércoles', turno: 'Tarde', icono: '', titulo: 'Próximamente nuevas actividades', desc: '', cta: '', proximamente: true },
    { dia: 'Jueves', turno: 'Mañana', icono: 'bi-chat-dots', titulo: 'Inglés (Hi!)', desc: 'Claves prácticas destinadas al aprendizaje y formación en el idioma, abriendo nuevas oportunidades comunicativas.', cta: 'Consultar horarios' },
    { dia: 'Jueves', turno: 'Mañana', icono: 'bi-brush', titulo: 'Taller de Arte Kids', desc: 'Espacio lúdico enfocado en la creatividad y expresión artística de las infancias de nuestra comunidad.', cta: 'Inscribir a mi hijo/a' },
    { dia: 'Jueves', turno: 'Tarde', icono: 'bi-emoji-smile', titulo: 'Espacio Recreativo para Niñas', desc: 'Actividades pensadas para la contención y apoyo de las infancias mediante el juego, el arte y la socialización.', cta: 'Consultar vacantes' },
    { dia: 'Jueves', turno: 'Tarde', icono: 'bi-bag', titulo: 'Taller de Marroquinería', desc: 'Formación práctica en el diseño y confección de artículos de cuero y lona, impulsando la salida laboral.', cta: 'Aprender marroquinería' },
    { dia: 'Jueves', turno: 'Tarde', icono: 'bi-people-fill', titulo: 'Grupo de Fortalecimiento para Mujeres Adultas', desc: 'Espacio integrado de fortalecimiento para mujeres adultas combinado con técnicas de artesanías y reciclaje.', cta: 'Me interesa el taller' },
    { dia: 'Viernes', turno: 'Mañana', icono: 'bi-egg-fried', titulo: 'Cocina Kids (6 a 12 años)', desc: 'Taller gastronómico adaptado para niños y niñas. Aprendizaje dinámico, hábitos saludables y trabajo en equipo.', cta: 'Inscribir a los chicos' },
    { dia: 'Viernes', turno: 'Tarde', icono: 'bi-recycle', titulo: 'Taller de Artesanías y Reciclaje para Mujeres', desc: 'Espacio integrado de fortalecimiento para mujeres adultas combinado con técnicas de artesanías y reciclaje.', cta: 'Me interesa el taller' },
    { dia: 'Viernes', turno: 'Tarde', icono: 'bi-heart', titulo: 'Grupo de Apoyo para Familias de Adictos', desc: 'Espacio terapéutico de contención y apoyo mutuo para orientar y acompañar a los entornos familiares en el abordaje de adicciones.', cta: 'Pedir información' },
  ].map((t, idx) => ({ ...t, idx }));

  function crearItemHTML(t) {
    if (t.proximamente) {
      return `<div class="taller-item taller-item--vacio"><span>${t.titulo}</span></div>`;
    }
    return `<button class="taller-item" data-idx="${t.idx}">
      <i class="bi ${t.icono}"></i>
      <span>${t.titulo}</span>
    </button>`;
  }

  function renderGrid() {
    const cont = document.getElementById('talleresGrid');
    let html = '<div class="taller-col taller-col--header"></div>';
    DIAS.forEach(d => { html += `<div class="taller-col taller-col--header">${d}</div>`; });

    ['Mañana', 'Tarde'].forEach(turno => {
      html += `<div class="taller-col taller-col--turno">${turno}<br><small>${turno === 'Mañana' ? '9:00 a 12:00' : '14:00 a 17:00'}</small></div>`;
      DIAS.forEach(dia => {
        const items = TALLERES.filter(t => t.dia === dia && t.turno === turno);
        html += '<div class="taller-col taller-col--celda">';
        items.forEach(t => { html += crearItemHTML(t); });
        html += '</div>';
      });
    });
    cont.innerHTML = html;
  }

  function renderAcordeon() {
    const cont = document.getElementById('talleresAcordeon');
    let html = '';
    DIAS.forEach((dia, i) => {
      const items = TALLERES.filter(t => t.dia === dia);
      html += `<div class="taller-dia">
        <button class="taller-dia-header" data-dia="${i}">
          <span>${dia}</span><i class="bi bi-chevron-down"></i>
        </button>
        <div class="taller-dia-contenido">
          ${items.map(crearItemHTML).join('')}
        </div>
      </div>`;
    });
    cont.innerHTML = html;
  }

  function abrirModalTaller(t) {
    document.getElementById('tallerModalIcono').className = `bi ${t.icono}`;
    document.getElementById('tallerModalHorario').textContent = `${t.dia} ${t.turno} (${t.turno === 'Mañana' ? '9:00 a 12:00' : '14:00 a 17:00'})`;
    document.getElementById('tallerModalTitulo').textContent = t.titulo;
    document.getElementById('tallerModalDescripcion').textContent = t.desc;
    document.getElementById('tallerModalCta').textContent = t.cta;
    document.getElementById('tallerModalOverlay').classList.add('activo');
  }

  renderGrid();
  renderAcordeon();

  document.getElementById('talleresGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('.taller-item[data-idx]');
    if (btn) abrirModalTaller(TALLERES[btn.dataset.idx]);
  });

  document.getElementById('talleresAcordeon').addEventListener('click', (e) => {
    const header = e.target.closest('.taller-dia-header');
    if (header) header.parentElement.classList.toggle('abierto');

    const btn = e.target.closest('.taller-item[data-idx]');
    if (btn) abrirModalTaller(TALLERES[btn.dataset.idx]);
  });

  document.getElementById('tallerModalCerrar').addEventListener('click', () => {
    document.getElementById('tallerModalOverlay').classList.remove('activo');
  });

  document.getElementById('tallerModalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'tallerModalOverlay') e.target.classList.remove('activo');
  });

  document.getElementById('tallerModalCta').addEventListener('click', () => {
    document.getElementById('tallerModalOverlay').classList.remove('activo');
  });

  /* =========================================================
     CARRUSEL
  ========================================================= */
  const track = document.querySelector('.carrusel-track');
  const items = document.querySelectorAll('.carrusel-item');
  const nextBtn = document.querySelector('.btn-next');
  const prevBtn = document.querySelector('.btn-prev');
  const container = document.querySelector('.carrusel-container');

  const modalOverlay = document.getElementById('actividadModalOverlay');
  const modalImg = document.getElementById('actividadModalImg');
  const modalTitulo = document.getElementById('actividadModalTitulo');
  const modalDescripcion = document.getElementById('actividadModalDescripcion');
  const modalCerrar = document.getElementById('actividadModalCerrar');

  let currentIndex = 0;
  let autoPlayTimer = null;
  let itemsPerScreen = 1;
  let itemWidth = 0;
  const GAP = 25;

  // Recalcula medidas: solo se llama al cargar y al hacer resize 
  function recalcMedidas() {
    if (items.length === 0) return;
    const trackWidth = track.getBoundingClientRect().width;
    itemWidth = items[0].getBoundingClientRect().width;
    itemsPerScreen = Math.max(1, Math.round(trackWidth / itemWidth));
  }

  function maxIndex() {
    return Math.max(0, items.length - itemsPerScreen);
  }

  function updateCarrusel() {
    if (items.length === 0) return;
    currentIndex = Math.min(Math.max(currentIndex, 0), maxIndex());
    const moveAmount = currentIndex * (itemWidth + GAP);
    track.style.transform = `translateX(-${moveAmount}px)`;
  }

  function irSiguiente() {
    currentIndex = currentIndex < maxIndex() ? currentIndex + 1 : 0;
    updateCarrusel();
  }

  function irAnterior() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex();
    updateCarrusel();
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(irSiguiente, 4000);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  nextBtn.addEventListener('click', () => { irSiguiente(); startAutoPlay(); });
  prevBtn.addEventListener('click', () => { irAnterior(); startAutoPlay(); });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const titulo = item.getAttribute('data-titulo');
      const descripcion = item.getAttribute('data-descripcion');
      const imgSrc = item.querySelector('img').getAttribute('src');

      modalImg.src = imgSrc;
      modalImg.alt = titulo;
      modalTitulo.textContent = titulo;
      modalDescripcion.textContent = descripcion;

      modalOverlay.classList.add('activo');
      stopAutoPlay();
    });
  });

  function cerrarModalCarrusel() {
    modalOverlay.classList.remove('activo');
    startAutoPlay();
  }

  modalCerrar.addEventListener('click', cerrarModalCarrusel);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) cerrarModalCarrusel();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('activo')) {
      cerrarModalCarrusel();
    }
  });

  // Evita recalcular decenas de veces por segundo
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      recalcMedidas();
      updateCarrusel();
    }, 150);
  });

  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', () => {
    if (!modalOverlay.classList.contains('activo')) startAutoPlay();
  });

  recalcMedidas();
  updateCarrusel();
  startAutoPlay();
});