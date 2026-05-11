const reasons = [
    {
        text: "Prisha, your smile can make an ordinary day feel special.",
        emoji: "💖",
        gif: "gif1.gif"
    },
    {
        text: "You are soft-hearted, beautiful, and full of the kind of warmth I always want close.",
        emoji: "🌸",
        gif: "gif2.gif"
    },
    {
        text: "I love the way you make tiny moments feel like memories worth keeping.",
        emoji: "✨",
        gif: "gif1.gif"
    },
    {
        text: "On 15 May, I want you to feel loved, celebrated, and reminded that you are my favorite person.",
        emoji: "🎂",
        gif: "gif2.gif"
    }
];

let currentReasonIndex = 0;
let isTransitioning = false;

const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
const cursor = document.querySelector('.custom-cursor');

function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.textContent = `${reason.emoji} ${reason.text}`;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="">`;

    card.appendChild(text);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 42,
        duration: 0.48,
        ease: 'back.out'
    });

    return card;
}

function prepareStoryButton() {
    shuffleButton.textContent = 'See Our Memories';
    shuffleButton.classList.add('story-mode');
    reasonCounter.textContent = 'All reasons unlocked for Prisha';
}

function displayNewReason() {
    if (isTransitioning) return;

    if (currentReasonIndex >= reasons.length) {
        gsap.to('body', {
            opacity: 0,
            duration: 0.75,
            onComplete: () => {
                window.location.href = 'last.html';
            }
        });
        return;
    }

    isTransitioning = true;
    const card = createReasonCard(reasons[currentReasonIndex]);
    reasonsContainer.appendChild(card);

    currentReasonIndex += 1;
    reasonCounter.textContent = `${currentReasonIndex} / ${reasons.length}`;
    createFloatingElement();

    if (currentReasonIndex === reasons.length) {
        gsap.to(shuffleButton, {
            scale: 1.05,
            duration: 0.45,
            ease: 'elastic.out',
            onComplete: prepareStoryButton
        });

        gsap.to('.ending-photo', {
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)'
        });

        gsap.to('.ending-text', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.25
        });
    }

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.93,
        duration: 0.08,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🎂', '💕', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = `${Math.random() * window.innerWidth}px`;
    element.style.top = `${Math.random() * window.innerHeight}px`;
    element.style.fontSize = `${Math.random() * 20 + 12}px`;
    document.body.appendChild(element);

    gsap.to(element, {
        y: -480,
        duration: Math.random() * 6 + 7,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

document.addEventListener('mousemove', (event) => {
    if (!cursor) return;
    gsap.to(cursor, {
        x: event.clientX - 15,
        y: event.clientY - 15,
        duration: 0.2
    });
});

gsap.from('.portrait-strip img', {
    opacity: 0,
    y: 28,
    stagger: 0.12,
    duration: 0.7,
    ease: 'power2.out'
});

setInterval(createFloatingElement, 2200);
