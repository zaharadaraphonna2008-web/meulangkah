import { openConfirmModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { translate } from '../i18n/translations.js';
import { store } from '../state/store.js';
import { escapeHtml, formatRupiah, icon } from '../utils/dom.js';

function renderBudgetHtml() {
  const lang = store.lang;
  const b = store.computeBudget();
  const paxLabel = lang === 'en' ? 'Travelers' : 'Wisatawan';
  const dayLabel = lang === 'en' ? 'Days' : 'Hari';
  const nightLabel = lang === 'en' ? 'nights' : 'mlm';
  const roomLabel = lang === 'en' ? 'rooms' : 'kmr';

  return `
    <div class="budget-summary-title">
      ${escapeHtml(translate(lang, 'budget_title'))} (${b.pax} ${paxLabel} · ${b.days} ${dayLabel})
    </div>
    <div class="budget-row">
      <span>${escapeHtml(translate(lang, 'budget_tickets'))}:</span>
      <span class="tabular-nums">Rp ${b.totalTickets.toLocaleString('id-ID')}</span>
    </div>
    <div class="budget-row">
      <span>${escapeHtml(translate(lang, 'budget_hotel'))} (${b.nights} ${nightLabel} × ${b.roomsNeeded} ${roomLabel}):</span>
      <span class="tabular-nums">Rp ${b.totalHotel.toLocaleString('id-ID')}</span>
    </div>
    <div class="budget-row">
      <span>${escapeHtml(translate(lang, 'budget_daily'))}:</span>
      <span class="tabular-nums">Rp ${b.totalDaily.toLocaleString('id-ID')}</span>
    </div>
    <div class="budget-total">
      <span>${escapeHtml(translate(lang, 'budget_total'))}:</span>
      <span class="tabular-nums">Rp ${b.grandTotal.toLocaleString('id-ID')}</span>
    </div>
    <div style="font-size:0.78rem; color:#d1fae5; margin-top:0.4rem;" class="tabular-nums">
      ${escapeHtml(translate(lang, 'budget_avg'))}: Rp ${b.perPaxAvg.toLocaleString('id-ID')}
    </div>
  `;
}

function renderScheduleDaysHtml() {
  const lang = store.lang;
  const plan = store.itinerary;
  let html = '';

  for (let d = 1; d <= plan.jumlahHari; d += 1) {
    const acts = plan.daftarAktivitas
      .map((item, idx) => ({ ...item, idx }))
      .filter((item) => item.day === d);

    html += `
      <div class="day-card">
        <div class="day-card-header">
          <strong style="color:var(--emerald-950);">${escapeHtml(translate(lang, 'day_label', { n: d }))}</strong>
          <span class="tabular-nums" style="font-size:0.8rem; color:var(--ink-muted);">
            ${escapeHtml(translate(lang, 'activities_count', { n: acts.length }))}
          </span>
        </div>
        ${
          acts.length
            ? acts
                .map((a) => {
                  const dest = store.db.destinasi.find((x) => x.id === a.destId);
                  if (!dest) return '';
                  let dayOpts = '';
                  for (let k = 1; k <= plan.jumlahHari; k += 1) {
                    dayOpts += `<option value="${k}" ${k === d ? 'selected' : ''}>${escapeHtml(translate(lang, 'day_label', { n: k }))}</option>`;
                  }
                  return `
                    <div class="activity-row">
                      <div>
                        <strong style="font-size:0.92rem;">${escapeHtml(dest.nama)}</strong>
                        <div style="font-size:0.78rem; color:var(--ink-muted);" class="tabular-nums">
                          ${escapeHtml(dest.wilayah)} · ${escapeHtml(dest.kategori)} · ${escapeHtml(formatRupiah(dest.estimasiBiaya, lang))}/${escapeHtml(translate(lang, 'per_person'))}
                        </div>
                      </div>
                      <div class="activity-controls no-print">
                        <select class="input-control" style="width:auto; min-height:36px; padding:0.25rem 0.5rem; font-size:0.8rem;" data-move-act="${a.idx}" aria-label="Move Day">
                          ${dayOpts}
                        </select>
                        <button type="button" class="btn btn-danger btn-sm" data-remove-act="${a.idx}" aria-label="${escapeHtml(translate(lang, 'btn_remove'))}">
                          ${icon('close', 14)}
                        </button>
                      </div>
                    </div>
                  `;
                })
                .join('')
            : `<p style="font-size:0.84rem; color:var(--ink-muted); margin-top:0.35rem;">${escapeHtml(translate(lang, 'empty_day'))}</p>`
        }
      </div>
    `;
  }
  return html;
}

function downloadItineraryJson() {
  const payload = {
    exportedAt: new Date().toISOString(),
    itinerary: store.itinerary,
    budgetSummary: store.computeBudget(),
    resolvedDestinations: store.itinerary.daftarAktivitas.map((a) => {
      const dest = store.db.destinasi.find((d) => d.id === a.destId);
      return { day: a.day, destination: dest ? dest.nama : a.destId, region: dest?.wilayah || '' };
    })
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `meulangkah-itinerary-${store.itinerary.tanggalMulai || 'plan'}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function renderPlannerView(container) {
  const lang = store.lang;
  const plan = store.itinerary;

  let dayOptions = '';
  for (let i = 1; i <= plan.jumlahHari; i += 1) {
    dayOptions += `<option value="${i}">${escapeHtml(translate(lang, 'day_label', { n: i }))}</option>`;
  }

  container.innerHTML = `
    <section class="view-section">
      <div class="section-header">
        <div>
          <h2>${escapeHtml(translate(lang, 'plan_title'))}</h2>
          <p>${escapeHtml(translate(lang, 'plan_sub'))}</p>
        </div>
        <div class="card-actions no-print">
          <button type="button" class="btn btn-outline btn-sm" id="btnExportJson">
            ${icon('download', 14)}
            <span>${escapeHtml(translate(lang, 'btn_export_json'))}</span>
          </button>
          <button type="button" class="btn btn-outline btn-sm" id="btnPrintPlan">
            ${icon('print', 14)}
            <span>${escapeHtml(translate(lang, 'btn_print'))}</span>
          </button>
        </div>
      </div>

      <div class="planner-layout">
        <div class="panel-box">
          <h3 class="panel-heading">${escapeHtml(translate(lang, 'plan_step1'))}</h3>
          <div class="form-group">
            <label class="field-label" for="planNameInput">${escapeHtml(translate(lang, 'plan_name'))}</label>
            <input type="text" class="input-control" id="planNameInput" value="${escapeHtml(plan.namaPerjalanan)}" />
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="field-label" for="planDateInput">${escapeHtml(translate(lang, 'plan_date'))}</label>
              <input type="date" class="input-control" id="planDateInput" value="${escapeHtml(plan.tanggalMulai)}" />
            </div>
            <div class="form-group">
              <label class="field-label" for="planDaysSelect">${escapeHtml(translate(lang, 'plan_days'))}</label>
              <select class="input-control" id="planDaysSelect">
                ${[1, 2, 3, 4, 5].map((n) => `<option value="${n}" ${plan.jumlahHari === n ? 'selected' : ''}>${n} ${lang === 'en' ? 'Days' : 'Hari'}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="field-label" for="planPaxInput">${escapeHtml(translate(lang, 'plan_pax'))}</label>
              <input type="number" class="input-control tabular-nums" id="planPaxInput" min="1" max="50" value="${escapeHtml(plan.jumlahWisatawan)}" />
            </div>
            <div class="form-group">
              <label class="field-label" for="planDailyInput">${escapeHtml(translate(lang, 'plan_daily_est'))}</label>
              <input type="number" class="input-control tabular-nums" id="planDailyInput" step="25000" min="0" value="${escapeHtml(plan.dailyEstPerPax)}" />
            </div>
          </div>

          <div class="form-group">
            <label class="field-label" for="planHotelSelect">${escapeHtml(translate(lang, 'plan_hotel'))}</label>
            <select class="input-control" id="planHotelSelect">
              <option value="">${escapeHtml(translate(lang, 'plan_no_hotel'))}</option>
              ${store.db.akomodasi
                .map(
                  (a) =>
                    `<option value="${escapeHtml(a.id)}" ${plan.hotelId === a.id ? 'selected' : ''}>${escapeHtml(a.nama)} — ${escapeHtml(formatRupiah(a.hargaPerMalam, lang))}</option>`
                )
                .join('')}
            </select>
          </div>

          <div class="no-print" style="border-top:1px solid var(--border-hairline); padding-top:1rem; margin-top:1rem;">
            <h3 class="panel-heading">${escapeHtml(translate(lang, 'plan_step2'))}</h3>
            <div style="display:grid; grid-template-columns:1fr 2fr; gap:0.6rem; margin-bottom:0.75rem;">
              <select class="input-control" id="addActDaySelect">${dayOptions}</select>
              <select class="input-control" id="addActDestSelect">
                ${store.db.destinasi
                  .map(
                    (d) =>
                      `<option value="${escapeHtml(d.id)}">[${escapeHtml(d.wilayah)}] ${escapeHtml(d.nama)} (${escapeHtml(formatRupiah(d.estimasiBiaya, lang))})</option>`
                  )
                  .join('')}
              </select>
            </div>
            <button type="button" class="btn btn-primary" style="width:100%;" id="btnAddActivity">
              ${icon('plus', 15)}
              <span>${escapeHtml(translate(lang, 'btn_add_schedule'))}</span>
            </button>
          </div>

          <div class="budget-summary-box" id="plannerBudgetBox" aria-live="polite">
            ${renderBudgetHtml()}
          </div>
        </div>

        <div class="panel-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
            <h3 class="panel-heading" style="margin-bottom:0;">${escapeHtml(translate(lang, 'plan_schedule_title'))}</h3>
            <button type="button" class="btn btn-outline btn-sm no-print" id="btnClearSchedule">
              ${escapeHtml(translate(lang, 'btn_clear_schedule'))}
            </button>
          </div>
          <div id="plannerDaysContainer">${renderScheduleDaysHtml()}</div>
        </div>
      </div>
    </section>
  `;

  const refreshDynamicPanels = () => {
    const budgetBox = container.querySelector('#plannerBudgetBox');
    if (budgetBox) budgetBox.innerHTML = renderBudgetHtml();
    const daysBox = container.querySelector('#plannerDaysContainer');
    if (daysBox) {
      daysBox.innerHTML = renderScheduleDaysHtml();
      bindScheduleItemHandlers(daysBox);
    }
  };

  const bindScheduleItemHandlers = (daysBox) => {
    daysBox.querySelectorAll('[data-remove-act]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-remove-act'));
        store.removeActivity(idx);
      });
    });
    daysBox.querySelectorAll('[data-move-act]').forEach((sel) => {
      sel.addEventListener('change', () => {
        const idx = Number(sel.getAttribute('data-move-act'));
        store.moveActivityDay(idx, Number(sel.value));
      });
    });
  };

  const initialDaysBox = container.querySelector('#plannerDaysContainer');
  if (initialDaysBox) bindScheduleItemHandlers(initialDaysBox);

  // Silent state updates on text/number inputs so focus is preserved
  const syncConfigSilent = (patch) => {
    store.itinerary = { ...store.itinerary, ...patch };
    store.itinerary.jumlahWisatawan = Math.min(50, Math.max(1, Number(store.itinerary.jumlahWisatawan) || 1));
    store.itinerary.dailyEstPerPax = Math.max(0, Number(store.itinerary.dailyEstPerPax) || 0);
    store.persistPlan();
    const budgetBox = container.querySelector('#plannerBudgetBox');
    if (budgetBox) budgetBox.innerHTML = renderBudgetHtml();
  };

  container.querySelector('#planNameInput')?.addEventListener('input', (e) => {
    syncConfigSilent({ namaPerjalanan: e.target.value });
  });
  container.querySelector('#planDateInput')?.addEventListener('change', (e) => {
    syncConfigSilent({ tanggalMulai: e.target.value });
  });
  container.querySelector('#planPaxInput')?.addEventListener('input', (e) => {
    syncConfigSilent({ jumlahWisatawan: Number(e.target.value) });
  });
  container.querySelector('#planDailyInput')?.addEventListener('input', (e) => {
    syncConfigSilent({ dailyEstPerPax: Number(e.target.value) });
  });
  container.querySelector('#planHotelSelect')?.addEventListener('change', (e) => {
    syncConfigSilent({ hotelId: e.target.value });
  });
  container.querySelector('#planDaysSelect')?.addEventListener('change', (e) => {
    store.updateItineraryConfig({ jumlahHari: Number(e.target.value) });
  });

  container.querySelector('#btnAddActivity')?.addEventListener('click', () => {
    const day = Number(container.querySelector('#addActDaySelect')?.value || 1);
    const destId = container.querySelector('#addActDestSelect')?.value || '';
    if (store.addActivity(day, destId)) {
      refreshDynamicPanels();
    }
  });

  container.querySelector('#btnClearSchedule')?.addEventListener('click', () => {
    openConfirmModal(translate(store.lang, 'confirm_clear_plan'), () => {
      store.clearActivities();
    });
  });

  container.querySelector('#btnExportJson')?.addEventListener('click', () => {
    downloadItineraryJson();
    showToast('JSON exported.');
  });

  container.querySelector('#btnPrintPlan')?.addEventListener('click', () => {
    window.print();
  });
}
