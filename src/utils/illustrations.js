/**
 * Generates self-contained architectural & landscape SVG data URIs
 * tailored to Aceh's heritage, marine reefs, highlands, and culinary scenes.
 * Ensures zero broken image frames offline or in sandboxed environments.
 */

const THEME_PALETTES = {
  Religi: ['#022c22', '#065f46', '#34d399', '#ecfdf5'],
  Bahari: ['#0c4a6e', '#0369a1', '#38bdf8', '#e0f2fe'],
  Alam: ['#064e3b', '#047857', '#6ee7b7', '#f0fdf4'],
  Sejarah: ['#1e293b', '#334155', '#94a3b8', '#f1f5f9'],
  Budaya: ['#3f2e1e', '#78350f', '#fbbf24', '#fffbeb'],
  Kuliner: ['#451a03', '#9a3412', '#fb923c', '#fff7ed'],
  Akomodasi: ['#064e3b', '#0f766e', '#5eead4', '#f0fdfa']
};

function buildSceneSvg(category, title, region) {
  const [c1, c2, c3, c4] = THEME_PALETTES[category] || THEME_PALETTES.Alam;
  const safeTitle = String(title || 'Aceh')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .slice(0, 34);
  const safeRegion = String(region || 'Aceh')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  let motif = '';
  if (category === 'Religi') {
    motif = `
      <circle cx="480" cy="95" r="46" fill="${c4}" opacity="0.16"/>
      <path d="M160 290 L160 220 Q200 175 240 220 L240 290 Z" fill="${c1}" opacity="0.85"/>
      <path d="M240 290 L240 180 Q320 95 400 180 L400 290 Z" fill="${c1}"/>
      <path d="M400 290 L400 220 Q440 175 480 220 L480 290 Z" fill="${c1}" opacity="0.85"/>
      <rect x="135" y="135" width="12" height="155" fill="${c1}" opacity="0.9"/>
      <polygon points="135,135 141,105 147,135" fill="${c3}"/>
      <rect x="493" y="135" width="12" height="155" fill="${c1}" opacity="0.9"/>
      <polygon points="493,135 499,105 505,135" fill="${c3}"/>
      <rect x="80" y="290" width="480" height="70" fill="${c3}" opacity="0.22"/>
    `;
  } else if (category === 'Bahari') {
    motif = `
      <circle cx="490" cy="90" r="38" fill="${c4}" opacity="0.35"/>
      <path d="M0 245 Q130 225 260 242 T520 238 L640 245 L640 360 L0 360 Z" fill="${c1}" opacity="0.55"/>
      <path d="M0 278 Q160 262 320 280 T640 275 L640 360 L0 360 Z" fill="${c1}" opacity="0.82"/>
      <path d="M60 245 Q120 190 190 220 Q250 242 290 245 Z" fill="${c2}"/>
      <path d="M200 268 L225 256 L268 256 L252 268 Z" fill="${c4}" opacity="0.9"/>
      <line x1="236" y1="256" x2="236" y2="230" stroke="${c4}" stroke-width="2"/>
      <polygon points="236,232 256,246 236,248" fill="${c3}"/>
    `;
  } else if (category === 'Alam') {
    motif = `
      <circle cx="470" cy="95" r="40" fill="${c4}" opacity="0.24"/>
      <polygon points="0,300 130,150 270,300" fill="${c1}" opacity="0.65"/>
      <polygon points="160,300 320,120 490,300" fill="${c1}" opacity="0.88"/>
      <polygon points="360,300 510,165 640,300" fill="${c2}" opacity="0.78"/>
      <path d="M0 300 Q220 280 420 296 T640 292 L640 360 L0 360 Z" fill="${c3}" opacity="0.3"/>
    `;
  } else if (category === 'Sejarah' || category === 'Budaya') {
    motif = `
      <path d="M120 290 L165 180 L475 180 L520 290 Z" fill="${c1}" opacity="0.9"/>
      <polygon points="195,180 320,115 445,180" fill="${c3}" opacity="0.82"/>
      <rect x="190" y="210" width="260" height="80" fill="${c2}"/>
      <rect x="215" y="228" width="42" height="44" rx="4" fill="${c4}" opacity="0.25"/>
      <rect x="299" y="228" width="42" height="62" rx="4" fill="${c4}" opacity="0.32"/>
      <rect x="383" y="228" width="42" height="44" rx="4" fill="${c4}" opacity="0.25"/>
      <rect x="80" y="290" width="480" height="70" fill="${c1}" opacity="0.5"/>
    `;
  } else if (category === 'Kuliner') {
    motif = `
      <circle cx="320" cy="200" r="102" fill="${c4}" opacity="0.14"/>
      <path d="M190 215 Q320 310 450 215 Z" fill="${c1}"/>
      <ellipse cx="320" cy="215" rx="130" ry="26" fill="${c3}"/>
      <path d="M250 175 Q240 145 256 125" stroke="${c4}" stroke-width="4" fill="none" opacity="0.45" stroke-linecap="round"/>
      <path d="M320 165 Q310 135 326 115" stroke="${c4}" stroke-width="4" fill="none" opacity="0.55" stroke-linecap="round"/>
      <path d="M390 175 Q380 145 396 125" stroke="${c4}" stroke-width="4" fill="none" opacity="0.45" stroke-linecap="round"/>
    `;
  } else {
    motif = `
      <rect x="140" y="145" width="360" height="150" rx="10" fill="${c1}" opacity="0.92"/>
      <polygon points="120,150 320,90 520,150" fill="${c3}" opacity="0.88"/>
      <rect x="180" y="185" width="58" height="58" rx="6" fill="${c4}" opacity="0.28"/>
      <rect x="291" y="195" width="58" height="100" rx="6" fill="${c4}" opacity="0.38"/>
      <rect x="402" y="185" width="58" height="58" rx="6" fill="${c4}" opacity="0.28"/>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="640" height="360">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="55%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c3}"/>
      </linearGradient>
    </defs>
    <rect width="640" height="360" fill="url(#bg)"/>
    <g opacity="0.1" fill="none" stroke="${c4}" stroke-width="1">
      <path d="M0 60 L640 60 M0 120 L640 120 M0 320 L640 320"/>
    </g>
    ${motif}
    <rect x="0" y="295" width="640" height="65" fill="rgba(0,0,0,0.34)"/>
    <text x="24" y="324" fill="${c4}" font-family="Georgia, serif" font-size="18" font-weight="bold">${safeTitle}</text>
    <text x="24" y="344" fill="${c4}" opacity="0.85" font-family="sans-serif" font-size="12" letter-spacing="1">${safeRegion.toUpperCase()} · ACEH</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function getIllustrationUrl(category, title, region) {
  return buildSceneSvg(category, title, region);
}
