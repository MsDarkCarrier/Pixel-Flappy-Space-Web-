document.addEventListener('DOMContentLoaded', () => {

    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    const header = document.getElementById('main-header');
    const scrollProgress = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + "%";
        }


        if (window.scrollY > 50) {
            header.style.background = 'rgba(26, 16, 36, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
            header.style.height = '70px';
        } else {
            header.style.background = 'var(--header-bg)';
            header.style.boxShadow = 'none';
            header.style.height = '80px';
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    const astro = document.getElementById('floating-astro');
    let isScrolling;
    let lastScrollY = window.scrollY;
    function moveAstroRandomly() {
        if (!astro) return;
        const margin = 100;
        const maxX = window.innerWidth - margin;
        const maxY = window.innerHeight - margin;

        const randomX = Math.random() * (maxX - margin) + margin;
        const randomY = Math.random() * (maxY - margin) + margin;

        astro.style.left = `${randomX}px`;
        astro.style.top = `${randomY}px`;
    }

    moveAstroRandomly();
    setInterval(moveAstroRandomly, 10000);

    window.addEventListener('scroll', () => {
        if (!astro) return;
        astro.classList.remove('astro-idle');
        astro.classList.add('astro-impulse');

        const currentScroll = window.scrollY;
        const scrollDelta = currentScroll - lastScrollY;

        const tilt = Math.min(Math.max(scrollDelta * 0.5, -20), 20);
        const shiftY = Math.min(Math.max(scrollDelta * 0.2, -30), 30);

        astro.style.transform = `translateY(${shiftY}px) rotate(${tilt}deg)`;

        lastScrollY = currentScroll;

        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            astro.classList.remove('astro-impulse');
            astro.classList.add('astro-idle');
            astro.style.transform = 'translateY(0) rotate(0deg)';
        }, 200);
    });

    document.querySelectorAll('.btn, .store-btn, .si-senor-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (astro) {
                astro.classList.remove('astro-idle', 'astro-impulse');
                astro.classList.add('astro-fire');
            }
        });
        btn.addEventListener('mouseleave', () => {
            if (astro) {
                astro.classList.remove('astro-fire');
                astro.classList.add('astro-idle');
            }
        });
    });

});
