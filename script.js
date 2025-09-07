window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("main-content");
    loader.style.opacity = 1;
    let fade = setInterval(() => {
        if (loader.style.opacity > 0) {
            loader.style.opacity -= 0.1;
        } else {
            clearInterval(fade);
            loader.style.display = "none";
            mainContent.classList.remove("hidden");
        }
    }, 60);
});

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

const carouselDesktop = document.querySelector('.carousel-desktop .carousel');
const prevButtonDesktop = document.querySelector('.carousel-desktop .prev-button');
const nextButtonDesktop = document.querySelector('.carousel-desktop .next-button');
const carouselItemsDesktop = document.querySelectorAll('.carousel-desktop .carousel-item');
const numItemsDesktop = carouselItemsDesktop.length;
const angle = 360 / numItemsDesktop;
let currentAngle = 0;

const carouselMobile = document.querySelector('.carousel-mobile .carousel');
const prevButtonMobile = document.querySelector('.carousel-mobile .prev-button');
const nextButtonMobile = document.querySelector('.carousel-mobile .next-button');
const carouselItemsMobile = document.querySelectorAll('.carousel-mobile .carousel-item');
const numItemsMobile = carouselItemsMobile.length;
let currentIndexMobile = 0;

if (prevButtonDesktop && nextButtonDesktop) {
    prevButtonDesktop.addEventListener('click', () => {
        currentAngle += angle;
        carouselDesktop.style.transform = `rotateY(${currentAngle}deg)`;
    });

    nextButtonDesktop.addEventListener('click', () => {
        currentAngle -= angle;
        carouselDesktop.style.transform = `rotateY(${currentAngle}deg)`;
    });
}

if (prevButtonMobile && nextButtonMobile) {
    prevButtonMobile.addEventListener('click', () => {
        currentIndexMobile = (currentIndexMobile > 0) ? currentIndexMobile - 1 : numItemsMobile - 1;
        carouselMobile.style.transform = `translateX(-${currentIndexMobile * 100}%)`;
    });

    nextButtonMobile.addEventListener('click', () => {
        currentIndexMobile = (currentIndexMobile < numItemsMobile - 1) ? currentIndexMobile + 1 : 0;
        carouselMobile.style.transform = `translateX(-${currentIndexMobile * 100}%)`;
    });
}

const navBar = document.querySelector(".navbar");
const heroSection = document.getElementById("hero-about");
const progressBar = document.getElementById("progressBar");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navBar.classList.remove("navbar-scrolled");
            } else {
                navBar.classList.add("navbar-scrolled");
            }
        });
    },
    {
        threshold: 0.5,
    }
);

if (heroSection) {
    observer.observe(heroSection);
}

window.onscroll = function() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + "%";
};

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
    document.documentElement.style.setProperty('--secondary-color', getComputedStyle(document.documentElement).getPropertyValue(`--${color}-color`));
    let newColor;
    switch(color) {
        case 'color-1': newColor = '#e8a93e'; break;
        case 'color-2': newColor = '#008000'; break;
        case 'color-3': newColor = '#c81b1b'; break;
        case 'color-4': newColor = '#ff6b00'; break;
        case 'color-5': newColor = '#0099ff'; break;
        default: newColor = 'initial';
    }
    document.documentElement.style.setProperty('--secondary-color', newColor);
}

colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
        setActiveStyle(box.dataset.color);
    });
});
