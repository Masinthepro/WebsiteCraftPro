document.addEventListener('DOMContentLoaded', function() {
    // ============================
    // Header Scroll Effect
    // ============================
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    // Add scroll effect to header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // ============================
    // Active Navigation Link
    // ============================
    // Get current page URL
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-link');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentLocation === href || (currentLocation === '/' && href === '/')) {
            item.classList.add('active');
        } else if (href !== '/' && currentLocation.includes(href)) {
            item.classList.add('active');
        }
    });

    // ============================
    // Smooth Scroll for Anchor Links
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================
    // Animations on Scroll
    // ============================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = () => {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // ============================
    // Service Card Hover Effect
    // ============================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = 'var(--shadow-glow)';
            card.style.borderColor = 'var(--accent-color)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
            card.style.borderColor = 'var(--border-color)';
        });
    });

    // ============================
    // Statistics Counter Animation
    // ============================
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateStats = () => {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const statsSectionPosition = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsSectionPosition < windowHeight - 100) {
            stats.forEach(stat => {
                const targetValue = parseInt(stat.getAttribute('data-value'));
                let currentValue = 0;
                const duration = 2000; // 2 seconds
                const stepTime = Math.abs(Math.floor(duration / targetValue));
                
                const counter = setInterval(() => {
                    currentValue += 1;
                    stat.textContent = currentValue;
                    
                    if (currentValue >= targetValue) {
                        stat.textContent = targetValue;
                        clearInterval(counter);
                    }
                }, stepTime);
            });
            
            hasAnimated = true;
        }
    };
    
    // Check if stats section exists
    if (document.querySelector('.about-stats')) {
        // Initial check
        animateStats();
        
        // Check on scroll
        window.addEventListener('scroll', animateStats);
    }

    // ============================
    // Flash Message Auto Dismiss
    // ============================
    const flashMessages = document.querySelectorAll('.alert');
    
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                message.style.display = 'none';
            }, 500);
        }, 5000);
    });
});
