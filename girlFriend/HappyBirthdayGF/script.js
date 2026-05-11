const cursor = document.querySelector('.cursor');
const greetingElement = document.querySelector('.greeting');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const secondsElement = document.getElementById('seconds');
const ctaButton = document.querySelector('.cta-button');

document.addEventListener('mousemove', (event) => {
    if (!cursor) return;
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
});

const greetingText = "Prisha ❤️, this little world is counting down to your special day. May 15 is yours, and every second is a tiny celebration for you.";
let charIndex = 0;

function typeGreeting() {
    if (!greetingElement || charIndex >= greetingText.length) return;

    greetingElement.textContent += greetingText.charAt(charIndex);
    charIndex += 1;
    setTimeout(typeGreeting, 48);
}

function getNextBirthday() {
    const now = new Date();
    let birthday = new Date(now.getFullYear(), 4, 15, 0, 0, 0);

    if (now > birthday) {
        birthday = new Date(now.getFullYear() + 1, 4, 15, 0, 0, 0);
    }

    return birthday;
}

function pad(value) {
    return String(value).padStart(2, '0');
}

function updateCountdown() {
    const birthday = getNextBirthday();
    const now = new Date();
    const diff = Math.max(0, birthday - now);

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const seconds = totalSeconds % 3600;

    daysElement.textContent = pad(days);
    hoursElement.textContent = pad(hours);
    secondsElement.textContent = pad(seconds);
}

const floatingElements = ['💖', '✨', '🌸', '💕', '🎂', '💫'];

function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = `${Math.random() * 100}vw`;
    element.style.top = `${Math.random() * 100}vh`;
    element.style.fontSize = `${Math.random() * 18 + 18}px`;
    document.body.appendChild(element);

    gsap.to(element, {
        y: -440,
        x: Math.random() * 120 - 60,
        rotation: Math.random() * 360,
        duration: Math.random() * 4 + 5,
        opacity: 1,
        ease: 'none',
        onComplete: () => element.remove()
    });
}

window.addEventListener('load', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);

    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 12,
        ease: 'back.out'
    });

    gsap.to('.cta-button', {
        opacity: 1,
        duration: 0.9,
        delay: 0.35,
        y: -8,
        ease: 'back.out'
    });

    gsap.from('.photo-card', {
        opacity: 0,
        y: 42,
        rotation: 0,
        stagger: 0.14,
        duration: 0.9,
        ease: 'power2.out'
    });

    typeGreeting();
    setInterval(createFloating, 950);
});

ctaButton.addEventListener('mouseenter', () => {
    gsap.to(ctaButton, {
        scale: 1.04,
        duration: 0.25
    });
});

ctaButton.addEventListener('mouseleave', () => {
    gsap.to(ctaButton, {
        scale: 1,
        duration: 0.25
    });
});

ctaButton.addEventListener('click', () => {
    gsap.to('body', {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            window.location.href = 'cause.html';
        }
    });
});
