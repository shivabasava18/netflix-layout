// Authentication System for Netflix Clone
class AuthManager {
    constructor() {
        this.initializeStorage();
        this.initializeEventListeners();
    }

    // Initialize local storage
    initializeStorage() {
        if (!localStorage.getItem('netflix_users')) {
            localStorage.setItem('netflix_users', JSON.stringify([]));
        }
        if (!localStorage.getItem('netflix_currentUser')) {
            localStorage.setItem('netflix_currentUser', JSON.stringify(null));
        }
    }

    // Initialize event listeners
    initializeEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    // Handle login
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        this.showLoading('loginBtn', 'Signing In...');
        
        try {
            // Simulate API call delay
            await this.delay(1500);
            
            const users = JSON.parse(localStorage.getItem('netflix_users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Store current user
                localStorage.setItem('netflix_currentUser', JSON.stringify({
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    plan: user.plan || 'Basic'
                }));
                
                // Store remember me preference
                if (rememberMe) {
                    localStorage.setItem('netflix_rememberEmail', email);
                } else {
                    localStorage.removeItem('netflix_rememberEmail');
                }
                
                this.showSuccess('Login successful! Redirecting...');
                
                // Redirect to home page
                setTimeout(() => {
                    window.location.href = 'netflix.html';
                }, 1500);
                
            } else {
                this.showError('Incorrect email or password. Please try again.');
            }
            
        } catch (error) {
            this.showError('Login failed. Please try again.');
            console.error('Login error:', error);
        } finally {
            this.hideLoading('loginBtn', 'Sign In');
        }
    }

    // Handle registration
    async handleRegister(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        // Validation
        if (!firstName || !lastName || !email || !password) {
            this.showError('Please fill in all required fields.');
            return;
        }
        
        if (!agreeTerms) {
            this.showError('Please agree to the Terms & Conditions.');
            return;
        }
        
        if (password.length < 8) {
            this.showError('Password must be at least 8 characters long.');
            return;
        }
        
        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address.');
            return;
        }
        
        this.showLoading('registerBtn', 'Creating Account...');
        
        try {
            // Simulate API call delay
            await this.delay(2000);
            
            const users = JSON.parse(localStorage.getItem('netflix_users') || '[]');
            
            // Check if user already exists
            if (users.find(u => u.email === email)) {
                this.showError('An account with this email already exists.');
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now(),
                firstName,
                lastName,
                email,
                phone: phone || '',
                password,
                plan: 'Basic',
                createdAt: new Date().toISOString(),
                subscriptionStatus: 'Active'
            };
            
            users.push(newUser);
            localStorage.setItem('netflix_users', JSON.stringify(users));
            
            this.showSuccess('Account created successfully! Please sign in.');
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
        } catch (error) {
            this.showError('Registration failed. Please try again.');
            console.error('Registration error:', error);
        } finally {
            this.hideLoading('registerBtn', 'Sign Up');
        }
    }

    // Email validation
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show loading state
    showLoading(buttonId, text) {
        const button = document.getElementById(buttonId);
        const btnText = document.getElementById('btnText');
        if (button && btnText) {
            button.disabled = true;
            btnText.innerHTML = `<span class="loading"></span>${text}`;
        }
    }

    // Hide loading state
    hideLoading(buttonId, text) {
        const button = document.getElementById(buttonId);
        const btnText = document.getElementById('btnText');
        if (button && btnText) {
            button.disabled = false;
            btnText.textContent = text;
        }
    }

    // Show error message
    showError(message) {
        const errorElement = document.getElementById('errorMessage');
        const successElement = document.getElementById('successMessage');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        if (successElement) {
            successElement.style.display = 'none';
        }
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }, 5000);
    }

    // Show success message
    showSuccess(message) {
        const successElement = document.getElementById('successMessage');
        const errorElement = document.getElementById('errorMessage');
        
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
        }
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            if (successElement) {
                successElement.style.display = 'none';
            }
        }, 3000);
    }

    // Simulate delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Check if user is logged in
    static isLoggedIn() {
        const currentUser = JSON.parse(localStorage.getItem('netflix_currentUser') || 'null');
        return currentUser !== null;
    }

    // Get current user
    static getCurrentUser() {
        return JSON.parse(localStorage.getItem('netflix_currentUser') || 'null');
    }

    // Logout user
    static logout() {
        localStorage.setItem('netflix_currentUser', JSON.stringify(null));
        window.location.href = 'login.html';
    }

    // Get all users (for admin purposes)
    static getAllUsers() {
        return JSON.parse(localStorage.getItem('netflix_users') || '[]');
    }
}

// Initialize authentication
const authManager = new AuthManager();

// Check if user is already logged in and redirect if needed
document.addEventListener('DOMContentLoaded', () => {
    if (AuthManager.isLoggedIn() && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
        window.location.href = 'netflix.html';
    }
});
