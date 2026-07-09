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

const toggleBtn = document.getElementById('contrast-toggle');
const body = document.body;

// Modo Alto contraste
const systemPrefersContrast = window.matchMedia('(prefers-contrast: more)');

function updateContrast(isHigh) {
    if (isHigh) {
        body.classList.add('high-contrast');
    } else {
        body.classList.remove('high-contrast');
    }
}

systemPrefersContrast.addEventListener('change', (e) => {
    if (!localStorage.getItem('user-preference')) {
        updateContrast(e.matches);
    }
});

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('high-contrast');
    const isHigh = body.classList.contains('high-contrast');
    localStorage.setItem('user-preference', isHigh ? 'high' : 'none');
});

const savedPreference = localStorage.getItem('user-preference');
if (savedPreference === 'high') {
    body.classList.add('high-contrast');
} else if (!savedPreference && systemPrefersContrast.matches) {
    body.classList.add('high-contrast');
}