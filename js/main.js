// Debug to make sure JS is loading
console.log('main.js loaded');

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-in-out'
    });
} else {
    console.log('AOS not loaded');
}

// Global Variables
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const modal = document.getElementById('projectModal');
const projectCards = document.querySelectorAll('.project-card');
const modalClose = document.querySelector('.modal-close');
const galleryMain = document.querySelector('.gallery-main-img');
const galleryThumbs = document.querySelector('.gallery-thumbs');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('.newsletter-form');
const menuOverlay = document.querySelector('.menu-overlay');
const navItems = document.querySelectorAll('.nav-links li a');

let lastScroll = 0;

// Log elements to check if they're being selected properly
console.log('navToggle:', navToggle);
console.log('navLinks:', navLinks);
console.log('menuOverlay:', menuOverlay);

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scrolled')) {
        // Scrolling down
        navbar.classList.add('scrolled');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled')) {
        // Scrolling up
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Add event listener for when DOM is loaded to ensure all elements are available
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, setting up event listeners');
    
    // Re-select elements to ensure they exist in the DOM
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navItems = document.querySelectorAll('.nav-links li a');
    
    console.log('Re-selected elements:', {
        navToggle,
        navLinks,
        menuOverlay,
        navItemsCount: navItems.length
    });
    
    // Mobile Navigation Toggle
    if (navToggle) {
        console.log('Adding click event to navToggle');
        navToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default button behavior
            console.log('Toggle button clicked');
            toggleMenu(navToggle, navLinks, menuOverlay);
        });
    } else {
        console.log('navToggle element not found');
    }

    // Close menu when clicking outside
    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            closeMenu(navToggle, navLinks, menuOverlay);
        });
    }

    // Handle navigation link clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            
            // Handle internal links (with hash)
            if (href.includes('#') && !href.startsWith('http')) {
                e.preventDefault();
                
                // If it's a link to another page with a hash (e.g., "certifications.html#section")
                if (href.includes('.html')) {
                    window.location.href = href;
                    return;
                }
                
                // For same-page links
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    closeMenu(navToggle, navLinks, menuOverlay);
                    
                    // Wait for menu close animation
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Update active state
                        navItems.forEach(link => link.classList.remove('active'));
                        item.classList.add('active');
                    }, 300);
                }
            } else {
                // For external links or links to other pages, just close the menu
                closeMenu(navToggle, navLinks, menuOverlay);
            }
        });
    });
});

function toggleMenu(navToggle, navLinks, menuOverlay) {
    const isOpen = navLinks.classList.contains('active');
    
    if (isOpen) {
        closeMenu(navToggle, navLinks, menuOverlay);
    } else {
        openMenu(navToggle, navLinks, menuOverlay);
    }
}

function openMenu(navToggle, navLinks, menuOverlay) {
    navToggle.classList.add('active');
    navLinks.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
    
    // Force repaint to ensure animations work
    window.getComputedStyle(navLinks).opacity;
    
    // Force all links to be visible
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.style.opacity = '1';
    });
}

function closeMenu(navToggle, navLinks, menuOverlay) {
    console.log('Closing menu');
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// Update active link based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Don't update active state if mobile menu is open
    if (document.body.classList.contains('no-scroll')) {
        return;
    }
    
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(sectionId)) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Project Modal
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const projectData = getProjectData(projectId);
        
        if (projectData) {
            updateModalContent(projectData);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Project Data
function getProjectData(projectId) {
    const projects = {
        erp: {
            title: 'Enterprise Resource Planning',
            description: 'A comprehensive ERP system built with Oracle APEX and PL/SQL, featuring advanced reporting and analytics capabilities.',
            technologies: ['Oracle APEX', 'PL/SQL', 'JavaScript', 'CSS3'],
            features: [
                'Real-time inventory management',
                'Advanced reporting system',
                'User role management',
                'Automated workflows'
            ],
            images: [
                'assets/images/projects/erp-1.jpg',
                'assets/images/projects/erp-2.jpg',
                'assets/images/projects/erp-3.jpg'
            ],
            demoUrl: '#',
            githubUrl: '#'
        },
        crm: {
            title: 'Customer Management System',
            description: 'A CRM system with advanced analytics and reporting features, designed for enterprise-level customer management.',
            technologies: ['Oracle APEX', 'REST APIs', 'CSS3', 'JavaScript'],
            features: [
                'Customer profile management',
                'Sales pipeline tracking',
                'Analytics dashboard',
                'Automated notifications'
            ],
            images: [
                'assets/images/projects/crm-1.jpg',
                'assets/images/projects/crm-2.jpg',
                'assets/images/projects/crm-3.jpg'
            ],
            demoUrl: '#',
            githubUrl: '#'
        },
        dashboard: {
            title: 'Analytics Dashboard',
            description: 'Real-time analytics dashboard with interactive visualizations and custom reporting capabilities.',
            technologies: ['Oracle APEX', 'Charts', 'Data Visualization', 'JavaScript'],
            features: [
                'Interactive charts and graphs',
                'Custom report builder',
                'Real-time data updates',
                'Export functionality'
            ],
            images: [
                'assets/images/projects/dashboard-1.jpg',
                'assets/images/projects/dashboard-2.jpg',
                'assets/images/projects/dashboard-3.jpg'
            ],
            demoUrl: '#',
            githubUrl: '#'
        }
    };
    
    return projects[projectId];
}

// Update Modal Content
function updateModalContent(projectData) {
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.project-description');
    const modalTechnologies = modal.querySelector('.project-technologies');
    const modalFeatures = modal.querySelector('.features-list');
    const modalLinks = modal.querySelector('.project-links');
    
    modalTitle.textContent = projectData.title;
    modalDescription.textContent = projectData.description;
    
    // Update technologies
    modalTechnologies.innerHTML = projectData.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    
    // Update features
    modalFeatures.innerHTML = projectData.features
        .map(feature => `<li>${feature}</li>`)
        .join('');
    
    // Update gallery
    galleryMain.src = projectData.images[0];
    galleryMain.alt = projectData.title;
    
    galleryThumbs.innerHTML = projectData.images
        .map((img, index) => `
            <div class="gallery-thumb ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${img}" alt="${projectData.title} - Image ${index + 1}">
            </div>
        `)
        .join('');
    
    // Update links
    modalLinks.querySelector('a[target="_blank"]:first-child').href = projectData.demoUrl;
    modalLinks.querySelector('a[target="_blank"]:last-child').href = projectData.githubUrl;
}

// Gallery Navigation
galleryThumbs.addEventListener('click', (e) => {
    const thumb = e.target.closest('.gallery-thumb');
    if (thumb) {
        const index = parseInt(thumb.dataset.index);
        const projectId = document.querySelector('.project-card.active').dataset.project;
        const projectData = getProjectData(projectId);
        
        galleryMain.src = projectData.images[index];
        galleryMain.alt = `${projectData.title} - Image ${index + 1}`;
        
        // Update active thumb
        document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    }
});

// Form Validation with enhanced feedback for mailto
contactForm.addEventListener('submit', (e) => {
    // Don't prevent default since we want the mailto action to happen
    
    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Basic form validation
    if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
        e.preventDefault(); // Prevent form submission only if validation fails
        const errorMessage = document.querySelector('.form-message.error');
        errorMessage.textContent = 'Please fill in all fields';
        errorMessage.style.display = 'block';
        return;
    }
    
    if (!isValidEmail(emailInput.value)) {
        e.preventDefault(); // Prevent form submission only if validation fails
        const errorMessage = document.querySelector('.form-message.error');
        errorMessage.textContent = 'Please enter a valid email address';
        errorMessage.style.display = 'block';
        return;
    }
    
    // If validation passes, let the mailto action proceed
});

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Newsletter Form
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Here you would typically send the email to your newsletter service
    showNotification('Thank you for subscribing!', 'success');
    newsletterForm.reset();
});

// Skill progress bars animation
const skillBars = document.querySelectorAll('.progress-bar');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (barPosition < screenPosition) {
            bar.style.width = bar.getAttribute('data-width') || '0%';
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
animateSkillBars(); // Initial check

// Project cards hover effect
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.project-overlay').style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.project-overlay').style.opacity = '0';
    });
});

// Typing animation for hero section
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
const animateTimeline = () => {
    timelineItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (itemPosition < screenPosition) {
            item.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateTimeline);
animateTimeline(); // Initial check

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Language Detection and Switching
const languages = {
    en: {
        home: 'Home',
        about: 'About',
        experience: 'Experience',
        skills: 'Skills',
        projects: 'Projects',
        certifications: 'Certifications',
        contact: 'Contact',
        // Add more translations as needed
    },
    fr: {
        home: 'Accueil',
        about: 'À propos',
        experience: 'Expérience',
        skills: 'Compétences',
        projects: 'Projets',
        certifications: 'Certifications',
        contact: 'Contact',
        // Add more translations as needed
    },
    es: {
        home: 'Inicio',
        about: 'Sobre mí',
        experience: 'Experiencia',
        skills: 'Habilidades',
        projects: 'Proyectos',
        certifications: 'Certificaciones',
        contact: 'Contacto',
        // Add more translations as needed
    }
};

// Detect user's language based on IP
async function detectUserLanguage() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code;
        
        // Map countries to languages
        const languageMap = {
            'MA': 'fr', // Morocco
            'FR': 'fr', // France
            'BE': 'fr', // Belgium
            'CA': 'fr', // Canada
            'ES': 'es', // Spain
            'MX': 'es', // Mexico
            'AR': 'es', // Argentina
            'US': 'en', // United States
            'GB': 'en', // United Kingdom
            'AU': 'en'  // Australia
        };

        return languageMap[country] || 'en';
    } catch (error) {
        console.error('Error detecting language:', error);
        return 'en';
    }
}

// Update UI with selected language
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (languages[lang] && languages[lang][key]) {
            element.textContent = languages[lang][key];
        }
    });
}

// Language switcher - REMOVED: No longer adding language buttons to the navbar
document.addEventListener('DOMContentLoaded', async () => {
    const userLang = await detectUserLanguage();
    updateLanguage(userLang);
});

// Active link highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // Navbar background change on scroll
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Highlight active nav item
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*="#${sectionId}"]`).classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*="#${sectionId}"]`).classList.remove('active');
        }
    });
}); 