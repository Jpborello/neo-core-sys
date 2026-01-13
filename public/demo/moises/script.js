// ========================================
// MOISES Traslados y Logística
// Interactive Functionality
// ========================================

// === SMOOTH SCROLL NAVIGATION ===
document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // === HEADER SCROLL EFFECT ===
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // === MOBILE MENU TOGGLE ===
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinksContainer.classList.toggle('active');
        });
    }

    // === QUOTE FORM HANDLING ===
    const quoteForm = document.getElementById('quoteForm');
    const distanceInput = document.getElementById('distance');
    const priceValueDisplay = document.getElementById('priceValue');
    const PRICE_PER_KM = 2500;

    // Update price calculation when distance changes
    if (distanceInput && priceValueDisplay) {
        distanceInput.addEventListener('input', function () {
            calculatePrice();
        });

        // Initial calculation
        calculatePrice();
    }

    function calculatePrice() {
        const distance = parseFloat(distanceInput.value) || 0;
        const totalPrice = distance * PRICE_PER_KM;

        if (distance > 0) {
            priceValueDisplay.textContent = `$${totalPrice.toLocaleString('es-AR')} ARS`;
        } else {
            priceValueDisplay.textContent = '$0 ARS';
        }
    }

    // Form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                nombre: document.getElementById('nombre').value,
                telefono: document.getElementById('telefono').value,
                email: document.getElementById('email').value,
                origen: document.getElementById('origen').value,
                destino: document.getElementById('destino').value,
                distancia: document.getElementById('distance').value,
                peso: document.getElementById('peso').value,
                tipoCarga: document.getElementById('tipoCarga').value,
                descripcion: document.getElementById('descripcion').value,
                observaciones: document.getElementById('observaciones').value
            };

            // Validate required fields
            const requiredFields = ['nombre', 'telefono', 'email', 'origen', 'destino', 'distancia', 'peso', 'tipoCarga'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    input.style.borderColor = '#EF4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '#E5E7EB';
                }
            });

            if (!isValid) {
                alert('Por favor, completá todos los campos obligatorios.');
                return;
            }

            // Calculate final price
            const distance = parseFloat(formData.distancia);
            const totalPrice = distance * PRICE_PER_KM;

            // Create WhatsApp message
            const whatsappMessage = `
🚚 *SOLICITUD DE COTIZACIÓN*

*Datos del Cliente:*
Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}
Email: ${formData.email}

*Detalles del Traslado:*
Origen: ${formData.origen}
Destino: ${formData.destino}
Distancia: ${formData.distancia} km

*Carga:*
Tipo: ${formData.tipoCarga}
Peso aproximado: ${formData.peso}
Descripción: ${formData.descripcion}

*Precio Estimado:* $${totalPrice.toLocaleString('es-AR')} ARS

${formData.observaciones ? `*Observaciones:* ${formData.observaciones}` : ''}
      `.trim();

            // Encode message for WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappNumber = '5493415320590';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Show success message
            showSuccessMessage();

            // Open WhatsApp after a short delay
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 1500);

            // Reset form
            setTimeout(() => {
                quoteForm.reset();
                calculatePrice();
            }, 2000);
        });
    }

    function showSuccessMessage() {
        // Create success overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    `;

        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
      background: white;
      padding: 3rem;
      border-radius: 16px;
      text-align: center;
      max-width: 500px;
      animation: slideUp 0.4s ease;
    `;

        messageBox.innerHTML = `
      <div style="font-size: 4rem; color: #10B981; margin-bottom: 1rem;">✓</div>
      <h3 style="color: #1E3A8A; font-size: 1.75rem; margin-bottom: 1rem;">¡Solicitud Enviada!</h3>
      <p style="color: #6B7280; font-size: 1.125rem; margin-bottom: 1.5rem;">
        Te vamos a contactar por WhatsApp para confirmar todos los detalles de tu traslado.
      </p>
      <p style="color: #9CA3AF; font-size: 0.95rem;">
        Redirigiendo a WhatsApp...
      </p>
    `;

        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);

        // Remove overlay after 2 seconds
        setTimeout(() => {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }, 2000);
    }

    // === WHATSAPP FLOAT BUTTON ===
    const whatsappFloat = document.querySelector('.whatsapp-float');

    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function () {
            const whatsappNumber = '5493415320590';
            const message = encodeURIComponent('Hola! Me gustaría solicitar información sobre sus servicios de traslado.');
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    }

    // === CTA BUTTONS ===
    const ctaButtons = document.querySelectorAll('[data-scroll-to]');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-scroll-to');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === SCROLL ANIMATIONS ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // === ANIMATED STATISTICS COUNTER ===
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target >= 1000 ? `+${Math.floor(target)}` : target;
                clearInterval(timer);
            } else {
                element.textContent = current >= 1000 ? `+${Math.floor(current)}` : Math.floor(current);
            }
        }, 16);
    }

    // Trigger counter animation when hero stats are visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        let targetValue;

                        if (text.includes('15')) {
                            targetValue = 15;
                            stat.textContent = '0';
                            animateCounter(stat, targetValue, 1500);
                        } else if (text.includes('1200')) {
                            targetValue = 1200;
                            stat.textContent = '0';
                            animateCounter(stat, targetValue, 2000);
                        } else if (text.includes('100')) {
                            targetValue = 100;
                            stat.textContent = '0';
                            animateCounter(stat, targetValue, 1500);
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(heroStats);
    }

    // === FAQ ACCORDION ===
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // === BACK TO TOP BUTTON ===
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});

// === CSS ANIMATIONS ===
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @media (max-width: 968px) {
    .nav-links.active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      padding: 1.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      gap: 1rem;
    }
  }
`;
document.head.appendChild(style);
