/**
 * Theme Manager — toggles between light / dark
 * Persists choice in localStorage under key 'theme'
 * Defaults to system theme if no preference is saved.
 */
(function () {
    const LABELS = {
        light: 'Light',
        dark:  'Dark'
    };

    function getSystemTheme() {
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }

    function getTheme() {
        const stored = localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
        return getSystemTheme();
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    function updateButton(theme) {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;

        const iconEl = btn.querySelector('.theme-icon');
        const labelEl = btn.querySelector('.theme-label');

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
        return 'fa-moon-o';
    }

    function toggleTheme() {
        const current = getTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        
        localStorage.setItem('theme', next);
        applyTheme(next);
        updateButton(next);
    }

    // Watch for system theme changes if no explicit user preference is set
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                const newSystemTheme = e.matches ? 'dark' : 'light';
                applyTheme(newSystemTheme);
                updateButton(newSystemTheme);
            }
        });
    }

    // Apply immediately on script load
    applyTheme(getTheme());

    document.addEventListener('DOMContentLoaded', function () {
        updateButton(getTheme());

        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', toggleTheme);
        }
    });
})();
