/**
 * DevCraft Studios - Professional Web Development
 * Main JavaScript File
 * 
 * This file contains all the core JavaScript functionality for the website
 * to create interactive elements and enhance user experience.
 */

(function() {
  'use strict';
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeAnimations();
    initializeNavbar();
    initializeTooltips();
    initializeScrollEffects();
    initializeFlashMessages();
  });
  
  /**
   * Initialize animations for elements with animation classes
   */
  function initializeAnimations() {
    // Add animation observer to trigger animations when elements come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Get the animation type from data attribute or default to fade-in
              const animationType = entry.target.dataset.animation || 'fade-in';
              entry.target.classList.add(`animate-${animationType}`);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 } // Trigger when at least 20% of the element is visible
      );
      
      animatedElements.forEach(element => {
        animationObserver.observe(element);
      });
    } else {
      // Fallback for browsers without IntersectionObserver support
      animatedElements.forEach(element => {
        element.classList.add(`animate-${element.dataset.animation || 'fade-in'}`);
      });
    }
  }
  
  /**
   * Initialize navbar effects
   */
  function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
      // Add shadow and reduce padding on scroll
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          navbar.classList.add('navbar-scrolled');
          navbar.style.padding = '0.5rem 0';
          navbar.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)';
        } else {
          navbar.classList.remove('navbar-scrolled');
          navbar.style.padding = '1rem 0';
          navbar.style.boxShadow = 'none';
        }
      });
      
      // Handle active navigation links
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      const currentPath = window.location.pathname;
      
      navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath) {
          link.classList.add('active');
        }
      });
    }
  }
  
  /**
   * Initialize Bootstrap tooltips
   */
  function initializeTooltips() {
    // Initialize all tooltips if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }
  
  /**
   * Initialize scroll effects
   */
  function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Adjust for the fixed navbar
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add('show');
        } else {
          backToTopBtn.classList.remove('show');
        }
      });
      
      backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    // Add ScrollSpy functionality if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
      const scrollSpyElement = document.querySelector('[data-bs-spy="scroll"]');
      if (scrollSpyElement) {
        new bootstrap.ScrollSpy(document.body, {
          target: scrollSpyElement.getAttribute('data-bs-target')
        });
      }
    }
  }
  
  /**
   * Initialize flash messages auto-dismissal
   */
  function initializeFlashMessages() {
    const flashMessages = document.querySelectorAll('.alert');
    if (flashMessages.length > 0) {
      flashMessages.forEach(message => {
        // Auto-dismiss flash messages after 5 seconds
        setTimeout(() => {
          // Only dismiss if Bootstrap is available
          if (typeof bootstrap !== 'undefined' && bootstrap.Alert) {
            const bsAlert = new bootstrap.Alert(message);
            bsAlert.close();
          } else {
            // Fallback with plain JS
            message.style.opacity = '0';
            setTimeout(() => {
              message.remove();
            }, 300); // Allow for the fade out animation
          }
        }, 5000);
      });
    }
  }
  
  /**
   * Add animation to code sections
   */
  function initializeCodeAnimation() {
    const codeBlocks = document.querySelectorAll('.code-animation');
    
    codeBlocks.forEach(block => {
      const codeText = block.querySelector('code').innerText;
      const codeLines = codeText.split('\n');
      let speed = 70; // Typing speed in milliseconds
      
      // Clear the code block
      block.querySelector('code').innerText = '';
      
      // Type each line with a delay
      let lineDelay = 0;
      codeLines.forEach((line, index) => {
        setTimeout(() => {
          block.querySelector('code').innerText += (index > 0 ? '\n' : '') + line;
        }, lineDelay);
        
        lineDelay += line.length * speed / 10; // Delay based on line length
      });
    });
  }
  
  /**
   * Add particle effects to the background (if enabled)
   */
  function initializeParticleEffects() {
    const techBackground = document.querySelector('.tech-background');
    if (techBackground && window.innerWidth > 768) { // Only on larger screens
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.floor(Math.random() * 100);
        const posY = Math.floor(Math.random() * 100);
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random size
        const size = Math.floor(Math.random() * 5) + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration
        const duration = Math.floor(Math.random() * 20) + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        const delay = Math.floor(Math.random() * 10);
        particle.style.animationDelay = `${delay}s`;
        
        techBackground.appendChild(particle);
      }
    }
  }
  
  // Call any additional initialization functions here
  // initializeCodeAnimation(); // This is commented out for now as it's a more advanced feature
  // initializeParticleEffects(); // This is commented out as it would require additional CSS
  
})();
