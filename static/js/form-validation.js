document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!validateForm()) {
                event.preventDefault();
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
    }
    
    // Validate the entire form
    function validateForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        if (!validateInput(name)) isValid = false;
        if (!validateInput(email)) isValid = false;
        if (phone && !validateInput(phone)) isValid = false;
        if (!validateInput(message)) isValid = false;
        
        return isValid;
    }
    
    // Validate individual input
    function validateInput(input) {
        const value = input.value.trim();
        const id = input.id;
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        clearError(input);
        
        // Check for empty required fields
        if (input.hasAttribute('required') && value === '') {
            errorMessage = 'This field is required';
            isValid = false;
        } 
        // Validate email format
        else if (id === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        } 
        // Validate phone format (optional)
        else if (id === 'phone' && value !== '') {
            const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
            if (!phoneRegex.test(value)) {
                errorMessage = 'Please enter a valid phone number';
                isValid = false;
            }
        }
        
        // Display error if validation failed
        if (!isValid) {
            displayError(input, errorMessage);
        }
        
        return isValid;
    }
    
    // Display error message
    function displayError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'var(--error-color)';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.textContent = message;
        
        input.style.borderColor = 'var(--error-color)';
        formGroup.appendChild(errorElement);
    }
    
    // Clear error message
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        input.style.borderColor = '';
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
    }
});
