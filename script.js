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

