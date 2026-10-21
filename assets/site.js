(() => {
  const root = document.documentElement;
  try { const t = localStorage.getItem("chianglab-theme"); if (t) root.dataset.theme = t; } catch (e) {}
  const theme = document.getElementById("theme");
  if (theme) theme.onclick = () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("chianglab-theme", root.dataset.theme); } catch (e) {}
  };
  const menu = document.getElementById("menu"), nav = document.getElementById("nav");
  if (menu) menu.onclick = () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open);
  };
  const filters = document.querySelector(".filters");
  if (filters) filters.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    filters.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    const f = b.dataset.f;
    document.querySelectorAll(".pubs li").forEach(li => li.hidden = f !== "all" && !li.dataset.k.split(" ").includes(f));
    document.querySelectorAll(".yearblock").forEach(y => y.hidden = !y.querySelector(".pubs li:not([hidden])"));
  });
})();
