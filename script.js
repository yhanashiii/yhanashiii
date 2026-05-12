document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Blur & Size Effect on Scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.width = "90%";
            nav.style.padding = "10px 30px";
            nav.style.background = "rgba(255, 255, 255, 0.08)"; // Slightly more opaque on scroll
        } else {
            nav.style.width = "85%";
            nav.style.padding = "12px 40px";
            nav.style.background = "rgba(255, 255, 255, 0.05)";
        }
    });

    // 2. Intersection Observer for Project Cards Reveal
    const projectObserverOptions = {
        threshold: 0.15 // Triggers when 15% of the card is visible
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, projectObserverOptions);

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });

    // 3. Intersection Observer for Contact Section (The New Effect)
    const contactSection = document.querySelector('.contact-section');
    
    const contactObserverOptions = {
        threshold: 0.3 // Triggers when 30% of the section is in view
    };

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // This adds the class that triggers the CSS transitions for h2, p, and buttons
                entry.target.classList.add('reveal-active');
                
                // Once the animation plays, we can stop observing to save performance
                contactObserver.unobserve(entry.target);
            }
        });
    }, contactObserverOptions);

    if (contactSection) {
        contactObserver.observe(contactSection);
    }

    // 4. Smooth Scrolling for Navigation Links
    // (Optional: Ensures all internal links scroll smoothly)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});