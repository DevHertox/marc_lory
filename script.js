// ==========================
// Loader
// ==========================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("main-content");

    loader.style.opacity = "1";
    let fade = setInterval(() => {
        let currentOpacity = parseFloat(loader.style.opacity);
        if (currentOpacity > 0) {
            loader.style.opacity = (currentOpacity - 0.1).toString();
        } else {
            clearInterval(fade);
            loader.style.display = "none";
            mainContent.classList.remove("hidden");
        }
    }, 60);
});

// ==========================
// CV Download with Code
// ==========================
const cvDownloadBtn = document.getElementById('cv-download-btn');
const popupOverlay = document.getElementById('popup-overlay');
const cancelBtn = document.getElementById('cancel-btn');
const submitBtn = document.getElementById('submit-code');
const codeInput = document.getElementById('code-input');
const toastContainer = document.getElementById('toast-container');

const correctCode = 'CV29';

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerText = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

cvDownloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popupOverlay.style.display = 'flex';
    codeInput.value = '';
    codeInput.focus();
});

cancelBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
});

submitBtn.addEventListener('click', handleCodeSubmit);

codeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleCodeSubmit();
    }
});

function handleCodeSubmit() {
    const userCode = codeInput.value.trim();
    if (userCode === correctCode) {
        popupOverlay.style.display = 'none';
        showToast('✅ Téléchargement en cours...', 'success');

        const fileUrl = cvDownloadBtn.getAttribute('href');
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', 'CV-Marc-Lory.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        showToast('❌ Code incorrect. Réessayez.', 'error');
        codeInput.focus();
    }
}

// ==========================
// Hamburger Menu
// ==========================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// ==========================
// Carousel Gallery
// ==========================
const carousel = document.querySelector('.carousel-container .carousel');
const prevButton = document.querySelector('.carousel-container .prev-button');
const nextButton = document.querySelector('.carousel-container .next-button');
const carouselItems = document.querySelectorAll('.carousel-item');
const numItems = carouselItems.length;
const angle = 360 / numItems;
let currentAngle = 0;
let currentIndex = 0;
const indicator = document.getElementById('current-image-index');

function updateIndicator() {
    const normalizedAngle = (currentAngle % 360 + 360) % 360;
    currentIndex = Math.round(normalizedAngle / angle);
    if (currentIndex === numItems) {
        currentIndex = 0;
    }
    indicator.textContent = (numItems - currentIndex);
}

prevButton.addEventListener('click', () => {
    if (window.innerWidth > 768) {
        currentAngle += angle;
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
        updateIndicator();
    } else {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : numItems - 1;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicator.textContent = (currentIndex + 1);
    }
});

nextButton.addEventListener('click', () => {
    if (window.innerWidth > 768) {
        currentAngle -= angle;
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
        updateIndicator();
    } else {
        currentIndex = (currentIndex < numItems - 1) ? currentIndex + 1 : 0;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicator.textContent = (currentIndex + 1);
    }
});

// ==========================
// Navbar scroll effect
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            navbar.classList.add('navbar-hidden');
            navbar.classList.remove('navbar-scrolled');
        } else {
            if (window.scrollY > 50) { 
                navbar.classList.remove('navbar-hidden');
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
        lastScrollY = window.scrollY;
    });
});

// ==========================
// Style Switcher
// ==========================
const styleSwitcher = document.querySelector('.style-switcher');
const styleSwitcherToggler = document.querySelector('.style-switcher-toggler');

styleSwitcherToggler.addEventListener('click', () => {
    styleSwitcher.classList.toggle('active');
});

const themeButtons = document.querySelectorAll('.theme-btn');

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        themeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const theme = button.textContent.toLowerCase();
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    });
});

const colorBoxes = document.querySelectorAll('.color-box');

function setActiveStyle(color) {
    colorBoxes.forEach((box) => {
        box.classList.remove('active');
        if (box.classList.contains(color)) {
            box.classList.add('active');
        }
    });
    
    let newColor;
    switch(color) {
        case 'color-1': newColor = '#e8a93e'; break;
        case 'color-2': newColor = '#008000'; break;
        case 'color-3': newColor = '#c81b1b'; break;
        case 'color-4': newColor = '#ff6b00'; break;
        case 'color-5': newColor = '#0099ff'; break;
        default: newColor = '#e8a93e';
    }
    document.documentElement.style.setProperty('--secondary-color', newColor);
}

// ==========================
// Intersection Observer
// ==========================
const animatables = document.querySelectorAll(
  ".section-container, .hero-about-section, .experiences-grid .experience-card, .contact-content, .carousel-container"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 } 
);

animatables.forEach((el) => observer.observe(el));

const progressBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
  progressBars.forEach(bar => {
    const value = bar.getAttribute('data-progress');
    bar.style.width = value + '%';
  });
}

window.addEventListener('scroll', () => {
  const skillsSection = document.querySelector('.skills-section');
  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;
  if(sectionPos < screenPos) {
    animateSkills();
  }
});
