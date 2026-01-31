document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");

  /* ---------- THEME MEMORY (NO ANIMATION) ---------- */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  /* ---------- THEME TOGGLE (WITH ANIMATION) ---------- */
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.add("theme-animate"); // enable animation

      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  /* ---------- CARD NAVIGATION ---------- */
  document.querySelectorAll(".card[data-link]").forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = card.dataset.link;
    });
  });
});
