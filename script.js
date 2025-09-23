// DOM Elements
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginFormElement = document.getElementById('loginFormElement');
const signupFormElement = document.getElementById('signupFormElement');
const loginSuccess = document.getElementById('loginSuccess');
const signupSuccess = document.getElementById('signupSuccess');

// Tab switching functionality
function switchToLogin() {
    loginTab.className = 'tab-active flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300';
    signupTab.className = 'tab-inactive flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300';
    
    signupForm.className = 'form-container form-slide-out absolute top-20 left-8 right-8';
    loginForm.className = 'form-container form-slide-in';
    loginForm.style.display = 'block';
    
    // Hide success messages
    loginSuccess.style.display = 'none';
    signupSuccess.style.display = 'none';
    
    // Reset forms
    loginFormElement.reset();
    signupFormElement.reset();
    
    // Re-enable buttons
    resetButton(loginFormElement.querySelector('button[type="submit"]'), 'Sign In');
    resetButton(signupFormElement.querySelector('button[type="submit"]'), 'Create Account');
}

function switchToSignup() {
    signupTab.className = 'tab-active flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300';
    loginTab.className = 'tab-inactive flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300';
    
    loginForm.className = 'form-container form-slide-out';
    signupForm.className = 'form-container form-slide-in absolute top-20 left-8 right-8';
    signupForm.style.display = 'block';
    
    // Hide success messages
    loginSuccess.style.display = 'none';
    signupSuccess.style.display = 'none';
    
    // Reset forms
    loginFormElement.reset();
    signupFormElement.reset();
    
    // Re-enable buttons
    resetButton(loginFormElement.querySelector('button[type="submit"]'), 'Sign In');
    resetButton(signupFormElement.querySelector('button[type="submit"]'), 'Create Account');
}

// Helper function to reset button state
function resetButton(button, originalText) {
    button.textContent = originalText;
    button.disabled = false;
}

// Event listeners for tabs
loginTab.addEventListener('click', switchToLogin);
signupTab.addEventListener('click', switchToSignup);

// Password toggle functionality
function togglePassword(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
            </svg>
        `;
    } else {
        input.type = 'password';
        button.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
        `;
    }
}

// Password toggle event listeners
document.getElementById('toggleLoginPassword').addEventListener('click', () => {
    togglePassword('loginPassword', 'toggleLoginPassword');
});

document.getElementById('toggleSignupPassword').addEventListener('click', () => {
    togglePassword('signupPassword', 'toggleSignupPassword');
});

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(message) {
    alert(message);
}

function showSuccess(formElement, successElement, message) {
    formElement.style.display = 'none';
    successElement.style.display = 'block';
    console.log(message);
}

// Login form submission
loginFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('rememberMe');
    
    // Validation
    if (!email || !password) {
        showError('Please fill in all required fields.');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    // UI feedback
    const button = this.querySelector('button[type="submit"]');
    button.textContent = 'Signing In...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showSuccess(this, loginSuccess, {
            action: 'Login',
            data: {
                email,
                rememberMe: !!rememberMe,
                timestamp: new Date().toISOString()
            }
        });
    }, 2000);
});

// Sign up form submission
signupFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !terms) {
        showError('Please fill in all required fields and accept the terms of service.');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    if (!validatePassword(password)) {
        showError('Password must be at least 6 characters long.');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match.');
        return;
    }
    
    // UI feedback
    const button = this.querySelector('button[type="submit"]');
    button.textContent = 'Creating Account...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showSuccess(this, signupSuccess, {
            action: 'Registration',
            data: {
                firstName,
                lastName,
                email,
                timestamp: new Date().toISOString()
            }
        });
    }, 2000);
});

// Input animation effects
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        return;
    }
    
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT') {
            const form = activeElement.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginEmail').focus();
    
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

