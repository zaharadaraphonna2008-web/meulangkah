import { escapeHtml, icon } from '../utils/dom.js';

let regionEl = null;

function ensureToastRegion() {
  if (regionEl && document.body.contains(regionEl)) return regionEl;
  regionEl = document.createElement('div');
  regionEl.className = 'toast-region';
  regionEl.setAttribute('aria-live', 'polite');
  regionEl.setAttribute('aria-atomic', 'true');
  document.body.appendChild(regionEl);
  return regionEl;
}

/**
 * Displays a non-blocking toast message.
 * @param {string} message
 * @param {'info'|'warn'} [variant='info']
 */
export function showToast(message, variant = 'info') {
  const container = ensureToastRegion();
  const toast = document.createElement('div');
  toast.className = `toast-item ${variant === 'warn' ? 'toast-item--warn' : ''}`;
  toast.innerHTML = `
    <span>${escapeHtml(message)}</span>
    <button type="button" class="btn btn-sm" style="background:transparent;color:#fff;padding:0;min-height:24px;" aria-label="Close">
      ${icon('close', 14)}
    </button>
  `;

  const remove = () => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  };

  toast.querySelector('button')?.addEventListener('click', remove);
  container.appendChild(toast);
  window.setTimeout(remove, 3200);
}
