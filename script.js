const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("messageText");
const closeMessage = document.getElementById("closeMessage");
const particleContainer = document.getElementById("particleContainer");
const flowers = document.querySelectorAll(".flower");
const interactiveElements = document.querySelectorAll(
".petal, .flower-center"
);

let messageTimeout = null;

function showMessage(element) {
const message = element.dataset.message;

if (!message) {
    return;
}

messageText.textContent = message;
messageBox.classList.add("active");

const flower = element.closest(".flower");

if (flower) {
    flower.classList.remove("is-active");

    requestAnimationFrame(() => {
        flower.classList.add("is-active");
    });
}

createParticles(element);

if (messageTimeout) {
    clearTimeout(messageTimeout);
}

messageTimeout = setTimeout(() => {
    messageBox.classList.remove("active");
}, 7000);

}

function createParticles(element) {
const rect = element.getBoundingClientRect();

const originX = rect.left + rect.width / 2;
const originY = rect.top + rect.height / 2;

for (let i = 0; i < 14; i++) {
    const particle = document.createElement("span");

    particle.className = "petal-particle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 110;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.setProperty("--x", x);
    particle.style.setProperty("--y", y);
    particle.style.setProperty(
        "--rotation",
        `${Math.random() * 720 - 360}deg`
    );

    particle.style.animationDelay = `${Math.random() * 0.12}s`;
    particle.style.transform = `scale(${0.5 + Math.random() * 0.8})`;

    particleContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1500);
}

}

interactiveElements.forEach((element) => {
element.addEventListener("click", (event) => {
event.stopPropagation();
showMessage(element);
});

element.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showMessage(element);
    }
});

});

closeMessage.addEventListener("click", () => {
messageBox.classList.remove("active");

if (messageTimeout) {
    clearTimeout(messageTimeout);
    messageTimeout = null;
}

});

document.addEventListener("click", (event) => {
if (
messageBox.classList.contains("active") &&
!messageBox.contains(event.target) &&
!event.target.closest(".petal") &&
!event.target.closest(".flower-center")
) {
messageBox.classList.remove("active");
}
});

document.addEventListener("keydown", (event) => {
if (event.key === "Escape") {
messageBox.classList.remove("active");

    if (messageTimeout) {
        clearTimeout(messageTimeout);
        messageTimeout = null;
    }
}

});

flowers.forEach((flower) => {
flower.addEventListener("mouseenter", () => {
flower.style.zIndex = "10";
});

flower.addEventListener("mouseleave", () => {
    flower.style.zIndex = "2";
});

});

function createBackgroundStars() {
const galaxy = document.getElementById("galaxy");

if (!galaxy) {
    return;
}

const dynamicStars = document.createElement("div");

dynamicStars.className = "dynamic-stars";

const fragment = document.createDocumentFragment();

for (let i = 0; i < 45; i++) {
    const star = document.createElement("span");

    star.className = "dynamic-star";

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${2 + Math.random() * 5}s`;

    const size = 1 + Math.random() * 2.5;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    fragment.appendChild(star);
}

dynamicStars.appendChild(fragment);
galaxy.appendChild(dynamicStars);

}

function createDynamicStarStyles() {
const style = document.createElement("style");

style.textContent = `
    .dynamic-stars {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    .dynamic-star {
        position: absolute;
        display: block;
        border-radius: 50%;
        background: #fff;
        box-shadow:
            0 0 5px rgba(255, 255, 255, 0.8),
            0 0 12px rgba(190, 210, 255, 0.6);
        animation: dynamicStarTwinkle ease-in-out infinite;
    }

    @keyframes dynamicStarTwinkle {
        0%, 100% {
            opacity: 0.15;
            transform: scale(0.7);
        }

        50% {
            opacity: 1;
            transform: scale(1.35);
        }
    }
`;

document.head.appendChild(style);

}

function initialize() {
createDynamicStarStyles();
createBackgroundStars();

setTimeout(() => {
    document.body.classList.add("page-loaded");
}, 100);

}

initialize();