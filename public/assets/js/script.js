// Theme Management with Persistence
let isDarkMode = localStorage.getItem('theme') === 'light' ? false : true;

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
    }
    applyTheme();
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    applyTheme();
    
    // Add smooth transition
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
}

function applyTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (isDarkMode) {
        body.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
        if (themeText) {
            themeText.textContent = 'Light Mode';
        }
    } else {
        body.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
        if (themeText) {
            themeText.textContent = 'Dark Mode';
        }
    }
}

// Enhanced File Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.querySelector('.upload-area');
    
    if (fileInput && uploadArea) {
        // Handle drag and drop with enhanced animations
        uploadArea.addEventListener('dragenter', handleDragEnter);
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        
        // Handle file selection
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    // Initialize theme and set active nav
    initializeTheme();
    setActiveNavLink();
    addEnhancedAnimations();
});

function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.style.borderColor = 'var(--primary-color)';
    uploadArea.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
    uploadArea.style.transform = 'scale(1.02)';
    uploadArea.classList.add('drag-active');
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if we're actually leaving the upload area
    const uploadArea = document.querySelector('.upload-area');
    const rect = uploadArea.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        resetUploadAreaStyle();
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    resetUploadAreaStyle();
    
    if (files.length > 0) {
        handleFiles(files);
    }
}

function resetUploadAreaStyle() {
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.style.borderColor = 'var(--border-color)';
    uploadArea.style.backgroundColor = '';
    uploadArea.style.transform = 'scale(1)';
    uploadArea.classList.remove('drag-active');
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        handleFiles(files);
    }
}

function handleFiles(files) {
    const file = files[0];
    console.log('File selected:', file.name);
    
    // Show loading state
    showLoadingState();
    
    setTimeout(() => {
        // Show success message with animation
        showNotification(`File uploaded successfully: ${file.name}`, 'success');
        
        // Update upload area with success state
        updateUploadAreaSuccess(file.name);
        hideLoadingState();
    }, 1000);
}

function showLoadingState() {
    const uploadArea = document.querySelector('.upload-area');
    const content = uploadArea.querySelector('.text-center') || uploadArea;
    content.classList.add('loading');
}

function hideLoadingState() {
    const uploadArea = document.querySelector('.upload-area');
    const content = uploadArea.querySelector('.text-center') || uploadArea;
    content.classList.remove('loading');
}

function updateUploadAreaSuccess(fileName) {
    const uploadArea = document.querySelector('.upload-area');
    const textElement = uploadArea.querySelector('h5');
    const icon = uploadArea.querySelector('i');
    
    if (textElement && icon) {
        textElement.textContent = `Selected: ${fileName}`;
        textElement.style.color = 'var(--success-color)';
        icon.className = 'fas fa-check-circle fa-3x';
        icon.style.color = 'var(--success-color)';
        
        // Add success animation
        uploadArea.style.borderColor = 'var(--success-color)';
        uploadArea.style.animation = 'pulse 2s infinite';
    }
}

// Run Test Function
function runTest() {
    const fileInput = document.getElementById('fileInput');
    
    if (!fileInput || !fileInput.files.length) {
        showNotification('Please select a file first!', 'warning');
        return;
    }
    
    // Simulate test running
    showNotification('Running accident detection test...', 'info');
    
    // Simulate processing time
    setTimeout(() => {
        showNotification('Test completed successfully! No accidents detected.', 'success');
    }, 2000);
}

// Contact Form Submission
function submitForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields!', 'warning');
        return;
    }
    
    // Simulate form submission
    showNotification('Sending message...', 'info');
    
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
    }, 1500);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${getBootstrapClass(type)} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function getBootstrapClass(type) {
    switch (type) {
        case 'success': return 'success';
        case 'warning': return 'warning';
        case 'error': return 'danger';
        case 'info': return 'info';
        default: return 'primary';
    }
}

// Set Active Navigation Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Enhanced Animations and Interactions
function addEnhancedAnimations() {
    // Add stagger animations to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Add enhanced hover effects
    addEnhancedHoverEffects();
    
    // Add intersection observer for scroll animations
    addScrollAnimations();
}

function addEnhancedHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
    });
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        btn.addEventListener('click', function() {
            this.style.transform = 'translateY(1px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
        });
    });
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and important elements
    const elements = document.querySelectorAll('.card, .feature-card, .team-card, .stat-card');
    elements.forEach(el => observer.observe(el));
}