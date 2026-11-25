import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

import { bindHeaderEvents, renderHeader } from './components/header.js';
import { translate } from './i18n/translations.js';
import { store } from './state/store.js';
import { escapeHtml, icon } from './utils/dom.js';
import { renderAdminView } from './views/adminView.js';
import { renderCulinaryView } from './views/culinaryView.js';
import { renderDestinationsView } from './views/destinationsView.js';
import { renderFavoritesView } from './views/favoritesView.js';
import { renderHomeView } from './views/homeView.js';
import { renderPackagesView } from './views/packagesView.js';
import { renderPlannerView } from './views/plannerView.js';

const VIEW_RENDERERS = {
  home: renderHomeView,
  destinasi: renderDestinationsView,
  kuliner: renderCulinaryView,
  paket: renderPackagesView,
  planner: renderPlannerView,
  favorit: renderFavoritesView,
  admin: renderAdminView
};

const appRoot = document.getElementById('app');
let previousView = null;

function renderApp() {
  if (!appRoot) return;
  const lang = store.lang;
  const viewChanged = previousView !== store.currentView;
  previousView = store.currentView;

  document.documentElement.lang = lang;

  appRoot.innerHTML = `
    <div id="headerSlot">${renderHeader()}</div>

    <main class="main-shell">
      <div class="workspace-toolbar no-print">
        <div class="sim-notice" role="note">
          ${icon('info', 16)}
          <span>${escapeHtml(translate(lang, 'sim_notice'))}</span>
        </div>

        <div class="lang-segmented" role="group" aria-label="Language">
          <button
            type="button"
            class="lang-btn ${lang === 'id' ? 'active' : ''}"
            data-set-lang="id"
            aria-pressed="${lang === 'id'}"
          >
            ID
          </button>
          <button
            type="button"
            class="lang-btn ${lang === 'en' ? 'active' : ''}"
            data-set-lang="en"
            aria-pressed="${lang === 'en'}"
          >
            EN
          </button>
        </div>
      </div>

      <div id="viewSlot"></div>
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div>
          <strong>${escapeHtml(translate(lang, 'footer_copy'))}</strong>
          <p style="margin-top:0.25rem; opacity:0.85;">${escapeHtml(translate(lang, 'footer_note'))}</p>
        </div>
        <div style="font-family:var(--font-mono); font-size:0.78rem; opacity:0.85;">
          ID / EN · localStorage
        </div>
      </div>
    </footer>
  `;

  const headerSlot = appRoot.querySelector('#headerSlot');
  if (headerSlot) bindHeaderEvents(headerSlot);

  appRoot.querySelectorAll('[data-set-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextLang = btn.getAttribute('data-set-lang');
      if (nextLang) store.setLang(nextLang);
    });
  });

  const viewSlot = appRoot.querySelector('#viewSlot');
  const renderer = VIEW_RENDERERS[store.currentView] || renderHomeView;
  if (viewSlot) renderer(viewSlot);

  if (viewChanged) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

window.addEventListener('hashchange', () => {
  const hashView = window.location.hash.replace('#', '').trim();
  if (hashView && hashView !== store.currentView) {
    store.setView(hashView, false);
  }
});

store.subscribe(renderApp);
renderApp();
