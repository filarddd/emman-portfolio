// Contact form: send without leaving the page
const form = document.querySelector(".contact-form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = form.querySelector("button");
    button.disabled = true;
    statusText.textContent = "Sending...";

    try {
    const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
    });

    if (response.ok) {
        statusText.textContent = "Thank you! Your message was sent.";
        form.reset();
    } else {
        statusText.textContent = "Something went wrong. Please email me directly.";
    }
    } catch (error) {
    statusText.textContent = "Network error. Please try again or email me directly.";
    }

    button.disabled = false;
});

// Highlight the nav link for the section on screen
const navLinks = document.querySelectorAll(".navbar nav a");
const sections = document.querySelectorAll("main section");

const observer = new IntersectionObserver(
    (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
        }
    });
    },
    { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function updateToggleLabel() {
    const isDark = root.getAttribute("data-theme") === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    updateToggleLabel();
});

updateToggleLabel();