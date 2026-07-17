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
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
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
      "Latihan musik akustik dan band rohani.",
      "Ziarah rohani dan camping kebersamaan tahunan.",
      "Aksi sosial peduli lingkungan sekitar aliran sungai Citarum."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "legio-maria",
    name: "Legio Maria (Presidium Bunda Berbela Rasa)",
    category: "Persekutuan",
    shortDesc: "Kelompok kerasulan awam Maria yang melayani melalui doa rosario dan kunjungan rohani.",
    description: "Legio Maria adalah persekutuan umat beriman yang berada di bawah panji Maria. Berkomitmen melakukan karya kerasulan nyata seperti kunjungan rumah sakit, kunjungan umat sakit di rumah, dan doa rosario berkeliling.",
    imageUrl: "https://images.unsplash.com/photo-1544764200-d834fd210a23?auto=format&fit=crop&w=600&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=80",
    leaderName: "Lucia Indahwati",
    viceLeaderName: "Maria Yosephine",
    secretaryName: "Theresia Sulastri",
    treasurerName: "Clara Shanti",
    advisorName: "RD. Yohanes Budi",
    phone: "0813-9876-5432",
    email: "legio.maria.dayeuhkolot@gmail.com",
    schedule: "Setiap Hari Minggu, Pukul 11.30 WIB (Setelah Misa Kedua)",
    location: "Ruang Rapat Paroki Lt. 2",
    history: "Legio Maria Presidium Bunda Berbela Rasa berdiri di Paroki Dayeuhkolot pada tahun 2002. Terinspirasi oleh kebutuhan pelayanan spiritual yang mendalam bagi umat lansia dan sakit di daerah rawan banjir.",
    vision: "Mencapai kesucian pribadi melalui doa dan kerja sama aktif dalam mengadopsi semangat kerendahan hati dan ketulusan Bunda Maria.",
    mission: [
      "Melaksanakan pertemuan rutin mingguan dengan disiplin tinggi.",
      "Melaksanakan kunjungan kasih ke rumah-rumah umat yang sakit maupun lansia.",
      "Membantu membagikan komuni kudus bagi umat yang tidak bisa ke gereja.",
      "Mengkoordinir Doa Rosario di tingkat lingkungan pada bulan Mei dan Oktober."
    ],
    activities: [
      "Pertemuan presidium mingguan (Doa Catena & Alokusio).",
      "Kunjungan rohani bulanan ke panti jompo dan rumah sakit.",
      "Ziarah bersama ke Goa Maria Kaliori atau Sawer Rahmat.",
      "Apresiasi tahunan Acies Legio Maria."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1544764200-d834fd210a23?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "wkri",
    name: "Wanita Katolik Republik Indonesia (WKRI)",
    category: "Pelayanan",
    shortDesc: "Organisasi kemasyarakatan wanita Katolik yang memperjuangkan nilai kemanusiaan dan keadilan sosial.",
    description: "WKRI Cabang Santo Fransiskus Xaverius Dayeuhkolot merupakan wadah perjuangan wanita Katolik dalam pengabdian kepada Gereja dan Negara melalui pelayanan kesejahteraan sosial, pendidikan keluarga, dan emansipasi wanita.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=400&q=80",
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
    id: "bir",
    name: "Bina Iman Remaja (BIR)",
    category: "Pembinaan",
    shortDesc: "Pendampingan iman remaja dalam menghadapi masa transisi pencarian identitas diri.",
    description: "Bina Iman Remaja (BIR) merangkul anak-anak usia SMP (kelas 1-3) untuk saling berbagi pengalaman iman, berdiskusi mengenai etika pergaulan remaja, serta dibimbing agar tetap setia pada Kristus di tengah gempuran dunia digital.",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    leaderName: "Yoseph Edy",
    viceLeaderName: "Agnes Yanti",
    secretaryName: "Maria Natalia",
    treasurerName: "Cecilia Siska",
    advisorName: "RD. Antonius Joko",
    phone: "0813-4567-8912",
    email: "bir.dayeuhkolot@gmail.com",
    schedule: "Setiap Hari Minggu Dua Mingguan, Pukul 11.15 WIB",
    location: "Aula Pertemuan Atas Paroki",
    history: "Dibentuk pada tahun 2005 sebagai kelanjutan dari pembinaan BIA. Banyak remaja yang merasa 'lepas' setelah lulus komuni pertama, sehingga BIR hadir untuk menjembatani masa transisi tersebut sebelum mereka bergabung ke OMK.",
    vision: "Membentuk remaja Katolik yang berkarakter tangguh, kritis, berempati sosial, dan bangga akan identitas imannya.",
    mission: [
      "Mengadakan sharing kelompok kecil dan diskusi interaktif bertema remaja.",
      "Menggali nilai-nilai moral kristiani dalam menghadapi dilema keseharian remaja.",
      "Melatih bakat kepemimpinan dasar dan kerja sama kelompok sejak dini.",
      "Mengajak remaja peduli pada sesama melalui aksi nyata non-verbal."
    ],
    activities: [
      "Sharing iman tematik (persahabatan, medsos sehat, berbakti pada orang tua).",
      "Pentas drama rohani atau visualisasi kisah sengsara Yesus.",
      "Bimbingan belajar bersama dan bakti sosial ramah lingkungan.",
      "Latihan koor remaja untuk mengiringi misa paroki."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "lektor",
    name: "Korp Lektor & Lektoris Paroki",
    category: "Liturgi",
    shortDesc: "Petugas liturgi pembaca Sabda Allah dalam Perayaan Ekaristi Kudus paroki.",
    description: "Korp Lektor bertugas mewartakan Sabda Allah dari mimbar suci dalam setiap perayaan ekaristi. Anggotanya dibina secara khusus dalam hal teknik vokal, penjiwaan teks Kitab Suci, serta spiritualitas pewartaan.",
    imageUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    leaderName: "Andreas Danu",
    viceLeaderName: "Maria Veronika",
    secretaryName: "Agnes Maria",
    treasurerName: "Theresia Novi",
    advisorName: "Bpk. FX. Bambang Setiawan",
    phone: "0816-6778-8990",
    email: "lektor.dayeuhkolot@gmail.com",
    schedule: "Setiap Hari Kamis, Pukul 19.00 WIB",
    location: "Panti Imam / Altar Gereja Utama",
    history: "Lektor paroki berdiri sejak gereja ini didirikan. Komunitas ini terus bertransformasi menjadi korp mandiri yang terstruktur demi menjaga kesakralan dan kejelasan Sabda Tuhan yang dibacakan dalam ibadat resmi.",
    vision: "Menjadi pelayan firman yang kudus, anggun, berkarakter murni, serta mampu menyentuh hati umat melalui pembacaan kitab suci yang khidmat.",
    mission: [
      "Mempersiapkan petugas lektor dengan latihan pelafalan (artikulasi) dan intonasi yang matang.",
      "Mendalami makna teologis dari bacaan-bacaan misa sebelum bertugas.",
      "Menjaga kerapian penampilan, sikap tubuh, serta tata tertib petugas altar.",
      "Mengadakan regenerasi lektor muda secara rutin setiap tahun."
    ],
    activities: [
      "Latihan membaca teknis mingguan (mikrofon, pernapasan, postur tubuh).",
      "Rekoleksi spiritualitas pewarta sabda menjelang Pekan Suci.",
      "Audisi dan pelatihan intensif bagi calon anggota lektor baru.",
      "Studi banding liturgi ke paroki-paroki tetangga."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "asisten-imam",
    name: "Putra Altar & Misdinar",
    category: "Liturgi",
    shortDesc: "Asisten liturgi di altar suci yang membantu imam melayani Perayaan Ekaristi.",
    description: "Putra Altar dan Putri Sakristi (Misdinar) adalah sekelompok anak-anak dan remaja pilihan yang bertugas membantu imam di panti imam selama perayaan ekaristi, doa novena, adorasi sakramen mahakudus, maupun sakramen perkawinan.",
    imageUrl: "https://images.unsplash.com/photo-1548625361-155deee223d5?auto=format&fit=crop&w=600&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    leaderName: "Stefanus Edi",
    viceLeaderName: "Aloysius Harry",
    secretaryName: "Maria Susan",
    treasurerName: "Anastasia Vera",
    advisorName: "Pastor Paroki",
    phone: "0819-9001-1223",
    email: "misdinar.dayeuhkolot@gmail.com",
    schedule: "Setiap Hari Sabtu, Pukul 15.30 WIB",
    location: "Gereja Utama Paroki",
    history: "Misdinar Paroki Dayeuhkolot memiliki tradisi panjang sejak awal mula stasi ini bertumbuh menjadi paroki. Berdedikasi melatih kedisiplinan gerak, kepatuhan, serta kerapian tata ibadah.",
    vision: "Menjadi pelayan altar yang suci, tangkas, disiplin, rajin berdoa, dan menjadi teladan kekatolikan di lingkungan sekolah maupun rumah.",
    mission: [
      "Melaksanakan pelayanan di altar dengan gerakan yang sinkron, anggun, dan khidmat.",
      "Melatih pemahaman mendalam tentang alat-alat liturgi dan busana liturgi imam.",
      "Menanamkan persaudaraan yang erat antarmisdinar paroki.",
      "Menumbuhkan ketertarikan rohani terhadap panggilan menjadi Imam, Biarawan, atau Biarawati."
    ],
    activities: [
      "Latihan tata gerak altar mingguan (membawa lilin, dupa, sibori, dan piala).",
      "Pelantikan misdinar baru setiap Hari Raya Tubuh dan Darah Kristus.",
      "Ziarah, outbound bersama, dan turnamen olahraga persahabatan.",
      "Rekoleksi masa prapaskah dan masa adven khusus misdinar."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1548625361-155deee223d5?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "koor",
    name: "Paduan Suara Cantate Domino (Koor Paroki)",
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
    schedule: "Setiap Hari Rabu dan Jumat, Pukul 19.30 WIB",
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
    id: "pse",
    name: "Panitia Sosial Ekonomi (PSE)",
    category: "Pelayanan",
    shortDesc: "Pilar pelayanan sosial paroki untuk meningkatkan martabat hidup umat miskin dan marjinal.",
    description: "PSE bergerak di bidang karitatif, pemberdayaan ekonomi kreatif, serta aksi bantuan bencana darurat. Berkomitmen menjadi saluran berkat yang nyata dari sumbangan kolekte umat kepada yang membutuhkan.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
    leaderName: "Andreas Rudi",
    viceLeaderName: "Ignasius Heri",
    secretaryName: "Agnes Widya",
    treasurerName: "Lucia Nita",
    advisorName: "RD. Yohanes Kris",
    phone: "0813-4567-8912",
    email: "pse.dayeuhkolot@gmail.com",
    schedule: "Setiap Hari Selasa Pertama, Pukul 19.00 WIB",
    location: "Ruang Sosial Paroki (Samping Sekretariat)",
    history: "PSE didirikan sebagai respon atas kondisi geografis Dayeuhkolot yang sering mengalami banjir luapan Citarum.PSE bertransformasi dari sekedar tim pemberi mie instan menjadi pengelola dana solidaritas pendidikan dan modal usaha mandiri.",
    vision: "Terwujudnya umat paroki yang mandiri, sejahtera, bermartabat, serta peka terhadap penderitaan sesama tanpa memandang latar belakang.",
    mission: [
      "Mengelola dana solidaritas sosial paroki secara transparan, akuntabel, dan tepat sasaran.",
      "Menyalurkan bantuan biaya pendidikan (beasiswa) bagi anak sekolah kurang mampu.",
      "Melaksanakan tanggap darurat bencana banjir (dapur umum dan evakuasi medis).",
      "Memberikan pelatihan dan pinjaman stimulan tanpa bunga bagi UMKM umat."
    ],
    activities: [
      "Program Beasiswa Kasih untuk 50+ siswa sekolah dasar hingga menengah paroki.",
      "Penyediaan Posko Banjir Siaga Bencana setiap musim penghujan.",
      "Pasar Murah Sembako bersubsidi setiap menjelang Hari Raya Natal dan Paskah.",
      "Monitoring berkala UMKM penerima pinjaman kemitraan."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1469571486013-df6509b57e0e?auto=format&fit=crop&w=400&q=80"
    ]
  },
  {
    id: "pdpkk",
    name: "Persekutuan Doa Pembaharuan Karismatik Katolik (PDPKK)",
    category: "Persekutuan",
    shortDesc: "Wadah doa pujian, penyembahan, dan pendalaman firman yang dipimpin oleh Roh Kudus.",
    description: "PDPKK mengajak umat menghidupkan kembali rahmat baptisan melalui pencurahan Roh Kudus. Karakteristik persekutuan doa kami dipenuhi nyanyian pujian meriah, khidmat, hening, karunia roh, serta kesaksian iman yang meneguhkan.",
    imageUrl: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=600&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=80",
    leaderName: "Albertus Sugiarto",
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
      "Pelayanan doa pelepasan dan penghiburan bagi umat berbeban berat.",
      "Malam puji-pujian (Praise & Worship) menyambut hari Pentakosta."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80"
    ]
  }
];
