import React, { useState, useMemo } from "react";
import { 
  Search, Phone, Calendar, MapPin, User, Users, Compass, 
  MessageCircle, X, ChevronRight, ArrowLeft, ArrowRight,
  ExternalLink, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { KATEGORIAL_DATA, KategorialGroup } from "../data/kategorialData";

export default function KategorialComp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedGroup, setSelectedGroup] = useState<KategorialGroup | null>(null);

  // Kategori List
  const categories = ["Semua", "Liturgi", "Pembinaan", "Pelayanan", "Persekutuan"];

  // Filter & Search Logic
  const filteredGroups = useMemo(() => {
    return KATEGORIAL_DATA.filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            group.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Semua" || group.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Format WhatsApp Link
  const getWhatsAppLink = (phone: string, groupName: string) => {
    const formattedPhone = phone.replace(/[^0-9]/g, "");
    let finalPhone = formattedPhone;
    if (finalPhone.startsWith("0")) {
      finalPhone = "62" + finalPhone.substring(1);
    }
    const message = encodeURIComponent(`Halo, saya tertarik bergabung dengan Kelompok Kategorial ${groupName} di Paroki Dayeuhkolot. Bagaimana cara mendaftar dan persyaratannya? Terima kasih.`);
    return `https://api.whatsapp.com/send?phone=${finalPhone}&text=${message}`;
  };

  // Render Full Page Detail View
  if (selectedGroup) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
      >
        {/* Back Navigation Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedGroup(null)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#7C7A74] hover:text-[#2D3E50] bg-white hover:bg-[#F5F4F0] rounded-xl border border-[#E5E3DB] hover:border-[#D4AF37]/50 shadow-xs hover:shadow-sm transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 text-[#D4AF37]" />
            <span>Kembali ke Daftar</span>
          </button>
          
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7C7A74] bg-[#F5F4F0] px-3.5 py-1.5 rounded-full border border-[#E5E3DB]">
            Detail Kelompok
          </span>
        </div>

        {/* Full Page Detail Card */}
        <div className="bg-white rounded-[2rem] border border-[#E5E3DB] overflow-hidden shadow-sm">
          {/* Banner / Foto Kegiatan */}
          <div className="relative h-64 sm:h-80 md:h-96 bg-slate-100">
            <img 
              src={selectedGroup.bannerUrl} 
              alt={selectedGroup.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D3E50] via-[#2D3E50]/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-10 md:right-10 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37] text-slate-950 text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                {selectedGroup.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-tight leading-tight">
                {selectedGroup.name}
              </h1>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* Deskripsi Singkat */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7C7A74]">
                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                <span>Deskripsi & Profil</span>
              </div>
              <p className="text-sm md:text-base text-[#2D3E50] leading-relaxed font-normal">
                {selectedGroup.description}
              </p>
            </div>

            {/* Grid Informasi Detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E5E3DB]/60">
              {/* Left Column: People & Contact */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-[#F5F4F0]/60 p-5 rounded-2xl border border-[#E5E3DB]/60 hover:border-[#D4AF37]/30 transition-colors">
                  <div className="p-3 bg-white rounded-xl text-[#D4AF37] shadow-xs">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#7C7A74] font-extrabold uppercase tracking-wider block">Nama Ketua</span>
                    <span className="text-sm md:text-base font-extrabold text-[#2D3E50]">{selectedGroup.leaderName}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#F5F4F0]/60 p-5 rounded-2xl border border-[#E5E3DB]/60 hover:border-[#D4AF37]/30 transition-colors">
                  <div className="p-3 bg-white rounded-xl text-[#D4AF37] shadow-xs">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#7C7A74] font-extrabold uppercase tracking-wider block">Kontak Person (WhatsApp)</span>
                    <span className="text-sm md:text-base font-extrabold text-[#2D3E50] font-mono">{selectedGroup.phone}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Time & Location */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-[#F5F4F0]/60 p-5 rounded-2xl border border-[#E5E3DB]/60 hover:border-[#D4AF37]/30 transition-colors">
                  <div className="p-3 bg-white rounded-xl text-[#D4AF37] shadow-xs">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#7C7A74] font-extrabold uppercase tracking-wider block">Jadwal Pertemuan</span>
                    <span className="text-sm md:text-base font-extrabold text-[#2D3E50] leading-relaxed block">{selectedGroup.schedule}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#F5F4F0]/60 p-5 rounded-2xl border border-[#E5E3DB]/60 hover:border-[#D4AF37]/30 transition-colors">
                  <div className="p-3 bg-white rounded-xl text-[#D4AF37] shadow-xs">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#7C7A74] font-extrabold uppercase tracking-wider block">Lokasi Pertemuan</span>
                    <span className="text-sm md:text-base font-extrabold text-[#2D3E50]">{selectedGroup.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="bg-[#2D3E50] text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-[#1C2C3C] relative overflow-hidden shadow-sm mt-6">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px]" />
              <div className="relative z-10 space-y-1.5 text-center md:text-left">
                <h4 className="text-lg font-serif">Ayo Bergabung Bersama Kami</h4>
                <p className="text-xs text-[#E5E3DB] max-w-md">
                  Mari bertumbuh dalam iman dan melayani sesama dengan bergabung ke dalam kelompok kategorial {selectedGroup.name}.
                </p>
              </div>
              <a
                href={getWhatsAppLink(selectedGroup.phone, selectedGroup.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Hubungi via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <div className="relative bg-[#2D3E50] text-white rounded-[2rem] p-8 md:p-14 overflow-hidden border border-[#1C2C3C] shadow-sm">
        {/* Abstract Background Ornaments */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-[#2D3E50]/50 to-[#2D3E50] opacity-80" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl" />
        <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37] px-4 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-md">
            <Users className="h-3.5 w-3.5 text-slate-950" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-950">👥 KELOMPOK KATEGORIAL</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">
            Kelompok Kategorial Paroki
          </h1>
          
          <p className="text-[#E5E3DB] text-sm md:text-base leading-relaxed font-normal">
            Kelompok kategorial merupakan wadah pembinaan iman, pelayanan, dan persekutuan umat sesuai dengan panggilan, usia, maupun bentuk pelayanannya. Temukan komunitas yang dapat membantu Anda bertumbuh dalam iman dan melayani sesama.
          </p>
        </div>
      </div>

      {/* =========================================
          FILTER & SEARCH
          ========================================= */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#F5F4F0] p-4 rounded-2xl border border-[#E5E3DB]">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#2D3E50] text-white border-[#2D3E50] shadow-sm"
                  : "bg-white text-[#7C7A74] border-[#E5E3DB] hover:bg-[#F5F4F0] hover:text-[#2D3E50]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7C7A74]">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kelompok kategorial..."
            className="w-full pl-10 pr-4 py-2.5 bg-white text-xs text-[#2D3E50] font-medium border border-[#E5E3DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] shadow-xs placeholder-[#7C7A74]/70"
          />
        </div>
      </div>

      {/* =========================================
          DAFTAR KATEGORIAL (GRID)
          ========================================= */}
      {filteredGroups.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E5E3DB] space-y-4">
          <div className="inline-flex p-4 rounded-full bg-[#F5F4F0] text-[#7C7A74] mb-2">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-extrabold text-[#2D3E50]">Kelompok tidak ditemukan</h3>
          <p className="text-xs text-[#7C7A74] max-w-sm mx-auto">
            Coba ganti kata kunci pencarian Anda atau pilih kategori filter yang berbeda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <motion.div
              layout
              key={group.id}
              className="bg-white rounded-3xl border border-[#E5E3DB] overflow-hidden shadow-xs hover:shadow-md hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="h-48 overflow-hidden relative bg-slate-100">
                  <img
                    src={group.imageUrl}
                    alt={group.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-[#E5E3DB] text-[9px] font-extrabold uppercase tracking-wider text-[#2D3E50] shadow-xs">
                    {group.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-extrabold text-[#2D3E50] leading-snug group-hover:text-[#D4AF37] transition-colors">
                      {group.name}
                    </h3>
                    <p className="text-xs text-[#7C7A74] leading-relaxed line-clamp-2">
                      {group.shortDesc}
                    </p>
                  </div>

                  {/* Specs Grid with Wrapping Schedule */}
                  <div className="border-t border-[#E5E3DB]/60 pt-4 space-y-3.5 text-[11px] text-[#2D3E50] font-medium">
                    <div className="flex items-center gap-2.5">
                      <User className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                      <span className="truncate">
                        <strong className="text-[#7C7A74]">Ketua:</strong> {group.leaderName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                      <span className="truncate font-mono">
                        <strong className="text-[#7C7A74] font-sans">Kontak:</strong> {group.phone}
                      </span>
                    </div>

                    {/* Schedule: Wraps to 2 lines instead of truncating */}
                    <div className="flex items-start gap-2.5">
                      <Calendar className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <strong className="text-[#7C7A74] block">Jadwal:</strong>
                        <span className="text-[#2D3E50] leading-tight block mt-0.5 whitespace-pre-wrap line-clamp-2">
                          {group.schedule}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                      <span className="truncate">
                        <strong className="text-[#7C7A74]">Lokasi:</strong> {group.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2 bg-gradient-to-t from-[#F5F4F0]/30 to-transparent">
                <button
                  onClick={() => setSelectedGroup(group)}
                  className="w-full py-2.5 bg-[#F5F4F0] hover:bg-[#2D3E50] text-[#2D3E50] hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 border border-[#E5E3DB] hover:border-[#2D3E50] group-hover:bg-[#2D3E50] group-hover:text-white group-hover:border-[#2D3E50]"
                >
                  <span>Lihat Detail</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* =========================================
          SECTION AJAKAN
          ========================================= */}
      <div className="bg-[#2D3E50] text-white rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden border border-[#1C2C3C] shadow-md">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#2D3E50]/40 to-[#2D3E50] opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-4xl font-serif text-white">
            Mari Bertumbuh Bersama <span className="text-[#D4AF37] italic font-medium">dalam Komunitas</span>
          </h2>
          
          <p className="text-[#E5E3DB] text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
            Setiap umat dipanggil untuk bertumbuh dalam iman dan mengambil bagian dalam kehidupan menggereja. Bergabunglah dengan salah satu kelompok kategorial sesuai panggilan dan minat Anda.
          </p>

          <div className="pt-2">
            <a 
              href="https://api.whatsapp.com/send?phone=6281234567890&text=Halo%20Sekretariat%20Paroki%2C%20saya%20ingin%20bertanya%20mengenai%20kelompok%20kategorial%20di%20Paroki%20Santo%20Fransiskus%20Xaverius."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#E5BE48] text-slate-950 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Hubungi Sekretariat</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
