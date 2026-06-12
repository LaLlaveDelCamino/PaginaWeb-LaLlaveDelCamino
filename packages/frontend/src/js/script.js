const menuBtn = document.getElementById('menuBtn');
    const navbar = document.getElementById('navbar');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('change');
        navbar.classList.toggle('open');
    });