(function initTheme() {
  const theme = localStorage.getItem('theme');
  const darkMode =
    theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
})();
