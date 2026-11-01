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


// DARK MODE (button inside the side menu)
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