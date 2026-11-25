import { bindCardInteractions, renderDestinationCard } from '../components/cards.js';
import { bindMapInteractions, renderMapSection } from '../components/map.js';
import { translate } from '../i18n/translations.js';
import { store } from '../state/store.js';
import { escapeHtml, icon } from '../utils/dom.js';

export function renderHomeView(container) {
  const lang = store.lang;
  const featured = store.db.destinasi.filter((d) => d.unggulan).slice(0, 6);
  const regionCount = new Set(store.db.destinasi.map((d) => d.wilayah)).size;

  container.innerHTML = `
    <section class="view-section">
      <div class="hero-banner">
        <div>
          <div class="hero-kicker">${escapeHtml(translate(lang, 'hero_kicker'))}</div>
          <h1>${escapeHtml(translate(lang, 'hero_title'))}</h1>
          <p class="hero-lead">${escapeHtml(translate(lang, 'hero_sub'))}</p>
          <div class="hero-actions">
            <button type="button" class="btn btn-dark" data-hero-nav="destinasi">
              ${escapeHtml(translate(lang, 'hero_cta1'))}
            </button>
            <button type="button" class="btn btn-outline-light" data-hero-nav="planner">
              ${escapeHtml(translate(lang, 'hero_cta2'))}
            </button>
          </div>
        </div>

        <div class="hero-stats-grid">
          <div class="hero-stat-card">
            <div class="hero-stat-value tabular-nums">${store.db.destinasi.length}</div>
            <div class="hero-stat-label">${escapeHtml(translate(lang, 'stat_dest'))}</div>
          </div>
          <div class="hero-stat-card">
            <div class="hero-stat-value tabular-nums">${regionCount}</div>
            <div class="hero-stat-label">${escapeHtml(translate(lang, 'stat_regions'))}</div>
          </div>
          <div class="hero-stat-card">
            <div class="hero-stat-value tabular-nums">${store.db.kuliner.length}</div>
            <div class="hero-stat-label">${escapeHtml(translate(lang, 'stat_culinary'))}</div>
          </div>
          <div class="hero-stat-card">
            <div class="hero-stat-value tabular-nums">${store.db.akomodasi.length}</div>
            <div class="hero-stat-label">${escapeHtml(translate(lang, 'stat_stays'))}</div>
          </div>
        </div>
      </div>

      <div id="homeMapWrap">${renderMapSection()}</div>

      <div class="section-header">
        <div>
          <h2>${escapeHtml(translate(lang, 'featured_title'))}</h2>
          <p>${escapeHtml(translate(lang, 'featured_sub'))}</p>
        </div>
        <button type="button" class="btn btn-outline btn-sm" data-hero-nav="destinasi">
          <span>${escapeHtml(translate(lang, 'see_all'))} (${store.db.destinasi.length})</span>
          ${icon('arrowRight', 14)}
        </button>
      </div>

      <div class="cards-grid" id="homeFeaturedGrid">
        ${featured.map(renderDestinationCard).join('')}
      </div>
    </section>
  `;

  container.querySelectorAll('[data-hero-nav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-hero-nav');
      if (target) store.setView(target);
    });
  });

  const mapWrap = container.querySelector('#homeMapWrap');
  if (mapWrap) bindMapInteractions(mapWrap);

  const featuredGrid = container.querySelector('#homeFeaturedGrid');
  if (featuredGrid) bindCardInteractions(featuredGrid);
}
