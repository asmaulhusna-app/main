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

/* ---------- LOAD HOMEWORK FILES ---------- */
fetch("data/homeworks.json")
  .then(r => r.json())
  .then(files => {
    const container = document.getElementById("homeworks-list");
    if (!container) return;

    files.forEach(file => {
      const a = document.createElement("a");
      a.href = file.url;
      a.download = "";
      a.style.color = "inherit";
      a.style.textDecoration = "none";

      a.innerHTML = `
        <div class="project-item">
          <h3>${file.name}</h3>
          <p>Uploaded: ${file.date}</p>
          <p>Description: ${file.description}</p>
        </div>
      `;

      container.appendChild(a);
    });
  });

