import { translate } from '../i18n/translations.js';
import { store } from '../state/store.js';
import { escapeHtml, formatRupiah, icon, safeUrl } from '../utils/dom.js';
import { openDestinationModal } from './modal.js';
import { showToast } from './toast.js';

export function openWhatsAppDemo(phone, itemName) {
  const cleanPhone = String(phone || '').replace(/[^\d]/g, '');
  const msg = encodeURIComponent(
    `Assalamu'alaikum, saya menemukan "${itemName}" melalui aplikasi MEULANGKAH (Mode Demo). Mohon informasi ketersediaan layanan.`
  );
  window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank', 'noopener,noreferrer');
}

export function renderDestinationCard(d) {
  const lang = store.lang;
  const fav = store.isFavorited(d.id, 'destinasi');
  const worshipLead = d.fasilitasIbadah[0] || '';
  const excerpt = d.deskripsi.length > 118 ? `${d.deskripsi.slice(0, 118)}…` : d.deskripsi;

  return `
    <article class="card">
      <div class="card-media">
        <img src="${safeUrl(d.imageUrl)}" alt="${escapeHtml(d.nama)}" loading="lazy" referrerpolicy="no-referrer" />
        <div class="card-media-scrim" aria-hidden="true"></div>
        <button
          type="button"
          class="fav-icon-btn ${fav ? 'active' : ''}"
          data-fav-id="${escapeHtml(d.id)}"
          data-fav-type="destinasi"
          aria-label="${escapeHtml(d.nama)} — ${escapeHtml(translate(lang, 'nav_fav'))}"
          aria-pressed="${fav}"
        >
          ${icon(fav ? 'heartFilled' : 'heart', 17)}
        </button>
      </div>
      <div class="card-body">
        <div class="meta-line">
          <span>${escapeHtml(d.wilayah)}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span>${escapeHtml(d.kategori)}</span>
          ${d.unggulan ? `<span class="meta-sep" aria-hidden="true">·</span><span>${lang === 'en' ? 'Featured' : 'Unggulan'}</span>` : ''}
        </div>
        <h3 class="card-title">${escapeHtml(d.nama)}</h3>
        <p class="card-desc">${escapeHtml(excerpt)}</p>
        ${
          worshipLead
            ? `<div class="card-detail-note">${escapeHtml(worshipLead)}</div>`
            : ''
        }
        <div class="card-footer">
          <div class="price-tag tabular-nums">
            ${escapeHtml(formatRupiah(d.estimasiBiaya, lang))}
            <span class="price-sub">${escapeHtml(translate(lang, 'est_ticket'))}</span>
          </div>
          <div class="card-actions">
            <button type="button" class="btn btn-outline btn-sm" data-dest-detail="${escapeHtml(d.id)}">
              ${escapeHtml(translate(lang, 'btn_detail'))}
            </button>
            <button type="button" class="btn btn-primary btn-sm" data-quick-trip="${escapeHtml(d.id)}">
              ${escapeHtml(translate(lang, 'btn_add_trip'))}
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

export function renderCulinaryCard(k) {
  const lang = store.lang;
  const isVerified = k.statusSertifikasiHalal === 'Tersertifikasi Halal';
  const fav = store.isFavorited(k.id, 'kuliner');

  return `
    <article class="card">
      <div class="card-media">
        <img src="${safeUrl(k.imageUrl)}" alt="${escapeHtml(k.nama)}" loading="lazy" referrerpolicy="no-referrer" />
        <div class="card-media-scrim" aria-hidden="true"></div>
        <button
          type="button"
          class="fav-icon-btn ${fav ? 'active' : ''}"
          data-fav-id="${escapeHtml(k.id)}"
          data-fav-type="kuliner"
          aria-label="${escapeHtml(k.nama)} — ${escapeHtml(translate(lang, 'nav_fav'))}"
          aria-pressed="${fav}"
        >
          ${icon(fav ? 'heartFilled' : 'heart', 17)}
        </button>
      </div>
      <div class="card-body">
        <div class="meta-line">
          <span>${escapeHtml(k.wilayah)}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span>${escapeHtml(k.kategori)}</span>
        </div>
        <div class="status-line ${isVerified ? 'status-line--verified' : 'status-line--self'}">
          ${icon(isVerified ? 'check' : 'alert', 14)}
          <span>${escapeHtml(translate(lang, isVerified ? 'halal_verified' : 'halal_self'))}</span>
        </div>
        <h3 class="card-title">${escapeHtml(k.nama)}</h3>
        <p class="card-desc">${escapeHtml(k.sumberVerifikasi)}</p>
        <div class="card-footer">
          <div class="price-tag tabular-nums">
            ${escapeHtml(formatRupiah(k.harga, lang))}
            <span class="price-sub">${escapeHtml(translate(lang, 'est_price'))}</span>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            data-wa-phone="${escapeHtml(k.kontak)}"
            data-wa-name="${escapeHtml(k.nama)}"
          >
            ${icon('message', 14)}
            <span>${escapeHtml(translate(lang, 'btn_wa_umkm'))}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

export function renderAccommodationCard(a) {
  const lang = store.lang;
  const fav = store.isFavorited(a.id, 'akomodasi');

  return `
    <article class="card">
      <div class="card-media">
        <img src="${safeUrl(a.imageUrl)}" alt="${escapeHtml(a.nama)}" loading="lazy" referrerpolicy="no-referrer" />
        <div class="card-media-scrim" aria-hidden="true"></div>
        <button
          type="button"
          class="fav-icon-btn ${fav ? 'active' : ''}"
          data-fav-id="${escapeHtml(a.id)}"
          data-fav-type="akomodasi"
          aria-label="${escapeHtml(a.nama)} — ${escapeHtml(translate(lang, 'nav_fav'))}"
          aria-pressed="${fav}"
        >
          ${icon(fav ? 'heartFilled' : 'heart', 17)}
        </button>
      </div>
      <div class="card-body">
        <div class="meta-line">
          <span>${escapeHtml(a.wilayah)}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span>${escapeHtml(translate(lang, 'muslim_services'))}</span>
        </div>
        <h3 class="card-title">${escapeHtml(a.nama)}</h3>
        <p class="card-desc">${a.fasilitasRamahMuslim.map((f) => escapeHtml(f)).join(' · ')}</p>
        <div class="card-detail-note">${a.fasilitas.map((f) => escapeHtml(f)).join(' · ')}</div>
        <div class="card-footer">
          <div class="price-tag tabular-nums">
            ${escapeHtml(formatRupiah(a.hargaPerMalam, lang))}
            <span class="price-sub">${escapeHtml(translate(lang, 'per_night'))}</span>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            data-wa-phone="${escapeHtml(a.kontak)}"
            data-wa-name="${escapeHtml(a.nama)}"
          >
            ${icon('message', 14)}
            <span>${escapeHtml(translate(lang, 'btn_wa_stay'))}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

export function renderPackageCard(p) {
  const lang = store.lang;
  return `
    <article class="card">
      <div class="card-body">
        <div class="meta-line">
          <span>${p.durasi} ${lang === 'en' ? 'Days' : 'Hari'}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span>${escapeHtml(p.minat)}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span class="tabular-nums">${escapeHtml(translate(lang, 'match_score'))}: ${p.score}%</span>
        </div>
        <h3 class="card-title">${escapeHtml(p.nama)}</h3>
        <p class="card-desc">${escapeHtml(p.deskripsi)}</p>
        <div class="card-detail-note">
          <strong style="display:block; margin-bottom:0.35rem;">${escapeHtml(translate(lang, 'route_destinations'))}:</strong>
          <ul style="margin-left:1.15rem; color:var(--ink-secondary);">
            ${p.daftarDestinasi.map((dest) => `<li>${escapeHtml(dest)}</li>`).join('')}
          </ul>
        </div>
        <div class="card-footer">
          <div class="price-tag tabular-nums">
            ${escapeHtml(formatRupiah(p.estimasiBiaya, lang))}
            <span class="price-sub">${escapeHtml(translate(lang, 'est_pkg_pax'))}</span>
          </div>
          <button type="button" class="btn btn-primary btn-sm" data-use-pkg="${escapeHtml(p.id)}">
            ${escapeHtml(translate(lang, 'btn_use_planner'))}
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Binds delegated click handlers for any container holding cards.
 * @param {HTMLElement} container
 */
export function bindCardInteractions(container) {
  container.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const favBtn = target.closest('[data-fav-id]');
    if (favBtn) {
      const id = favBtn.getAttribute('data-fav-id');
      const tipe = favBtn.getAttribute('data-fav-type');
      if (id && tipe) {
        const added = store.toggleFavorite(id, tipe);
        showToast(translate(store.lang, added ? 'toast_fav_added' : 'toast_fav_removed'));
      }
      return;
    }

    const detailBtn = target.closest('[data-dest-detail]');
    if (detailBtn) {
      const id = detailBtn.getAttribute('data-dest-detail');
      if (id) openDestinationModal(id);
      return;
    }

    const tripBtn = target.closest('[data-quick-trip]');
    if (tripBtn) {
      const id = tripBtn.getAttribute('data-quick-trip');
      const dest = store.db.destinasi.find((d) => d.id === id);
      if (dest && store.addActivity(1, dest.id)) {
        showToast(translate(store.lang, 'toast_added_trip', { name: dest.nama }));
      }
      return;
    }

    const waBtn = target.closest('[data-wa-phone]');
    if (waBtn) {
      const phone = waBtn.getAttribute('data-wa-phone');
      const name = waBtn.getAttribute('data-wa-name');
      if (phone && name) openWhatsAppDemo(phone, name);
      return;
    }

    const pkgBtn = target.closest('[data-use-pkg]');
    if (pkgBtn) {
      const id = pkgBtn.getAttribute('data-use-pkg');
      if (id) {
        const pkg = store.applyPackage(id);
        if (pkg) showToast(translate(store.lang, 'toast_pkg_applied', { name: pkg.nama }));
      }
    }
  });
}
