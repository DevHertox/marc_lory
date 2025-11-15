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

const correctCode = 'CV25';

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


function setTheme(theme) {
    if (theme === "light") {
        document.body.classList.add("light");
    } else {
        document.body.classList.remove("light");
    }
}

const styleSwitcher = document.querySelector(".style-switcher");
const toggler = document.querySelector(".style-switcher-toggler");

toggler.addEventListener("click", () => {
    styleSwitcher.classList.toggle("open");
});


// ==========================
// Gallery
// ==========================

const track = document.querySelector("#mobile-gallery .gallery-track");
let imgs = track.querySelectorAll("img");

const first = imgs[0].cloneNode(true);
const last = imgs[imgs.length - 1].cloneNode(true);

track.appendChild(first);      
track.insertBefore(last, imgs[0]); 

track.scrollLeft = imgs[0].offsetWidth + 12; 

track.addEventListener("scroll", () => {
  const itemWidth = imgs[0].offsetWidth + 12;
  const maxScroll = (imgs.length) * itemWidth;

  if (track.scrollLeft <= 0) {
    track.scrollLeft = (imgs.length - 1) * itemWidth;
  } 
  else if (track.scrollLeft >= maxScroll) {
    track.scrollLeft = itemWidth;
  }
});
