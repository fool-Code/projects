(function() {
  const saved = localStorage.getItem("site-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
})();
