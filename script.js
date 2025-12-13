// ==========================
// Loader & Sécurités
// ==========================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("main-content");

    // VÉRIFICATION D'EXISTENCE
    if (loader && mainContent) {
        loader.style.opacity = "1";
        
        const removeLoader = () => {
            let fade = setInterval(() => {
                // S'assurer que l'opacité est définie avant de la lire
                if (!loader.style.opacity) loader.style.opacity = "1";
                let currentOpacity = parseFloat(loader.style.opacity);
                
                if (currentOpacity > 0) {
                    loader.style.opacity = (currentOpacity - 0.1).toString();
                } else {
                    clearInterval(fade);
                    loader.style.display = "none";
                    mainContent.classList.remove("hidden");
                }
            }, 60);
        };

        // Lancement immédiat
        removeLoader();
    }
});

// FILE T DE SÉCURITÉ : Disparition forcée du loader après 5 secondes
setTimeout(() => {
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("main-content");
    if (loader && mainContent && loader.style.display !== "none") {
        loader.style.display = "none";
        mainContent.classList.remove("hidden");
    }
}, 5000);


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
    if (!toastContainer) return; // VÉRIFICATION D'EXISTENCE
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerText = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// VÉRIFICATION D'EXISTENCE
if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (popupOverlay && codeInput) {
            popupOverlay.style.display = 'flex';
            codeInput.value = '';
            codeInput.focus();
        }
    });
}

// VÉRIFICATION D'EXISTENCE
if (cancelBtn && popupOverlay) {
    cancelBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });
}

// VÉRIFICATION D'EXISTENCE
if (submitBtn) {
    submitBtn.addEventListener('click', handleCodeSubmit);
}

// VÉRIFICATION D'EXISTENCE
if (codeInput) {
    codeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleCodeSubmit();
        }
    });
}

function handleCodeSubmit() {
    if (!codeInput || !cvDownloadBtn) return; // VÉRIFICATION D'EXISTENCE
    const userCode = codeInput.value.trim();
    if (userCode === correctCode) {
        if (popupOverlay) popupOverlay.style.display = 'none';
        showToast('✅ Téléchargement en cours...', 'success');

        const fileUrl = cvDownloadBtn.getAttribute('href');
        if (fileUrl) { // VÉRIFICATION D'EXISTENCE
            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', 'CV-Marc-Lory.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
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

// VÉRIFICATION D'EXISTENCE
if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}


// ==========================
// Carousel Gallery
// ==========================
const carousel = document.querySelector('.carousel-container .carousel');
const prevButton = document.querySelector('.carousel-container .prev-button');
const nextButton = document.querySelector('.carousel-container .next-button');
const carouselItems = document.querySelectorAll('.carousel-item');
const numItems = carouselItems.length;
let currentAngle = 0;
let currentIndex = 0;
const indicator = document.getElementById('current-image-index');

// VÉRIFICATION D'EXISTENCE
if (carousel && prevButton && nextButton && numItems > 0 && indicator) {
    const angle = 360 / numItems;

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
}


// ==========================
// Navbar scroll effect
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    // VÉRIFICATION D'EXISTENCE
    if (navbar) {
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
    }
});


// ==========================
// Gallery (Mobile Infinite Scroll)
// ==========================

const track = document.querySelector("#mobile-gallery .gallery-track");

// VÉRIFICATION D'EXISTENCE CRITIQUE
if (track) {
    let imgs = track.querySelectorAll("img");

    // VÉRIFICATION CRITIQUE : Y a-t-il des images ?
    if (imgs.length > 0) {
        const first = imgs[0].cloneNode(true);
        const last = imgs[imgs.length - 1].cloneNode(true);

        track.appendChild(first);      
        track.insertBefore(last, imgs[0]); 

        // S'assurer que imgs[0] est accessible avant de l'utiliser
        if (imgs[0]) {
            track.scrollLeft = imgs[0].offsetWidth + 12; 
        }

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
    }
}


/* ================================================= */
/* GESTION DU MODE SCÈNE (Clair / Sombre)            */
/* ================================================= */

(function () {
    const toggleButton = document.getElementById('modeSceneToggle');
    const THEME_STORAGE_KEY = 'lorymarc_scenic_mode';
    const LIGHT_MODE_CLASS = 'mode-scene-lumiere';

    function applyTheme(mode) {
        if (mode === 'light') {
            document.body.classList.add(LIGHT_MODE_CLASS);
        } else {
            document.body.classList.remove(LIGHT_MODE_CLASS);
        }
    }

    function getInitialTheme() {
        const storedMode = localStorage.getItem(THEME_STORAGE_KEY);

        // Si l'utilisateur a un choix enregistré, on l'applique
        if (storedMode === 'light') {
            return 'light';
        }
        // Sinon, on applique le thème par défaut (sombre)
        return 'dark'; 
    }

    applyTheme(getInitialTheme());

    // VÉRIFICATION D'EXISTENCE
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isLightMode = document.body.classList.contains(LIGHT_MODE_CLASS);
            let newMode;

            if (isLightMode) {
                newMode = 'dark';
                document.body.classList.remove(LIGHT_MODE_CLASS);
            } else {
                newMode = 'light';
                document.body.classList.add(LIGHT_MODE_CLASS);
            }

            localStorage.setItem(THEME_STORAGE_KEY, newMode);
        });
    }

})();
