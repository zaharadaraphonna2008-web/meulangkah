import { translate } from '../i18n/translations.js';
import { store } from '../state/store.js';
import { escapeHtml, icon } from '../utils/dom.js';

const NAV_ITEMS = [
  { view: 'home', key: 'nav_home' },
  { view: 'destinasi', key: 'nav_dest' },
  { view: 'kuliner', key: 'nav_culinary' },
  { view: 'paket', key: 'nav_packages' },
  { view: 'favorit', key: 'nav_fav', withFavCount: true },
  { view: 'admin', key: 'nav_admin' }
];

let mobileMenuOpen = false;

export function renderHeader() {
  const lang = store.lang;
  const activeView = store.currentView;
  const favCount = store.favorites.length;

  return `
    <div class="aceh-motif-bar" aria-hidden="true"></div>
    <header class="site-header">
      <div class="nav-container">
        <button type="button" class="brand-wordmark" data-nav-view="home">
          <span class="brand-mark-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" />
            </svg>
          </span>
          <span>${escapeHtml(translate(lang, 'brand'))}</span>
        </button>

        <nav class="nav-links" aria-label="Main Navigation">
          ${NAV_ITEMS.map(
            (item) => `
              <button
                type="button"
                class="nav-link ${activeView === item.view ? 'active' : ''}"
                data-nav-view="${item.view}"
              >
                <span>${escapeHtml(translate(lang, item.key))}</span>
                ${item.withFavCount ? `<span class="nav-count tabular-nums">(${favCount})</span>` : ''}
              </button>
            `
          ).join('')}
        </nav>

        <div class="header-actions">
          <button type="button" class="btn btn-primary btn-sm" data-nav-view="planner">
            ${escapeHtml(translate(lang, 'nav_cta'))}
          </button>
          <button
            type="button"
            class="mobile-menu-toggle"
            data-toggle-mobile-nav
            aria-expanded="${mobileMenuOpen}"
            aria-label="Toggle Menu"
          >
            ${icon(mobileMenuOpen ? 'close' : 'menu', 18)}
          </button>
        </div>
      </div>

      <div class="mobile-drawer ${mobileMenuOpen ? 'open' : ''}">
        <div class="mobile-drawer-links">
          ${NAV_ITEMS.map(
            (item) => `
              <button
                type="button"
                class="nav-link ${activeView === item.view ? 'active' : ''}"
                data-nav-view="${item.view}"
              >
                <span>${escapeHtml(translate(lang, item.key))}</span>
                ${item.withFavCount ? `<span class="nav-count tabular-nums">(${favCount})</span>` : ''}
              </button>
            `
          ).join('')}
        </div>
      </div>
    </header>
  `;
}

export function bindHeaderEvents(root) {
  root.querySelectorAll('[data-nav-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-nav-view');
      mobileMenuOpen = false;
      if (view) store.setView(view);
    });
  });

  const toggleBtn = root.querySelector('[data-toggle-mobile-nav]');
  toggleBtn?.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    store.notify();
  });
}
