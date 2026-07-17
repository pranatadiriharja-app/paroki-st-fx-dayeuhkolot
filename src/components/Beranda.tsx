import React from "react";
import { Calendar, Clock, MapPin, User, ArrowRight, Bell, Megaphone } from "lucide-react";
import { motion } from "motion/react";
import { AgendaParoki, Announcement } from "../types";

interface BerandaProps {
  announcements: Announcement[];
  agenda: AgendaParoki[];
  onNavigateToTab: (tab: string) => void;
}

export default function Beranda({ announcements, agenda, onNavigateToTab }: BerandaProps) {
  const activeAnnouncement = announcements.find((a) => a.active);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Active Announcement Pill/Banner */}
      {activeAnnouncement && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#E5E3DB] rounded-[2rem] p-6 flex items-start gap-4 shadow-sm"
        >
          <div className="bg-[#D4AF37]/15 text-[#D4AF37] p-3 rounded-2xl shadow-sm mt-0.5">
            <Bell className="h-5 w-5 animate-bounce" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-[#F5F4F0] px-3 py-1 rounded-full border border-[#E5E3DB]/50 mb-2">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase text-[#7C7A74] tracking-widest">Pengumuman Terbaru</span>
            </div>
            <p className="text-[#2D3E50] text-sm font-medium leading-relaxed">{activeAnnouncement.text}</p>
            <span className="text-[10px] text-[#7C7A74] block mt-1 font-mono">
              Dipublikasikan pada: {new Date(activeAnnouncement.createdAt).toLocaleDateString("id-ID")}
            </span>
          </div>
        </motion.div>
      )}

      {/* Bento Layout Grid for Hero Banner & Tim Pastores */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Hero Welcome Banner (8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#2D3E50] to-[#1C2C3C] rounded-[2rem] p-6 md:p-10 shadow-sm border border-[#E5E3DB] flex flex-col justify-between relative overflow-hidden group min-h-[380px] text-white">
          
          {/* EDIT FOTO BACKGROUND GEREJA DI BAWAH INI (Ganti dengan link Cloudinary Anda) */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80" 
              alt="Gereja Paroki"
              className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700 select-none mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C2C3C]/90 via-transparent to-[#2D3E50]/40"></div>
          </div>
          
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37] px-4 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-md text-slate-950">
              <span className="w-2 h-2 bg-slate-950 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-950">Selamat Datang di Website Resmi</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="font-serif font-extrabold leading-tight text-white drop-shadow-md tracking-tight">
                <span className="text-2xl sm:text-3xl md:text-4xl block text-slate-200 font-light">Gereja Paroki</span>
                <span className="text-[#D4AF37] block italic font-medium mt-1 text-2xl sm:text-3.5xl md:text-5xl lg:text-[3.25rem] tracking-normal break-keep whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap">
                  Santo Fransiskus Xaverius
                </span>
              </h1>
              <p className="text-[#E5E3DB] text-xs md:text-sm font-mono font-bold tracking-[0.25em] uppercase border-t border-white/10 pt-2 w-fit">
                Dayeuhkolot • Keuskupan Bandung
              </p>
            </div>
            
            <p className="text-slate-200 max-w-xl text-xs md:text-sm leading-relaxed font-sans font-light">
              Wadah informasi reksa pastoral, pewartaan iman kudus, layanan administrasi sakramen online, serta sarana komunikasi persaudaraan umat Paroki Santo Fransiskus Xaverius.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-6 relative z-10">
            <button
              onClick={() => onNavigateToTab("e-formulir")}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#bfa032] text-slate-950 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-[#D4AF37]/20"
            >
              Daftar Sakramen Online
            </button>
            <button
              onClick={() => onNavigateToTab("informasi")}
              className="px-6 py-3 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#2D3E50] hover:bg-[#F5F4F0] rounded-full font-bold text-xs uppercase tracking-widest transition-all bg-white/10 backdrop-blur-sm"
            >
              Kotak Saran Umat
            </button>
          </div>
        </div>

        {/* Right: Tim Pastores (4 cols) */}
        <div className="lg:col-span-4 bg-[#2D3E50] rounded-[2rem] p-6 md:p-8 text-white flex flex-col shadow-lg justify-between border border-[#2D3E50]/20 min-h-[380px]">
          <div>
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#D4AF37]">
                Tim Pastores
              </span>
              <span className="text-[9px] text-white/40 font-mono tracking-wider">PELAYAN UTAMA</span>
            </div>

            {/* Pastores items */}
            <div className="space-y-6">
              {/* Pastor Paroki */}
              <div className="flex items-center gap-4 group">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md flex-shrink-0">
                  <img 
                    /* EDIT FOTO PASTOR STEFANUS DI BAWAH INI (Ganti dengan link Cloudinary Anda) */
                    src="https://res.cloudinary.com/ugnqb757/image/upload/v1783488731/pastor_paroki_yxobj1.png" 
                    alt="RD. Stefanus Tanto Agustiana"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">Pastor Paroki</p>
                  <p className="text-sm font-serif text-white leading-snug font-semibold">RD. Stefanus Tanto Agustiana</p>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full"></div>

              {/* Pastor Vikaris */}
              <div className="flex items-center gap-4 group">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-md flex-shrink-0">
                  <img 
                    /* EDIT FOTO PASTOR ANTONIUS DI BAWAH INI (Ganti dengan link Cloudinary Anda) */
                    src="https://res.cloudinary.com/ugnqb757/image/upload/v1783488770/pastor_vikaris_paroki_p32rqx.png" 
                    alt="RD. Antonius Jonmedi Tarigan"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Pastor Vikaris</p>
                  <p className="text-sm font-serif text-white leading-snug font-semibold">RD. Antonius Jonmedi Tarigan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => onNavigateToTab("dewan-pastoral")}
              className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-xs font-semibold text-[#D4AF37] hover:text-white transition-all inline-flex items-center justify-center gap-1.5"
            >
              Lihat Dewan Pastoral <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Bento Layout Grid for Jadwal Misa & Agenda Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Jadwal Misa (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-[#E5E3DB] flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-3 border-b border-[#E5E3DB] pb-4 mb-6">
              <div className="p-2.5 bg-[#F5F4F0] rounded-xl text-[#D4AF37] border border-[#E5E3DB]">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#D4AF37]">Jadwal Misa</h3>
                <p className="text-xs text-[#7C7A74]">Perayaan Ekaristi Kudus</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-dashed border-[#E5E3DB] pb-3">
                <div>
                  <p className="font-bold text-sm text-[#2D3E50]">Misa Harian</p>
                  <p className="text-[11px] text-[#7C7A74]">Senin - Sabtu (Gereja Paroki)</p>
                </div>
                <p className="font-mono text-sm font-bold text-[#2D3E50] bg-[#F5F4F0] px-2 py-0.5 rounded">06:00 WIB</p>
              </div>
              
              <div className="flex justify-between items-end border-b border-dashed border-[#E5E3DB] pb-3">
                <div>
                  <p className="font-bold text-sm text-[#2D3E50]">Jumat Pertama</p>
                  <p className="text-[11px] text-[#7C7A74]">Perayaan Ekaristi dan Penghormatan Sakramen Mahkudus</p>
                </div>
                <p className="font-mono text-sm font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded">18:00 WIB</p>
              </div>

              <div className="flex justify-between items-end border-b border-dashed border-[#E5E3DB] pb-3">
                <div>
                  <p className="font-bold text-sm text-[#2D3E50]">Mingguan (Pagi)</p>
                  <p className="text-[11px] text-[#7C7A74]">Misa I</p>
                </div>
                <p className="font-mono text-sm font-bold text-[#2D3E50] bg-[#F5F4F0] px-2 py-0.5 rounded">07:00 WIB</p>
              </div>

              <div className="flex justify-between items-end border-b border-dashed border-[#E5E3DB] pb-3">
                <div>
                  <p className="font-bold text-sm text-[#2D3E50]">Mingguan (Siang)</p>
                  <p className="text-[11px] text-[#7C7A74]">Misa II</p>
                </div>
                <p className="font-mono text-sm font-bold text-[#2D3E50] bg-[#F5F4F0] px-2 py-0.5 rounded">10:00 WIB</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#F5F4F0]/80 rounded-2xl border border-[#E5E3DB] flex items-start gap-3">
            <MapPin className="h-4.5 w-4.5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#2D3E50]">Lokasi & Stasi:</p>
              <p className="text-[11px] text-[#7C7A74] leading-relaxed mt-0.5">
                Jalan Bojongsoang No. 17, Dayeuhkolot. Untuk misa Stasi Manggahang & Majalaya silakan kunjungi menu Stasi.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Sorotan Agenda / Upcoming Events (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-[#E5E3DB] flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-center border-b border-[#E5E3DB] pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#F5F4F0] rounded-xl text-[#D4AF37] border border-[#E5E3DB]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#D4AF37]">Agenda Terdekat</h3>
                  <p className="text-xs text-[#7C7A74]">Kegiatan Gerejawi Paroki</p>
                </div>
              </div>
              
              <button
                onClick={() => onNavigateToTab("agenda")}
                className="text-[10px] font-bold text-[#2D3E50] hover:text-[#D4AF37] tracking-wider transition-colors uppercase"
              >
                LIHAT SEMUA
              </button>
            </div>

            {/* List Agenda */}
            <div className="space-y-4">
              {(() => {
                // Today's date reference (July 15, 2026)
                const today = new Date("2026-07-15");
                today.setHours(0, 0, 0, 0);

                const upcomingAgenda = agenda
                  .filter((item) => {
                    const itemDate = new Date(item.date);
                    itemDate.setHours(0, 0, 0, 0);
                    return itemDate >= today;
                  })
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                if (upcomingAgenda.length === 0) {
                  return (
                    <p className="text-xs text-[#7C7A74] text-center py-6">
                      Belum ada agenda terdekat saat ini.
                    </p>
                  );
                }

                return upcomingAgenda.slice(0, 3).map((item) => {
                  const dateObj = new Date(item.date);
                  const monthName = dateObj.toLocaleDateString("id-ID", { month: "short" });
                  const dayNum = dateObj.toLocaleDateString("id-ID", { day: "2-digit" });

                  return (
                    <div
                      key={item.id}
                      onClick={() => onNavigateToTab("agenda")}
                      className="bg-[#F5F4F0]/60 hover:bg-[#F5F4F0] rounded-2xl p-4 flex gap-4 items-center border border-[#E5E3DB] transition-all cursor-pointer group"
                    >
                      <div className="bg-white p-2.5 rounded-xl text-center w-14 border border-[#E5E3DB] flex-shrink-0 group-hover:border-[#D4AF37] transition-all">
                        <p className="text-[9px] font-bold text-[#7C7A74] leading-none uppercase">{monthName}</p>
                        <p className="text-lg font-serif font-bold text-[#D4AF37] leading-none mt-1">{dayNum}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#2D3E50] leading-tight group-hover:text-[#D4AF37] transition-colors truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-[#7C7A74] mt-1 line-clamp-1">
                          {item.content}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#7C7A74] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          <div className="bg-[#2D3E50]/5 border border-[#E5E3DB] rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#2D3E50]">Ingin mendaftar administrasi sakramen?</p>
              <p className="text-[11px] text-[#7C7A74] mt-0.5">Baptis, Komuni, Krisma, Pernikahan kini bisa online.</p>
            </div>
            <button
              onClick={() => onNavigateToTab("e-formulir")}
              className="px-4 py-2 bg-[#2D3E50] hover:bg-black text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
            >
              DAFTAR
            </button>
          </div>
        </div>

      </div>

      {/* Donation & Maintenance Section */}
      <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-[#E5E3DB] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#F5F4F0] px-3 py-1 rounded-full border border-[#E5E3DB]">
              <span className="text-[10px] font-bold uppercase text-[#7C7A74] tracking-widest">Partisipasi Umat</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2D3E50]">
              Donasi & Pemeliharaan <span className="text-[#D4AF37] italic font-medium">Gereja</span>
            </h2>
            <p className="text-[#7C7A74] text-xs md:text-sm leading-relaxed">
              Dukung karya pastoral dan pemeliharaan sarana prasarana Gereja Paroki Santo Fransiskus Xaverius Dayeuhkolot melalui persembahan kasih Anda. Setiap donasi Anda sangat berarti bagi perkembangan paroki kita.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F5F4F0] p-4 rounded-2xl border border-[#E5E3DB] space-y-1">
              <p className="text-[10px] font-bold text-[#7C7A74] uppercase tracking-wider">Transfer Bank BCA</p>
              <p className="font-mono text-lg font-bold text-[#2D3E50]">379-1234-567</p>
              <p className="text-xs text-[#7C7A74] font-medium">A/N Paroki St. FX Dayeuhkolot</p>
            </div>
            <div className="bg-[#F5F4F0] p-4 rounded-2xl border border-[#E5E3DB] space-y-1">
              <p className="text-[10px] font-bold text-[#7C7A74] uppercase tracking-wider">Metode Donasi</p>
              <p className="text-sm font-bold text-[#2D3E50]">Scan QRIS / BCA Mobile</p>
              <p className="text-[11px] text-[#7C7A74]">Mendukung seluruh e-wallet (Gopay, OVO, Dana, LinkAja, dll)</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col items-center justify-center bg-[#F5F4F0] p-6 rounded-[2rem] border border-[#E5E3DB] space-y-4">
          <div className="bg-white p-4 rounded-3xl shadow-md border border-[#E5E3DB] flex flex-col items-center">
            {/* QR Code Container */}
            <div className="w-48 h-48 bg-white border-2 border-[#D4AF37] rounded-2xl flex items-center justify-center p-2 relative overflow-hidden">
              {/* EDIT LINK BARCODE QRIS DI BAWAH INI (Ganti dengan link Cloudinary / QRIS Anda) */}
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=Paroki%20Santo%20Fransiskus%20Xaverius%20Dayeuhkolot" 
                alt="QRIS Barcode" 
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[10px] font-extrabold text-[#2D3E50] tracking-widest mt-3">QRIS PERSEMBAHAN KASIH</p>
            <p className="text-[8px] text-[#7C7A74] mt-0.5">Paroki Fransiskus Xaverius Dayeuhkolot</p>
          </div>
        </div>
      </div>

      {/* Advertising & Promotion Section */}
      <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-[#E5E3DB] space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5E3DB]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#F5F4F0] px-3 py-1 rounded-full border border-[#E5E3DB]">
              <Megaphone className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase text-[#7C7A74] tracking-widest">Ruang Publikasi Tersedia</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2D3E50]">
              Promosikan Usaha <span className="text-[#D4AF37] italic font-medium">& Layanan Anda</span>
            </h2>
            <p className="text-[#7C7A74] text-xs md:text-sm max-w-2xl leading-relaxed">
              Promosikan usaha atau layanan Anda melalui website resmi Paroki Santo Fransiskus Xaverius. Informasi pemasangan dapat diperoleh melalui Sekretariat Paroki.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => onNavigateToTab("informasi")}
              className="px-6 py-3 bg-[#2D3E50] hover:bg-[#1C2C3C] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md inline-flex items-center gap-2"
            >
              Hubungi Sekretariat
            </button>
          </div>
        </div>

        {/* Sample Advertisements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ad 1 */}
          <div className="bg-[#F5F4F0]/60 rounded-2xl border border-[#E5E3DB] overflow-hidden hover:border-[#D4AF37] transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="h-40 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
                  alt="Toko Buku & Benda Rohani"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#D4AF37] text-white text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded shadow-xs">
                  Iklan
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-extrabold text-[#2D3E50] text-sm group-hover:text-[#D4AF37] transition-colors">
                  Toko Buku & Benda Rohani Ave Maria
                </h4>
                <p className="text-[11px] text-[#7C7A74] leading-relaxed">
                  Menyediakan berbagai macam Alkitab, Rosario perak/kayu, lilin doa, patung kudus, serta perlengkapan ibadat pribadi terlengkap di sekitar wilayah Dayeuhkolot.
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2 border-t border-[#E5E3DB]/50 flex justify-between items-center bg-white/40">
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">Hubungi: 0812-xxxx-xxxx</span>
              <span className="text-[9px] text-[#7C7A74] font-semibold bg-[#F5F4F0] px-2 py-0.5 rounded border border-[#E5E3DB]">Usaha Umat</span>
            </div>
          </div>

          {/* Ad 2 */}
          <div className="bg-[#F5F4F0]/60 rounded-2xl border border-[#E5E3DB] overflow-hidden hover:border-[#D4AF37] transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="h-40 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80"
                  alt="Catering Berkah"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#D4AF37] text-white text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded shadow-xs">
                  Iklan
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-extrabold text-[#2D3E50] text-sm group-hover:text-[#D4AF37] transition-colors">
                  Dapur Selera Kasih & Catering
                </h4>
                <p className="text-[11px] text-[#7C7A74] leading-relaxed">
                  Menerima pesanan nasi kotak, tumpeng syukuran, prasmanan pernikahan, serta konsumsi rapat lingkungan/wilayah dengan cita rasa nusantara higienis dan berkah.
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2 border-t border-[#E5E3DB]/50 flex justify-between items-center bg-white/40">
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">Hubungi: 0813-xxxx-xxxx</span>
              <span className="text-[9px] text-[#7C7A74] font-semibold bg-[#F5F4F0] px-2 py-0.5 rounded border border-[#E5E3DB]">Usaha Umat</span>
            </div>
          </div>

          {/* Ad 3 */}
          <div className="bg-[#F5F4F0]/60 rounded-2xl border border-[#E5E3DB] overflow-hidden hover:border-[#D4AF37] transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="h-40 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
                  alt="Florist & Altar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#D4AF37] text-white text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded shadow-xs">
                  Iklan
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-extrabold text-[#2D3E50] text-sm group-hover:text-[#D4AF37] transition-colors">
                  Stella Florist & Bouquet
                </h4>
                <p className="text-[11px] text-[#7C7A74] leading-relaxed">
                  Melayani pesanan karangan bunga papan ucapan sukacita/dukacita, rangkaian bunga altar, buket wisuda, dan dekorasi pernikahan gereja dengan bunga segar pilihan.
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2 border-t border-[#E5E3DB]/50 flex justify-between items-center bg-white/40">
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">Hubungi: 0857-xxxx-xxxx</span>
              <span className="text-[9px] text-[#7C7A74] font-semibold bg-[#F5F4F0] px-2 py-0.5 rounded border border-[#E5E3DB]">Usaha Umat</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
