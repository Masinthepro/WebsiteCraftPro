/**
 * DevCraft Studios - Professional Web Development
 * Form Validation Script
 * 
 * This file handles client-side form validation for the contact form
 * to enhance user experience and reduce server requests with invalid data.
 */

(function() {
  'use strict';
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    initializeFormValidation();
  });
  
  /**
   * Initialize form validation
   */
  function initializeFormValidation() {
    // Get the contact form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      // Form input elements
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const messageInput = document.getElementById('message');
      
      // Form submission handler
      contactForm.addEventListener('submit', function(event) {
        // Reset previous error states
        resetFormErrors();
        
        // Validate form inputs
        let isValid = true;
        
        // Validate name
        if (!validateName(nameInput.value)) {
          showError(nameInput, 'Please enter your name');
          isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
          showError(emailInput, 'Please enter a valid email address');
          isValid = false;
        }
        
        // Validate phone (optional)
        if (phoneInput.value && !validatePhone(phoneInput.value)) {
          showError(phoneInput, 'Please enter a valid phone number');
          isValid = false;
        }
        
        // Validate message
        if (!validateMessage(messageInput.value)) {
          showError(messageInput, 'Please enter your message');
          isValid = false;
        }
        
        // Prevent form submission if validation fails
        if (!isValid) {
          event.preventDefault();
        } else {
          // Show loading state
          showSubmittingState();
        }
      });
      
      // Real-time validation on input
      if (nameInput) {
        nameInput.addEventListener('input', function() {
          validateInput(nameInput, validateName, 'Please enter your name');
        });
      }
      
      if (emailInput) {
        emailInput.addEventListener('input', function() {
          validateInput(emailInput, validateEmail, 'Please enter a valid email address');
        });
      }
      
      if (phoneInput) {
        phoneInput.addEventListener('input', function() {
          if (phoneInput.value) {
            validateInput(phoneInput, validatePhone, 'Please enter a valid phone number');
          } else {
            // Phone is optional, so clear error if empty
            clearError(phoneInput);
          }
        });
      }
      
      if (messageInput) {
        messageInput.addEventListener('input', function() {
          validateInput(messageInput, validateMessage, 'Please enter your message');
        });
      }
    }
  }
  
  /**
   * Reset all form errors
   */
  function resetFormErrors() {
    // Find all elements with the error class and remove it
    document.querySelectorAll('.is-invalid').forEach(element => {
      element.classList.remove('is-invalid');
    });
    
    // Remove all error messages
    document.querySelectorAll('.invalid-feedback').forEach(element => {
      element.remove();
    });
  }
  
  /**
   * Validate a specific input using the provided validation function
   * @param {HTMLElement} inputElement - The input element to validate
   * @param {Function} validationFn - The validation function to use
   * @param {String} errorMessage - The error message to show if validation fails
   */
  function validateInput(inputElement, validationFn, errorMessage) {
    if (!validationFn(inputElement.value)) {
      showError(inputElement, errorMessage);
    } else {
      clearError(inputElement);
    }
  }
  
  /**
   * Show error message for an input
   * @param {HTMLElement} inputElement - The input element with error
   * @param {String} message - The error message to display
   */
  function showError(inputElement, message) {
    // Add error class to the input
    inputElement.classList.add('is-invalid');
    
    // Check if error message already exists
    const existingError = inputElement.nextElementSibling;
    if (existingError && existingError.classList.contains('invalid-feedback')) {
      existingError.textContent = message;
    } else {
      // Create error message element
      const errorElement = document.createElement('div');
      errorElement.classList.add('invalid-feedback');
      errorElement.textContent = message;
      
      // Insert error message after the input
      inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }
  }
  
  /**
   * Clear error message for an input
   * @param {HTMLElement} inputElement - The input element to clear errors for
   */
  function clearError(inputElement) {
    // Remove error class
    inputElement.classList.remove('is-invalid');
    
    // Remove error message if it exists
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('invalid-feedback')) {
      errorElement.remove();
    }
  }
  
  /**
   * Show submitting state on the form
   */
  function showSubmittingState() {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    if (submitButton) {
      // Disable the button and show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
    }
  }
  
  /**
   * Validate name input
   * @param {String} name - The name to validate
   * @returns {Boolean} - True if valid, false otherwise
   */
  function validateName(name) {
    return name.trim().length > 0;
  }
  
  /**
   * Validate email input
   * @param {String} email - The email to validate
   * @returns {Boolean} - True if valid, false otherwise
   */
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Validate phone input
   * @param {String} phone - The phone number to validate
   * @returns {Boolean} - True if valid, false otherwise
   */
  function validatePhone(phone) {
    // Simple validation for phone numbers
    // Accepts formats like: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/;
    return phoneRegex.test(phone);
  }
  
  /**
   * Validate message input
   * @param {String} message - The message to validate
   * @returns {Boolean} - True if valid, false otherwise
   */
  function validateMessage(message) {
    return message.trim().length > 0;
  }
  
  /**
   * Handle URL parameters for pre-selecting a package
   */
  function handleUrlParameters() {
    // Check if package parameter exists in URL
    const urlParams = new URLSearchParams(window.location.search);
    const packageParam = urlParams.get('package');
    
    if (packageParam) {
      const packageSelect = document.getElementById('package');
      if (packageSelect) {
        // Find and select the option that matches the package parameter
        Array.from(packageSelect.options).forEach(option => {
          if (option.value === packageParam) {
            option.selected = true;
          }
        });
      }
    }
  }
  
  // Handle URL parameters (like pre-selecting a package)
  handleUrlParameters();
  
})();
