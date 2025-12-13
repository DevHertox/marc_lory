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
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerText = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'flex';
        codeInput.value = ''; 
    });
}

if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });
}

if (submitBtn) {
    submitBtn.addEventListener('click', () => {
        const enteredCode = codeInput.value.trim().toUpperCase();

        if (enteredCode === correctCode) {
            popupOverlay.style.display = 'none';
            // Simule le téléchargement du CV (remplacer par votre vrai fichier si besoin)
            const a = document.createElement('a');
            a.href = 'Lory-Marc-CV.pdf'; 
            a.download = 'Lory-Marc-CV.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            showToast('Code correct! Téléchargement en cours...', 'success');
        } else {
            showToast('Code incorrect. Veuillez réessayer.', 'error');
            codeInput.value = '';
            codeInput.focus();
        }
    });
}


// ==========================
// Progress Bar
// ==========================
const progressBar = document.querySelector('.progress-bar');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ==========================
// Hamburger Menu
// ==========================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

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
// Navbar Scroll & Hide
// ==========================
document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;
    const navbarHeight = navbar.offsetHeight; 

    window.addEventListener('scroll', () => {
        if (!navbar) return;

        // Effet de barre d'ombre
        if (window.scrollY > 50) { 
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Effet de masquage
        if (window.scrollY > 300) { 
            if (window.scrollY < lastScrollY) {
                // Scroll vers le haut
                navbar.classList.remove('navbar-hidden');
            } else {
                // Scroll vers le bas
                navbar.classList.add('navbar-hidden');
            }
        } else {
            // Toujours visible en haut de page
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-scrolled');
        }
        lastScrollY = window.scrollY;
    });
});

// =================================================
/* STYLE SWITCHER (Thème Clair / Sombre) - UNIFIÉ  */
// =================================================

const THEME_STORAGE_KEY = 'lorymarc_theme';
const styleSwitcher = document.querySelector(".style-switcher");
const toggler = document.querySelector(".style-switcher-toggler");
const themeButtons = document.querySelectorAll(".theme-btn");


// 1. Applique le thème au chargement (avec persistance)
function loadTheme() {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme = storedTheme || 'dark'; // Thème par défaut est 'dark'

    setTheme(initialTheme);
}

// 2. Fonction principale pour appliquer le thème
function setTheme(theme) {
    if (theme === "light") {
        document.body.classList.add("light");
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
    } else {
        document.body.classList.remove("light");
        localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    }
    
    // Met à jour les boutons pour montrer le mode actif
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.classList.contains(theme + '-mode')) {
            btn.classList.add('active');
        }
    });
}

// 3. Gestion de l'ouverture/fermeture du panneau
if (toggler) {
    toggler.addEventListener("click", () => {
        styleSwitcher.classList.toggle("open");
    });
}

// 4. Ajoute les écouteurs d'événements aux boutons Dark/Light (déjà gérés via onclick dans index.html, mais ceci est plus robuste)
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.classList.contains('light-mode') ? 'light' : 'dark';
        setTheme(theme);
    });
});

// Lance la fonction de chargement de thème au démarrage
document.addEventListener("DOMContentLoaded", loadTheme);


// ==========================
// Gallery
// ==========================
const track = document.querySelector("#mobile-gallery .gallery-track");
if (track) {
    let imgs = track.querySelectorAll("img");

    const first = imgs[0].cloneNode(true);
    const last = imgs[imgs.length - 1].cloneNode(true);

    // Ajout d'éléments clonés pour le défilement infini
    track.appendChild(first);      
    track.insertBefore(last, imgs[0]); 

    // Ajustement initial du scroll pour cacher la première copie
    track.scrollLeft = imgs[0].offsetWidth + 12; 

    // Logique pour le défilement infini
    track.addEventListener("scroll", () => {
      const itemWidth = imgs[0].offsetWidth + 12;
      const maxScroll = (imgs.length + 1) * itemWidth; 

      if (track.scrollLeft >= maxScroll - itemWidth) {
        // Retour au début (l'original de la première image)
        track.scrollLeft = itemWidth;
      } else if (track.scrollLeft <= 0) {
        // Retour à la fin (l'original de la dernière image)
        track.scrollLeft = maxScroll - (2 * itemWidth);
      }
    });
}

// ==========================
// Lightbox
// ==========================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('#mobile-gallery img, .carousel-item img'); 
let currentIndex = 0;
let imagesArray = Array.from(galleryImages);

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = imagesArray[currentIndex].src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function navigateLightbox(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = imagesArray.length - 1;
    } else if (currentIndex >= imagesArray.length) {
        currentIndex = 0;
    }
    lightboxImg.src = imagesArray[currentIndex].src;
}

galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
});

document.querySelector('.close').addEventListener('click', closeLightbox);
document.querySelector('.prev').addEventListener('click', () => navigateLightbox(-1));
document.querySelector('.next').addEventListener('click', () => navigateLightbox(1));
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});
