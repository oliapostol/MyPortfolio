// ==============================
// SIDE MENU
// ==============================
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

function openMenu() {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
}

function closeMenu() {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
}

menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


// ==============================
// ADD "CV" LINK TO THE MENU (every page)
// ==============================
if (!sideMenu.querySelector('a[href="cv.html"]')) {
    const cvLink = document.createElement("a");
    cvLink.href = "cv.html";
    cvLink.className = "nav-link";
    cvLink.textContent = "CV";

    const contactLink = sideMenu.querySelector('a[href="contact.html"]');
    if (contactLink) {
        sideMenu.insertBefore(cvLink, contactLink);
    } else {
        sideMenu.appendChild(cvLink);
    }
}


// ==============================
// HIGHLIGHT THE MENU LINK OF THE CURRENT PAGE
// ==============================
let currentPage = location.pathname.split("/").pop();
if (currentPage === "") currentPage = "index.html";
if (!currentPage.includes(".")) currentPage += ".html";

document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentPage);
});


// ==============================
// DARK MODE
// ==============================
const root = document.documentElement;

const themeBtn = document.createElement("button");
themeBtn.className = "theme-btn";
themeBtn.type = "button";
sideMenu.appendChild(themeBtn);

function setTheme(isDark) {
    root.classList.toggle("dark", isDark);
    themeBtn.textContent = isDark ? "☀ Light mode" : "☾ Dark mode";
    try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {}
}

let savedTheme = null;
try {
    savedTheme = localStorage.getItem("theme");
} catch (e) {}

setTheme(
    savedTheme
        ? savedTheme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches
);

themeBtn.addEventListener("click", () => {
    setTheme(!root.classList.contains("dark"));
});


// ==============================
// PROJECT IMAGE SLIDER (swipe / arrows / dots)
// ==============================
document.querySelectorAll("[data-slider]").forEach((slider) => {
    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slide");
    const count = slider.querySelector(".slider-count");
    const dotsBox = slider.querySelector(".slider-dots");
    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");
    const dots = [];

    function current() {
        return Math.round(track.scrollLeft / track.clientWidth);
    }

    function goTo(i) {
        const target = Math.max(0, Math.min(slides.length - 1, i));
        track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
    }

    function update() {
        const i = current();
        count.textContent = (i + 1) + " / " + slides.length;
        dots.forEach((d, n) => d.classList.toggle("active", n === i));
        prev.disabled = i === 0;
        next.disabled = i === slides.length - 1;
    }

    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Go to image " + (i + 1));
        dot.addEventListener("click", () => goTo(i));
        dotsBox.appendChild(dot);
        dots.push(dot);
    });

    prev.addEventListener("click", () => goTo(current() - 1));
    next.addEventListener("click", () => goTo(current() + 1));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
});