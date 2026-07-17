import React, { useState } from "react";
import { 
  Users, Award, Shield, X, Briefcase, Heart, BookOpen, Flame, 
  CheckCircle2, Compass, HelpCircle, Landmark
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DewanPastoral } from "../types";

interface DewanPastoralCompProps {
  dpp: DewanPastoral[];
}

interface Member {
  id: string;
  name: string;
  role: string;
  category: string;
  imageUrl: string;
  jobdesk: string;
  subRole?: string;
  phone?: string;
}

export default function DewanPastoralComp({ dpp }: DewanPastoralCompProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Hardcoded highly complete 2024-2029 Dewan Pastoral data based on the user's explicit request
  const pimpinan: Member[] = [
    {
      id: "p-1",
      role: "Pastor / Romo Paroki",
      subRole: "Ketua Umum",
      category: "pimpinan",
      name: "RD. Stefanus Tanto Agustiana",
      imageUrl: "/pastor_stefanus_1783397946213.jpg",
      jobdesk: "Bertanggung jawab penuh atas seluruh reksa pastoral paroki, reksa iman jemaat, pelayanan sakramen, koordinasi seluruh bidang, serta memimpin arah kebijakan gerejawi Keuskupan Bandung di Paroki Dayeuhkolot."
    },
    {
      id: "p-2",
      role: "Pastor / Romo Vikaris",
      subRole: "Ketua",
      category: "pimpinan",
      name: "RD. Antonius Jonmedi Tarigan",
      imageUrl: "/pastor_antonius_1783397963388.jpg",
      jobdesk: "Membantu Pastor Paroki dalam reksa pastoral harian paroki, pendampingan kelompok kategorial (kaum muda, BIA/BIR), pelaksanaan tugas sakramental liturgi, serta koordinasi umum bidang-bidang pastoral."
    }
  ];

  const wakil: Member[] = [
    {
      id: "w-1",
      role: "WAKIL KETUA DPP 1",
      subRole: "Dewan Pengurus Harian",
      category: "wakil",
      name: "Ignasius Budi Prasetyo",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Mengkoordinasikan program kerja bidang Liturgi, Pewartaan, dan Persaudaraan. Berperan aktif menyelaraskan rencana anggaran belanja (RAPB) demi tercapainya kemandirian umat."
    },
    {
      id: "w-2",
      role: "WAKIL KETUA DPP 2",
      subRole: "Dewan Pengurus Harian",
      category: "wakil",
      name: "Maria Clara Sutjiati",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Mengkoordinasikan program kerja bidang Pelayanan dan Umum. Mengawasi pemeliharaan kompleks fisik gereja, reksa sosial umat kurang mampu, serta perizinan sarana paroki."
    }
  ];

  const sekretaris: Member[] = [
    {
      id: "s-1",
      role: "SEKRETARIS UTAMA",
      subRole: "Koordinator",
      category: "sekretaris",
      name: "Yohanes Herryanto",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Mengelola tata persuratan resmi paroki, perizinan gerejawi, penjadwalan ibadat besar, pelaporan sinode keuskupan, serta pengawasan administrasi sekretariat gereja secara menyeluruh."
    },
    {
      id: "s-2",
      role: "SEKRETARIS 1",
      subRole: "Administrasi",
      category: "sekretaris",
      name: "Anastasia Maria",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Menyelenggarakan pencatatan buku besar sakramen baptis, komuni pertama, krisma, pernikahan, dan kematian umat. Membantu notulensi rapat berkala DPP."
    },
    {
      id: "s-3",
      role: "SEKRETARIS 2",
      subRole: "Diseminasi Data",
      category: "sekretaris",
      name: "Yohanes Herryanto",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Mengelola pemutakhiran statistik database Kartu Keluarga (KK) Katolik Paroki, berkoordinasi dengan ketua lingkungan, serta menyiapkan lembar warta paroki mingguan."
    }
  ];

  const bendahara: Member[] = [
    {
      id: "b-1",
      role: "BENDAHARA 1",
      subRole: "Sistem Keuangan",
      category: "bendahara",
      name: "Elizabeth Setiawati",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Mengelola seluruh kas masuk dan pengeluaran paroki, menyusun rencana anggaran biaya (RAPB) tahunan, serta membuat pelaporan keuangan akuntabel berkala kepada keuskupan."
    },
    {
      id: "b-2",
      role: "BENDAHARA 2",
      subRole: "Kas Operasional",
      category: "bendahara",
      name: "Ani Suminah",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Mengelola dana kas kecil operasional gereja sehari-hari, mendata setoran kolekte dan persembahan mingguan umat, serta mengurus verifikasi kuitansi belanja bidang."
    }
  ];

  const bidang: Member[] = [
    {
      id: "bid-1",
      role: "Bidang Liturgi",
      subRole: "Ketua Bidang",
      category: "bidang",
      name: "Hendrikus Suwandi",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Mengoordinir persiapan perayaan liturgi Ekaristi, ibadat sabda, pembinaan koor/paduan suara, pemazmur, lektor, kelompok putra altar (misdinar), serta keindahan tata altar."
    },
    {
      id: "bid-2",
      role: "Bidang Pewartaan",
      subRole: "Ketua Bidang",
      category: "bidang",
      name: "Lucia Natalia Sari",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Mengoordinasi Bina Iman Anak (BIA), Bina Iman Remaja (BIR), pendampingan katekumen sakramen inisiasi, katekese berkala keluarga, serta penyebaran warta kabar gembira digital."
    },
    {
      id: "bid-3",
      role: "Bidang Persaudaraan",
      subRole: "Ketua Bidang",
      category: "bidang",
      name: "Drs. Agustinus Hermawan",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Mengembangkan relasi persaudaraan sejati internal lintas kelompok kategorial paroki (lansia, pasutri, wanita katolik), serta menjalin dialog kerukunan damai eksternal antar-agama."
    },
    {
      id: "bid-4",
      role: "Bidang Pelayanan",
      subRole: "Ketua Bidang",
      category: "bidang",
      name: "Elisabeth Maria Endang",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Mengelola aksi kemanusiaan paroki (PSE), penyaluran santunan sosial dan pangan darurat wilayah banjir, program beasiswa bantuan sekolah anak paroki, serta pelayanan kedukaan."
    },
    {
      id: "bid-5",
      role: "Bidang Umum",
      subRole: "Ketua Bidang",
      category: "bidang",
      name: "FX. Heri Prasetyo",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      jobdesk: "Mengurus kebersihan kompleks paroki, pemeliharaan fisik gedung gereja/aula, pengurusan administrasi kepemilikan aset paroki, perizinan sipil, serta sistem pengamanan kompleks."
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="relative border-b border-[#E5E3DB] pb-8 text-center max-w-4xl mx-auto space-y-4">
        <span className="relative z-10 text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-4 py-2 rounded-full uppercase tracking-widest">
          STRUKTUR ORGANISASI PAROKI
        </span>
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#2D3E50] mt-3 tracking-tight">
          Dewan Pastoral Paroki (DPP)
        </h1>
        <div className="space-y-1">
          <p className="text-[#2D3E50] text-lg md:text-xl font-extrabold tracking-tight">
            Paroki Santo Fransiskus Xaverius
          </p>
          <p className="text-[#2D3E50]/80 text-sm md:text-base font-semibold">
            Dayeuhkolot Bandung
          </p>
          <p className="text-[#7C7A74] text-xs font-bold uppercase tracking-wider">
            Masa Bakti / Periode 2024 - 2029
          </p>
        </div>
        <p className="text-[#D4AF37] text-xs md:text-sm max-w-xl mx-auto font-serif italic font-semibold">
          &ldquo;Berjalan Bersama Sehati Sejiwa, menjadi Gereja yang Relevan, Berdaya dan Misioner.&rdquo;
        </p>
        
        <div className="inline-flex items-center gap-2 text-[10px] text-[#2D3E50] font-bold uppercase tracking-wider bg-[#D4AF37]/15 border border-[#D4AF37]/35 px-4 py-1.5 rounded-full shadow-xs mt-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span>💡 Klik kartu untuk detail tugas & tanggung jawab pelayanan.</span>
        </div>
      </div>

      {/* 1. KETUA & WAKIL KETUA DPP */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="text-center border-b border-[#E5E3DB] pb-2">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#7C7A74]">Pimpinan Utama DPP</h2>
          <h3 className="text-base font-extrabold text-[#2D3E50]">Ketua & Wakil Ketua DPP</h3>
        </div>

        {/* Pimpinan (Pastor) Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {pimpinan.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="bg-white rounded-3xl overflow-hidden border border-[#E5E3DB] p-6 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-[#D4AF37] transition-all cursor-pointer hover:scale-[1.01] duration-300 group relative"
            >
              <div className="absolute top-4 right-4 text-[#D4AF37] opacity-20 group-hover:opacity-100 transition-opacity">
                <Shield className="h-4 w-4" />
              </div>
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#D4AF37]/15 group-hover:border-[#D4AF37] transition-all duration-300 relative bg-slate-50">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  referrerPolicy={member.imageUrl.startsWith("http") ? "no-referrer" : undefined}
                />
              </div>
              <div className="space-y-1">
                <span className="text-[8px] font-extrabold text-[#7C7A74] bg-[#F5F4F0] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#E5E3DB] group-hover:bg-[#D4AF37] group-hover:text-slate-950 transition-all">
                  {member.subRole}
                </span>
                <p className="text-[10px] text-[#D4AF37] font-bold block pt-1">{member.role}</p>
                <h4 className="font-extrabold text-[#2D3E50] text-sm tracking-tight group-hover:text-[#D4AF37] transition-colors">
                  {member.name}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Wakil Ketua Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2">
          {wakil.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="bg-white rounded-3xl overflow-hidden border border-[#E5E3DB] p-6 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-[#D4AF37] transition-all cursor-pointer hover:scale-[1.01] duration-300 group"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#D4AF37]/15 group-hover:border-[#D4AF37] transition-all duration-300 bg-slate-50">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  referrerPolicy={member.imageUrl.startsWith("http") ? "no-referrer" : undefined}
                />
              </div>
              <div className="space-y-1">
                <span className="text-[8px] font-extrabold text-[#7C7A74] bg-[#F5F4F0] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#E5E3DB] group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37] transition-colors">
                  {member.role}
                </span>
                <h4 className="font-extrabold text-[#2D3E50] text-sm tracking-tight pt-1.5 group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {member.name}
                </h4>
                <p className="text-[9px] text-[#7C7A74] font-semibold block uppercase tracking-wider">{member.subRole}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. DPH: SEKRETARIS & BENDAHARA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto pt-4">
        
        {/* Sekretaris Box */}
        <div className="bg-[#F5F4F0]/60 rounded-3xl p-5 border border-[#E5E3DB] space-y-4">
          <div className="border-b border-[#E5E3DB] pb-2 flex items-center gap-2">
            <div className="p-1.5 bg-[#2D3E50]/10 text-[#2D3E50] rounded-lg">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-[#2D3E50] uppercase">Sekretaris</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sekretaris.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="bg-white rounded-2xl border border-[#E5E3DB] p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-[#D4AF37] transition-all cursor-pointer hover:scale-[1.01] duration-300 group"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-[#D4AF37]/15 group-hover:border-[#D4AF37] transition-all duration-300 bg-slate-50">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all"
                    referrerPolicy={member.imageUrl.startsWith("http") ? "no-referrer" : undefined}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[7px] font-extrabold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/5 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/10">
                    {member.role}
                  </span>
                  <h4 className="font-extrabold text-[#2D3E50] text-xs leading-snug pt-1 group-hover:text-[#D4AF37] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[8px] text-[#7C7A74] font-semibold uppercase tracking-wider">{member.subRole}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bendahara Box */}
        <div className="bg-[#F5F4F0]/60 rounded-3xl p-5 border border-[#E5E3DB] space-y-4">
          <div className="border-b border-[#E5E3DB] pb-2 flex items-center gap-2">
            <div className="p-1.5 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg">
              <Landmark className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-[#2D3E50] uppercase">Bendahara</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bendahara.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="bg-white rounded-2xl border border-[#E5E3DB] p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-[#D4AF37] transition-all cursor-pointer hover:scale-[1.01] duration-300 group"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-[#D4AF37]/15 group-hover:border-[#D4AF37] transition-all duration-300 bg-slate-50">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all"
                    referrerPolicy={member.imageUrl.startsWith("http") ? "no-referrer" : undefined}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[7px] font-extrabold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/5 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/10">
                    {member.role}
                  </span>
                  <h4 className="font-extrabold text-[#2D3E50] text-xs leading-snug pt-1 group-hover:text-[#D4AF37] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[8px] text-[#7C7A74] font-semibold uppercase tracking-wider">{member.subRole}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. KETUA BIDANG PASTORAL (6 PILAR UTAMA) */}
      <div className="space-y-6 max-w-5xl mx-auto pt-4">
        <div className="text-center border-b border-[#E5E3DB] pb-2">
          <h3 className="text-base font-extrabold text-[#2D3E50]">Ketua Bidang Pastoral</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {bidang.map((member) => {
            const roleLower = member.role.toLowerCase();
            const isLiturgi = roleLower.includes("liturgi");
            const isPewartaan = roleLower.includes("pewartaan");
            const isPersaudaraan = roleLower.includes("persaudaraan");
            const isPelayanan = roleLower.includes("pelayanan");
            const isUmum = roleLower.includes("umum");

            let iconComponent = <Briefcase className="h-4 w-4" />;
            let iconBg = "bg-slate-100 text-slate-700";

            if (isLiturgi) {
              iconComponent = <BookOpen className="h-4 w-4" />;
              iconBg = "bg-blue-100 text-blue-700";
            } else if (isPewartaan) {
              iconComponent = <Flame className="h-4 w-4" />;
              iconBg = "bg-[#D4AF37]/10 text-[#D4AF37]";
            } else if (isPersaudaraan) {
              iconComponent = <Compass className="h-4 w-4" />;
              iconBg = "bg-teal-100 text-teal-700";
            } else if (isPelayanan) {
              iconComponent = <Heart className="h-4 w-4" />;
              iconBg = "bg-rose-100 text-rose-700";
            } else if (isUmum) {
              iconComponent = <Users className="h-4 w-4" />;
              iconBg = "bg-amber-100 text-amber-700";
            }

            return (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="bg-white rounded-2xl border border-[#E5E3DB] p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-[#D4AF37] transition-all cursor-pointer hover:scale-[1.01] duration-300 group"
              >
                <div className="relative mb-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37]/15 group-hover:border-[#D4AF37] transition-all duration-300 bg-slate-50">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full ${iconBg} border border-white shadow-xs`}>
                    {iconComponent}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[7px] font-extrabold uppercase text-[#D4AF37] tracking-wider bg-[#D4AF37]/5 px-2 py-0.5 rounded-full border border-[#D4AF37]/10">
                    {member.role}
                  </span>
                  <h4 className="font-extrabold text-[#2D3E50] text-xs pt-1.5 group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {member.name}
                  </h4>
                  <p className="text-[8px] text-[#7C7A74] font-semibold uppercase tracking-wider">{member.subRole}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Tugas & Tanggung Jawab Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
            <div 
              className="absolute inset-0 cursor-default" 
              onClick={() => setSelectedMember(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-[#F5F4F0] rounded-3xl border border-[#E5E3DB] w-full max-w-sm shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Header Accent Line */}
              <div className="h-1.5 bg-[#D4AF37] w-full" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-[#2D3E50] rounded-full border border-[#E5E3DB] transition-all shadow-xs hover:scale-105 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Body */}
              <div className="p-6 flex flex-col items-center text-center space-y-5">
                
                {/* Photo */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37]/20 shadow-md bg-white">
                  <img
                    src={selectedMember.imageUrl}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                    referrerPolicy={selectedMember.imageUrl.startsWith("http") ? "no-referrer" : undefined}
                  />
                </div>

                {/* Identity */}
                <div className="space-y-0.5">
                  <span className="text-[8px] font-extrabold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedMember.role}
                  </span>
                  <h3 className="text-base font-extrabold text-[#2D3E50] pt-1.5 leading-snug">{selectedMember.name}</h3>
                  <p className="text-[9px] text-[#7C7A74] tracking-wider font-extrabold uppercase">Periode Pelayanan 2024 - 2029</p>
                </div>

                {/* Job Desk Details */}
                <div className="w-full bg-white p-4 rounded-xl border border-[#E5E3DB] text-left space-y-2">
                  <div className="flex items-center gap-1.5 text-[#D4AF37] pb-1 border-b border-[#E5E3DB]">
                    <Briefcase className="h-3.5 w-3.5" />
                    <h4 className="text-[9px] font-extrabold uppercase tracking-widest text-[#2D3E50]">Tugas & Tanggung Jawab</h4>
                  </div>
                  <p className="text-[11px] text-[#7C7A74] leading-relaxed">
                    {selectedMember.jobdesk}
                  </p>
                  <div className="pt-1.5 flex items-start gap-1.5 text-[8px] text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Anggota resmi terdaftar dalam Struktur SK Dewan Pastoral Paroki Keuskupan Bandung.</span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="w-full py-2 bg-[#2D3E50] hover:bg-black text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Tutup Detail
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
