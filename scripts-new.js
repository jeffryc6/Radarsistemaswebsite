// ===== ROI CALCULATOR =====
const roiSlider = document.getElementById('roi-slider');
const roiDisplay = document.getElementById('roi-display');
const roiLoss = document.getElementById('roi-loss');
const roiTotal = document.getElementById('roi-total');
const roiPercent = document.getElementById('roi-percent');

if (roiSlider) {
    roiSlider.addEventListener('input', function() {
        const ingreso = parseInt(this.value);
        
        // Actualiza display de ingresos
        roiDisplay.textContent = ingreso.toLocaleString('es-CR', {
            style: 'currency',
            currency: 'CRC',
            minimumFractionDigits: 0
        }).replace('₡', '').trim();

        // Calcula pérdida estimada (38.6% de ingresos anuales por brecha promedio)
        const perlida = Math.floor(ingreso * 0.386);
        roiLoss.textContent = perlida.toLocaleString('es-CR', {
            style: 'currency',
            currency: 'CRC',
            minimumFractionDigits: 0
        }).replace('₡', '').trim();

        roiTotal.textContent = perlida.toLocaleString('es-CR', {
            style: 'currency',
            currency: 'CRC',
            minimumFractionDigits: 0
        }).replace('₡', '').trim();

        // Calcula ROI (pérdida / inversión anual de $2,988)
        const roiValue = Math.floor(perlida / 2988);
        roiPercent.textContent = `${roiValue}x`;
    });

    // Trigger inicial
    roiSlider.dispatchEvent(new Event('input'));
}

// ===== FORM AUDITORÍA =====
const formAuditoria = document.getElementById('form-auditoria');
if (formAuditoria) {
    formAuditoria.addEventListener('submit', function(e) {
        e.preventDefault();

        // Recolecta datos
        const formData = new FormData(this);
        const nombre = this.querySelector('input[placeholder="Tu nombre"]').value;
        const email = this.querySelector('input[placeholder="Tu correo"]').value;
        const whatsapp = this.querySelector('input[placeholder="WhatsApp"]').value;
        const empresa = this.querySelector('input[placeholder="Nombre empresa"]').value;

        // Mensaje para WhatsApp
        const mensaje = `Hola Radar, soy ${nombre} de ${empresa}. Quiero solicitar una auditoría de seguridad gratuita. Mi email es ${email} y mi WhatsApp es ${whatsapp}. Gracias.`;
        const urlWhatsapp = `https://wa.me/50689135944?text=${encodeURIComponent(mensaje)}`;

        // Redirige a WhatsApp
        window.location.href = urlWhatsapp;

        // Feedback visual
        const btn = this.querySelector('button');
        const textoOriginal = btn.textContent;
        btn.textContent = '✓ Redirigiéndote a WhatsApp...';
        btn.style.background = '#22c55e';
    });
}

// ===== SMOOTH SCROLL PARA NAV =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR STICKY =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    }
});

// ===== ANIMACIÓN DE NÚMEROS (STATS) =====
function animateNumber(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('es-CR');
    }, 16);
}

// Anima stats cuando entran en viewport
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('stat')) {
            const stat = entry.target.querySelector('strong');
            const text = stat.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (!isNaN(number)) {
                animateNumber(stat, number);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat').forEach(stat => observer.observe(stat));

// ===== VALIDACIÓN DE FORMULARIO =====
function validarFormulario(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let valido = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            valido = false;
        } else {
            input.style.borderColor = '';
        }
    });

    return valido;
}

// ===== EFECTOS DE HOVER EN CARDS =====
document.querySelectorAll('.plan-card, .problema-card, .faq-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
});

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ===== ANALYTICS SIMPLE (Puedes conectar a Google Analytics después) =====
function trackEvent(eventName, eventData = {}) {
    console.log(`Evento: ${eventName}`, eventData);
    // Aquí irían las llamadas a Google Analytics o similar
}

// Track cuando hacen click en CTAs
document.querySelectorAll('.btn-primary, .btn-plan-cta, .btn-whatsapp').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('CTA_Click', {
            text: this.textContent.trim(),
            type: this.classList[0]
        });
    });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
    '.plan-card, .problema-card, .step, .testimonio-card, .faq-item'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(element);
});

// ===== TOOLTIP HELPER =====
function mostrarTooltip(elemento, mensaje) {
    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
        position: absolute;
        background: #1e293b;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.85rem;
        z-index: 1000;
        white-space: nowrap;
        pointer-events: none;
    `;
    tooltip.textContent = mensaje;
    document.body.appendChild(tooltip);

    const rect = elemento.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';

    setTimeout(() => tooltip.remove(), 2000);
}

// ===== COPY REFERRAL LINK =====
document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', function() {
        const text = this.dataset.copy;
        navigator.clipboard.writeText(text);
        mostrarTooltip(this, '✓ Copiado');
    });
});

// ===== PERFORMANCE: Prefetch links =====
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
});

console.log('✓ Scripts cargados correctamente');
