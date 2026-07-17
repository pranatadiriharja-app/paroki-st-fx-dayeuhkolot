import React, { useState, useEffect } from "react";
import { Search, Calendar, ChevronRight, X, ArrowRight, Newspaper, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AgendaParoki } from "../types";

interface AgendaParokiCompProps {
  agenda: AgendaParoki[];
}

export default function AgendaParokiComp({ agenda }: AgendaParokiCompProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [selectedItem, setSelectedItem] = useState<AgendaParoki | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const categories = [
    { id: "semua", label: "Semua Warta" },
    { id: "agenda", label: "Agenda Kegiatan" },
    { id: "katekese", label: "Katekese Pastor" },
    { id: "berita", label: "Berita Paroki" },
    { id: "pengumuman", label: "Pengumuman" }
  ];

  const filteredAgenda = agenda.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Default legacy items to 'agenda' if category is undefined
    const itemCat = item.category || "agenda";
    const matchesCategory = selectedCategory === "semua" || itemCat === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredAgenda.length / ITEMS_PER_PAGE);
  const currentAgenda = filteredAgenda.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const getCategoryLabel = (cat?: string) => {
    switch (cat) {
      case "agenda": return "Agenda Kegiatan";
      case "katekese": return "Katekese Pastor";
      case "berita": return "Berita Paroki";
      case "pengumuman": return "Pengumuman";
      default: return "Agenda Kegiatan";
    }
  };

  if (selectedItem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        className="space-y-8 max-w-4xl mx-auto"
      >
        {/* Navigation / Back Button on Top */}
        <div className="flex justify-between items-center border-b border-[#E5E3DB] pb-4">
          <button
            onClick={() => setSelectedItem(null)}
            className="group px-4 py-2 bg-white hover:bg-[#2D3E50] text-[#2D3E50] hover:text-white border border-[#E5E3DB] hover:border-[#2D3E50] rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Kembali ke Warta Paroki
          </button>
          
          <span className="bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-[#D4AF37]/20">
            {getCategoryLabel(selectedItem.category)}
          </span>
        </div>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="h-[250px] sm:h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-[#E5E3DB] shadow-md bg-[#F5F4F0] relative">
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title}
              className="w-full h-full object-cover"
              referrerPolicy={(selectedItem.imageUrl && selectedItem.imageUrl.startsWith("http")) ? "no-referrer" : undefined}
            />
          </div>

          <div className="space-y-4">
            {/* Date */}
            <div className="flex items-center gap-2 text-xs text-[#7C7A74] font-medium">
              <Calendar className="h-4 w-4 text-[#D4AF37]" />
              <span>
                {new Date(selectedItem.date).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#2D3E50] serif-heading tracking-tight leading-tight">
              {selectedItem.title}
            </h1>
          </div>
        </div>

        {/* Divider */}
        <div className="w-16 h-1 bg-[#D4AF37] rounded-full" />

        {/* Article Body */}
        <div className="bg-white rounded-[2.5rem] border border-[#E5E3DB] p-6 sm:p-10 shadow-sm">
          <div className="text-[#4B5563] text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap font-sans space-y-4">
            {selectedItem.content}
          </div>
        </div>

        {/* Back Button on Bottom */}
        <div className="flex justify-center pt-6 border-t border-[#E5E3DB]">
          <button
            onClick={() => {
              setSelectedItem(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group px-8 py-3.5 bg-[#2D3E50] hover:bg-black text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Kembali ke Halaman Warta Utama
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="border-b border-[#E5E3DB] pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2D3E50] serif-heading">Warta Paroki</h1>
        <p className="text-sm text-[#7C7A74] mt-2 leading-relaxed">
          Wadah informasi seputar agenda kegiatan, katekese mingguan pastor, berita aktual, dan pengumuman resmi Paroki Santo Fransiskus Xaverius Dayeuhkolot Bandung.
        </p>
      </div>

      {/* Categories & Search Bar Wrapper */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#F5F4F0] border border-[#E5E3DB] rounded-2xl w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#D4AF37] text-white shadow-sm"
                  : "text-[#7C7A74] hover:text-[#2D3E50] hover:bg-[#E5E3DB]/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#7C7A74]">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari warta paroki..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#E5E3DB] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none rounded-2xl text-[#2D3E50] placeholder-[#7C7A74]/75 text-xs shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Agenda Grid */}
      {filteredAgenda.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-[2rem] border border-dashed border-[#E5E3DB]">
          <Newspaper className="h-10 w-10 text-[#7C7A74] mx-auto mb-2 opacity-60" />
          <p className="text-sm text-[#7C7A74] font-medium">Tidak ada informasi yang cocok dengan kategori atau pencarian Anda.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentAgenda.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[2rem] overflow-hidden border border-[#E5E3DB] hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all duration-350 flex flex-col justify-between animate-fade-in"
              >
                <div>
                  <div className="h-52 overflow-hidden relative bg-[#F5F4F0]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy={(item.imageUrl && item.imageUrl.startsWith("http")) ? "no-referrer" : undefined}
                    />
                    <div className="absolute top-4 left-4 bg-[#2D3E50]/90 backdrop-blur-sm text-[#D4AF37] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider border border-white/10">
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-[#D4AF37] text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                      {getCategoryLabel(item.category)}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg md:text-xl font-bold text-[#2D3E50] leading-snug hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#7C7A74] text-sm line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 bg-[#F5F4F0] hover:bg-[#D4AF37]/10 text-[#2D3E50] hover:text-[#D4AF37] font-bold text-xs rounded-full border border-[#E5E3DB] hover:border-[#D4AF37] transition-all flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
                  >
                    Baca Selengkapnya <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1.5 pt-6 border-t border-[#E5E3DB] mt-10">
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all border flex items-center gap-1 ${
                  currentPage === 1
                    ? "bg-[#F5F4F0] border-[#E5E3DB] text-[#7C7A74]/40 cursor-not-allowed"
                    : "bg-white hover:bg-[#2D3E50] text-[#2D3E50] hover:text-white border-[#E5E3DB] hover:border-[#2D3E50] cursor-pointer shadow-sm"
                }`}
              >
                Sebelumnya
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border flex items-center justify-center cursor-pointer ${
                      currentPage === page
                        ? "bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm"
                        : "bg-white hover:bg-[#F5F4F0] text-[#2D3E50] border-[#E5E3DB]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all border flex items-center gap-1 ${
                  currentPage === totalPages
                    ? "bg-[#F5F4F0] border-[#E5E3DB] text-[#7C7A74]/40 cursor-not-allowed"
                    : "bg-white hover:bg-[#2D3E50] text-[#2D3E50] hover:text-white border-[#E5E3DB] hover:border-[#2D3E50] cursor-pointer shadow-sm"
                }`}
              >
                Selanjutnya
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
