// Sloth Mode Toggle
const slothModeToggle = document.getElementById('slothModeToggle');
const body = document.body;

// Check if sloth mode was previously enabled
if (localStorage.getItem('slothMode') === 'enabled') {
    body.classList.add('sloth-mode');
}

slothModeToggle.addEventListener('click', () => {
    body.classList.toggle('sloth-mode');

    // Save preference
    if (body.classList.contains('sloth-mode')) {
        localStorage.setItem('slothMode', 'enabled');
    } else {
        localStorage.removeItem('slothMode');
    }
});

// Parallax effect on mouse move
const container = document.getElementById('container');
const heroSection = document.getElementById('heroSection');
const mascotCard = document.getElementById('mascotCard');
const mainContent = document.getElementById('mainContent');

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // Range: -1 to 1
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2; // Range: -1 to 1
});

// Smooth parallax animation
function updateParallax() {
    // Smooth interpolation for more fluid movement
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    // Apply different parallax speeds to different elements
    if (heroSection) {
        const heroMoveX = currentX * 10;
        const heroMoveY = currentY * 10;
        heroSection.style.transform = `translate(${heroMoveX}px, ${heroMoveY}px)`;
    }

    if (mascotCard) {
        const cardMoveX = currentX * 20;
        const cardMoveY = currentY * 20;
        mascotCard.style.transform = `translate(${cardMoveX}px, ${cardMoveY}px) translateY(0)`;
    }

    if (mainContent) {
        const mainMoveX = currentX * 5;
        const mainMoveY = currentY * 5;
        mainContent.style.transform = `translate(${mainMoveX}px, ${mainMoveY}px)`;
    }

    requestAnimationFrame(updateParallax);
}

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    updateParallax();
}

// Disable parallax on mobile devices for performance
if (window.innerWidth <= 768) {
    document.removeEventListener('mousemove', updateParallax);
}
