// Theme toggle functionality
class ThemeToggle {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.init();
  }

  init() {
    // Set initial theme
    this.setTheme(this.currentTheme);

    // Create toggle button
    this.createToggleButton();

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only change theme automatically if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
        this.updateToggleButton();
      }
    });
  }

  setTheme(theme) {
    this.currentTheme = theme;
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
    this.updateToggleButton();
  }

  toggleTheme() {
    this.setTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
  }

  createToggleButton() {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle theme');
    toggleButton.innerHTML = '<span class="theme-toggle-icon">☀️</span>';
    toggleButton.addEventListener('click', () => this.toggleTheme());
    
    // Insert at the beginning of body to ensure it's on top
    document.body.insertBefore(toggleButton, document.body.firstChild);
    
    this.updateToggleButton();
  }

  updateToggleButton() {
    const toggleIcon = document.querySelector('.theme-toggle-icon');
    if (toggleIcon) {
      toggleIcon.textContent = this.currentTheme === 'dark' ? '🌙' : '☀️';
    }
  }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle();
});