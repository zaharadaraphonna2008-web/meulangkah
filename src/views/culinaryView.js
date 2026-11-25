import {
  bindCardInteractions,
  renderAccommodationCard,
  renderCulinaryCard
} from '../components/cards.js';
import { translate } from '../i18n/translations.js';
import { store } from '../state/store.js';
import { escapeHtml } from '../utils/dom.js';

function getFilteredCulinary() {
  const { q, wilayah, status } = store.culinaryFilter;
  const query = q.toLowerCase().trim();
  return store.db.kuliner.filter((k) => {
    const mWil = wilayah === 'ALL' || k.wilayah === wilayah;
    const mStat = status === 'ALL' || k.statusSertifikasiHalal === status;
    const mQ = !query || `${k.nama} ${k.kategori} ${k.wilayah}`.toLowerCase().includes(query);
    return mWil && mStat && mQ;
  });
}

function getFilteredStays() {
  const { q, wilayah } = store.stayFilter;
  const query = q.toLowerCase().trim();
  return store.db.akomodasi.filter((a) => {
    const mWil = wilayah === 'ALL' || a.wilayah === wilayah;
    const mQ = !query || `${a.nama} ${a.wilayah} ${a.fasilitasRamahMuslim.join(' ')}`.toLowerCase().includes(query);
    return mWil && mQ;
  });
}

export function renderCulinaryView(container) {
  const lang = store.lang;
  const tab = store.culinaryTab;
  const regions = ['Banda Aceh', 'Sabang', 'Aceh Besar', 'Aceh Tengah', 'Bener Meriah'];

  container.innerHTML = `
    <section class="view-section">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(translate(lang, 'culinary_title'))}</h2>
          <p>${escapeHtml(translate(lang, 'culinary_sub'))}</p>
        </div>
      </div>

      <div class="segmented-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected="${tab === 'kuliner'}"
          class="segmented-tab ${tab === 'kuliner' ? 'active' : ''}"
          data-culinary-tab="kuliner"
        >
          ${escapeHtml(translate(lang, 'tab_culinary'))}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected="${tab === 'akomodasi'}"
          class="segmented-tab ${tab === 'akomodasi' ? 'active' : ''}"
          data-culinary-tab="akomodasi"
        >
          ${escapeHtml(translate(lang, 'tab_stays'))}
        </button>
      </div>

      ${
        tab === 'kuliner'
          ? `
            <div class="filter-bar filter-bar--3">
              <input
                type="search"
                class="input-control"
                id="culSearchInput"
                value="${escapeHtml(store.culinaryFilter.q)}"
                placeholder="${escapeHtml(translate(lang, 'search_culinary_ph'))}"
              />
              <select class="input-control" id="culWilayahSelect">
                <option value="ALL" ${store.culinaryFilter.wilayah === 'ALL' ? 'selected' : ''}>${escapeHtml(translate(lang, 'all_regions'))}</option>
                ${regions.map((r) => `<option value="${escapeHtml(r)}" ${store.culinaryFilter.wilayah === r ? 'selected' : ''}>${escapeHtml(r)}</option>`).join('')}
              </select>
              <select class="input-control" id="culStatusSelect">
                <option value="ALL" ${store.culinaryFilter.status === 'ALL' ? 'selected' : ''}>${escapeHtml(translate(lang, 'all_halal_status'))}</option>
                <option value="Tersertifikasi Halal" ${store.culinaryFilter.status === 'Tersertifikasi Halal' ? 'selected' : ''}>${escapeHtml(translate(lang, 'halal_verified'))}</option>
                <option value="Klaim Mandiri Ramah Muslim" ${store.culinaryFilter.status === 'Klaim Mandiri Ramah Muslim' ? 'selected' : ''}>${escapeHtml(translate(lang, 'halal_self'))}</option>
              </select>
            </div>
            <div class="cards-grid" id="culinaryResultsGrid" aria-live="polite"></div>
          `
          : `
            <div class="filter-bar filter-bar--2">
              <input
                type="search"
                class="input-control"
                id="staySearchInput"
                value="${escapeHtml(store.stayFilter.q)}"
                placeholder="${escapeHtml(translate(lang, 'search_stays_ph'))}"
              />
              <select class="input-control" id="stayWilayahSelect">
                <option value="ALL" ${store.stayFilter.wilayah === 'ALL' ? 'selected' : ''}>${escapeHtml(translate(lang, 'all_regions'))}</option>
                ${regions.map((r) => `<option value="${escapeHtml(r)}" ${store.stayFilter.wilayah === r ? 'selected' : ''}>${escapeHtml(r)}</option>`).join('')}
              </select>
            </div>
            <div class="cards-grid" id="stayResultsGrid" aria-live="polite"></div>
          `
      }
    </section>
  `;

  container.querySelectorAll('[data-culinary-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextTab = btn.getAttribute('data-culinary-tab');
      if (nextTab) {
        store.culinaryTab = nextTab;
        store.notify();
      }
    });
  });

  if (tab === 'kuliner') {
    const grid = container.querySelector('#culinaryResultsGrid');
    const updateGrid = () => {
      if (!grid) return;
      const list = getFilteredCulinary();
      grid.innerHTML = list.length
        ? list.map(renderCulinaryCard).join('')
        : `<div class="empty-state">${escapeHtml(translate(store.lang, 'empty_dest'))}</div>`;
    };
    updateGrid();
    if (grid) bindCardInteractions(grid);

    container.querySelector('#culSearchInput')?.addEventListener('input', (e) => {
      store.culinaryFilter.q = e.target.value;
      updateGrid();
    });
    container.querySelector('#culWilayahSelect')?.addEventListener('change', (e) => {
      store.culinaryFilter.wilayah = e.target.value;
      updateGrid();
    });
    container.querySelector('#culStatusSelect')?.addEventListener('change', (e) => {
      store.culinaryFilter.status = e.target.value;
      updateGrid();
    });
  } else {
    const grid = container.querySelector('#stayResultsGrid');
    const updateGrid = () => {
      if (!grid) return;
      const list = getFilteredStays();
      grid.innerHTML = list.length
        ? list.map(renderAccommodationCard).join('')
        : `<div class="empty-state">${escapeHtml(translate(store.lang, 'empty_dest'))}</div>`;
    };
    updateGrid();
    if (grid) bindCardInteractions(grid);

    container.querySelector('#staySearchInput')?.addEventListener('input', (e) => {
      store.stayFilter.q = e.target.value;
      updateGrid();
    });
    container.querySelector('#stayWilayahSelect')?.addEventListener('change', (e) => {
      store.stayFilter.wilayah = e.target.value;
      updateGrid();
    });
  }
}
