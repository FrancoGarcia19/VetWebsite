document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        effect: 'fade', // Añade el efecto de fade
        fadeEffect: {
            crossFade: true
        }
    });

    // Menú y su despliegue responsive (funciona, no tocar)
    function toggleMenu() {
        var menu = document.getElementById('menu');
        if (menu.classList.contains('show')) {
            menu.style.maxHeight = '0';
            menu.style.opacity = '0';
            menu.addEventListener('transitionend', function() {
                if (!menu.classList.contains('show')) {
                    menu.style.display = 'none';
                }
            }, { once: true });
        } else {
            menu.style.display = 'block'; // Usar 'block' en lugar de 'flex'
            // Forzar reflujo para asegurar que las transiciones se apliquen
            menu.offsetHeight; // Lectura para forzar el reflujo
            menu.style.maxHeight = menu.scrollHeight + 'px';
            menu.style.opacity = '1';
        }
        menu.classList.toggle('show');
    }

    // Servicios y su despliegue, funciona no tocar
    function toggleServices() {
        const cards = document.querySelectorAll('.card');
        const hiddenCards = document.querySelectorAll('.card.hidden');
        const button = document.querySelector('.show-more-btn');
        
        if (button.textContent === "Mostrar más") {
            hiddenCards.forEach(card => {
                card.classList.remove('hidden');
            });
            button.textContent = "Mostrar menos";
        } else {
            cards.forEach((card, index) => {
                if (index >= 3) {
                    card.classList.add('hidden');
                }
            });
            button.textContent = "Mostrar más";
            window.scrollTo({ top: document.querySelector("#servicios").offsetTop, behavior: 'smooth' });
        }
    }

    function updateMenuPosition() {
        var header = document.querySelector('header');
        var menu = document.getElementById('menu');
        if (window.innerWidth <= 768) {
            menu.style.top = `${header.offsetHeight}px`;
        }
    }

    function updateMenuStyle() {
        var menu = document.getElementById('menu');
        if (window.innerWidth <= 768) {
            if (menu.classList.contains('show')) {
                menu.style.display = 'flex';
                menu.style.maxHeight = menu.scrollHeight + 'px';
                menu.style.opacity = '1';
            } else {
                menu.style.maxHeight = '0';
                menu.style.opacity = '0';
                menu.addEventListener('transitionend', function() {
                    if (!menu.classList.contains('show')) {
                        menu.style.display = 'none';
                    }
                }, { once: true });
            }
            menu.style.flexDirection = 'column';
            updateMenuPosition();
        } else {
            menu.style.display = 'flex';
            menu.style.maxHeight = 'none';
            menu.style.opacity = '1';
            menu.style.flexDirection = 'row';
        }
    }

    window.addEventListener('resize', updateMenuStyle);
    updateMenuStyle();

    const menuLinks = document.querySelectorAll('nav ul li a', 'section h5 a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.color = '#ffffff';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            this.style.transform = 'translateY(-3px)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.color = '';
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });

    const showMoreButton = document.querySelector('.show-more-btn');
    showMoreButton.addEventListener('click', toggleServices);

    document.getElementById('menu-toggle').addEventListener('click', toggleMenu);

    const heroLink = document.querySelector('#hero h5 a');
    heroLink.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });

    heroLink.addEventListener('mouseenter', function () {
        this.style.color = '#ffffff';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        this.style.transform = 'translateY(-3px)';
    });

    heroLink.addEventListener('mouseleave', function () {
        this.style.color = '';
        this.style.boxShadow = '';
        this.style.transform = '';
    });
});
