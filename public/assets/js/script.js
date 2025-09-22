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
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        if (themeText) themeText.textContent = 'Light Mode';
    } else {
        body.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        if (themeText) themeText.textContent = 'Dark Mode';
    }
}

// Mobile Menu Management
function initializeMobileMenu() {
    // Create mobile header if it doesn't exist
    if (!document.querySelector('.mobile-header')) {
        createMobileHeader();
    }
    
    // Create mobile overlay if it doesn't exist
    if (!document.querySelector('.mobile-overlay')) {
        createMobileOverlay();
    }
    
    // Add event listeners
    setupMobileMenuEvents();
}

function createMobileHeader() {
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-header';
    mobileHeader.innerHTML = `
        <button class="hamburger-menu" onclick="toggleMobileMenu()">
            <i class="fas fa-bars"></i>
        </button>
        <div class="mobile-logo">
            <img src="assets/drone-logo.jpg" alt="Logo">
            <h6>SMART ACCIDENT<br>DETECTOR</h6>
        </div>
        <div></div>
    `;
    
    document.body.prepend(mobileHeader);
}

function createMobileOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.onclick = closeMobileMenu;
    document.body.appendChild(overlay);
}

function setupMobileMenuEvents() {
    // Close menu when clicking nav links on mobile
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    const hamburgerIcon = document.querySelector('.hamburger-menu i');
    
    if (sidebar && overlay) {
        const isActive = sidebar.classList.contains('mobile-active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
}

function openMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    const hamburgerIcon = document.querySelector('.hamburger-menu i');
    
    if (sidebar && overlay) {
        sidebar.classList.add('mobile-active');
        overlay.classList.add('active');
        if (hamburgerIcon) {
            hamburgerIcon.className = 'fas fa-times';
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    const hamburgerIcon = document.querySelector('.hamburger-menu i');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('mobile-active');
        overlay.classList.remove('active');
        if (hamburgerIcon) {
            hamburgerIcon.className = 'fas fa-bars';
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Enhanced File Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.querySelector('.upload-area');
    
    if (fileInput && uploadArea) {
        uploadArea.addEventListener('dragenter', handleDragEnter);
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    initializeTheme();
    initializeMobileMenu();
    setActiveNavLink();
});

function handleDragEnter(e) { 
    e.preventDefault(); 
    e.stopPropagation(); 
    document.querySelector('.upload-area').classList.add('drag-active'); 
}

function handleDragOver(e) { 
    e.preventDefault(); 
    e.stopPropagation(); 
}

function handleDragLeave(e) { 
    e.preventDefault(); 
    e.stopPropagation(); 
    document.querySelector('.upload-area').classList.remove('drag-active'); 
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('.upload-area').classList.remove('drag-active');
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFiles(files);
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) handleFiles(files);
}

function handleFiles(files) {
    const file = files[0];
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.files = files; 
    }
    updateUploadAreaSuccess(file.name);
    showNotification(`File ready: ${file.name}`, 'success');
}

function updateUploadAreaSuccess(fileName) {
    const uploadArea = document.querySelector('.upload-area');
    const textElement = uploadArea.querySelector('h5');
    const icon = uploadArea.querySelector('i');
    
    if (textElement && icon) {
        textElement.textContent = `Selected: ${fileName}`;
        icon.className = 'fas fa-check-circle fa-3x text-success';
        uploadArea.style.borderColor = 'var(--success-color)';
    }
}

// Auto-scroll helper
function smoothScrollIntoView(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// RUN TEST (BACKEND INTEGRATION)
async function runTest() {
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.querySelector('.btn-primary.btn-lg');
    const predictionBox = document.getElementById('predictionBox');
    const resultImage = document.getElementById('resultImage');
    const resultVideo = document.getElementById('resultVideo');
    const resultsGrid = document.getElementById('resultsGrid');

    const file = fileInput ? fileInput.files[0] : null;
    if (!file) {
        showNotification('Please select a file first.', 'warning');
        return;
    }

    // Show loading state
    uploadBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';
    uploadBtn.disabled = true;

    predictionBox.style.display = 'block';
    resultImage.style.display = 'none';
    resultVideo.style.display = 'none';
    resultsGrid.innerHTML = '<div class="loading-text">Analyzing media... This may take a moment.</div>';

    const objectURL = URL.createObjectURL(file);
    if (file.type.startsWith('image')) {
        resultImage.src = objectURL;
        resultImage.style.display = 'block';
    } else if (file.type.startsWith('video')) {
        resultVideo.src = objectURL;
        resultVideo.style.display = 'block';
    }

    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('https://azhaanglitch-smart-accident-detector-backend-v2.hf.space/predict', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const result = await response.json();
        resultsGrid.innerHTML = '';

        let outcomes = {};
        if (result.error) {
            outcomes = { 'Status': 'Error', 'Message': result.error };
        } else {
            const finalModel = result.final_model || {};

            let accidentStatus = 'Undetermined';
            if (finalModel.prediction === 'accident') {
                accidentStatus = 'Accident Detected';
            } else if (finalModel.prediction === 'non_accident') {
                accidentStatus = 'No Accident';
            }

            const finalConfidence = (finalModel.confidence || 0).toFixed(2);

            outcomes = {
                'Accident Status': accidentStatus,
                'Confidence Score': `${finalConfidence}%`,
            };
        }

        Object.entries(outcomes).forEach(([title, value]) => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <div class="result-title">${title}</div>
                <div class="result-value">${value}</div>
            `;
            resultsGrid.appendChild(card);
        });

    } catch (error) {
        console.error('Error calling backend API:', error);
        resultsGrid.innerHTML = `
          <div class="result-card" style="border-color: var(--danger-color); grid-column: 1 / -1;">
            <div class="result-title">Error</div>
            <div class="result-value" style="color: var(--danger-color); font-size: 1rem;">
              Failed to process media. Please try again.
            </div>
          </div>
        `;
    } finally {
        uploadBtn.innerHTML = '<i class="fas fa-play me-2"></i> Run Test';
        uploadBtn.disabled = false;
        setTimeout(() => smoothScrollIntoView(predictionBox), 200);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    const BStype = { success: 'success', warning: 'warning', error: 'danger', info: 'info' }[type] || 'primary';
    notification.className = `notification alert alert-${BStype} alert-dismissible fade show`;
    notification.style.cssText = `position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);`;
    notification.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    
    document.body.appendChild(notification);
    setTimeout(() => { if (notification.parentNode) { notification.remove(); } }, 5000);
}

// Set Active Navigation Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'base.html';
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// UPDATED Contact form submission (for contact.html)
async function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');

    // Show loading state
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Sending...`;
    submitButton.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            const responseData = await response.json();
            if (Object.hasOwn(responseData, 'errors')) {
                const errorMessage = responseData.errors.map(error => error.message).join(", ");
                showNotification(`Error: ${errorMessage}`, 'error');
            } else {
                showNotification('Oops! There was a problem submitting your form.', 'error');
            }
        }
    } catch (error) {
        showNotification('An error occurred. Please check your connection and try again.', 'error');
    } finally {
        // Restore button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
}