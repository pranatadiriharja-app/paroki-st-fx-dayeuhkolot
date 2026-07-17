export interface KategorialGroup {
  id: string;
  name: string;
  category: 'Liturgi' | 'Pembinaan' | 'Pelayanan' | 'Persekutuan';
  shortDesc: string;
  description: string;
  imageUrl: string;
  bannerUrl: string;
  leaderName: string;
  viceLeaderName: string;
  secretaryName: string;
  treasurerName: string;
  advisorName: string;
  phone: string;
  email?: string;
  schedule: string;
  location: string;
  history: string;
  vision: string;
  mission: string[];
  activities: string[];
  gallery: string[];
}

export const KATEGORIAL_DATA: KategorialGroup[] = [
  {
    id: "omk",
    name: "Orang Muda Katolik (OMK)",
    category: "Persekutuan",
    shortDesc: "Wadah persekutuan, kreativitas, dan pembinaan iman bagi kaum muda katolik Paroki.",
    description: "Orang Muda Katolik (OMK) Paroki Santo Fransiskus Xaverius Dayeuhkolot adalah komunitas dinamis bagi pemuda-pemudi Katolik untuk mengekspresikan iman, bakat, dan semangat pelayanan sosial serta gerejani.",
    imageUrl: "https://res.cloudinary.com/ugnqb757/image/upload/v1784185419/omk_hmnjhu.png",
    bannerUrl: "https://res.cloudinary.com/ugnqb757/image/upload/v1784268009/Untitled_jjsst0.png",
    leaderName: "Andreas Kurniawan",
    viceLeaderName: "Bernadetta Shinta",
    secretaryName: "Agnes Yulianti",
    treasurerName: "Stefanus Setiadi",
    advisorName: "Pastor Rekan Paroki",
    phone: "0812-3456-7890",
    email: "omk.dayeuhkolot@gmail.com",
    schedule: "Setiap Hari Sabtu, Pukul 18.30 WIB",
    location: "Aula Paroki / Ruang OMK",
    history: "Didirikan sejak tahun 1995 sebagai wadah pemersatu kaum muda Katolik di Dayeuhkolot yang saat itu didominasi mahasiswa dari berbagai kampus di Bandung Selatan. Seiring berjalannya waktu, OMK bertumbuh menjadi pilar kreativitas paroki.",
    vision: "Menjadi garam dan terang dunia bagi kaum muda Katolik yang militan, solider, kreatif, serta berakar kuat dalam ajaran iman Gereja.",
    mission: [
      "Menyelenggarakan kegiatan pembinaan iman rohani kaum muda secara periodik.",
      "Mengembangkan bakat seni, musik, dan olahraga sebagai media pewartaan kasih.",
      "Membangun solidaritas sosial melalui kegiatan kemanusiaan dan bakti lingkungan.",
      "Melibatkan diri secara aktif dalam kegiatan liturgi dan kepanitiaan gereja."
    ],
    activities: [
      "Misa Kaum Muda (MKM) setiap bulan sekali.",
      "Ziarah rohani dan camping kebersamaan tahunan.",
      "Aksi sosial peduli lingkungan sekitar aliran sungai Citarum."
    ],
    gallery: [
      "https://res.cloudinary.com/ugnqb757/image/upload/v1784268009/Untitled_jjsst0.png",
      "https://res.cloudinary.com/ugnqb757/image/upload/v1784268009/Untitled_jjsst0.png",
      "https://res.cloudinary.com/ugnqb757/image/upload/v1784268009/Untitled_jjsst0.png"
    ]
  },
  {
    id: "wkri",
    name: "Wanita Katolik Republik Indonesia (WKRI)",
    category: "Pelayanan",
    shortDesc: "Organisasi kemasyarakatan wanita Katolik yang memperjuangkan nilai kemanusiaan dan keadilan sosial.",
    description: "WKRI Cabang Santo Fransiskus Xaverius Dayeuhkolot merupakan wadah perjuangan wanita Katolik dalam pengabdian kepada Gereja dan Negara melalui pelayanan kesejahteraan sosial, pendidikan keluarga, dan emansipasi wanita.",
    imageUrl: "https://res.cloudinary.com/ugnqb757/image/upload/v1784267573/WhatsApp_Image_2026-07-17_at_12.52.32_pavjgr.jpg",
    bannerUrl: "https://res.cloudinary.com/ugnqb757/image/upload/v1784267573/WhatsApp_Image_2026-07-17_at_12.52.32_pavjgr.jpg",
    leaderName: "Theresia Retno Setyowati",
    viceLeaderName: "Monica Sri Rahayu",
    secretaryName: "Christina Yeni",
    treasurerName: "Elisabeth Ratna",
    advisorName: "Ibu Maria Natalia",
    phone: "0812-2334-4556",
    email: "wkri.dayeuhkolot@gmail.com",
    schedule: "Setiap Jumat Pertama, Pukul 15.00 WIB",
    location: "Gedung Pastoral Lantai 1",
    history: "WKRI cabang Dayeuhkolot resmi dilantik pada tahun 1998. Bermula dari paguyuban ibu-ibu paroki yang ingin memberikan kontribusi nyata dalam membantu pemulihan ekonomi umat pasca-krisis moneter melalui program koperasi simpan pinjam.",
    vision: "Menjadi organisasi yang mandiri, memiliki kekuatan moral dan sosial yang tangguh, demi terwujudnya kesejahteraan bersama berdasarkan nilai-nilai Kristiani.",
    mission: [
      "Meningkatkan kualitas sumber daya wanita Katolik melalui pelatihan keterampilan praktis.",
      "Menjalankan aksi kepedulian sosial, kesehatan ibu dan anak, serta ketahanan pangan.",
      "Menjalin kerja sama oikumenis dan lintas agama dalam kegiatan kemasyarakatan.",
      "Mengawal pendidikan moral anak dalam keluarga Katolik."
    ],
    activities: [
      "Koperasi Simpan Pinjam mandiri bagi usaha mikro umat.",
      "Pemeriksaan kesehatan gratis dan posyandu lansia paroki.",
      "Pelatihan memasak, menjahit, dan daur ulang sampah bernilai jual.",
      "Bantuan sembako berkala 'Kasih Ibu' untuk keluarga prasejahtera."
    ],
    gallery: [
      "https://res.cloudinary.com/ugnqb757/image/upload/v1784267573/WhatsApp_Image_2026-07-17_at_12.52.32_pavjgr.jpg",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1531844113638-3a02c2e411b7?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "bia",
    name: "Bina Iman Anak (BIA)",
    category: "Pembinaan",
    shortDesc: "Pendampingan iman usia dini secara kreatif, gembira, dan sesuai ajaran Gereja Katolik.",
    description: "Bina Iman Anak (BIA) mendampingi anak-anak paroki usia balita hingga sekolah dasar kelas 3 untuk mengenal kasih Yesus Kristus melalui cerita Alkitab, lagu pujian, gerak, tari, serta permainan edukatif.",
    imageUrl: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=600&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80",
    leaderName: "Yuliana Kartika",
    viceLeaderName: "Clara Dian",
    secretaryName: "Anastasia Devi",
    treasurerName: "Hanna Novita",
    advisorName: "Sr. Clara, FMM",
    phone: "0814-4556-6778",
    email: "bia.dayeuhkolot@gmail.com",
    schedule: "Setiap Hari Minggu, Pukul 08.30 WIB (Paralel dengan Misa Kedua)",
    location: "Gedung Sekolah Minggu / Area Taman Gereja",
    history: "Dipelopori oleh para suster dan mudika paroki pada tahun 2000 untuk membantu para orang tua agar anak-anak mereka dapat beribadat dengan suasana menyenangkan saat misa hari raya berlangsung.",
    vision: "Menanamkan benih iman kristiani yang ceria, penuh kasih, dan taat kepada Tuhan sejak usia dini.",
    mission: [
      "Mengemas kisah-kisah Kitab Suci ke dalam metode yang mudah dipahami anak.",
      "Melatih anak membiasakan diri berdoa, berbagi, dan bersyukur setiap hari.",
      "Membantu anak mengenali tata perayaan ekaristi secara bertahap.",
      "Menyelenggarakan kegiatan kreatif yang memicu kecerdasan spiritual anak."
    ],
    activities: [
      "Ibadat sabda anak mingguan (menceritakan Injil melalui boneka tangan).",
      "Peringatan Hari Anak Misioner Sedunia (baksos celengan misioner).",
      "Lomba mewarnai, menggambar kisah Alkitab, dan menyanyi lagu rohani.",
      "Kunjungan edukatif ke panti asuhan anak yatim."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1503941090002-97c996f2a192?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "koor",
    name: "Paduan Santo Fransiskus Xaverius (Koor Paroki)",
    category: "Liturgi",
    shortDesc: "Melayani keindahan dan kemuliaan liturgi perayaan ekaristi melalui keindahan musik dan pujian.",
    description: "Cantate Domino adalah paduan suara utama paroki yang bertugas menyanyikan lagu-lagu liturgis bermutu tinggi, melatih pemazmur-pemazmur handal, serta mengiringi perayaan ekaristi besar gereja dengan harmoni suara yang memukau.",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
    leaderName: "Cecilia Indriati",
    viceLeaderName: "FX. Nugroho",
    secretaryName: "Bernadetta Rini",
    treasurerName: "Maria Shanti",
    advisorName: "Bpk. Yulius Sukardi",
    phone: "0812-3412-3412",
    email: "choir.dayeuhkolot@gmail.com",
    schedule: "Setiap Hari Kamis, Pukul 19.30 WIB",
    location: "Ruang Koor / Balkon Gereja Utama",
    history: "Dibentuk dari penggabungan kelompok koor lingkungan yang memiliki talenta bermusik menonjol pada tahun 1999. Hingga kini telah meraih beberapa penghargaan festival paduan suara gerejani tingkat keuskupan.",
    vision: "Melalui pujian kudus yang sehati sejiwa, kami menghantar umat masuk ke dalam misteri kehadiran Allah dalam perayaan ekaristi.",
    mission: [
      "Mengadakan latihan vokal teratur guna menghasilkan harmoni suara (sopran, alto, tenor, bass) yang seimbang.",
      "Membina talenta pemazmur paroki agar mampu mewartakan mazmur tanggapan dengan anggun.",
      "Melestarikan khazanah lagu gerejani klasik maupun kontemporer yang sesuai pedoman liturgi.",
      "Menjaga komitmen kedisiplinan dan kerendahan hati dalam melayani paduan suara."
    ],
    activities: [
      "Latihan vokal teratur dua kali seminggu menjelang penugasan.",
      "Pelatihan pembacaan not angka dan teknik pernapasan bagi pemula.",
      "Pelayanan rutin menyanyi dalam Misa Kudus mingguan.",
      "Konser amal natal atau paskah tahunan paroki."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "pdpkk",
    name: "Persekutuan Doa Pembaharuan Karismatik Katolik (PDPKK)",
    category: "Persekutuan",
    shortDesc: "Wadah doa pujian, penyembahan, dan pendalaman firman yang dipimpin oleh Roh Kudus.",
    description: "PDPKK mengajak umat menghidupkan kembali rahmat baptisan melalui pencurahan Roh Kudus. Karakteristik persekutuan doa kami dipenuhi nyanyian pujian meriah, khidmat, hening, karunia roh, serta kesaksian iman yang meneguhkan.",
    imageUrl: "https://res.cloudinary.com/ugnqb757/image/upload/v1784267989/WhatsApp_Image_2026-07-17_at_12.54.33_upntvx.jpg",
    bannerUrl: "https://res.cloudinary.com/ugnqb757/image/upload/v1784267988/WhatsApp_Image_2026-07-17_at_12.54.01_dnkatd.jpg",
    leaderName: "Heny",
    viceLeaderName: "Aloysius Gunawan",
    secretaryName: "Christina Yeni",
    treasurerName: "Lucia Melly",
    advisorName: "RD. Benedictus Hartono",
    phone: "0821-4455-6677",
    email: "pdpkk.dayeuhkolot@gmail.com",
    schedule: "Setiap Hari Rabu Malam, Pukul 19.30 WIB",
    location: "Aula Atas Gedung Pastoral",
    history: "Didirikan sejak tahun 1997, PDPKK Dayeuhkolot merupakan salah satu kelompok doa karismatik tertua di Bandung Selatan. Menjadi oase penyegaran rohani di tengah kepenatan aktivitas sehari-hari.",
    vision: "Melahirkan umat Katolik yang memiliki hubungan pribadi yang intim dengan Yesus Kristus, berkobar-kobar dalam sukacita Roh Kudus, dan aktif dalam perutusan gereja.",
    mission: [
      "Menyelenggarakan persekutuan doa berkala yang terbuka bagi seluruh umat.",
      "Mengadakan seminar hidup baru dalam Roh (SHBDR) secara berkala.",
      "Melatih pewarta-pewarta firman, pendoa syafaat, dan pemusik pujian karismatik.",
      "Mendukung kegiatan doa lingkungan-lingkungan di paroki."
    ],
    activities: [
      "Persekutuan doa mingguan (Pujian, Penyembahan, Firman, & Syafaat).",
      "Seminar Hidup Baru Dalam Roh (SHBDR) tahunan.",
      "Malam puji-pujian (Praise & Worship) menyambut hari Pentakosta."
    ],
    gallery: [
      "https://res.cloudinary.com/ugnqb757/image/upload/v1784267988/WhatsApp_Image_2026-07-17_at_12.54.01_dnkatd.jpg",
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80"
    ]
  }
];
