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

  // Use relative path to the JSON file in your repo
  const jsonPath = "data/homeworks.json"; // <-- make sure this exists in the repo

  fetch(jsonPath)
    .then(res => {
      if (!res.ok) throw new Error("JSON not found at " + jsonPath);
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

        // GitHub raw file download URL
        const rawBase = "https://asmaulhusna-app.github.io/main/";

        card.addEventListener("click", () => {
          const link = document.createElement("a");
          link.href = rawBase + file.url; // raw GitHub URL
          link.download = file.name;      // keep original extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        });

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("❌ Failed to load homework files:", err);
      container.innerHTML = "<p>❌ Failed to load homeworks.</p>";
    });
});
