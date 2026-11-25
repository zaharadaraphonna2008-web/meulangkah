/**
 * Escapes HTML special characters to prevent XSS when interpolating user/CRUD input.
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validates URLs so only http/https/data:image+svg URLs are allowed in href/src.
 * @param {string} url
 * @param {string} fallback
 * @returns {string}
 */
export function safeUrl(url, fallback = '#') {
  if (typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('data:image/svg+xml') ||
    trimmed.startsWith('/')
  ) {
    return trimmed;
  }
  return fallback;
}

/**
 * Formats Indonesian Rupiah currency cleanly.
 * @param {number} amount
 * @param {'id'|'en'} lang
 * @returns {string}
 */
export function formatRupiah(amount, lang = 'id') {
  const num = Number(amount);
  if (!Number.isFinite(num) || num <= 0) {
    return lang === 'en' ? 'Free / Donation' : 'Gratis / Infaq';
  }
  return `Rp ${num.toLocaleString('id-ID')}`;
}

/**
 * Crisp inline SVG icons (affordance-only).
 * @param {'heart'|'heartFilled'|'mapPin'|'mosque'|'check'|'alert'|'info'|'menu'|'close'|'plus'|'trash'|'download'|'print'|'external'|'message'|'arrowRight'} name
 * @param {number} [size=16]
 * @returns {string}
 */
export function icon(name, size = 16) {
  const common = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  switch (name) {
    case 'heart':
      return `<svg ${common}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    case 'heartFilled':
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    case 'mapPin':
      return `<svg ${common}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
    case 'mosque':
      return `<svg ${common}><path d="M12 2c-2 2.5-5 4.5-5 8v10h10V10c0-3.5-3-5.5-5-8Z"/><path d="M3 20v-7a2 2 0 0 1 2-2h2"/><path d="M21 20v-7a2 2 0 0 0-2-2h-2"/><path d="M10 20v-4a2 2 0 1 1 4 0v4"/></svg>`;
    case 'check':
      return `<svg ${common}><path d="M20 6 9 17l-5-5"/></svg>`;
    case 'alert':
      return `<svg ${common}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
    case 'info':
      return `<svg ${common}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;
    case 'menu':
      return `<svg ${common}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
    case 'close':
      return `<svg ${common}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
    case 'plus':
      return `<svg ${common}><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
    case 'trash':
      return `<svg ${common}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;
    case 'download':
      return `<svg ${common}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`;
    case 'print':
      return `<svg ${common}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>`;
    case 'external':
      return `<svg ${common}><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`;
    case 'message':
      return `<svg ${common}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`;
    case 'arrowRight':
      return `<svg ${common}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
    default:
      return '';
  }
}
