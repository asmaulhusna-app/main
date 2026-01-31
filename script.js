document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");

  /* ---------- THEME MEMORY ---------- */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark");

  /* ---------- THEME TOGGLE ---------- */
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.add("theme-animate");
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

  /* ---------- LOAD HOMEWORK FILES ---------- */
  const container = document.getElementById("homeworksList");
  if (!container) return console.error("❌ #homeworksList not found");

  // ❗ Relative path (required for GitHub Pages)
  const jsonPath = "./data/homeworks.json";

  // ❗ Detect local file usage
  if (location.protocol === "file:") {
    container.innerHTML = `
      <p style="color:#f55">
        ⚠️ Homeworks list requires a local server.<br>
        Use <code>Live Server</code> or open via GitHub Pages.
      </p>
    `;
    return;
  }

  fetch(jsonPath)
    .then(res => {
      if (!res.ok) throw new Error("JSON not found");
      return res.json();
    })
    .then(files => {
      container.innerHTML = "";

      files.forEach(file => {
        const card = document.createElement("div");
        card.className = "project-item";
        card.style.cursor = "pointer";

        card.innerHTML = `
          <h3>${file.name}</h3>
          <p>Uploaded: ${file.date}</p>
          <p>${file.description}</p>
        `;

        card.addEventListener("click", () => {
          // ✅ Works both locally (server) & GitHub Pages
          window.open(file.url, "_blank");
        });

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("❌ Failed to load homework files:", err);
      container.innerHTML = "<p>❌ Failed to load homeworks.</p>";
    });
});
