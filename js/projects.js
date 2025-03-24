// Datos de los proyectos
const projects = [
    {
        title: "Municipio de Larrainzar",
        description: "Aplicación web para la administración de la ciudad de Larrainzar, Chiapas, México.",
        image: "img/Larrainzar.png",
        link: "https://municipiolarrainzar.gob.mx",
        technologies: ["Angular", "NestJS", "MySQL"]
    },
    {
        title: "Invitación de Boda",
        description: "Página web para invitación de boda",
        image: "img/Boda_R&L.png",
        link: "https://romeolupita-59082.web.app/",
        technologies: ["HTML", "CSS", "JS", "Prime NG", "AOS"]
    },
    {
        title: "Sistema de Rifa con Causa",
        description: "Aplicación para gestión de reservas números de rifa conectado con Google sheet",
        image: "img/Rifa.png",
        link: "https://rifa-con-causa-tayson.web.app/",
        technologies: ["HTML", "Firebase", "JavaScript", "CSS", "Google Script"]
    },
    {
        title: "Invitación de revelación",
        description: "Página web para invitación de revelación",
        image: "img/Revelacion.png",
        link: "https://revelacion-elizabeth-williams.web.app/",
        technologies: ["HTML", "CSS", "JS", "Prime NG", "AOS"]
    }
];

// Configuración responsive del carrusel
const responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
];

// Función para renderizar los proyectos en el carrusel
function renderProjects() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (!carouselWrapper) return;

    // Limpiar el contenedor del carrusel
    carouselWrapper.innerHTML = '';

    // Renderizar cada proyecto
    projects.forEach((project, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.setAttribute('data-aos', 'fade-up');
        slide.setAttribute('data-aos-delay', '200');

        slide.innerHTML = `
            <article class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.link}" class="project-link" target="_blank">
                                <i class="pi pi-external-link"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3 data-aos="fade-up" data-aos-delay="300">${project.title}</h3>
                    <p data-aos="fade-up" data-aos-delay="400">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map((tech, i) => `
                            <span data-aos="fade-up" data-aos-delay="${500 + (i * 100)}">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            </article>
        `;

        carouselWrapper.appendChild(slide);
    });

    // Reinicializar AOS para las nuevas animaciones
    AOS.refresh();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
}); 