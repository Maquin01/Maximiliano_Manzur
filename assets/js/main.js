document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    const header = document.querySelector('header');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('section');
    
    // Inicializar partículas para secciones importantes
    initParticles();
    
    // Inicializar animaciones de scroll
    initScrollAnimations();
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        menuToggle.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect - Mejorado
    let scrollPosition = window.scrollY;
    let lastScrollPosition = 0;
    let scrollDirection = 'down';
    
    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
        
        // Determinar dirección de scroll
        scrollDirection = scrollPosition > lastScrollPosition ? 'down' : 'up';
        lastScrollPosition = scrollPosition;
        
        // Efectos de header
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
            
            if (scrollDirection === 'down' && scrollPosition > 300) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
    });

    // Highlight active section in navigation - Mejorado
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
                // Añadir efecto de revelación para la sección activa
                section.classList.add('active-section');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Form Validation and Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            if (name.value.trim() === '') {
                showError(name, 'Por favor ingresa tu nombre');
                isValid = false;
            } else {
                removeError(name);
            }
            
            if (email.value.trim() === '') {
                showError(email, 'Por favor ingresa tu email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor ingresa un email válido');
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (message.value.trim() === '') {
                showError(message, 'Por favor ingresa un mensaje');
                isValid = false;
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // Here you would normally send the form data to a server
                // For now, we'll just show a success message
                const formData = {
                    name: name.value,
                    email: email.value,
                    message: message.value
                };
                
                console.log('Form data:', formData);
                
                // Animación de envío
                contactForm.classList.add('sending');
                
                // Simulación de envío (reemplazar con lógica real)
                setTimeout(() => {
                    contactForm.classList.remove('sending');
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <p>¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.</p>
                    `;
                    
                    contactForm.innerHTML = '';
                    contactForm.appendChild(successMessage);
                }, 1500);
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorMessage);
        }
        
        input.classList.add('error');
        
        // Efecto de shake para inputs con error
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Create placeholder images for projects if needed
    function createPlaceholderImage() {
        const projectImages = document.querySelectorAll('.project-image img');
        
        projectImages.forEach(img => {
            img.addEventListener('error', function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = 400;
                canvas.height = 250;
                
                // Create gradient background - Mejorado
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradient.addColorStop(0, '#1a4b91');   // Azul primario
                gradient.addColorStop(1, '#2c6fc7');   // Azul más claro
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Añadir patrón de fondo
                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                for (let i = 0; i < 20; i++) {
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    const size = Math.random() * 20 + 5;
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // Add project name text
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 24px Montserrat';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                const altText = img.getAttribute('alt') || 'Proyecto';
                ctx.fillText(altText, canvas.width / 2, canvas.height / 2);
                
                // Añadir brillos
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.beginPath();
                ctx.arc(canvas.width - 50, 50, 30, 0, Math.PI * 2);
                ctx.fill();
                
                // Replace the img src with the canvas data URL
                img.src = canvas.toDataURL('image/png');
            });
        });
    }
    
    createPlaceholderImage();
    
    // Función para inicializar animaciones basadas en scroll
    function initScrollAnimations() {
        // Agregar clases de animación a elementos
        const animatedElements = document.querySelectorAll(
            '.hero-text h1, .hero-text h2, .hero-text p, .hero-buttons, ' +
            '.section-title, .about-content p, .education-item, .language-item, ' +
            '.skills-category, .experience-item, .project-card, .achievement-category, ' +
            '.contact-info, .contact-form'
        );
        
        animatedElements.forEach((el, index) => {
            el.classList.add('animate');
            
            // Asignar diferentes tipos de animación según el elemento
            if (el.classList.contains('hero-text') || el.classList.contains('section-title') || 
                el.classList.contains('about-content') || el.classList.contains('contact-form')) {
                el.classList.add('fade-in-up');
            } 
            else if (el.classList.contains('project-card') || el.classList.contains('skills-category')) {
                el.classList.add('zoom-in');
            }
            else if (index % 2 === 0) {
                el.classList.add('slide-in-left');
            } 
            else {
                el.classList.add('slide-in-right');
            }
            
            // Añadir delays escalonados
            el.classList.add(`delay-${index % 5 + 1}`);
        });
        
        // Observer para activar animaciones cuando los elementos sean visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
        
        // Efecto de fade para secciones al hacer scroll
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => {
            fadeObserver.observe(el);
        });
    }
    
    // Función para inicializar partículas en secciones clave
    function initParticles() {
        // Agregar contenedores de partículas a secciones importantes
        const particleSections = [
            document.querySelector('.hero'),
            document.querySelector('#habilidades'),
            document.querySelector('#contacto')
        ];
        
        particleSections.forEach(section => {
            if (section) {
                section.classList.add('with-particles');
                
                const particleContainer = document.createElement('div');
                particleContainer.className = 'particles-js';
                particleContainer.id = `particles-${section.id || 'hero'}`;
                
                section.insertBefore(particleContainer, section.firstChild);
            }
        });
        
        // Cargar la librería particles.js dinámicamente
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
            // Configurar partículas para cada sección
            particleSections.forEach(section => {
                if (section && window.particlesJS) {
                    const containerId = `particles-${section.id || 'hero'}`;
                    
                    // Configuración de partículas (personalizada para cada sección)
                    const config = {
                        particles: {
                            number: {
                                value: 30,
                                density: {
                                    enable: true,
                                    value_area: 800
                                }
                            },
                            color: {
                                value: "#1a4b91"
                            },
                            shape: {
                                type: "circle",
                                stroke: {
                                    width: 0,
                                    color: "#000000"
                                }
                            },
                            opacity: {
                                value: 0.15,
                                random: false,
                                anim: {
                                    enable: false
                                }
                            },
                            size: {
                                value: 5,
                                random: true,
                                anim: {
                                    enable: false
                                }
                            },
                            line_linked: {
                                enable: true,
                                distance: 150,
                                color: "#1a4b91",
                                opacity: 0.1,
                                width: 1
                            },
                            move: {
                                enable: true,
                                speed: 2,
                                direction: "none",
                                random: false,
                                straight: false,
                                out_mode: "out",
                                bounce: false
                            }
                        },
                        interactivity: {
                            detect_on: "canvas",
                            events: {
                                onhover: {
                                    enable: true,
                                    mode: "grab"
                                },
                                onclick: {
                                    enable: true,
                                    mode: "push"
                                },
                                resize: true
                            },
                            modes: {
                                grab: {
                                    distance: 140,
                                    line_linked: {
                                        opacity: 0.3
                                    }
                                },
                                push: {
                                    particles_nb: 3
                                }
                            }
                        },
                        retina_detect: true
                    };
                    
                    // Personalizar según la sección
                    if (section.id === 'habilidades') {
                        config.particles.color.value = "#2c6fc7";
                        config.particles.line_linked.color = "#2c6fc7";
                        config.particles.move.speed = 1.5;
                    } else if (section.id === 'contacto') {
                        config.particles.number.value = 50;
                        config.particles.size.value = 4;
                        config.particles.move.speed = 1;
                    }
                    
                    window.particlesJS(containerId, config);
                }
            });
        };
        
        document.body.appendChild(script);
    }
    
    // Añadir botón de scroll down en la sección de inicio
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const scrollDownBtn = document.createElement('div');
        scrollDownBtn.className = 'scroll-down';
        scrollDownBtn.innerHTML = '<span>Scroll</span><i class="fas fa-chevron-down"></i>';
        
        scrollDownBtn.addEventListener('click', () => {
            const nextSection = heroSection.nextElementSibling;
            if (nextSection) {
                const headerHeight = header.offsetHeight;
                const nextSectionTop = nextSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: nextSectionTop,
                    behavior: 'smooth'
                });
            }
        });
        
        heroSection.appendChild(scrollDownBtn);
    }
    
    // Agregar efecto parallax en secciones importantes
    const parallaxSections = document.querySelectorAll('.hero, #proyectos, #contacto');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Calcular la posición relativa para el efecto parallax
            if (scrollY >= sectionTop - window.innerHeight && scrollY <= sectionTop + sectionHeight) {
                const yPos = (scrollY - sectionTop) * 0.1;
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
});