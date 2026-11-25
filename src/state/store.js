import { INITIAL_DATA } from '../data/seed.js';
import { getIllustrationUrl } from '../utils/illustrations.js';

const STORAGE_KEYS = {
  DB: 'meulangkah_db_v4',
  FAV: 'meulangkah_fav_v4',
  PLAN: 'meulangkah_plan_v4',
  LANG: 'meulangkah_lang_v4'
};

const VALID_VIEWS = new Set(['home', 'destinasi', 'kuliner', 'paket', 'planner', 'favorit', 'admin']);

function safeParse(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return structuredClone(fallback);
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function defaultItinerary() {
  return {
    id: 'ITN-01',
    namaPerjalanan: 'Eksplorasi Banda Aceh & Sabang',
    tanggalMulai: new Date().toISOString().split('T')[0],
    jumlahHari: 3,
    jumlahWisatawan: 2,
    dailyEstPerPax: 250000,
    hotelId: 'AKM-01',
    daftarAktivitas: [
      { day: 1, destId: 'DST-01' },
      { day: 1, destId: 'DST-02' },
      { day: 2, destId: 'DST-04' },
      { day: 3, destId: 'DST-07' }
    ]
  };
}

class AppStore {
  constructor() {
    this.db = safeParse(STORAGE_KEYS.DB, INITIAL_DATA);
    if (!Array.isArray(this.db.destinasi) || !Array.isArray(this.db.kuliner)) {
      this.db = structuredClone(INITIAL_DATA);
    }

    const storedFav = safeParse(STORAGE_KEYS.FAV, []);
    this.favorites = Array.isArray(storedFav) ? storedFav : [];

    const storedPlan = safeParse(STORAGE_KEYS.PLAN, defaultItinerary());
    this.itinerary = {
      ...defaultItinerary(),
      ...storedPlan,
      daftarAktivitas: Array.isArray(storedPlan.daftarAktivitas) ? storedPlan.daftarAktivitas : []
    };

    const storedLang = localStorage.getItem(STORAGE_KEYS.LANG);
    this.lang = storedLang === 'en' ? 'en' : 'id';

    const initialHash = window.location.hash.replace('#', '').trim();
    this.currentView = VALID_VIEWS.has(initialHash) ? initialHash : 'home';

    this.selectedRegion = 'Banda Aceh';
    this.culinaryTab = 'kuliner';
    this.adminEntity = 'destinasi';
    this.destFilter = { q: '', wilayah: 'ALL', kategori: 'ALL', sort: 'featured' };
    this.culinaryFilter = { q: '', wilayah: 'ALL', status: 'ALL' };
    this.stayFilter = { q: '', wilayah: 'ALL' };
    this.pkgFilter = { minat: 'ALL', maxDurasi: 5, maxBudget: 3500000 };

    this.listeners = new Set();
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this));
  }

  persistDb() {
    try {
      localStorage.setItem(STORAGE_KEYS.DB, JSON.stringify(this.db));
    } catch {
      /* ignore quota errors */
    }
  }

  persistFav() {
    try {
      localStorage.setItem(STORAGE_KEYS.FAV, JSON.stringify(this.favorites));
    } catch {
      /* ignore */
    }
  }

  persistPlan() {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(this.itinerary));
    } catch {
      /* ignore */
    }
  }

  setLang(lang) {
    this.lang = lang === 'en' ? 'en' : 'id';
    localStorage.setItem(STORAGE_KEYS.LANG, this.lang);
    document.documentElement.lang = this.lang;
    this.notify();
  }

  setView(view, updateHash = true) {
    const target = VALID_VIEWS.has(view) ? view : 'home';
    this.currentView = target;
    if (updateHash && window.location.hash !== `#${target}`) {
      window.location.hash = target;
    }
    this.notify();
  }

  setSelectedRegion(region) {
    this.selectedRegion = region;
    this.notify();
  }

  isFavorited(itemId, tipeItem) {
    return this.favorites.some((f) => f.itemId === itemId && f.tipeItem === tipeItem);
  }

  toggleFavorite(itemId, tipeItem) {
    const idx = this.favorites.findIndex((f) => f.itemId === itemId && f.tipeItem === tipeItem);
    let added = false;
    if (idx >= 0) {
      this.favorites.splice(idx, 1);
    } else {
      this.favorites.push({
        id: `FAV-${Date.now()}`,
        itemId,
        tipeItem,
        tanggalDitambahkan: new Date().toLocaleDateString('id-ID')
      });
      added = true;
    }
    this.persistFav();
    this.notify();
    return added;
  }

  updateItineraryConfig(patch) {
    this.itinerary = { ...this.itinerary, ...patch };
    const days = Math.min(5, Math.max(1, Number(this.itinerary.jumlahHari) || 1));
    this.itinerary.jumlahHari = days;
    this.itinerary.jumlahWisatawan = Math.min(50, Math.max(1, Number(this.itinerary.jumlahWisatawan) || 1));
    this.itinerary.dailyEstPerPax = Math.max(0, Number(this.itinerary.dailyEstPerPax) || 0);
    this.itinerary.daftarAktivitas = this.itinerary.daftarAktivitas.filter((a) => a.day <= days);
    this.persistPlan();
    this.notify();
  }

  addActivity(day, destId) {
    const d = Math.min(this.itinerary.jumlahHari, Math.max(1, Number(day) || 1));
    if (!this.db.destinasi.some((x) => x.id === destId)) return false;
    this.itinerary.daftarAktivitas.push({ day: d, destId });
    this.persistPlan();
    this.notify();
    return true;
  }

  moveActivityDay(index, newDay) {
    const act = this.itinerary.daftarAktivitas[index];
    if (!act) return;
    act.day = Math.min(this.itinerary.jumlahHari, Math.max(1, Number(newDay) || 1));
    this.persistPlan();
    this.notify();
  }

  removeActivity(index) {
    this.itinerary.daftarAktivitas.splice(index, 1);
    this.persistPlan();
    this.notify();
  }

  clearActivities() {
    this.itinerary.daftarAktivitas = [];
    this.persistPlan();
    this.notify();
  }

  applyPackage(pkgId) {
    const pkg = this.db.paket.find((p) => p.id === pkgId);
    if (!pkg) return null;
    const activities = [];
    pkg.daftarDestinasi.forEach((destName, idx) => {
      const found = this.db.destinasi.find((d) => d.nama.toLowerCase().includes(destName.toLowerCase()));
      if (found) {
        activities.push({ day: (idx % pkg.durasi) + 1, destId: found.id });
      }
    });
    this.itinerary.namaPerjalanan = pkg.nama;
    this.itinerary.jumlahHari = pkg.durasi;
    this.itinerary.daftarAktivitas = activities;
    this.persistPlan();
    this.setView('planner');
    return pkg;
  }

  computeBudget() {
    const pax = Math.max(1, Number(this.itinerary.jumlahWisatawan) || 1);
    const days = Math.max(1, Number(this.itinerary.jumlahHari) || 1);
    const nights = Math.max(0, days - 1);

    let ticketPerPax = 0;
    this.itinerary.daftarAktivitas.forEach((a) => {
      const dest = this.db.destinasi.find((x) => x.id === a.destId);
      if (dest) ticketPerPax += Number(dest.estimasiBiaya || 0);
    });
    const totalTickets = ticketPerPax * pax;

    const hotel = this.db.akomodasi.find((h) => h.id === this.itinerary.hotelId);
    const roomsNeeded = hotel ? Math.ceil(pax / 2) : 0;
    const totalHotel = hotel ? Number(hotel.hargaPerMalam || 0) * nights * roomsNeeded : 0;
    const totalDaily = Number(this.itinerary.dailyEstPerPax || 0) * days * pax;
    const grandTotal = totalTickets + totalHotel + totalDaily;

    return {
      pax,
      days,
      nights,
      roomsNeeded,
      hotelName: hotel ? hotel.nama : null,
      totalTickets,
      totalHotel,
      totalDaily,
      grandTotal,
      perPaxAvg: Math.round(grandTotal / pax)
    };
  }

  saveCrudRecord(entity, editId, record) {
    const list = this.db[entity];
    if (!Array.isArray(list)) return;

    if (editId) {
      const idx = list.findIndex((x) => x.id === editId);
      if (idx >= 0) {
        const category = record.kategori || (entity === 'akomodasi' ? 'Akomodasi' : 'Kuliner');
        list[idx] = {
          ...list[idx],
          ...record,
          imageUrl: getIllustrationUrl(category, record.nama, record.wilayah || 'Aceh')
        };
      }
    } else {
      const prefix = entity.slice(0, 3).toUpperCase();
      const newId = `${prefix}-${Math.floor(100 + Math.random() * 900)}`;
      const category = record.kategori || (entity === 'akomodasi' ? 'Akomodasi' : 'Kuliner');
      const extra =
        entity === 'destinasi'
          ? {
              imageUrl: getIllustrationUrl(category, record.nama, record.wilayah || 'Aceh'),
              mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${record.nama} Aceh`)}`,
              fasilitas: ['Parkir', 'Area Istirahat'],
              unggulan: false
            }
          : entity === 'paket'
            ? {}
            : { imageUrl: getIllustrationUrl(category, record.nama, record.wilayah || 'Aceh') };
      list.unshift({ id: newId, ...extra, ...record });
    }

    this.persistDb();
    this.notify();
  }

  deleteCrudRecord(entity, id) {
    if (!Array.isArray(this.db[entity])) return;
    this.db[entity] = this.db[entity].filter((x) => x.id !== id);
    if (entity === 'destinasi') {
      this.itinerary.daftarAktivitas = this.itinerary.daftarAktivitas.filter((a) => a.destId !== id);
      this.persistPlan();
    }
    this.persistDb();
    this.notify();
  }

  resetDemoDb() {
    this.db = structuredClone(INITIAL_DATA);
    this.persistDb();
    this.notify();
  }
}

export const store = new AppStore();
