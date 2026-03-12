/**
 * Theme Manager — cycles between auto / light / dark
 * Persists choice in localStorage under key 'theme'
 */
(function () {
    const THEMES = ['auto', 'light', 'dark'];

    const ICONS = {
        auto:  'fa-circle-half-stroke',
        light: 'fa-sun',
        dark:  'fa-moon'
    };

    const LABELS = {
        auto:  'Auto',
        light: 'Light',
        dark:  'Dark'
    };

    function getTheme() {
        return localStorage.getItem('theme') || 'auto';
    }

    function applyTheme(theme) {
        const root = document.documentElement;
        if (theme === 'auto') {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', theme);
        }
    }

    function updateButton(theme) {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;

        const iconEl = btn.querySelector('.theme-icon');
        const labelEl = btn.querySelector('.theme-label');

        // Use Font Awesome 6 free solid icons via unicode fallback / class
        if (iconEl) {
            iconEl.className = 'theme-icon fa fa-fw ' + getFA4Icon(theme);
        }
        if (labelEl) {
            labelEl.textContent = LABELS[theme];
        }

        btn.setAttribute('aria-label', 'Theme: ' + LABELS[theme]);
        btn.setAttribute('data-current-theme', theme);
    }

    // Font Awesome 4 icons (the project uses FA 4.7)
    function getFA4Icon(theme) {
        if (theme === 'light') return 'fa-sun-o';
        if (theme === 'dark')  return 'fa-moon-o';
        return 'fa-adjust';   // auto = half-circle
    }

    function cycleTheme() {
        const current = getTheme();
        const nextIndex = (THEMES.indexOf(current) + 1) % THEMES.length;
        const next = THEMES[nextIndex];
        localStorage.setItem('theme', next);
        applyTheme(next);
        updateButton(next);
    }

    // Apply immediately on script load (before DOMContentLoaded) to
    // avoid a flash of wrong-theme content.
    applyTheme(getTheme());

    document.addEventListener('DOMContentLoaded', function () {
        updateButton(getTheme());

        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', cycleTheme);
        }
    });
})();
