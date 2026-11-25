import { getIllustrationUrl } from '../utils/illustrations.js';

export const REGION_INFO = {
  'Banda Aceh': {
    desc_id:
      'Ibu kota Provinsi Aceh, pusat wisata religi bersejarah, edukasi mitigasi tsunami, dan sentra kuliner legendaris.',
    desc_en:
      'Capital of Aceh Province, center of historic Islamic heritage, tsunami education, and legendary culinary spots.'
  },
  Sabang: {
    desc_id:
      'Destinasi bahari unggulan di Pulau Weh dengan kejernihan taman laut Pulau Rubiah dan Titik Nol Kilometer Indonesia.',
    desc_en:
      "Premier marine destination on Weh Island featuring crystal-clear Rubiah reefs and Indonesia's Zero Kilometer Monument."
  },
  'Aceh Besar': {
    desc_id:
      'Menawarkan perpaduan pantai berpasir putih Lhoknga-Lampuuk, bukit savana Lamreh, hingga masjid kuno Indrapuri.',
    desc_en:
      'Offers white-sand beaches of Lhoknga-Lampuuk, Lamreh savanna cliffs, and the ancient Indrapuri Mosque.'
  },
  'Aceh Tengah': {
    desc_id:
      'Jantung Dataran Tinggi Gayo (Takengon) dengan pesona Danau Lut Tawar, puncak Pantan Terong, dan budaya Gayo.',
    desc_en:
      'Heart of the Gayo Highlands (Takengon) featuring Lake Lut Tawar, Pantan Terong viewpoint, and rich Gayo heritage.'
  },
  'Bener Meriah': {
    desc_id:
      'Sentra agrowisata kopi Arabika Gayo mendunia, udara sejuk pegunungan, dan ekowisata air terjun alami.',
    desc_en:
      'Home to world-renowned Gayo Arabica coffee agrotourism, crisp mountain air, and natural waterfall trails.'
  }
};

export const INITIAL_DATA = {
  destinasi: [
    {
      id: 'DST-01',
      nama: 'Masjid Raya Baiturrahman',
      kategori: 'Religi',
      wilayah: 'Banda Aceh',
      deskripsi:
        'Ikon spiritual dan arsitektur kebanggaan masyarakat Aceh dengan payung elektrik megah, kolam pantul, dan sejarah ketangguhan sejak era Kesultanan Aceh.',
      imageUrl: getIllustrationUrl('Religi', 'Masjid Raya Baiturrahman', 'Banda Aceh'),
      alamat: 'Jl. Moh. Jam No.1, Kp. Baru, Kec. Baiturrahman, Kota Banda Aceh',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Masjid+Raya+Baiturrahman+Banda+Aceh',
      estimasiBiaya: 0,
      fasilitas: ['Area Parkir Luas', 'Pemandu Lokal', 'Peminjaman Busana Muslimah', 'Area Ramah Difabel'],
      fasilitasIbadah: ['Masjid Utama Ber-AC', 'Tempat Wudhu Terpisah Putra/Putri', 'Mukena & Sarung Bersih', 'Jadwal Kajian Rutin'],
      unggulan: true
    },
    {
      id: 'DST-02',
      nama: 'Museum Tsunami Aceh',
      kategori: 'Sejarah',
      wilayah: 'Banda Aceh',
      deskripsi:
        'Monumen edukasi dan ruang kontemplasi yang dirancang untuk mengenang peristiwa tsunami 2004 sekaligus pusat mitigasi bencana.',
      imageUrl: getIllustrationUrl('Sejarah', 'Museum Tsunami Aceh', 'Banda Aceh'),
      alamat: 'Jl. Sultan Iskandar Muda No.3, Sukaramai, Banda Aceh',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Museum+Tsunami+Aceh',
      estimasiBiaya: 15000,
      fasilitas: ['Ruang Audio Visual', 'Galeri Foto', 'Toko Suvenir', 'Toilet Umum'],
      fasilitasIbadah: ['Musholla di Lantai Dasar', 'Tempat Wudhu Terpisah', 'Penunjuk Arah Kiblat'],
      unggulan: true
    },
    {
      id: 'DST-03',
      nama: 'Museum Aceh & Rumoh Aceh',
      kategori: 'Budaya',
      wilayah: 'Banda Aceh',
      deskripsi:
        'Kompleks pelestarian budaya dengan rumah panggung tradisional Aceh (Rumoh Aceh), Lonceng Cakra Donya, dan koleksi manuskrip kuno.',
      imageUrl: getIllustrationUrl('Budaya', 'Museum Aceh & Rumoh Aceh', 'Banda Aceh'),
      alamat: 'Jl. Sultan Mahmudsyah No.10, Peuniti, Banda Aceh',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Museum+Aceh+Banda+Aceh',
      estimasiBiaya: 10000,
      fasilitas: ['Pemandu Budaya', 'Taman Edukasi', 'Area Foto Adat'],
      fasilitasIbadah: ['Musholla Bersih', 'Tempat Wudhu'],
      unggulan: false
    },
    {
      id: 'DST-04',
      nama: 'Pantai Iboih & Pulau Rubiah',
      kategori: 'Bahari',
      wilayah: 'Sabang',
      deskripsi:
        'Surga snorkeling berair jernih bak kristal dengan taman laut terjaga dan sejarah karantina haji pertama di Pulau Rubiah.',
      imageUrl: getIllustrationUrl('Bahari', 'Pantai Iboih & Pulau Rubiah', 'Sabang'),
      alamat: 'Iboih, Kec. Sukakarya, Kota Sabang, Pulau Weh',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Iboih+Sabang',
      estimasiBiaya: 150000,
      fasilitas: ['Sewa Perahu Kaca', 'Peralatan Snorkeling', 'Kamar Bilas Tertutup', 'Warung Halal'],
      fasilitasIbadah: ['Musholla Pantai Iboih', 'Musholla Pulau Rubiah', 'Tempat Wudhu Air Tawar'],
      unggulan: true
    },
    {
      id: 'DST-05',
      nama: 'Monumen Kilometer Nol Indonesia',
      kategori: 'Sejarah',
      wilayah: 'Sabang',
      deskripsi:
        'Penanda geografis ujung barat Nusantara yang menghadap langsung ke Samudra Hindia dengan panorama matahari terbenam yang memukau.',
      imageUrl: getIllustrationUrl('Sejarah', 'Monumen Kilometer Nol Indonesia', 'Sabang'),
      alamat: 'Iboih Ujung, Kec. Sukakarya, Kota Sabang',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Monumen+Kilometer+Nol+Sabang',
      estimasiBiaya: 20000,
      fasilitas: ['Sertifikat Kunjungan', 'Menara Pandang', 'Kios Kerajinan Sabang'],
      fasilitasIbadah: ['Musholla Area Parkir', 'Tempat Wudhu'],
      unggulan: false
    },
    {
      id: 'DST-06',
      nama: 'Pantai Sumur Tiga',
      kategori: 'Bahari',
      wilayah: 'Sabang',
      deskripsi:
        'Garis pantai berpasir putih lembut dengan deretan nyiur dan suasana tenang yang cocok untuk wisata keluarga Muslim.',
      imageUrl: getIllustrationUrl('Bahari', 'Pantai Sumur Tiga', 'Sabang'),
      alamat: 'Ie Meulee, Kec. Sukajaya, Kota Sabang',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Sumur+Tiga+Sabang',
      estimasiBiaya: 15000,
      fasilitas: ['Gazebo Keluarga', 'Area Bilas Terpisah', 'Kafe Kelapa Muda'],
      fasilitasIbadah: ['Musholla Gazebo', 'Tempat Wudhu'],
      unggulan: false
    },
    {
      id: 'DST-07',
      nama: 'Pantai Lampuuk & Masjid Rahmatullah',
      kategori: 'Bahari',
      wilayah: 'Aceh Besar',
      deskripsi:
        'Perpaduan wisata pantai berpasir putih dengan kunjungan ke Masjid Rahmatullah yang berdiri kokoh saat tsunami 2004.',
      imageUrl: getIllustrationUrl('Bahari', 'Pantai Lampuuk & Masjid Rahmatullah', 'Aceh Besar'),
      alamat: 'Meunasah Masjid, Lhoknga, Kabupaten Aceh Besar',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantai+Lampuuk+Aceh+Besar',
      estimasiBiaya: 25000,
      fasilitas: ['Pondok Keluarga', 'Kuliner Ikan Bakar', 'Area Parkir Luas'],
      fasilitasIbadah: ['Masjid Rahmatullah (Dekat)', 'Musholla Pantai', 'Tempat Wudhu'],
      unggulan: true
    },
    {
      id: 'DST-08',
      nama: 'Bukit Lamreh & Tebing Ujung Kelindu',
      kategori: 'Alam',
      wilayah: 'Aceh Besar',
      deskripsi:
        'Padang savana berbukit kapur yang menjorok ke Selat Malaka dengan lanskap biru kehijauan yang dramatis.',
      imageUrl: getIllustrationUrl('Alam', 'Bukit Lamreh & Ujung Kelindu', 'Aceh Besar'),
      alamat: 'Lamreh, Kec. Mesjid Raya, Kabupaten Aceh Besar',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bukit+Lamreh+Aceh+Besar',
      estimasiBiaya: 15000,
      fasilitas: ['Spot Foto Tebing', 'Area Trekking Ringan'],
      fasilitasIbadah: ['Musholla Desa Lamreh (1,5 km)', 'Disarankan membawa perlengkapan shalat portabel'],
      unggulan: false
    },
    {
      id: 'DST-09',
      nama: 'Masjid Tuha Indrapuri',
      kategori: 'Religi',
      wilayah: 'Aceh Besar',
      deskripsi:
        'Masjid bersejarah abad ke-17 berarsitektur atap tumpang tiga khas Nusantara yang dibangun di atas bekas fondasi candi Hindu masa lampau.',
      imageUrl: getIllustrationUrl('Religi', 'Masjid Tuha Indrapuri', 'Aceh Besar'),
      alamat: 'Pasar Indrapuri, Kec. Indrapuri, Kabupaten Aceh Besar',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Masjid+Tuha+Indrapuri+Aceh+Besar',
      estimasiBiaya: 0,
      fasilitas: ['Informasi Sejarah Cagar Budaya', 'Area Parkir'],
      fasilitasIbadah: ['Masjid Aktif Berjamaah', 'Kolam & Tempat Wudhu Tradisional'],
      unggulan: false
    },
    {
      id: 'DST-10',
      nama: 'Danau Lut Tawar & Pantan Terong',
      kategori: 'Alam',
      wilayah: 'Aceh Tengah',
      deskripsi:
        'Danau tektonik ikonik di jantung Tanah Gayo yang dapat dinikmati dari puncak Pantan Terong pada ketinggian ±1.830 mdpl.',
      imageUrl: getIllustrationUrl('Alam', 'Danau Lut Tawar & Pantan Terong', 'Aceh Tengah'),
      alamat: 'Takengon, Kec. Bebesen, Kabupaten Aceh Tengah',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pantan+Terong+Takengon',
      estimasiBiaya: 25000,
      fasilitas: ['Gardu Pandang', 'Kedai Kopi Gayo', 'Area Parkir'],
      fasilitasIbadah: ['Musholla Puncak Pantan Terong', 'Tempat Wudhu Air Pegunungan'],
      unggulan: true
    },
    {
      id: 'DST-11',
      nama: 'Goa Putri Pukes',
      kategori: 'Budaya',
      wilayah: 'Aceh Tengah',
      deskripsi:
        'Situs legenda masyarakat Gayo di tepian Danau Lut Tawar dengan formasi stalaktit unik yang sarat pesan kearifan lokal.',
      imageUrl: getIllustrationUrl('Budaya', 'Goa Putri Pukes', 'Aceh Tengah'),
      alamat: 'Mendale, Kec. Kebayakan, Kabupaten Aceh Tengah',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Goa+Putri+Pukes+Takengon',
      estimasiBiaya: 15000,
      fasilitas: ['Pemandu Cerita Rakyat', 'Penerangan Gua', 'Kios Kerawang Gayo'],
      fasilitasIbadah: ['Musholla Area Masuk', 'Tempat Wudhu'],
      unggulan: false
    },
    {
      id: 'DST-12',
      nama: 'Agrowisata Kebun Kopi Arabika Gayo',
      kategori: 'Kuliner',
      wilayah: 'Bener Meriah',
      deskripsi:
        'Wisata edukasi panen hingga proses roasting biji kopi Arabika Gayo bersertifikat Indikasi Geografis langsung bersama petani lokal.',
      imageUrl: getIllustrationUrl('Kuliner', 'Kebun Kopi Arabika Gayo', 'Bener Meriah'),
      alamat: 'Pondok Baru, Kec. Bandar, Kabupaten Bener Meriah',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kebun+Kopi+Gayo+Bener+Meriah',
      estimasiBiaya: 50000,
      fasilitas: ['Tur Kebun & Sangrai', 'Sesi Cupping Kopi', 'Toko Biji Kopi UMKM'],
      fasilitasIbadah: ['Musholla Kebun', 'Tempat Wudhu', 'Menu Kudapan Halal'],
      unggulan: true
    },
    {
      id: 'DST-13',
      nama: 'Air Terjun Tansaran Bidin',
      kategori: 'Alam',
      wilayah: 'Bener Meriah',
      deskripsi:
        'Air terjun alami setinggi ±50 meter yang tersembunyi di tengah rimbunnya hutan pinus dan perkebunan kopi Bener Meriah.',
      imageUrl: getIllustrationUrl('Alam', 'Air Terjun Tansaran Bidin', 'Bener Meriah'),
      alamat: 'Tansaran Bidin, Kec. Bandar, Kabupaten Bener Meriah',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Air+Terjun+Tansaran+Bidin',
      estimasiBiaya: 15000,
      fasilitas: ['Jalur Trekking', 'Saung Istirahat', 'Pemandu Pemuda Desa'],
      fasilitasIbadah: ['Musholla Pos Gerbang Utama', 'Tempat Wudhu'],
      unggulan: false
    },
    {
      id: 'DST-14',
      nama: 'Kawasan Kuliner Malam Rex Peunayong',
      kategori: 'Kuliner',
      wilayah: 'Banda Aceh',
      deskripsi:
        'Sentra kuliner malam legendaris di pusat kota yang menyajikan Mie Aceh kepiting, sate matang, martabak telur, hingga kopi sanger.',
      imageUrl: getIllustrationUrl('Kuliner', 'Kuliner Malam Rex Peunayong', 'Banda Aceh'),
      alamat: 'Jl. Khairil Anwar, Peunayong, Kec. Kuta Alam, Banda Aceh',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rex+Peunayong+Banda+Aceh',
      estimasiBiaya: 45000,
      fasilitas: ['Area Makan Terbuka', 'Parkir Tepi Jalan', 'Akses Transportasi Online'],
      fasilitasIbadah: ['Dekat Masjid Al-Makmur (Oman) & Musholla Sekitar'],
      unggulan: false
    }
  ],

  kuliner: [
    {
      id: 'KUL-01',
      nama: 'Mie Aceh Razali Peunayong (Simulasi)',
      kategori: 'Kuliner Utama',
      wilayah: 'Banda Aceh',
      harga: 35000,
      imageUrl: getIllustrationUrl('Kuliner', 'Mie Aceh Razali Peunayong', 'Banda Aceh'),
      statusSertifikasiHalal: 'Tersertifikasi Halal',
      sumberVerifikasi: 'BPJPH / LPPOM Aceh (No. Simulasi: ID111100012345)',
      kontak: '6281200001001'
    },
    {
      id: 'KUL-02',
      nama: 'Sate Gurita Pulau Weh (Simulasi)',
      kategori: 'Kuliner Bahari',
      wilayah: 'Sabang',
      harga: 30000,
      imageUrl: getIllustrationUrl('Kuliner', 'Sate Gurita Pulau Weh', 'Sabang'),
      statusSertifikasiHalal: 'Klaim Mandiri Ramah Muslim',
      sumberVerifikasi: 'Pernyataan Mandiri UMKM (Belum Verifikasi Sertifikat Resmi)',
      kontak: '6281200001002'
    },
    {
      id: 'KUL-03',
      nama: 'Ayam Tangkap & Sie Reuboh Indrapuri (Simulasi)',
      kategori: 'Kuliner Tradisional',
      wilayah: 'Aceh Besar',
      harga: 45000,
      imageUrl: getIllustrationUrl('Kuliner', 'Ayam Tangkap & Sie Reuboh', 'Aceh Besar'),
      statusSertifikasiHalal: 'Tersertifikasi Halal',
      sumberVerifikasi: 'BPJPH / LPPOM Aceh (No. Simulasi: ID111100067890)',
      kontak: '6281200001003'
    },
    {
      id: 'KUL-04',
      nama: 'Pengat Ikan Depik Lut Tawar (Simulasi)',
      kategori: 'Kuliner Gayo',
      wilayah: 'Aceh Tengah',
      harga: 40000,
      imageUrl: getIllustrationUrl('Kuliner', 'Pengat Ikan Depik Lut Tawar', 'Aceh Tengah'),
      statusSertifikasiHalal: 'Klaim Mandiri Ramah Muslim',
      sumberVerifikasi: 'Pernyataan Mandiri Pelaku Usaha Muslim (Dalam Proses Pendampingan)',
      kontak: '6281200001004'
    },
    {
      id: 'KUL-05',
      nama: 'Bubuk Kopi Arabika Gayo & Kue Timphan UMKM (Simulasi)',
      kategori: 'Produk UMKM Oleh-Oleh',
      wilayah: 'Bener Meriah',
      harga: 65000,
      imageUrl: getIllustrationUrl('Kuliner', 'Kopi Gayo & Kue Timphan', 'Bener Meriah'),
      statusSertifikasiHalal: 'Tersertifikasi Halal',
      sumberVerifikasi: 'BPJPH Self-Declare UMK (No. Simulasi: ID111100099112)',
      kontak: '6281200001005'
    },
    {
      id: 'KUL-06',
      nama: 'Kopi Sanger & Bakpia Sabang (Simulasi)',
      kategori: 'Produk UMKM Oleh-Oleh',
      wilayah: 'Sabang',
      harga: 38000,
      imageUrl: getIllustrationUrl('Kuliner', 'Kopi Sanger & Bakpia Sabang', 'Sabang'),
      statusSertifikasiHalal: 'Tersertifikasi Halal',
      sumberVerifikasi: 'BPJPH / LPPOM Aceh (No. Simulasi: ID111100055443)',
      kontak: '6281200001006'
    }
  ],

  akomodasi: [
    {
      id: 'AKM-01',
      nama: 'Hotel Darussalam Syariah (Simulasi)',
      wilayah: 'Banda Aceh',
      hargaPerMalam: 550000,
      fasilitas: ['Wi-Fi Cepat', 'Sarapan Halal', 'Area Parkir', 'Layanan Resepsionis 24 Jam'],
      fasilitasRamahMuslim: [
        'Sertifikasi Hotel Syariah (Simulasi)',
        "Al-Qur'an & Sajadah Tiap Kamar",
        'Penunjuk Arah Kiblat',
        'Musholla Lantai 2',
        'Bebas Alkohol'
      ],
      imageUrl: getIllustrationUrl('Akomodasi', 'Hotel Darussalam Syariah', 'Banda Aceh'),
      kontak: '6281200002001'
    },
    {
      id: 'AKM-02',
      nama: 'Iboih Crescent Muslim-Friendly Resort (Simulasi)',
      wilayah: 'Sabang',
      hargaPerMalam: 680000,
      fasilitas: ['Balkon Menghadap Laut', 'Akses Dermaga Snorkeling', 'AC & Air Hangat'],
      fasilitasRamahMuslim: [
        'Dapur 100% Bahan Halal',
        'Musholla Resort',
        'Alat Shalat di Kamar',
        'Privasi Keluarga Terjaga'
      ],
      imageUrl: getIllustrationUrl('Akomodasi', 'Iboih Crescent Resort', 'Sabang'),
      kontak: '6281200002002'
    },
    {
      id: 'AKM-03',
      nama: 'Lampuuk Coastal Homestay (Simulasi)',
      wilayah: 'Aceh Besar',
      hargaPerMalam: 320000,
      fasilitas: ['Kamar Keluarga', 'Dapur Bersama', 'Teras Taman'],
      fasilitasRamahMuslim: [
        'Dekat Masjid Rahmatullah (300m)',
        'Perlengkapan Shalat Lengkap',
        'Sarapan Kue Tradisional Halal'
      ],
      imageUrl: getIllustrationUrl('Akomodasi', 'Lampuuk Coastal Homestay', 'Aceh Besar'),
      kontak: '6281200002003'
    },
    {
      id: 'AKM-04',
      nama: 'Lut Tawar Highland Syariah Villa (Simulasi)',
      wilayah: 'Aceh Tengah',
      hargaPerMalam: 600000,
      fasilitas: ['Pemandangan Danau', 'Air Hangat', 'Perapian Teras', 'Kopi Gayo Gratis'],
      fasilitasRamahMuslim: ['Musholla Keluarga', 'Penunjuk Kiblat', 'Katering Halal Tersertifikasi'],
      imageUrl: getIllustrationUrl('Akomodasi', 'Lut Tawar Syariah Villa', 'Aceh Tengah'),
      kontak: '6281200002004'
    },
    {
      id: 'AKM-05',
      nama: 'Gayo Arabica Eco-Lodge (Simulasi)',
      wilayah: 'Bener Meriah',
      hargaPerMalam: 420000,
      fasilitas: ['Tengah Kebun Kopi', 'Tur Petik Kopi Pagi', 'Wi-Fi'],
      fasilitasRamahMuslim: [
        'Musholla Kayu & Wudhu Air Pegunungan',
        'Sajadah & Mukena Bersih',
        'Menu Sarapan Halal Lokal'
      ],
      imageUrl: getIllustrationUrl('Akomodasi', 'Gayo Arabica Eco-Lodge', 'Bener Meriah'),
      kontak: '6281200002005'
    }
  ],

  paket: [
    {
      id: 'PKT-01',
      nama: 'Jejak Religi & Tsunami Banda Aceh – Aceh Besar',
      durasi: 2,
      minat: 'Religi',
      daftarDestinasi: [
        'Masjid Raya Baiturrahman',
        'Museum Tsunami Aceh',
        'Museum Aceh & Rumoh Aceh',
        'Pantai Lampuuk & Masjid Rahmatullah'
      ],
      estimasiBiaya: 1150000,
      deskripsi:
        'Paket 2 hari 1 malam menyusuri warisan spiritual Kesultanan Aceh, edukasi sejarah tsunami, dan wisata pesisir Lhoknga.'
    },
    {
      id: 'PKT-02',
      nama: 'Pesona Bahari Halal Pulau Weh Sabang',
      durasi: 3,
      minat: 'Bahari',
      daftarDestinasi: [
        'Pantai Iboih & Pulau Rubiah',
        'Monumen Kilometer Nol Indonesia',
        'Pantai Sumur Tiga',
        'Masjid Raya Baiturrahman'
      ],
      estimasiBiaya: 2150000,
      deskripsi:
        'Paket 3 hari 2 malam termasuk tiket penyeberangan cepat, tur snorkeling taman laut Rubiah, dan kuliner bahari halal Sabang.'
    },
    {
      id: 'PKT-03',
      nama: 'Negeri di Atas Awan & Kopi Gayo',
      durasi: 3,
      minat: 'Alam',
      daftarDestinasi: [
        'Danau Lut Tawar & Pantan Terong',
        'Goa Putri Pukes',
        'Agrowisata Kebun Kopi Arabika Gayo',
        'Air Terjun Tansaran Bidin'
      ],
      estimasiBiaya: 1950000,
      deskripsi:
        'Eksplorasi kesejukan Takengon dan Bener Meriah, menikmati panorama Danau Lut Tawar serta pengalaman roasting kopi Gayo.'
    },
    {
      id: 'PKT-04',
      nama: 'Jelajah Budaya & Kuliner Autentik Aceh',
      durasi: 2,
      minat: 'Budaya',
      daftarDestinasi: [
        'Museum Aceh & Rumoh Aceh',
        'Masjid Tuha Indrapuri',
        'Kawasan Kuliner Malam Rex Peunayong',
        'Bukit Lamreh & Tebing Ujung Kelindu'
      ],
      estimasiBiaya: 980000,
      deskripsi:
        'Perjalanan singkat ramah anggaran untuk pecinta arsitektur tradisional, sejarah kuno Indrapuri, dan wisata kuliner halal.'
    },
    {
      id: 'PKT-05',
      nama: 'Grand Aceh Halal Expedition (5 Wilayah)',
      durasi: 5,
      minat: 'Alam',
      daftarDestinasi: [
        'Masjid Raya Baiturrahman',
        'Pantai Iboih & Pulau Rubiah',
        'Pantai Lampuuk & Masjid Rahmatullah',
        'Danau Lut Tawar & Pantan Terong',
        'Agrowisata Kebun Kopi Arabika Gayo'
      ],
      estimasiBiaya: 3450000,
      deskripsi:
        'Perjalanan komprehensif 5 hari 4 malam melintasi pesisir Banda Aceh, pulau Sabang, hingga dataran tinggi Gayo.'
    }
  ]
};
