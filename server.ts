import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

// A safe way to handle __dirname and __filename in both ESM (dev) and CJS (production bundle)
const getDirnameAndFilename = () => {
  try {
    if (typeof import.meta !== "undefined" && import.meta.url) {
      const filename = fileURLToPath(import.meta.url);
      const dirname = path.dirname(filename);
      return { __filename: filename, __dirname: dirname };
    }
  } catch (e) {
    // Ignore error and use CJS fallback
  }
  return { 
    __filename: typeof __filename !== "undefined" ? __filename : "", 
    __dirname: typeof __dirname !== "undefined" ? __dirname : "." 
  };
};

const { __filename, __dirname } = getDirnameAndFilename();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve static assets from the public folder directly
app.use(express.static(path.join(process.cwd(), "public")));

// Path to local database file
const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "db.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data
const initialData = {
  announcements: [
    {
      id: "ann-1",
      text: "Pengumuman: Pelayanan Perubahan Data Administrasi Kependudukan & Catatan Sipil diadakan pada Sabtu, 14 Maret 2026 di Gereja.",
      type: "info",
      active: true,
      createdAt: new Date().toISOString()
    }
  ],
  agenda: [
    {
      id: "ag-1",
      title: "Pelaksanaan Pelayanan Perubahan Data Administrasi Kependudukan & Catatan Sipil",
      content: "Paroki Santo Fransiskus Xaverius Dayeuhkolot bekerja sama dengan Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kabupaten Bandung akan menyelenggarakan pelayanan langsung administrasi kependudukan (KTP, KK, Akta Lahir, dll.) bagi jemaat gereja pada hari Sabtu, 14 Maret 2026 mulai pukul 09.00 WIB hingga selesai. Silakan membawa dokumen asli dan fotokopi berkas pendukung Anda ke aula gereja.",
      date: "2026-03-14",
      imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ag-2",
      title: "Pendaftaran Bina Iman Anak (BIA) & Bina Iman Remaja (BIR) Tahun Ajaran Baru",
      content: "Telah dibuka pendaftaran bagi anak-anak dan remaja Paroki Dayeuhkolot untuk bergabung dengan komunitas Bina Iman Anak (BIA) dan Bina Iman Remaja (BIR). Kegiatan pembinaan iman ini diadakan setiap hari Minggu setelah perayaan Ekaristi pagi. Orang tua diharapkan segera mendaftarkan putra-putrinya melalui e-formulir atau langsung ke koordinator BIA/BIR di pendopo gereja.",
      date: "2026-07-12",
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ag-3",
      title: "Kerja Bakti Sosial Lingkungan dan Kebersihan Area Kompleks Gereja",
      content: "Dalam rangka menyambut pesta pelindung Paroki Santo Fransiskus Xaverius, Dewan Pastoral Paroki mengundang perwakilan umat dari seluruh Lingkungan untuk berpartisipasi dalam kegiatan kerja bakti kebersihan dan penghijauan area gereja. Harap membawa peralatan kebersihan masing-masing. Kegiatan dimulai pukul 08.00 WIB.",
      date: "2026-07-19",
      imageUrl: "https://images.unsplash.com/photo-1559027615-cd4451a9962f?auto=format&fit=crop&w=800&q=80"
    }
  ],
  dpp: [
    {
      id: "dpp-1",
      role: "KETUA UMUM",
      category: "pimpinan",
      name: "R.D. Stefanus Tanto Agustiana",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "dpp-2",
      role: "KETUA",
      category: "pimpinan",
      name: "R.D. Antonius Jonmedi Tarigan",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "dpp-3",
      role: "WAKIL KETUA DPP 1",
      category: "wakil",
      name: "Drs. Ignasius Budi Prasetyo",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "dpp-4",
      role: "WAKIL KETUA DPP 2",
      category: "wakil",
      name: "Maria Clara Sutjiati",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "dpp-5",
      role: "SEKRETARIS 1",
      category: "sekretaris",
      name: "Yohanes Herryanto",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "dpp-6",
      role: "SEKRETARIS 2",
      category: "sekretaris",
      name: "Anastasia Maria",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "dpp-7",
      role: "BENDAHARA 1",
      category: "bendahara",
      name: "Elizabeth Setiawati",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    }
  ],
  lingkungan: [
    {
      id: "l-1",
      name: "Lingkungan Santo Fransiskus Asisi",
      leader: "Yulius Sukardi",
      phone: "081234567890",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Benediktus Anton",
      secretary: "Theresia Sulastri",
      treasurer: "Lucia Indah",
      kkCount: 42,
      groupImageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      notes: "Lingkungan aktif di perbatasan Dayeuhkolot dengan jadwal doa rosario bergilir setiap bulan Mei dan Oktober, ibadat sabda berkala tiap hari Jumat pertama, serta keterlibatan aktif koor di Gereja Paroki."
    },
    {
      id: "l-2",
      name: "Lingkungan Santa Maria Regina",
      leader: "Robertus Triadi",
      phone: "081398765432",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Stefanus Setiadi",
      secretary: "Agnes Monica Sari",
      treasurer: "Cecilia Larasati",
      kkCount: 35,
      groupImageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      notes: "Terkenal dengan semangat gotong royong yang tinggi dalam pelayanan paduan suara (koor) wilayah serta giat aksi bakti sosial peduli banjir tahunan Dayeuhkolot."
    },
    {
      id: "l-3",
      name: "Lingkungan Santo Yohanes Pembaptis",
      leader: "Fransiska Endah",
      phone: "085711223344",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Andreas Hermawan",
      secretary: "Bernadetta Shinta",
      treasurer: "Maria Yosephine",
      kkCount: 48,
      groupImageUrl: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
      notes: "Memiliki cakupan wilayah strategis di sekitar area kampus, sehingga banyak diperkuat oleh mahasiswa-mahasiswi Telkom University dan keluarga muda yang aktif bermusik gereja."
    },
    {
      id: "l-4",
      name: "Lingkungan Santo Petrus",
      leader: "Albertus Sugiarto",
      phone: "082144556677",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Aloysius Gunawan",
      secretary: "Christina Yeni",
      treasurer: "Elisabeth Ratna",
      kkCount: 51,
      groupImageUrl: "https://images.unsplash.com/photo-1464191308205-e1b6c55705a1?auto=format&fit=crop&w=800&q=80",
      notes: "Merupakan salah satu lingkungan terbesar dengan anggota KK terbanyak. Memiliki program andalan latihan koor intensif mingguan dan paguyuban persekutuan doa pasutri mandiri."
    },
    {
      id: "l-5",
      name: "Lingkungan Santa Teresa",
      leader: "Agnes Widya",
      phone: "081933445566",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Ignatius Wahyu",
      secretary: "Margaretha Lina",
      treasurer: "Clara Shanti",
      kkCount: 29,
      groupImageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      notes: "Sangat berdedikasi tinggi dalam melayani keindahan tata dekorasi altar gereja, kunjungan penghiburan rohani umat yang sakit, serta program bantuan beras kasih lansia."
    },
    {
      id: "l-6",
      name: "Lingkungan Santo Yosef",
      leader: "Benediktus Hartono",
      phone: "081122334455",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Yohanes Kris",
      secretary: "Maria Natalia",
      treasurer: "Anastasia Devi",
      kkCount: 38,
      groupImageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80",
      notes: "Terkenal dengan keaktifan bapak-bapak lingkungan dalam ronda keamanan bersama paroki, olahraga bulutangkis antarumat, serta katekese iman keluarga katolik."
    },
    {
      id: "l-7",
      name: "Lingkungan Santa Elisabeth",
      leader: "Theresia Retno",
      phone: "081223344556",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Stefanus Edi",
      secretary: "Maria Susan",
      treasurer: "Hanna Novita",
      kkCount: 33,
      groupImageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      notes: "Fokus pada pelayanan orang sakit, lansia, pembagian sembako, dan perkumpulan doa Ibu-Ibu paroki yang giat melaksanakan pembacaan Kitab Suci bersama."
    },
    {
      id: "l-8",
      name: "Lingkungan Santo Paulus",
      leader: "FX. Bambang Setiawan",
      phone: "081334455667",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Antonius Joko",
      secretary: "Lucia Melly",
      treasurer: "Agnes Linda",
      kkCount: 40,
      groupImageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      notes: "Mengutamakan pendampingan iman bagi kalangan remaja dan anak-anak (BIA/BIR) serta aktif menginisiasi ziarah paroki tahunan ke berbagai goa Maria di Jawa Barat."
    },
    {
      id: "l-9",
      name: "Lingkungan Santa Bernadette",
      leader: "Yuliana Kartika",
      phone: "081445566778",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Hendrikus Hari",
      secretary: "Clara Dian",
      treasurer: "Elisabeth Nia",
      kkCount: 27,
      groupImageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      notes: "Terkenal dengan kerukunan paguyuban rosario dan ibadat sabda malam yang rutin dihadiri keluarga muda untuk mempererat iman kristiani yang tangguh."
    },
    {
      id: "l-10",
      name: "Lingkungan Santo Agustinus",
      leader: "Ignasius Heri",
      phone: "081556677889",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Yohanes Guntur",
      secretary: "Anastasia Ririn",
      treasurer: "Cecilia Siska",
      kkCount: 45,
      groupImageUrl: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
      notes: "Aktif menyelenggarakan diskusi iman dan teologi praktis sederhana, melatih koor lingkungan, serta peduli dengan bantuan sosial pendidikan anak kurang mampu."
    },
    {
      id: "l-11",
      name: "Lingkungan Santa Clara",
      leader: "Lucia Tri Wahyuni",
      phone: "081667788990",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Andreas Danu",
      secretary: "Agnes Maria",
      treasurer: "Theresia Novi",
      kkCount: 31,
      groupImageUrl: "https://images.unsplash.com/photo-1464191308205-e1b6c55705a1?auto=format&fit=crop&w=800&q=80",
      notes: "Anggota lingkungan memiliki komitmen tinggi dalam menjaga kekompakan paduan suara dan giat mengadakan aksi kebersihan lingkungan kapel stasi terdekat."
    },
    {
      id: "l-12",
      name: "Lingkungan Santo Ignasius Loyola",
      leader: "Andreas Setiawan",
      phone: "081778899001",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Benediktus Surya",
      secretary: "Maria Veronika",
      treasurer: "Lucia Nita",
      kkCount: 36,
      groupImageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      notes: "Menghayati spiritualitas Ignasian dalam pelayanan, aktif dalam doa perenungan hening, pendampingan pasutri, serta pembinaan kader kepemimpinan kaum muda gereja."
    },
    {
      id: "l-13",
      name: "Lingkungan Santa Monika",
      leader: "Monica Sri Rahayu",
      phone: "081889900112",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "FX. Harianto",
      secretary: "Elisabeth Tina",
      treasurer: "Maria Susi",
      kkCount: 34,
      groupImageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80",
      notes: "Lingkungan yang hangat dengan fokus utama pada doa ibu untuk anak dan keluarga, aksi kepedulian sosial, serta kunjungan ke panti asuhan yatim piatu terdekat."
    },
    {
      id: "l-14",
      name: "Lingkungan Santo Stefanus",
      leader: "Stefanus Gunadi",
      phone: "081990011223",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Yohanes Budi",
      secretary: "Clara Mega",
      treasurer: "Anastasia Vera",
      kkCount: 39,
      groupImageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      notes: "Sangat aktif dalam pelayanan liturgi (putra altar/misdinar dan lektor), pembacaan Kitab Suci bersama, serta mendukung penuh kegiatan sarana fisik gereja paroki."
    },
    {
      id: "l-15",
      name: "Lingkungan Santa Cecilia",
      leader: "Cecilia Indriati",
      phone: "081234123412",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "FX. Nugroho",
      secretary: "Bernadetta Rini",
      treasurer: "Maria Shanti",
      kkCount: 41,
      groupImageUrl: "https://images.unsplash.com/photo-151795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      notes: "Pusat dari paduan suara handal di paroki. Rutin mengadakan latihan pemazmur dan kor, serta mengiringi perayaan ekaristi besar dengan penuh sukacita."
    },
    {
      id: "l-16",
      name: "Lingkungan Santo Andreas",
      leader: "Andreas Rudi",
      phone: "081345678912",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Yoseph Edy",
      secretary: "Agnes Yanti",
      treasurer: "Theresia Linda",
      kkCount: 30,
      groupImageUrl: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
      notes: "Memiliki kepedulian yang tinggi pada pelestarian lingkungan hidup dan asri di sekitar rumah warga serta aktif mendonorkan darah secara berkala dalam aksi sosial."
    },
    {
      id: "l-17",
      name: "Lingkungan Santa Agnes",
      leader: "Agnes Pratiwi",
      phone: "081987654321",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      viceLeader: "Aloysius Harry",
      secretary: "Maria Rosita",
      treasurer: "Elisabeth Eva",
      kkCount: 32,
      groupImageUrl: "https://images.unsplash.com/photo-1464191308205-e1b6c55705a1?auto=format&fit=crop&w=800&q=80",
      notes: "Lingkungan baru yang dipenuhi keluarga muda energik. Sangat aktif dalam pendampingan anak-anak, mengelola arisan sosial katolik, dan mengadakan doa bersama mingguan."
    }
  ],
  sacramentRegistrations: [],
  suggestions: []
};

// Database read helper
function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf8");
      return initialData;
    }
    const data = fs.readFileSync(DB_PATH, "utf8");
    const parsed = JSON.parse(data);
    if (!parsed.lingkungan || parsed.lingkungan.length < 17) {
      parsed.lingkungan = initialData.lingkungan;
      fs.writeFileSync(DB_PATH, JSON.stringify(parsed, null, 2), "utf8");
    }
    return parsed;
  } catch (error) {
    console.error("Error reading database:", error);
    return initialData;
  }
}

// Database write helper
function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing database:", error);
  }
}

// --- MySQL Connection and Database initialization ---

let useMySql = false;
let pool: mysql.Pool | null = null;

async function createTables() {
  if (!pool) return;
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS announcements (
      id VARCHAR(50) PRIMARY KEY,
      text TEXT NOT NULL,
      type VARCHAR(50) DEFAULT 'info',
      active BOOLEAN DEFAULT TRUE,
      createdAt VARCHAR(100)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS agenda (
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      date VARCHAR(50) NOT NULL,
      imageUrl TEXT
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS dpp (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      category VARCHAR(50) NOT NULL,
      imageUrl TEXT
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS lingkungan (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      leader VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS sacrament_registrations (
      id VARCHAR(50) PRIMARY KEY,
      fullName VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL,
      sacramentType VARCHAR(100) NOT NULL,
      birthPlaceDate VARCHAR(255) NOT NULL,
      address TEXT NOT NULL,
      details TEXT,
      status VARCHAR(50) DEFAULT 'Pending',
      createdAt VARCHAR(100)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS suggestions (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      createdAt VARCHAR(100)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS dokumentasi (
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date VARCHAR(50) NOT NULL,
      googlePhotosUrl TEXT,
      imageUrl TEXT
    )
  `);
}

async function seedMySql() {
  if (!pool) return;
  
  // Seed announcements
  const [annRows] = await pool.query<any[]>("SELECT COUNT(*) as count FROM announcements");
  if ((annRows[0]?.count || 0) === 0) {
    for (const ann of initialData.announcements) {
      await pool.query(
        "INSERT INTO announcements (id, text, type, active, createdAt) VALUES (?, ?, ?, ?, ?)",
        [ann.id, ann.text, ann.type, ann.active ? 1 : 0, ann.createdAt]
      );
    }
  }

  // Seed agenda
  const [agendaRows] = await pool.query<any[]>("SELECT COUNT(*) as count FROM agenda");
  if ((agendaRows[0]?.count || 0) === 0) {
    for (const item of initialData.agenda) {
      await pool.query(
        "INSERT INTO agenda (id, title, content, date, imageUrl) VALUES (?, ?, ?, ?, ?)",
        [item.id, item.title, item.content, item.date, item.imageUrl]
      );
    }
  }

  // Seed dpp
  const [dppRows] = await pool.query<any[]>("SELECT COUNT(*) as count FROM dpp");
  if ((dppRows[0]?.count || 0) === 0) {
    for (const item of initialData.dpp) {
      await pool.query(
        "INSERT INTO dpp (id, name, role, category, imageUrl) VALUES (?, ?, ?, ?, ?)",
        [item.id, item.name, item.role, item.category, item.imageUrl]
      );
    }
  }

  // Seed lingkungan
  const [lingRows] = await pool.query<any[]>("SELECT COUNT(*) as count FROM lingkungan");
  if ((lingRows[0]?.count || 0) === 0) {
    for (const item of initialData.lingkungan) {
      await pool.query(
        "INSERT INTO lingkungan (id, name, leader, phone) VALUES (?, ?, ?, ?)",
        [item.id, item.name, item.leader, item.phone]
      );
    }
  }
}

async function initDb() {
  const mysqlHost = process.env.DB_HOST || process.env.MYSQL_HOST;
  const mysqlUser = process.env.DB_USER || process.env.MYSQL_USER;
  const mysqlPassword = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD;
  const mysqlDatabase = process.env.DB_DATABASE || process.env.MYSQL_DATABASE;
  const mysqlPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
  const mysqlUrl = process.env.MYSQL_URL;

  if (mysqlUrl || (mysqlHost && mysqlUser && mysqlDatabase)) {
    try {
      console.log("MySQL configuration found. Connecting to MySQL...");
      if (mysqlUrl) {
        pool = mysql.createPool(mysqlUrl);
      } else {
        pool = mysql.createPool({
          host: mysqlHost,
          user: mysqlUser,
          password: mysqlPassword,
          database: mysqlDatabase,
          port: mysqlPort,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
          ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined
        });
      }
      
      const connection = await pool.getConnection();
      console.log("MySQL connection successful!");
      connection.release();
      
      useMySql = true;
      
      await createTables();
      await seedMySql();
    } catch (err) {
      console.error("Failed to connect to MySQL database:", err);
      console.log("Falling back to local db.json database.");
      useMySql = false;
    }
  } else {
    console.log("No MySQL environment variables found. Using local db.json database.");
    useMySql = false;
  }
}

let useFirestore = false;
let db: any = null;

async function initFirestore() {
  try {
    const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
    if (fs.existsSync(firebaseConfigPath)) {
      const config = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf8"));
      if (config.projectId) {
        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
          try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            initializeApp({
              credential: cert(serviceAccount),
              projectId: config.projectId
            });
            console.log("Firestore initialized using service account credential from environment variable.");
          } catch (e) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env variable, falling back to default.", e);
            initializeApp({
              projectId: config.projectId
            });
          }
        } else {
          initializeApp({
            projectId: config.projectId
          });
        }
        
        const firestoreDb = getFirestore(config.firestoreDatabaseId || undefined);
        
        // Test query
        await firestoreDb.collection("dpp").limit(1).get();
        
        db = firestoreDb;
        useFirestore = true;
        console.log(`Firestore connected successfully using projectId: ${config.projectId}`);
        await seedFirestore();
      }
    }
  } catch (error) {
    console.error("Firestore connection failed. Falling back to local/MySQL database.", error);
    useFirestore = false;
  }
}

async function seedFirestore() {
  if (!db) return;
  try {
    const localData = readDB();
    
    // 1. Sync dpp
    const dppRef = db.collection("dpp");
    const dppSnap = await dppRef.get();
    const existingDppIds = new Set(dppSnap.docs.map(doc => doc.id));
    for (const item of (localData.dpp || [])) {
      if (!existingDppIds.has(item.id)) {
        console.log(`Syncing missing dpp ${item.id} to Firestore`);
        await dppRef.doc(item.id).set(item);
      }
    }
    
    // 2. Sync lingkungan
    const lingRef = db.collection("lingkungan");
    const lingSnap = await lingRef.get();
    const existingLingIds = new Set(lingSnap.docs.map(doc => doc.id));
    for (const item of (localData.lingkungan || [])) {
      if (!existingLingIds.has(item.id)) {
        console.log(`Syncing missing lingkungan ${item.id} to Firestore`);
        await lingRef.doc(item.id).set(item);
      }
    }
    
    console.log("Firestore seeding/sync completed from db.json.");
  } catch (err) {
    console.error("Failed to seed/sync Firestore:", err);
  }
}

// Database service layer with fallback to file database
const dbService = {
  getAnnouncements: async () => {
    const local = readDB();
    return local.announcements || [];
  },
  
  addAnnouncement: async (text: string, type: string, active: boolean) => {
    const id = "ann-" + Date.now();
    const createdAt = new Date().toISOString();
    
    const local = readDB();
    local.announcements = (local.announcements || []).map((a: any) => ({ ...a, active: false }));
    const newAnn = { id, text, type: type || "info", active, createdAt };
    local.announcements.unshift(newAnn);
    writeDB(local);
    return newAnn;
  },

  getAgenda: async () => {
    const local = readDB();
    const list = local.agenda || [];
    // Return sorted by date descending/ascending or preserved as is in db.json
    return list;
  },

  addAgenda: async (title: string, content: string, date: string, imageUrl: string, category?: string) => {
    const id = "ag-" + Date.now();
    const img = imageUrl || "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80";
    const cat = category || "agenda";
    
    const local = readDB();
    const newItem = { id, title, content, date, imageUrl: img, category: cat };
    local.agenda = local.agenda || [];
    local.agenda.unshift(newItem);
    writeDB(local);
    return newItem;
  },

  updateAgenda: async (id: string, updates: any) => {
    const local = readDB();
    let found = false;
    local.agenda = (local.agenda || []).map((item: any) => {
      if (item.id === id) {
        found = true;
        return {
          ...item,
          title: updates.title !== undefined ? updates.title : item.title,
          content: updates.content !== undefined ? updates.content : item.content,
          date: updates.date !== undefined ? updates.date : item.date,
          imageUrl: updates.imageUrl !== undefined ? updates.imageUrl : item.imageUrl,
          category: updates.category !== undefined ? updates.category : item.category
        };
      }
      return item;
    });
    if (!found) return null;
    writeDB(local);
    return { success: true, agenda: local.agenda };
  },

  deleteAgenda: async (id: string) => {
    const local = readDB();
    local.agenda = (local.agenda || []).filter((item: any) => item.id !== id);
    writeDB(local);
    return { success: true };
  },

  getDPP: async () => {
    if (useFirestore && db) {
      const snap = await db.collection("dpp").get();
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else if (useMySql && pool) {
      const [rows] = await pool.query<any[]>("SELECT * FROM dpp");
      return rows;
    } else {
      const local = readDB();
      return local.dpp || [];
    }
  },

  addDPP: async (name: string, role: string, category: string, imageUrl: string) => {
    const id = "dpp-" + Date.now();
    const cat = category || "seksi";
    const img = imageUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";
    
    if (useFirestore && db) {
      await db.collection("dpp").doc(id).set({ id, name, role, category: cat, imageUrl: img });
      return { id, name, role, category: cat, imageUrl: img };
    } else if (useMySql && pool) {
      await pool.query(
        "INSERT INTO dpp (id, name, role, category, imageUrl) VALUES (?, ?, ?, ?, ?)",
        [id, name, role, cat, img]
      );
      return { id, name, role, category: cat, imageUrl: img };
    } else {
      const local = readDB();
      const newItem = { id, name, role, category: cat, imageUrl: img };
      local.dpp = local.dpp || [];
      local.dpp.push(newItem);
      writeDB(local);
      return newItem;
    }
  },

  updateDPP: async (id: string, updates: any) => {
    if (useFirestore && db) {
      const docRef = db.collection("dpp").doc(id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) return null;
      const current = docSnap.data() || {};
      const updated = {
        name: updates.name !== undefined ? updates.name : current.name,
        role: updates.role !== undefined ? updates.role : current.role,
        category: updates.category !== undefined ? updates.category : current.category,
        imageUrl: updates.imageUrl !== undefined ? updates.imageUrl : current.imageUrl
      };
      await docRef.update(updated);
      return { success: true };
    } else if (useMySql && pool) {
      const [rows] = await pool.query<any[]>("SELECT * FROM dpp WHERE id = ?", [id]);
      if (rows.length === 0) return null;
      const current = rows[0];
      
      const name = updates.name !== undefined ? updates.name : current.name;
      const role = updates.role !== undefined ? updates.role : current.role;
      const category = updates.category !== undefined ? updates.category : current.category;
      const imageUrl = updates.imageUrl !== undefined ? updates.imageUrl : current.imageUrl;
      
      await pool.query(
        "UPDATE dpp SET name = ?, role = ?, category = ?, imageUrl = ? WHERE id = ?",
        [name, role, category, imageUrl, id]
      );
      return { success: true };
    } else {
      const local = readDB();
      local.dpp = (local.dpp || []).map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            name: updates.name !== undefined ? updates.name : item.name,
            role: updates.role !== undefined ? updates.role : item.role,
            category: updates.category !== undefined ? updates.category : item.category,
            imageUrl: updates.imageUrl !== undefined ? updates.imageUrl : item.imageUrl
          };
        }
        return item;
      });
      writeDB(local);
      return { success: true, dpp: local.dpp };
    }
  },

  deleteDPP: async (id: string) => {
    if (useFirestore && db) {
      await db.collection("dpp").doc(id).delete();
      return { success: true };
    } else if (useMySql && pool) {
      await pool.query("DELETE FROM dpp WHERE id = ?", [id]);
      return { success: true };
    } else {
      const local = readDB();
      local.dpp = (local.dpp || []).filter((item: any) => item.id !== id);
      writeDB(local);
      return { success: true };
    }
  },

  getLingkungan: async () => {
    if (useFirestore && db) {
      const snap = await db.collection("lingkungan").get();
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else if (useMySql && pool) {
      const [rows] = await pool.query<any[]>("SELECT * FROM lingkungan");
      return rows;
    } else {
      const local = readDB();
      return local.lingkungan || [];
    }
  },
  
  updateLingkungan: async (id: string, updates: any) => {
    if (useFirestore && db) {
      const docRef = db.collection("lingkungan").doc(id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) return null;
      const current = docSnap.data() || {};
      const updated = {
        name: updates.name !== undefined ? updates.name : current.name,
        leader: updates.leader !== undefined ? updates.leader : current.leader,
        phone: updates.phone !== undefined ? updates.phone : current.phone
      };
      await docRef.update(updated);
      return { success: true };
    } else if (useMySql && pool) {
      const [rows] = await pool.query<any[]>("SELECT * FROM lingkungan WHERE id = ?", [id]);
      if (rows.length === 0) return null;
      const current = rows[0];
      
      const name = updates.name !== undefined ? updates.name : current.name;
      const leader = updates.leader !== undefined ? updates.leader : current.leader;
      const phone = updates.phone !== undefined ? updates.phone : current.phone;
      
      await pool.query(
        "UPDATE lingkungan SET name = ?, leader = ?, phone = ? WHERE id = ?",
        [name, leader, phone, id]
      );
      return { success: true };
    } else {
      const local = readDB();
      local.lingkungan = (local.lingkungan || []).map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            name: updates.name !== undefined ? updates.name : item.name,
            leader: updates.leader !== undefined ? updates.leader : item.leader,
            phone: updates.phone !== undefined ? updates.phone : item.phone
          };
        }
        return item;
      });
      writeDB(local);
      return { success: true, lingkungan: local.lingkungan };
    }
  },

  getSacramentRegistrations: async () => {
    if (useFirestore && db) {
      const snap = await db.collection("sacramentRegistrations").orderBy("createdAt", "desc").get();
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else if (useMySql && pool) {
      const [rows] = await pool.query<any[]>("SELECT * FROM sacrament_registrations ORDER BY createdAt DESC");
      return rows;
    } else {
      const local = readDB();
      return local.sacramentRegistrations || [];
    }
  },

  addSacramentRegistration: async (data: any) => {
    const id = "reg-" + Date.now();
    const createdAt = new Date().toISOString();
    const status = "Pending";
    const details = data.details || "";
    
    if (useFirestore && db) {
      await db.collection("sacramentRegistrations").doc(id).set({ id, ...data, details, status, createdAt });
      return { id, ...data, details, status, createdAt };
    } else if (useMySql && pool) {
      await pool.query(
        "INSERT INTO sacrament_registrations (id, fullName, phone, email, sacramentType, birthPlaceDate, address, details, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, data.fullName, data.phone, data.email, data.sacramentType, data.birthPlaceDate, data.address, details, status, createdAt]
      );
      return { id, ...data, details, status, createdAt };
    } else {
      const local = readDB();
      const newRegistration = { id, ...data, details, status, createdAt };
      local.sacramentRegistrations = local.sacramentRegistrations || [];
      local.sacramentRegistrations.unshift(newRegistration);
      writeDB(local);
      return newRegistration;
    }
  },

  updateSacramentRegistrationStatus: async (id: string, status: string) => {
    if (useFirestore && db) {
      await db.collection("sacramentRegistrations").doc(id).update({ status });
      return { success: true };
    } else if (useMySql && pool) {
      await pool.query("UPDATE sacrament_registrations SET status = ? WHERE id = ?", [status, id]);
      return { success: true };
    } else {
      const local = readDB();
      local.sacramentRegistrations = (local.sacramentRegistrations || []).map((item: any) => {
        if (item.id === id) {
          return { ...item, status };
        }
        return item;
      });
      writeDB(local);
      return { success: true, sacramentRegistrations: local.sacramentRegistrations };
    }
  },

  getSuggestions: async () => {
    if (useFirestore && db) {
      const snap = await db.collection("suggestions").orderBy("createdAt", "desc").get();
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else if (useMySql && pool) {
      const [rows] = await pool.query<any[]>("SELECT * FROM suggestions ORDER BY createdAt DESC");
      return rows;
    } else {
      const local = readDB();
      return local.suggestions || [];
    }
  },

  addSuggestion: async (name: string, email: string, message: string) => {
    const id = "sug-" + Date.now();
    const createdAt = new Date().toISOString();
    
    if (useFirestore && db) {
      await db.collection("suggestions").doc(id).set({ id, name, email, message, createdAt });
      return { id, name, email, message, createdAt };
    } else if (useMySql && pool) {
      await pool.query(
        "INSERT INTO suggestions (id, name, email, message, createdAt) VALUES (?, ?, ?, ?, ?)",
        [id, name, email, message, createdAt]
      );
      return { id, name, email, message, createdAt };
    } else {
      const local = readDB();
      const newSuggestion = { id, name, email, message, createdAt };
      local.suggestions = local.suggestions || [];
      local.suggestions.unshift(newSuggestion);
      writeDB(local);
      return newSuggestion;
    }
  },

  getDokumentasi: async () => {
    const local = readDB();
    return local.dokumentasi || [];
  },

  addDokumentasi: async (title: string, date: string, googlePhotosUrl: string, imageUrl: string) => {
    const id = "doc-" + Date.now();
    const img = imageUrl || "https://images.unsplash.com/photo-1548625361-155deee22154?auto=format&fit=crop&w=400&q=80";
    
    const local = readDB();
    const newItem = { id, title, date, googlePhotosUrl, imageUrl: img };
    local.dokumentasi = local.dokumentasi || [];
    local.dokumentasi.push(newItem);
    writeDB(local);
    return newItem;
  },

  updateDokumentasi: async (id: string, updates: any) => {
    const local = readDB();
    let found = false;
    local.dokumentasi = (local.dokumentasi || []).map((item: any) => {
      if (item.id === id) {
        found = true;
        return {
          ...item,
          title: updates.title !== undefined ? updates.title : item.title,
          date: updates.date !== undefined ? updates.date : item.date,
          googlePhotosUrl: updates.googlePhotosUrl !== undefined ? updates.googlePhotosUrl : item.googlePhotosUrl,
          imageUrl: updates.imageUrl !== undefined ? updates.imageUrl : item.imageUrl
        };
      }
      return item;
    });
    if (!found) return null;
    writeDB(local);
    return { success: true, dokumentasi: local.dokumentasi };
  },

  deleteDokumentasi: async (id: string) => {
    const local = readDB();
    local.dokumentasi = (local.dokumentasi || []).filter((item: any) => item.id !== id);
    writeDB(local);
    return { success: true };
  }
};

// --- API ENDPOINTS ---

// Admin login verification
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  // Allow both admin/admin (as seen in local/mock testing guides) and admin/admin321 for superadmin
  if (username === "admin" && (password === "admin" || password === "admin321")) {
    res.json({ success: true, token: "sfxd-auth-token-2026-secret-superadmin", role: "superadmin" });
  } else if (username === "admin" && password === "admin111") {
    res.json({ success: true, token: "sfxd-auth-token-2026-secret-sekretariat", role: "sekretariat" });
  } else {
    res.status(401).json({ success: false, message: "Username atau Password salah. Gunakan admin/admin atau admin/admin321 untuk superadmin." });
  }
});

// GET active announcements
app.get("/api/announcements", async (req, res) => {
  try {
    const list = await dbService.getAnnouncements();
    const activeAnnouncements = list.filter((a: any) => a.active);
    res.json(activeAnnouncements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

// POST update announcement (admin)
app.post("/api/admin/announcements", async (req, res) => {
  const { text, type, active } = req.body;
  try {
    const newAnn = await dbService.addAnnouncement(text, type, active);
    res.json(newAnn);
  } catch (error) {
    res.status(500).json({ error: "Failed to add announcement" });
  }
});

// GET all agenda items
app.get("/api/agenda", async (req, res) => {
  try {
    const list = await dbService.getAgenda();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch agenda" });
  }
});

// POST add agenda item (admin)
app.post("/api/admin/agenda", async (req, res) => {
  const { title, content, date, imageUrl, category } = req.body;
  try {
    const newItem = await dbService.addAgenda(title, content, date, imageUrl, category);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add agenda" });
  }
});

// PUT update agenda item (admin)
app.put("/api/admin/agenda/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, date, imageUrl, category } = req.body;
  try {
    const result = await dbService.updateAgenda(id, { title, content, date, imageUrl, category });
    if (!result) return res.status(404).json({ error: "Agenda not found" });
    const list = await dbService.getAgenda();
    res.json({ success: true, agenda: list });
  } catch (error) {
    res.status(500).json({ error: "Failed to update agenda" });
  }
});

// DELETE agenda item (admin)
app.delete("/api/admin/agenda/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbService.deleteAgenda(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete agenda" });
  }
});

// GET all DPP members
app.get("/api/dpp", async (req, res) => {
  try {
    const list = await dbService.getDPP();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch DPP" });
  }
});

// POST add DPP member (admin)
app.post("/api/admin/dpp", async (req, res) => {
  const { name, role, category, imageUrl } = req.body;
  try {
    const newItem = await dbService.addDPP(name, role, category, imageUrl);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add DPP member" });
  }
});

// PUT update DPP member (admin)
app.put("/api/admin/dpp/:id", async (req, res) => {
  const { id } = req.params;
  const { name, role, category, imageUrl } = req.body;
  try {
    const result = await dbService.updateDPP(id, { name, role, category, imageUrl });
    if (!result) return res.status(404).json({ error: "DPP member not found" });
    const list = await dbService.getDPP();
    res.json({ success: true, dpp: list });
  } catch (error) {
    res.status(500).json({ error: "Failed to update DPP member" });
  }
});

// DELETE DPP member (admin)
app.delete("/api/admin/dpp/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbService.deleteDPP(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete DPP member" });
  }
});

// GET all environments
app.get("/api/lingkungan", async (req, res) => {
  try {
    const list = await dbService.getLingkungan();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lingkungan" });
  }
});

// PUT update environment (admin)
app.put("/api/admin/lingkungan/:id", async (req, res) => {
  const { id } = req.params;
  const { name, leader, phone } = req.body;
  try {
    const result = await dbService.updateLingkungan(id, { name, leader, phone });
    if (!result) return res.status(404).json({ error: "Lingkungan not found" });
    const list = await dbService.getLingkungan();
    res.json({ success: true, lingkungan: list });
  } catch (error) {
    res.status(500).json({ error: "Failed to update lingkungan" });
  }
});

// GET sacrament registrations (admin)
app.get("/api/sacrament-registrations", async (req, res) => {
  try {
    const list = await dbService.getSacramentRegistrations();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sacrament registrations" });
  }
});

// POST create sacrament registration (public)
app.post("/api/sacrament-registrations", async (req, res) => {
  const { fullName, phone, email, sacramentType, birthPlaceDate, address, details } = req.body;
  try {
    const newReg = await dbService.addSacramentRegistration({ fullName, phone, email, sacramentType, birthPlaceDate, address, details });
    res.json({ success: true, data: newReg });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit registration" });
  }
});

// PUT update sacrament registration status (admin)
app.put("/api/admin/sacrament-registrations/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await dbService.updateSacramentRegistrationStatus(id, status);
    if (!result) return res.status(404).json({ error: "Registration not found" });
    const list = await dbService.getSacramentRegistrations();
    res.json({ success: true, data: list });
  } catch (error) {
    res.status(500).json({ error: "Failed to update registration status" });
  }
});

// GET all suggestions (admin)
app.get("/api/suggestions", async (req, res) => {
  try {
    const list = await dbService.getSuggestions();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

// POST submit a suggestion (public)
app.post("/api/suggestions", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newSuggestion = await dbService.addSuggestion(name, email, message);
    
    // OPTIONAL: Google Sheets API Integration
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        console.log("Sending suggestion to Google Sheets:", newSuggestion);
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sheet: "Kotak Saran",
            data: {
              Tanggal: new Date(newSuggestion.createdAt).toLocaleString("id-ID"),
              Nama: newSuggestion.name,
              Email: newSuggestion.email,
              Pesan: newSuggestion.message
            }
          })
        });
      } catch (err) {
        console.error("Failed to forward suggestion to Google Sheets webhook:", err);
      }
    } else {
      console.log("Google Sheets webhook URL is not configured. Saved suggestion locally.");
    }
    
    res.json({ success: true, data: newSuggestion });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit suggestion" });
  }
});

// POST endpoint to upload a local image (saves in local public folder)
app.post("/api/admin/upload-image", async (req, res) => {
  const { base64Data, filename } = req.body;
  if (!base64Data) {
    return res.status(400).json({ error: "Missing base64Data" });
  }
  try {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 data format" });
    }
    const ext = matches[1].split("/")[1] || "jpg";
    const buffer = Buffer.from(matches[2], "base64");
    
    // Create safe clean filename
    const safeBaseName = filename ? filename.replace(/[^a-zA-Z0-9.\-_]/g, "_") : "upload";
    const cleanName = `${Date.now()}_${safeBaseName}.${ext}`;
    
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const publicPath = path.join(publicDir, cleanName);
    fs.writeFileSync(publicPath, buffer);
    
    // Write to dist too if in production build runtime
    const distPublicDir = path.join(process.cwd(), "dist");
    if (fs.existsSync(distPublicDir)) {
      const distPublicPath = path.join(distPublicDir, cleanName);
      fs.writeFileSync(distPublicPath, buffer);
    }
    
    res.json({ success: true, url: `/${cleanName}` });
  } catch (error) {
    console.error("Failed to upload image:", error);
    res.status(500).json({ error: "Failed to save image locally" });
  }
});

// GET all documentation items
app.get("/api/dokumentasi", async (req, res) => {
  try {
    const list = await dbService.getDokumentasi();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documentation" });
  }
});

// POST add a new documentation item (admin)
app.post("/api/admin/dokumentasi", async (req, res) => {
  const { title, date, googlePhotosUrl, imageUrl } = req.body;
  try {
    const newItem = await dbService.addDokumentasi(title, date, googlePhotosUrl, imageUrl);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add documentation item" });
  }
});

// PUT update documentation item (admin)
app.put("/api/admin/dokumentasi/:id", async (req, res) => {
  const { id } = req.params;
  const { title, date, googlePhotosUrl, imageUrl } = req.body;
  try {
    const result = await dbService.updateDokumentasi(id, { title, date, googlePhotosUrl, imageUrl });
    if (!result) return res.status(404).json({ error: "Documentation item not found" });
    const list = await dbService.getDokumentasi();
    res.json({ success: true, dokumentasi: list });
  } catch (error) {
    res.status(500).json({ error: "Failed to update documentation item" });
  }
});

// DELETE documentation item (admin)
app.delete("/api/admin/dokumentasi/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbService.deleteDokumentasi(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete documentation item" });
  }
});

// Vite Middleware & SPA serving
export async function startServer() {
  await initDb();
  await initFirestore();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {
  startServer();
}

export { app, initDb };

