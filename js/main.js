// Inicializar AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    disable: 'mobile',
    disableMutationObserver: true,
    startEvent: 'load'
});

// Configuración de Three.js
let scene, camera, renderer, particles;
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

// Inicialización de Three.js
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Crear partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#00ff88',
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 2;
}

// Animación de Three.js
function animate() {
    requestAnimationFrame(animate);

    particles.rotation.x += 0.0001;
    particles.rotation.y += 0.0001;

    // Movimiento suave de la cámara
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;

    renderer.render(scene, camera);
}

// Eventos del mouse
function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
}

function onMouseLeave() {
    mouseX = 0;
    mouseY = 0;
}

// Ajuste de tamaño de ventana
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Inicialización de AOS
function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        disable: 'mobile',
        disableMutationObserver: true,
        startEvent: 'load'
    });
}

// Navegación suave
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Menú móvil
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Cambiar el ícono
            const icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('pi-bars');
                icon.classList.add('pi-times');
            } else {
                icon.classList.remove('pi-times');
                icon.classList.add('pi-bars');
            }
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('pi-times');
                icon.classList.add('pi-bars');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('pi-times');
                icon.classList.add('pi-bars');
            }
        });
    }
}

// Contador de estadísticas
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.getAttribute('data-value'));
                animateValue(target, 0, value, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Carrusel de Proyectos
function initCarousel() {
    const carousel = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Crear indicadores
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.carousel-indicator');

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Autoplay infinito
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pausar autoplay al hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carousel.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });

    // Manejar la transición infinita
    carousel.addEventListener('transitionend', () => {
        if (currentSlide === totalSlides - 1) {
            carousel.style.transition = 'none';
            currentSlide = 0;
            carousel.style.transform = `translateX(0)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease-in-out';
            }, 10);
            updateIndicators();
        } else if (currentSlide === 0) {
            carousel.style.transition = 'none';
            currentSlide = totalSlides - 1;
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease-in-out';
            }, 10);
            updateIndicators();
        }
    });
}

// Cursor personalizado
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let particles = [];

    // Crear partículas
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        document.body.appendChild(particle);
        particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1
        });
    }

    // Actualizar partículas
    function updateParticles() {
        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.02;
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = particle.life;

            if (particle.life <= 0) {
                particle.element.remove();
                particles.splice(index, 1);
            }
        });
    }

    // Eventos del mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Crear partículas al mover el mouse
        if (Math.random() < 0.3) {
            createParticle(mouseX, mouseY);
        }
    });

    document.addEventListener('mousedown', (e) => {
        cursor.classList.add('cursor-active');
        cursorDot.classList.add('cursor-dot-active');
        
        // Crear explosión de partículas al hacer clic
        for (let i = 0; i < 10; i++) {
            createParticle(e.clientX, e.clientY);
        }
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-active');
        cursorDot.classList.remove('cursor-dot-active');
    });

    // Animación suave del cursor
    function animate() {
        // Cursor principal
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Punto del cursor
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        updateParticles();
        requestAnimationFrame(animate);
    }

    animate();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initThree();
    initAOS();
    initSmoothScroll();
    initMobileMenu();
    initStatsCounter();
    initCarousel();
    initCustomCursor();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onWindowResize);
    animate();

    // Animación de las tarjetas de habilidades
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 10px 30px rgba(0, 255, 136, 0.2)'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 5px 15px rgba(0, 255, 136, 0.1)'
            });
        });
    });

    // Animación de los tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            gsap.to(tag, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out',
                backgroundColor: 'rgba(0, 255, 136, 0.2)'
            });
        });

        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                backgroundColor: 'rgba(0, 255, 136, 0.1)'
            });
        });
    });
}); 