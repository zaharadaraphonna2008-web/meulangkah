import { REGION_INFO } from '../data/seed.js';
import { translate } from '../i18n/translations.js';
import { store } from '../state/store.js';
import { escapeHtml, icon } from '../utils/dom.js';

const MAP_PINS = [
  { region: 'Sabang', label: 'Sabang (Pulau Weh)', cx: 75, cy: 50, tx: 102, ty: 54 },
  { region: 'Banda Aceh', label: 'Banda Aceh', cx: 115, cy: 108, tx: 132, ty: 106 },
  { region: 'Aceh Besar', label: 'Aceh Besar', cx: 145, cy: 148, tx: 115, ty: 172 },
  { region: 'Bener Meriah', label: 'Bener Meriah', cx: 295, cy: 162, tx: 312, ty: 165 },
  { region: 'Aceh Tengah', label: 'Aceh Tengah (Takengon)', cx: 285, cy: 205, tx: 245, ty: 232 }
];

export function renderMapSection() {
  const lang = store.lang;
  const region = store.selectedRegion;
  const regionDests = store.db.destinasi.filter((d) => d.wilayah === region);
  const info = REGION_INFO[region] || { desc_id: '', desc_en: '' };
  const desc = lang === 'en' ? info.desc_en : info.desc_id;

  return `
    <div class="section-header">
      <div>
        <h2>${escapeHtml(translate(lang, 'map_title'))}</h2>
        <p>${escapeHtml(translate(lang, 'map_sub'))}</p>
      </div>
    </div>

    <div class="map-grid">
      <div class="svg-map-box">
        <svg viewBox="0 0 520 310" width="100%" height="auto" role="img" aria-label="${escapeHtml(translate(lang, 'map_title'))}">
          <rect x="0" y="0" width="520" height="310" rx="10" fill="#E6FFFA" />
          <path d="M55,38 Q78,24 95,42 Q98,64 76,72 Q52,66 55,38 Z" fill="#34D399" stroke="#FFFFFF" stroke-width="2" />
          <path d="M85,95 L165,88 L265,112 L385,135 L485,175 L465,285 L220,275 L105,210 Z" fill="#059669" stroke="#FFFFFF" stroke-width="2.5" />
          <path d="M235,155 Q295,135 350,165 Q365,215 310,235 Q245,225 235,155 Z" fill="#10B981" opacity="0.65" />
          <g transform="translate(465,45)" stroke="#047857" fill="none">
            <circle cx="0" cy="0" r="18" stroke-width="1.2" />
            <polygon points="0,-14 4,0 0,14 -4,0" fill="#047857" stroke="none" />
            <text x="-4" y="-21" font-size="9" fill="#047857" font-weight="bold">U</text>
          </g>
          ${MAP_PINS.map((pin) => {
            const selected = pin.region === region;
            return `
              <g
                class="region-pin ${selected ? 'selected' : ''}"
                data-map-region="${escapeHtml(pin.region)}"
                tabindex="0"
                role="button"
                aria-pressed="${selected}"
                aria-label="${escapeHtml(pin.label)}"
              >
                <circle
                  cx="${pin.cx}"
                  cy="${pin.cy}"
                  r="${selected ? 11 : 10}"
                  fill="${selected ? '#022c22' : '#047857'}"
                  stroke="#FFFFFF"
                  stroke-width="${selected ? 2.5 : 2}"
                />
                <text x="${pin.tx}" y="${pin.ty}" font-size="12" font-weight="700" fill="#022c22">
                  ${escapeHtml(pin.label)}
                </text>
              </g>
            `;
          }).join('')}
        </svg>
        <p class="map-caption">${escapeHtml(translate(lang, 'map_caption'))}</p>
      </div>

      <div class="map-detail-panel">
        <div>
          <div class="map-region-meta tabular-nums">
            ${regionDests.length} ${escapeHtml(translate(lang, 'map_listed'))}
          </div>
          <h3 class="map-region-title">${escapeHtml(region)}</h3>
          <p style="color:var(--ink-muted); font-size:0.94rem; margin-bottom:1rem;">${escapeHtml(desc)}</p>
          <div class="map-region-list">
            <strong>${escapeHtml(translate(lang, 'map_list_title'))} ${escapeHtml(region)}:</strong>
            <ul>
              ${regionDests.map((d) => `<li>${escapeHtml(d.nama)} (${escapeHtml(d.kategori)})</li>`).join('')}
            </ul>
          </div>
        </div>
        <button type="button" class="btn btn-primary" style="width:100%;" data-explore-region="${escapeHtml(region)}">
          <span>${escapeHtml(translate(lang, 'map_cta'))} ${escapeHtml(region)}</span>
          ${icon('arrowRight', 15)}
        </button>
      </div>
    </div>
  `;
}

export function bindMapInteractions(container) {
  container.querySelectorAll('[data-map-region]').forEach((pin) => {
    const select = () => {
      const region = pin.getAttribute('data-map-region');
      if (region) store.setSelectedRegion(region);
    };
    pin.addEventListener('click', select);
    pin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select();
      }
    });
  });

  const exploreBtn = container.querySelector('[data-explore-region]');
  exploreBtn?.addEventListener('click', () => {
    const region = exploreBtn.getAttribute('data-explore-region');
    if (region) {
      store.destFilter.wilayah = region;
      store.setView('destinasi');
    }
  });
}
