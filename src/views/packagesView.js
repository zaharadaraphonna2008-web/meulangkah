import { bindCardInteractions, renderPackageCard } from '../components/cards.js';
import { translate } from '../i18n/translations.js';
import { store } from '../state/store.js';
import { escapeHtml } from '../utils/dom.js';

function getMatchedPackages() {
  const { minat, maxDurasi, maxBudget } = store.pkgFilter;
  const budgetCap = Number(maxBudget) > 0 ? Number(maxBudget) : 99999999;

  return store.db.paket
    .filter((p) => (minat === 'ALL' || p.minat === minat) && p.durasi <= maxDurasi && p.estimasiBiaya <= budgetCap)
    .map((p) => {
      const efficiency = Math.round(((budgetCap - p.estimasiBiaya) / budgetCap) * 100);
      return {
        ...p,
        score: Math.max(75, Math.min(99, 80 + Math.floor(efficiency / 5)))
      };
    });
}

export function renderPackagesView(container) {
  const lang = store.lang;
  const { minat, maxDurasi, maxBudget } = store.pkgFilter;

  container.innerHTML = `
    <section class="view-section">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(translate(lang, 'pkg_title'))}</h2>
          <p>${escapeHtml(translate(lang, 'pkg_sub'))}</p>
        </div>
      </div>

      <div class="filter-bar filter-bar--pkg">
        <div>
          <label class="field-label" for="pkgMinatSelect">${escapeHtml(translate(lang, 'lbl_interest'))}</label>
          <select class="input-control" id="pkgMinatSelect">
            <option value="ALL" ${minat === 'ALL' ? 'selected' : ''}>${escapeHtml(translate(lang, 'all_interests'))}</option>
            <option value="Religi" ${minat === 'Religi' ? 'selected' : ''}>Religi &amp; Sejarah</option>
            <option value="Bahari" ${minat === 'Bahari' ? 'selected' : ''}>Bahari &amp; Pulau</option>
            <option value="Alam" ${minat === 'Alam' ? 'selected' : ''}>Alam &amp; Dataran Tinggi</option>
            <option value="Budaya" ${minat === 'Budaya' ? 'selected' : ''}>Budaya &amp; Kuliner</option>
          </select>
        </div>
        <div>
          <label class="field-label" for="pkgDurasiSelect">${escapeHtml(translate(lang, 'lbl_max_duration'))}</label>
          <select class="input-control" id="pkgDurasiSelect">
            <option value="5" ${maxDurasi === 5 ? 'selected' : ''}>${escapeHtml(translate(lang, 'up_to_days', { n: 5 }))}</option>
            <option value="2" ${maxDurasi === 2 ? 'selected' : ''}>1 – 2 ${lang === 'en' ? 'Days' : 'Hari'}</option>
            <option value="3" ${maxDurasi === 3 ? 'selected' : ''}>${escapeHtml(translate(lang, 'up_to_days', { n: 3 }))}</option>
            <option value="4" ${maxDurasi === 4 ? 'selected' : ''}>${escapeHtml(translate(lang, 'up_to_days', { n: 4 }))}</option>
          </select>
        </div>
        <div>
          <label class="field-label" for="pkgBudgetInput">${escapeHtml(translate(lang, 'lbl_max_budget'))}</label>
          <input
            type="number"
            class="input-control tabular-nums"
            id="pkgBudgetInput"
            value="${escapeHtml(maxBudget)}"
            step="250000"
            min="300000"
          />
        </div>
        <div>
          <button type="button" class="btn btn-outline" id="pkgResetBtn">
            ${escapeHtml(translate(lang, 'btn_reset'))}
          </button>
        </div>
      </div>

      <div class="cards-grid" id="pkgResultsGrid" aria-live="polite"></div>
    </section>
  `;

  const grid = container.querySelector('#pkgResultsGrid');
  const updateGrid = () => {
    if (!grid) return;
    const matched = getMatchedPackages();
    grid.innerHTML = matched.length
      ? matched.map(renderPackageCard).join('')
      : `<div class="empty-state">${escapeHtml(translate(store.lang, 'empty_pkg'))}</div>`;
  };

  updateGrid();
  if (grid) bindCardInteractions(grid);

  container.querySelector('#pkgMinatSelect')?.addEventListener('change', (e) => {
    store.pkgFilter.minat = e.target.value;
    updateGrid();
  });
  container.querySelector('#pkgDurasiSelect')?.addEventListener('change', (e) => {
    store.pkgFilter.maxDurasi = Number(e.target.value);
    updateGrid();
  });
  container.querySelector('#pkgBudgetInput')?.addEventListener('input', (e) => {
    store.pkgFilter.maxBudget = Number(e.target.value);
    updateGrid();
  });
  container.querySelector('#pkgResetBtn')?.addEventListener('click', () => {
    store.pkgFilter = { minat: 'ALL', maxDurasi: 5, maxBudget: 3500000 };
    store.notify();
  });
}
