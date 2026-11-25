import { translate } from '../i18n/translations.js';
import { store } from '../state/store.js';
import { escapeHtml, formatRupiah, icon, safeUrl } from '../utils/dom.js';
import { showToast } from './toast.js';

let backdropEl = null;
let lastFocusedEl = null;

function ensureBackdrop() {
  if (backdropEl && document.body.contains(backdropEl)) return backdropEl;
  backdropEl = document.createElement('div');
  backdropEl.className = 'modal-backdrop';
  backdropEl.setAttribute('role', 'dialog');
  backdropEl.setAttribute('aria-modal', 'true');
  backdropEl.addEventListener('click', (e) => {
    if (e.target === backdropEl) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdropEl?.classList.contains('open')) {
      closeModal();
    }
  });
  document.body.appendChild(backdropEl);
  return backdropEl;
}

export function closeModal() {
  if (!backdropEl) return;
  backdropEl.classList.remove('open');
  backdropEl.innerHTML = '';
  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
    lastFocusedEl.focus();
  }
  lastFocusedEl = null;
}

/**
 * Opens an accessible detail modal for a destination.
 * @param {string} destId
 */
export function openDestinationModal(destId) {
  const dest = store.db.destinasi.find((d) => d.id === destId);
  if (!dest) return;

  lastFocusedEl = document.activeElement;
  const lang = store.lang;
  const backdrop = ensureBackdrop();

  backdrop.innerHTML = `
    <div class="modal-card">
      <button type="button" class="modal-close" data-modal-close aria-label="${escapeHtml(translate(lang, 'confirm_cancel'))}">
        ${icon('close', 16)}
      </button>
      <img
        class="modal-hero-img"
        src="${safeUrl(dest.imageUrl)}"
        alt="${escapeHtml(dest.nama)}"
        referrerpolicy="no-referrer"
      />
      <div class="meta-line">
        <span>${escapeHtml(dest.kategori)}</span>
        <span class="meta-sep" aria-hidden="true">·</span>
        <span>${escapeHtml(dest.wilayah)}</span>
      </div>
      <h3 style="font-size:1.55rem; margin-bottom:0.4rem;">${escapeHtml(dest.nama)}</h3>
      <p style="font-size:0.86rem; color:var(--ink-muted); display:flex; align-items:center; gap:0.35rem; margin-bottom:0.85rem;">
        ${icon('mapPin', 14)}
        <span>${escapeHtml(dest.alamat)}</span>
      </p>
      <p style="font-size:0.94rem; color:var(--ink-secondary); margin-bottom:1.1rem;">${escapeHtml(dest.deskripsi)}</p>

      <div class="info-panel info-panel--halal">
        <strong style="color:var(--emerald-900); display:flex; align-items:center; gap:0.4rem; margin-bottom:0.45rem; font-size:0.9rem;">
          ${icon('mosque', 16)}
          <span>${escapeHtml(translate(lang, 'modal_worship'))}</span>
        </strong>
        <ul style="margin-left:1.25rem; font-size:0.87rem; color:var(--ink-secondary);">
          ${dest.fasilitasIbadah.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}
        </ul>
      </div>

      <div class="info-panel">
        <strong style="color:var(--ink-primary); display:block; margin-bottom:0.4rem; font-size:0.9rem;">
          ${escapeHtml(translate(lang, 'modal_facilities'))}
        </strong>
        <p style="font-size:0.87rem; color:var(--ink-secondary);">
          ${dest.fasilitas.map((f) => escapeHtml(f)).join(' · ')}
        </p>
      </div>

      <div class="card-footer" style="margin-top:1rem;">
        <div>
          <span class="price-sub">${escapeHtml(translate(lang, 'est_ticket'))}</span>
          <div class="price-tag tabular-nums">${escapeHtml(formatRupiah(dest.estimasiBiaya, lang))} / ${escapeHtml(translate(lang, 'per_person'))}</div>
        </div>
        <div class="card-actions" style="flex-wrap:wrap;">
          <a href="${safeUrl(dest.mapsUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
            ${icon('external', 15)}
            <span>${escapeHtml(translate(lang, 'modal_maps'))}</span>
          </a>
          <button type="button" class="btn btn-primary" data-modal-add-trip>
            ${icon('plus', 15)}
            <span>${escapeHtml(translate(lang, 'modal_add_trip'))}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  backdrop.classList.add('open');
  const closeBtn = backdrop.querySelector('[data-modal-close]');
  closeBtn?.addEventListener('click', closeModal);
  closeBtn?.focus();

  backdrop.querySelector('[data-modal-add-trip]')?.addEventListener('click', () => {
    store.addActivity(1, dest.id);
    showToast(translate(store.lang, 'toast_added_trip', { name: dest.nama }));
    closeModal();
  });
}

/**
 * Opens an accessible confirmation dialog instead of window.confirm().
 * @param {string} message
 * @param {() => void} onConfirm
 */
export function openConfirmModal(message, onConfirm) {
  lastFocusedEl = document.activeElement;
  const lang = store.lang;
  const backdrop = ensureBackdrop();

  backdrop.innerHTML = `
    <div class="modal-card modal-card--sm">
      <button type="button" class="modal-close" data-modal-close aria-label="${escapeHtml(translate(lang, 'confirm_cancel'))}">
        ${icon('close', 16)}
      </button>
      <h3 style="font-size:1.18rem; margin-bottom:0.75rem; padding-right:2rem;">${escapeHtml(message)}</h3>
      <div class="card-actions" style="justify-content:flex-end; margin-top:1.25rem;">
        <button type="button" class="btn btn-outline" data-modal-close>${escapeHtml(translate(lang, 'confirm_cancel'))}</button>
        <button type="button" class="btn btn-danger" data-confirm-yes>${escapeHtml(translate(lang, 'confirm_yes'))}</button>
      </div>
    </div>
  `;

  backdrop.classList.add('open');
  backdrop.querySelectorAll('[data-modal-close]').forEach((btn) => btn.addEventListener('click', closeModal));
  const confirmBtn = backdrop.querySelector('[data-confirm-yes]');
  confirmBtn?.addEventListener('click', () => {
    closeModal();
    onConfirm();
  });
  confirmBtn?.focus();
}
