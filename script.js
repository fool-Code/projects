// /* DEFAULT THEME = DARK */
// const root = document.body;
// root.setAttribute("data-theme", "dark");

// const toggle = document.getElementById("themeToggle");
// toggle.textContent = "🌞";

// /* THEME TOGGLE */
// toggle.addEventListener("click", () => {
//   const dark = root.getAttribute("data-theme") === "dark";
//   root.setAttribute("data-theme", dark ? "light" : "dark");
//   toggle.textContent = dark ? "🌙" : "🌞";
// });

/* ACTIVE LINK HIGHLIGHT */
const current = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav a").forEach(a => {
  if (a.getAttribute("href") === current) {
    a.classList.add("active");
  }
});

// Auto-resize D3 graph
window.addEventListener("resize", () => {
    const svg = d3.select("#supernatural-graph svg");
    if (!svg.empty()) {
        svg.attr("width", "100%");
    }
});

// Load sidebar
document.addEventListener("DOMContentLoaded", () => {
  loadSidebar();
});

function loadSidebar() {
  const container = document.getElementById("sidebar-container");
  if (!container) return;

  fetch("/projects/sidebar.html")   
    .then(r => {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    })
    .then(html => {
      container.innerHTML = html;
      initThemeToggle(); 
    })
    .catch(err => {
      console.error("Sidebar failed to load:", err);
    });
}


// Toggle logic
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const root = document.documentElement;

  // Set initial icon
  const currentTheme = root.getAttribute("data-theme");
  setToggleLabel(btn, currentTheme);

  btn.addEventListener("click", () => {
    const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("site-theme", newTheme);

    // Animate + update icon
    setToggleLabel(btn, newTheme);
  });
}

function setToggleLabel(button, theme) {
  const icon = button.querySelector(".icon");
  if (!icon) return;

  if (theme === "dark") {
    icon.textContent = "🌞";
    icon.classList.add("sun-smile");
    triggerSparkles(button);
    setTimeout(() => icon.classList.remove("sun-smile"), 400);
  } else {
    icon.textContent = "🌙";
    icon.classList.add("moon-wink");
    triggerSparkles(button);
    setTimeout(() => icon.classList.remove("moon-wink"), 400);
  }
}

function triggerSparkles(button) {
  const container = button.querySelector(".sparkles");
  if (!container) return;

  // Create 6 sparkles in random directions
  for (let i = 0; i < 6; i++) {
    const s = document.createElement("div");
    s.classList.add("sparkle");

    // random burst directions
    const angle = Math.random() * 2 * Math.PI;
    const distance = 20 + Math.random() * 20;

    s.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    s.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);

    container.appendChild(s);

    // Remove after animation
    setTimeout(() => s.remove(), 600);
  }
}



