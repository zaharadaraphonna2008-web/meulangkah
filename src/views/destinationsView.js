import { bindCardInteractions, renderDestinationCard } from '../components/cards.js';
import { translate } from '../i18n/translations.js';
import { store } from '../state/store.js';
import { escapeHtml } from '../utils/dom.js';

function getFilteredDestinations() {
  const { q, wilayah, kategori, sort } = store.destFilter;
  const query = q.toLowerCase().trim();

  const list = store.db.destinasi.filter((d) => {
    const matchWil = wilayah === 'ALL' || d.wilayah === wilayah;
    const matchKat = kategori === 'ALL' || d.kategori === kategori;
    const hay = `${d.nama} ${d.deskripsi} ${d.wilayah} ${d.fasilitas.join(' ')} ${d.fasilitasIbadah.join(' ')}`.toLowerCase();
    const matchQ = !query || hay.includes(query);
    return matchWil && matchKat && matchQ;
  });

  if (sort === 'price-asc') list.sort((a, b) => a.estimasiBiaya - b.estimasiBiaya);
  else if (sort === 'price-desc') list.sort((a, b) => b.estimasiBiaya - a.estimasiBiaya);
  else if (sort === 'name-asc') list.sort((a, b) => a.nama.localeCompare(b.nama));
  else list.sort((a, b) => Number(Boolean(b.unggulan)) - Number(Boolean(a.unggulan)));

  return list;
}

export function renderDestinationsView(container) {
  const lang = store.lang;
  const { q, wilayah, kategori, sort } = store.destFilter;
  const regions = ['Banda Aceh', 'Sabang', 'Aceh Besar', 'Aceh Tengah', 'Bener Meriah'];
  const categories = ['Religi', 'Alam', 'Bahari', 'Sejarah', 'Budaya', 'Kuliner'];

  container.innerHTML = `
    <section class="view-section">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(translate(lang, 'dest_catalog_title'))}</h2>
          <p>${escapeHtml(translate(lang, 'dest_catalog_sub'))}</p>
        </div>
      </div>

      <div class="filter-bar">
        <input
          type="search"
          class="input-control"
          id="destSearchInput"
          value="${escapeHtml(q)}"
          placeholder="${escapeHtml(translate(lang, 'search_dest_ph'))}"
          aria-label="${escapeHtml(translate(lang, 'search_dest_ph'))}"
        />
        <select class="input-control" id="destWilayahSelect" aria-label="${escapeHtml(translate(lang, 'all_regions'))}">
          <option value="ALL" ${wilayah === 'ALL' ? 'selected' : ''}>${escapeHtml(translate(lang, 'all_regions'))} (5)</option>
          ${regions.map((r) => `<option value="${escapeHtml(r)}" ${wilayah === r ? 'selected' : ''}>${escapeHtml(r)}</option>`).join('')}
        </select>
        <select class="input-control" id="destKategoriSelect" aria-label="${escapeHtml(translate(lang, 'all_categories'))}">
          <option value="ALL" ${kategori === 'ALL' ? 'selected' : ''}>${escapeHtml(translate(lang, 'all_categories'))} (6)</option>
          ${categories.map((c) => `<option value="${escapeHtml(c)}" ${kategori === c ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('')}
        </select>
        <select class="input-control" id="destSortSelect" aria-label="Sort">
          <option value="featured" ${sort === 'featured' ? 'selected' : ''}>${escapeHtml(translate(lang, 'sort_featured'))}</option>
          <option value="price-asc" ${sort === 'price-asc' ? 'selected' : ''}>${escapeHtml(translate(lang, 'sort_price_asc'))}</option>
          <option value="price-desc" ${sort === 'price-desc' ? 'selected' : ''}>${escapeHtml(translate(lang, 'sort_price_desc'))}</option>
          <option value="name-asc" ${sort === 'name-asc' ? 'selected' : ''}>${escapeHtml(translate(lang, 'sort_name_asc'))}</option>
        </select>
      </div>

      <div class="cards-grid" id="destResultsGrid" aria-live="polite"></div>
    </section>
  `;

  const grid = container.querySelector('#destResultsGrid');
  const updateGrid = () => {
    if (!grid) return;
    const list = getFilteredDestinations();
    grid.innerHTML = list.length
      ? list.map(renderDestinationCard).join('')
      : `<div class="empty-state">${escapeHtml(translate(store.lang, 'empty_dest'))}</div>`;
  };

  updateGrid();
  if (grid) bindCardInteractions(grid);

  container.querySelector('#destSearchInput')?.addEventListener('input', (e) => {
    store.destFilter.q = e.target.value;
    updateGrid();
  });
  container.querySelector('#destWilayahSelect')?.addEventListener('change', (e) => {
    store.destFilter.wilayah = e.target.value;
    updateGrid();
  });
  container.querySelector('#destKategoriSelect')?.addEventListener('change', (e) => {
    store.destFilter.kategori = e.target.value;
    updateGrid();
  });
  container.querySelector('#destSortSelect')?.addEventListener('change', (e) => {
    store.destFilter.sort = e.target.value;
    updateGrid();
  });
}
