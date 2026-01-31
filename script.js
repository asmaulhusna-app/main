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
  .then(res => res.json())
  .then(files => {
    const container = document.getElementById("homeworksList");

    files.forEach(file => {
      const a = document.createElement("a");
      a.href = file.url;
      a.download = "";
      a.className = "project-item";
      a.target = "_blank";

      a.innerHTML = `
        <h3>${file.name}</h3>
        <p>Uploaded: ${file.date}</p>
        <p>${file.description}</p>
      `;

      container.appendChild(a);
    });
  });

