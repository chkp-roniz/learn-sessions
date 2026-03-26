export function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  document.getElementById("theme-lbl").textContent =
    t === "light" ? "Light" : "Dark";
  document.getElementById("ico-moon").style.display =
    t === "dark" ? "" : "none";
  document.getElementById("ico-sun").style.display =
    t === "light" ? "" : "none";
}

export function toggleTheme() {
  const n =
    document.documentElement.getAttribute("data-theme") === "light"
      ? "dark"
      : "light";
  applyTheme(n);
  localStorage.setItem("sessions-theme", n);
}
