let currentStep = 1;
const totalPages = 5;

// Make sure this name is EXACTLY openLetter
function openLetter() {
    console.log("Envelope clicked!"); // This helps you debug in the console
    
    const music = document.getElementById('bgMusic');
    if (music) {
        music.volume = 0.2;
        music.play().catch(e => console.log("Audio play deferred"));
    }

    const envelope = document.getElementById('envelope');
    const notebook = document.getElementById('notebook');
    const nextBtn = document.getElementById('globalNextBtn');
    const signatureText = document.getElementById('signature-text');
    const muteBtn = document.getElementById('muteBtn');

    // Add opening class to trigger flap animation
    if (envelope) {
        envelope.classList.add('opening');
        
        // After flap opens, fade out envelope
        setTimeout(() => {
            envelope.classList.add('fade-out');
            if (signatureText) signatureText.classList.add('fade-out');
            
            setTimeout(() => {
                envelope.classList.add('hidden');
                if (signatureText) signatureText.classList.add('hidden');
                if (notebook) notebook.classList.remove('hidden');
                if (nextBtn) nextBtn.classList.remove('hidden'); // Show the button only now
                if (muteBtn) muteBtn.classList.remove('hidden'); // Show mute button
            }, 600);
        }, 800);
    }
}

function handleNext() {
    if (currentStep < totalPages) {
        const currentPage = document.getElementById('page' + currentStep);
        if (currentPage) {
            currentPage.classList.add('exit');
            currentPage.classList.remove('active');
        }

        currentStep++;

        const nextPage = document.getElementById('page' + currentStep);
        if (nextPage) {
            nextPage.classList.add('active');
        }
    }

    // Hide Next button on the final question page
    if (currentStep === totalPages) {
        const btn = document.getElementById('globalNextBtn');
        if (btn) btn.classList.add('hidden');
    }
}

function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    noBtn.style.position = 'fixed';
    
    // Limits based on screen size (iPhone XR friendly)
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    
    const x = Math.max(10, Math.random() * maxX);
    const y = Math.max(10, Math.random() * maxY);
    
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
}

function celebrate() {
    document.getElementById('main-ui').classList.add('hidden');
    document.getElementById('success-message').classList.remove('hidden');
    document.querySelector('.question').innerText = "Yay! ❤️";
    
    createHearts();
}

function createHearts() {
    const container = document.getElementById('confetti-container');
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;
        heart.style.transition = `all ${Math.random() * 2 + 3}s linear`;
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.style.top = '-10vh';
            heart.style.left = (parseFloat(heart.style.left) + (Math.random() * 20 - 10)) + 'vw';
        }, 10);
        
        setTimeout(() => heart.remove(), 5000);
    }
}

function toggleMute() {
    const music = document.getElementById('bgMusic');
    const muteIcon = document.getElementById('muteIcon');
    
    if (music.muted) {
        music.muted = false;
        muteIcon.textContent = '🔊'; // Unmuted icon
    } else {
        music.muted = true;
        muteIcon.textContent = '🔇'; // Muted icon
    }
}