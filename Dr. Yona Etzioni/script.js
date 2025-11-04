// ============================================
// LANGUAGE SWITCHING FUNCTIONALITY
// ============================================

function switchLanguage() {
    const currentUrl = window.location.pathname;

    // Check if we're on the Hebrew page (index.html) or English page (en.html)
    if (currentUrl.includes('index.html') || currentUrl.endsWith('/')) {
        // On Hebrew page, go to English
        window.location.href = currentUrl.includes('index.html')
            ? currentUrl.replace('index.html', 'en.html')
            : 'en.html';
    } else if (currentUrl.includes('en.html')) {
        // On English page, go to Hebrew
        window.location.href = currentUrl.replace('en.html', 'index.html');
    }
}

// Optional: Add smooth scroll behavior to form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultationForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);

            // You can send this to a backend service here
            // For now, we'll just show a success message
            alert('Thank you! We will contact you soon to schedule your free consultation.');

            // Reset form
            form.reset();

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Add animation to elements on scroll
    observeElements();
});

// Intersection Observer for scroll animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section, .step, .danger-card, .scenario');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Phone number click handling
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // On mobile devices, this will open the phone dialer
            // On desktop, it will do nothing (which is fine)
        });
    });
});

// WhatsApp button functionality
function openWhatsApp() {
    const phoneNumber = '972535455468'; // +972-53-545-5468 without dashes
    const message = encodeURIComponent('Hello, I would like to schedule a free consultation for sleep apnea treatment.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Smooth scroll for anchor links
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

// Add form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.style.borderColor = '#d84545';
            } else {
                input.style.borderColor = '';
            }
        } else if (input.value.trim() === '') {
            isValid = false;
            input.style.borderColor = '#d84545';
        } else {
            input.style.borderColor = '';
        }
    });

    return isValid;
}

// Update form submit handler with validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultationForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm(form)) {
                // Get form data
                const formData = new FormData(form);

                // Create a summary message
                const isHebrew = document.documentElement.lang === 'he';
                const message = isHebrew
                    ? 'תודה! נציא איתך קשר בקרוב לתאם את הייעוץ החינם שלך.'
                    : 'Thank you! We will contact you soon to schedule your free consultation.';

                alert(message);

                // Reset form
                form.reset();

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const errorMessage = document.documentElement.lang === 'he'
                    ? 'אנא מלא את כל השדות הנדרשים בצורה נכונה.'
                    : 'Please fill in all required fields correctly.';
                alert(errorMessage);
            }
        });
    }
});
