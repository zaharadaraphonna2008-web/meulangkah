import {
  bindCardInteractions,
  renderAccommodationCard,
  renderCulinaryCard,
  renderDestinationCard
} from '../components/cards.js';
import { translate } from '../i18n/translations.js';
import { store } from '../state/store.js';
import { escapeHtml } from '../utils/dom.js';

export function renderFavoritesView(container) {
  const lang = store.lang;
  const favCards = store.favorites
    .map((f) => {
      if (f.tipeItem === 'destinasi') {
        const d = store.db.destinasi.find((x) => x.id === f.itemId);
        return d ? renderDestinationCard(d) : '';
      }
      if (f.tipeItem === 'kuliner') {
        const k = store.db.kuliner.find((x) => x.id === f.itemId);
        return k ? renderCulinaryCard(k) : '';
      }
      if (f.tipeItem === 'akomodasi') {
        const a = store.db.akomodasi.find((x) => x.id === f.itemId);
        return a ? renderAccommodationCard(a) : '';
      }
      return '';
    })
    .filter(Boolean);

  container.innerHTML = `
    <section class="view-section">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(translate(lang, 'fav_title'))}</h2>
          <p>${escapeHtml(translate(lang, 'fav_sub'))}</p>
        </div>
      </div>

      <div class="cards-grid" id="favoritesResultsGrid">
        ${
          favCards.length
            ? favCards.join('')
            : `<div class="empty-state">${escapeHtml(translate(lang, 'empty_fav'))}</div>`
        }
      </div>
    </section>
  `;

  const grid = container.querySelector('#favoritesResultsGrid');
  if (grid) bindCardInteractions(grid);
}
