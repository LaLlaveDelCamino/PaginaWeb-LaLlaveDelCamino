const menuBtn = document.getElementById('menuBtn');
const navbar = document.getElementById('navbar');

// Hamburguesa
menuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    menuBtn.classList.toggle('change');
    navbar.classList.toggle('open');
});

// Cerrar al clickear afuera
document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
        navbar.classList.remove('open');
        menuBtn.classList.remove('change');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        navbar.classList.remove('open');
        menuBtn.classList.remove('change');

        setTimeout(() => {
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    });
});

// Formulario WhatsApp
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const mensaje = document.getElementById("mensaje").value;
    const texto =
`Hola, me comunico desde la página web de La Llave del Camino.

Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}

Mensaje:
${mensaje}`;
    const whatsappURL = "https://wa.me/5493425238984?text=" + encodeURIComponent(texto);
    window.open(whatsappURL, "_blank");
});

document.addEventListener("DOMContentLoaded", function() {
    const anioInicio = 2012; 
    const anioActual = new Date().getFullYear();
    const trayectoriaCalculada = anioActual - anioInicio;

    // Hero
    const heroContador = document.getElementById("hero-trayectoria");
    if (heroContador) {
        heroContador.textContent = trayectoriaCalculada;
    }

    // Impacto
    const aniosContador = document.getElementById("anios-trayectoria");
    if (aniosContador) {
        aniosContador.textContent = trayectoriaCalculada;
    }
});

// Modo Alto contraste

const toggleBtn = document.getElementById('contrast-toggle');
const icon = document.getElementById('theme-icon');
const body = document.body;
const systemPrefersContrast = window.matchMedia('(prefers-contrast: more)');
const iconSol = '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
const iconAccesible = '<circle cx="12" cy="12" r="10"></circle><path d="M12 2v20"></path>';

function syncIcon(isHigh) {
    icon.innerHTML = isHigh ? iconAccesible : iconSol;
}

function updateContrast(isHigh) {
    if (isHigh) {
        body.classList.add('high-contrast');
    } else {
        body.classList.remove('high-contrast');
    }
    syncIcon(isHigh);
}

toggleBtn.addEventListener('click', () => {
    const isHigh = body.classList.toggle('high-contrast');
    localStorage.setItem('user-preference', isHigh ? 'high' : 'none');
    syncIcon(isHigh);
});

systemPrefersContrast.addEventListener('change', (e) => {
    if (!localStorage.getItem('user-preference')) {
        updateContrast(e.matches);
    }
});

const savedPreference = localStorage.getItem('user-preference');

const shouldBeHigh = (savedPreference === 'high') || (!savedPreference && systemPrefersContrast.matches);

updateContrast(shouldBeHigh);
