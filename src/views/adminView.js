import { openConfirmModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { translate } from '../i18n/translations.js';
import { store } from '../state/store.js';
import { escapeHtml, formatRupiah } from '../utils/dom.js';

const CRUD_SCHEMAS = {
  destinasi: [
    { key: 'nama', label: 'Nama Destinasi', type: 'text', required: true },
    {
      key: 'wilayah',
      label: 'Wilayah',
      type: 'select',
      options: ['Banda Aceh', 'Sabang', 'Aceh Besar', 'Aceh Tengah', 'Bener Meriah']
    },
    {
      key: 'kategori',
      label: 'Kategori',
      type: 'select',
      options: ['Religi', 'Alam', 'Bahari', 'Sejarah', 'Budaya', 'Kuliner']
    },
    { key: 'estimasiBiaya', label: 'Estimasi Biaya (Rp)', type: 'number', required: true },
    { key: 'alamat', label: 'Alamat Singkat', type: 'text', required: true },
    { key: 'fasilitasIbadah', label: 'Fasilitas Ibadah (pisahkan koma)', type: 'text', required: true },
    { key: 'deskripsi', label: 'Deskripsi', type: 'text', required: true }
  ],
  kuliner: [
    { key: 'nama', label: 'Nama Kuliner / Produk UMKM', type: 'text', required: true },
    {
      key: 'wilayah',
      label: 'Wilayah',
      type: 'select',
      options: ['Banda Aceh', 'Sabang', 'Aceh Besar', 'Aceh Tengah', 'Bener Meriah']
    },
    { key: 'kategori', label: 'Kategori Kuliner', type: 'text', required: true },
    { key: 'harga', label: 'Estimasi Harga (Rp)', type: 'number', required: true },
    {
      key: 'statusSertifikasiHalal',
      label: 'Status Sertifikasi Halal',
      type: 'select',
      options: ['Tersertifikasi Halal', 'Klaim Mandiri Ramah Muslim']
    },
    { key: 'sumberVerifikasi', label: 'Keterangan / Nomor Verifikasi', type: 'text', required: true },
    { key: 'kontak', label: 'No. WhatsApp Simulasi (628...)', type: 'text', required: true }
  ],
  akomodasi: [
    { key: 'nama', label: 'Nama Akomodasi', type: 'text', required: true },
    {
      key: 'wilayah',
      label: 'Wilayah',
      type: 'select',
      options: ['Banda Aceh', 'Sabang', 'Aceh Besar', 'Aceh Tengah', 'Bener Meriah']
    },
    { key: 'hargaPerMalam', label: 'Harga per Malam (Rp)', type: 'number', required: true },
    { key: 'fasilitasRamahMuslim', label: 'Fasilitas Ramah Muslim (pisahkan koma)', type: 'text', required: true },
    { key: 'fasilitas', label: 'Fasilitas Umum (pisahkan koma)', type: 'text', required: true },
    { key: 'kontak', label: 'No. WhatsApp Simulasi (628...)', type: 'text', required: true }
  ],
  paket: [
    { key: 'nama', label: 'Nama Paket Wisata', type: 'text', required: true },
    { key: 'durasi', label: 'Durasi (1–5 Hari)', type: 'number', required: true },
    {
      key: 'minat',
      label: 'Kategori Minat',
      type: 'select',
      options: ['Religi', 'Bahari', 'Alam', 'Budaya']
    },
    { key: 'estimasiBiaya', label: 'Estimasi Biaya / Orang (Rp)', type: 'number', required: true },
    { key: 'daftarDestinasi', label: 'Daftar Destinasi (pisahkan koma)', type: 'text', required: true },
    { key: 'deskripsi', label: 'Deskripsi Paket', type: 'text', required: true }
  ]
};

let editingItemId = '';

function renderFormFields(entity, existingItem) {
  const fields = CRUD_SCHEMAS[entity];
  return fields
    .map((f) => {
      let val = existingItem ? existingItem[f.key] : '';
      if (Array.isArray(val)) val = val.join(', ');
      if (f.type === 'select') {
        return `
          <div>
            <label class="field-label" for="crud_${escapeHtml(f.key)}">${escapeHtml(f.label)}</label>
            <select class="input-control" id="crud_${escapeHtml(f.key)}">
              ${f.options
                .map(
                  (opt) =>
                    `<option value="${escapeHtml(opt)}" ${val === opt ? 'selected' : ''}>${escapeHtml(opt)}</option>`
                )
                .join('')}
            </select>
          </div>
        `;
      }
      return `
        <div>
          <label class="field-label" for="crud_${escapeHtml(f.key)}">${escapeHtml(f.label)}</label>
          <input
            class="input-control ${f.type === 'number' ? 'tabular-nums' : ''}"
            type="${f.type}"
            id="crud_${escapeHtml(f.key)}"
            value="${escapeHtml(val ?? '')}"
            ${f.type === 'number' ? 'min="0"' : ''}
            ${f.required ? 'required' : ''}
          />
        </div>
      `;
    })
    .join('');
}

export function renderAdminView(container) {
  const lang = store.lang;
  const entity = store.adminEntity;
  const list = store.db[entity] || [];
  const existingItem = editingItemId ? list.find((x) => x.id === editingItemId) : null;

  const entities = [
    { key: 'destinasi', label: translate(lang, 'nav_dest') },
    { key: 'kuliner', label: lang === 'en' ? 'Culinary & MSME' : 'Kuliner & UMKM' },
    { key: 'akomodasi', label: lang === 'en' ? 'Stays' : 'Akomodasi' },
    { key: 'paket', label: translate(lang, 'nav_packages') }
  ];

  container.innerHTML = `
    <section class="view-section">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(translate(lang, 'admin_title'))}</h2>
          <p>${escapeHtml(translate(lang, 'admin_sub'))}</p>
        </div>
        <button type="button" class="btn btn-outline btn-sm" id="btnResetDemoDb">
          ${escapeHtml(translate(lang, 'btn_reset_db'))}
        </button>
      </div>

      <div class="segmented-tabs" role="tablist">
        ${entities
          .map(
            (e) => `
              <button
                type="button"
                role="tab"
                aria-selected="${entity === e.key}"
                class="segmented-tab ${entity === e.key ? 'active' : ''}"
                data-admin-entity="${e.key}"
              >
                ${escapeHtml(e.label)}
              </button>
            `
          )
          .join('')}
      </div>

      <div class="panel-box" style="margin-bottom:1.5rem;">
        <h3 class="panel-heading">
          ${existingItem ? `Edit (${escapeHtml(existingItem.id)})` : `${escapeHtml(entity.toUpperCase())}`}
        </h3>
        <form id="crudForm">
          <div class="crud-form-grid">
            ${renderFormFields(entity, existingItem)}
          </div>
          <div class="card-actions" style="margin-top:1.1rem;">
            <button type="submit" class="btn btn-primary">${escapeHtml(translate(lang, 'btn_save_data'))}</button>
            <button type="button" class="btn btn-outline" id="btnCrudCancel">${escapeHtml(translate(lang, 'btn_cancel_reset'))}</button>
          </div>
        </form>
      </div>

      <div class="panel-box table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Wilayah / Durasi</th>
              <th>Kategori / Status</th>
              <th>Estimasi Biaya</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${list
              .map((item) => {
                const col3 = item.wilayah || (item.durasi ? `${item.durasi} Hari` : '—');
                const col4 = item.kategori || item.statusSertifikasiHalal || item.minat || 'Ramah Muslim';
                const cost = item.estimasiBiaya ?? item.harga ?? item.hargaPerMalam ?? 0;
                return `
                  <tr>
                    <td><span class="code-id">${escapeHtml(item.id)}</span></td>
                    <td><strong>${escapeHtml(item.nama)}</strong></td>
                    <td>${escapeHtml(col3)}</td>
                    <td>${escapeHtml(col4)}</td>
                    <td class="tabular-nums">${escapeHtml(formatRupiah(cost, lang))}</td>
                    <td style="white-space:nowrap;">
                      <div class="card-actions">
                        <button type="button" class="btn btn-outline btn-sm" data-crud-edit="${escapeHtml(item.id)}">
                          ${escapeHtml(translate(lang, 'btn_edit'))}
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" data-crud-del="${escapeHtml(item.id)}" data-crud-name="${escapeHtml(item.nama)}">
                          ${escapeHtml(translate(lang, 'btn_delete'))}
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;

  container.querySelectorAll('[data-admin-entity]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-admin-entity');
      if (next) {
        editingItemId = '';
        store.adminEntity = next;
        store.notify();
      }
    });
  });

  container.querySelector('#crudForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = CRUD_SCHEMAS[entity];
    const record = {};
    fields.forEach((f) => {
      const inputEl = container.querySelector(`#crud_${f.key}`);
      let val = inputEl ? inputEl.value : '';
      if (f.type === 'number') val = Number(val);
      if (['fasilitasIbadah', 'fasilitasRamahMuslim', 'fasilitas', 'daftarDestinasi'].includes(f.key)) {
        val = String(val)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      }
      record[f.key] = val;
    });

    const targetId = editingItemId;
    editingItemId = '';
    store.saveCrudRecord(entity, targetId, record);
    showToast(translate(store.lang, 'toast_saved'));
  });

  container.querySelector('#btnCrudCancel')?.addEventListener('click', () => {
    editingItemId = '';
    store.notify();
  });

  container.querySelectorAll('[data-crud-edit]').forEach((btn) => {
    btn.addEventListener('click', () => {
      editingItemId = btn.getAttribute('data-crud-edit') || '';
      store.notify();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  container.querySelectorAll('[data-crud-del]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-crud-del');
      const name = btn.getAttribute('data-crud-name') || id;
      if (!id) return;
      openConfirmModal(translate(store.lang, 'confirm_delete', { name }), () => {
        if (editingItemId === id) editingItemId = '';
        store.deleteCrudRecord(entity, id);
        showToast(translate(store.lang, 'toast_deleted'));
      });
    });
  });

  container.querySelector('#btnResetDemoDb')?.addEventListener('click', () => {
    openConfirmModal(translate(store.lang, 'confirm_reset_db'), () => {
      editingItemId = '';
      store.resetDemoDb();
      showToast(translate(store.lang, 'toast_reset'));
    });
  });
}
