import React, { useState } from "react";
import { Search, MessageSquare, Home, ArrowLeft, Users, Award, Shield, Notebook, Map, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Lingkungan } from "../types";

interface LingkunganCompProps {
  lingkungan: Lingkungan[];
}

export default function LingkunganComp({ lingkungan }: LingkunganCompProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<Lingkungan | null>(null);

  const filteredLingkungan = lingkungan.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.leader.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <AnimatePresence mode="wait">
        {!selectedItem ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Page Header */}
            <div className="border-b border-[#E5E3DB] pb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-[#2D3E50] serif-heading">Daftar Lingkungan Paroki</h1>
              <p className="text-sm text-[#7C7A74] mt-2 leading-relaxed">
                Paroki Santo Fransiskus Xaverius Dayeuhkolot dibagi menjadi beberapa wilayah komunitas basis iman terkecil yang disebut **Lingkungan**. <span className="font-bold text-[#D4AF37]">Klik pada kartu</span> lingkungan di bawah ini untuk melihat struktur kepengurusan lengkap, jumlah Kepala Keluarga (KK), serta foto kebersamaan lingkungan.
              </p>
            </div>

            {/* Stats Overview Bar */}
            <div className="bg-[#F5F4F0] p-4 rounded-3xl border border-[#E5E3DB] max-w-xs">
              <div className="bg-white p-4 rounded-2xl border border-[#E5E3DB] flex items-center gap-3 shadow-sm">
                <div className="p-2.5 bg-[#2D3E50]/10 text-[#2D3E50] rounded-xl flex-shrink-0">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-[#7C7A74] font-bold uppercase tracking-wider">Total Lingkungan</p>
                  <p className="text-base font-extrabold text-[#2D3E50]">{filteredLingkungan.length} Lingkungan</p>
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#7C7A74]">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama lingkungan atau ketua..."
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#E5E3DB] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none rounded-2xl text-[#2D3E50] placeholder-[#7C7A74]/75 text-sm shadow-sm transition-all"
              />
            </div>

            {/* Lingkungan Grid */}
            {filteredLingkungan.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-[2rem] border border-dashed border-[#E5E3DB]">
                <Home className="h-10 w-10 text-[#7C7A74] mx-auto mb-2" />
                <p className="text-sm text-[#7C7A74]">Tidak ada lingkungan yang cocok dengan pencarian Anda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {filteredLingkungan.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white rounded-3xl border border-[#E5E3DB] p-5 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all flex flex-col justify-between cursor-pointer group hover:scale-[1.02] duration-300 relative overflow-hidden"
                  >
                    {/* Index Number Accent */}
                    <div className="absolute top-4 right-4 text-[10px] font-bold text-[#7C7A74]/30 group-hover:text-[#D4AF37]/40 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="space-y-3.5">
                      <div className="flex items-start justify-between pr-6">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-[#F5F4F0] border border-[#E5E3DB] rounded-lg text-[#D4AF37] flex-shrink-0">
                            <Home className="h-4 w-4" />
                          </div>
                          <h3 className="font-extrabold text-[#2D3E50] text-sm leading-snug group-hover:text-[#D4AF37] transition-colors">
                            {item.name.replace("Lingkungan ", "")}
                          </h3>
                        </div>
                      </div>

                      {/* KK Tag */}
                      {item.kkCount && (
                        <div className="inline-flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full">
                          <Users className="h-2.5 w-2.5 text-[#D4AF37]" />
                          <span className="text-[9px] font-extrabold text-[#D4AF37] uppercase tracking-wider">{item.kkCount} KK</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2.5 pt-3 border-t border-[#E5E3DB]/50">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]/20 flex-shrink-0 shadow-inner bg-slate-50">
                          <img
                            src={item.imageUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
                            alt={item.leader}
                            className="w-full h-full object-cover"
                            referrerPolicy={(item.imageUrl && item.imageUrl.startsWith("http")) ? "no-referrer" : undefined}
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[8px] text-[#7C7A74] uppercase tracking-widest block font-bold">
                            KETUA LINGKUNGAN
                          </span>
                          <p className="font-bold text-[#2D3E50] text-xs mt-0.5 truncate">{item.leader}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contacts Action button */}
                    <div className="pt-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                        }}
                        className="flex-1 py-2 bg-[#F5F4F0] hover:bg-[#E5E3DB] text-[#2D3E50] font-extrabold text-[10px] rounded-xl border border-[#E5E3DB] transition-all cursor-pointer"
                      >
                        Lihat Detail
                      </button>
                      <a
                        href={`https://wa.me/${item.phone.replace(/^0/, "62")}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200/50 transition-all shadow-sm cursor-pointer"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            {/* Elegant Back Button */}
            <div>
              <button
                onClick={() => setSelectedItem(null)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#E5E3DB] text-[#2D3E50] rounded-xl border border-[#E5E3DB] text-xs font-bold transition-all shadow-sm cursor-pointer group hover:scale-[1.01]"
              >
                <ArrowLeft className="h-4 w-4 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
                Kembali ke Daftar Lingkungan
              </button>
            </div>

            {/* Full-Page Detailed Card container */}
            <div className="bg-white rounded-[2rem] border border-[#E5E3DB] overflow-hidden shadow-sm">
              {/* Photo Banner with Title */}
              <div className="h-64 md:h-80 w-full relative bg-slate-200 overflow-hidden">
                <img
                  src={selectedItem.groupImageUrl || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80"}
                  alt={`Foto bersama ${selectedItem.name}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 md:left-8 text-white pr-12">
                  <span className="inline-flex items-center gap-1 bg-[#D4AF37] text-slate-950 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                    Foto Bersama Lingkungan
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-white leading-tight">
                    {selectedItem.name}
                  </h2>
                </div>
              </div>

              {/* Detail Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Stats & Contacts Banner */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#F5F4F0] p-5 rounded-2xl border border-[#E5E3DB]">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white border border-[#E5E3DB] rounded-xl text-[#D4AF37]">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#7C7A74] uppercase tracking-wider">Jumlah KK Lingkungan</p>
                      <p className="text-xl font-bold text-[#2D3E50] mt-0.5">
                        {selectedItem.kkCount || "0"} <span className="text-sm font-normal text-[#7C7A74]">Kepala Keluarga (KK)</span>
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href={`https://wa.me/${selectedItem.phone.replace(/^0/, "62")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/10"
                  >
                    <MessageSquare className="h-4 w-4" /> Hubungi Ketua Lingkungan
                  </a>
                </div>

                {/* Detailed Committee Structure */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#D4AF37] pb-1 border-b border-[#E5E3DB]">
                    <Shield className="h-4.5 w-4.5" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#2D3E50]">Struktur Kepengurusan Lingkungan</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Ketua */}
                    <div className="bg-[#F5F4F0] p-4 rounded-xl border border-[#E5E3DB] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]/30 flex-shrink-0 bg-slate-50">
                        <img
                          src={selectedItem.imageUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
                          alt={selectedItem.leader}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] text-[#7C7A74] font-bold uppercase tracking-wider block">Ketua Lingkungan</span>
                        <span className="font-bold text-xs text-[#2D3E50]">{selectedItem.leader}</span>
                      </div>
                    </div>

                    {/* Wakil Ketua */}
                    <div className="bg-[#F5F4F0] p-4 rounded-xl border border-[#E5E3DB] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7C7A74] border border-[#E5E3DB] flex-shrink-0">
                        <Award className="h-5 w-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <span className="text-[9px] text-[#7C7A74] font-bold uppercase tracking-wider block">Wakil Ketua</span>
                        <span className="font-bold text-xs text-[#2D3E50]">{selectedItem.viceLeader || "-"}</span>
                      </div>
                    </div>

                    {/* Sekretaris */}
                    <div className="bg-[#F5F4F0] p-4 rounded-xl border border-[#E5E3DB] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7C7A74] border border-[#E5E3DB] flex-shrink-0">
                        <Notebook className="h-5 w-5 text-[#7C7A74]" />
                      </div>
                      <div>
                        <span className="text-[9px] text-[#7C7A74] font-bold uppercase tracking-wider block">Sekretaris</span>
                        <span className="font-bold text-xs text-[#2D3E50]">{selectedItem.secretary || "-"}</span>
                      </div>
                    </div>

                    {/* Bendahara */}
                    <div className="bg-[#F5F4F0] p-4 rounded-xl border border-[#E5E3DB] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7C7A74] border border-[#E5E3DB] flex-shrink-0">
                        <Shield className="h-5 w-5 text-[#7C7A74]" />
                      </div>
                      <div>
                        <span className="text-[9px] text-[#7C7A74] font-bold uppercase tracking-wider block">Bendahara</span>
                        <span className="font-bold text-xs text-[#2D3E50]">{selectedItem.treasurer || "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile & Events Notes */}
                {selectedItem.notes && (
                  <div className="space-y-2 bg-[#F5F4F0] p-5 rounded-2xl border border-[#E5E3DB]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D3E50] flex items-center gap-2">
                      <span className="w-1.5 h-3.5 bg-[#D4AF37] rounded-full inline-block"></span>
                      Profil & Kegiatan Lingkungan
                    </h4>
                    <p className="text-xs text-[#7C7A74] leading-relaxed">
                      {selectedItem.notes}
                    </p>
                  </div>
                )}

                {/* Map Coordinates & Bounds */}
                <div className="space-y-3 bg-[#F5F4F0] p-5 rounded-2xl border border-[#E5E3DB]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D3E50] flex items-center gap-2">
                    <Map className="h-4.5 w-4.5 text-[#D4AF37]" />
                    Peta Wilayah & Cakupan Lingkungan
                  </h4>
                  <p className="text-[11px] text-[#7C7A74] leading-relaxed">
                    Berikut adalah estimasi zonasi wilayah, batas paroki, dan pusat koordinasi tempat tinggal umat di dalam <strong>{selectedItem.name}</strong>.
                  </p>
                  <div className="relative h-64 w-full rounded-xl overflow-hidden border border-[#E5E3DB] shadow-inner bg-slate-100 group">
                    <img 
                      src="https://res.cloudinary.com/ugnqb757/image/upload/v1784269930/ererere_y1era8.png" 
                      alt="Peta Wilayah Lingkungan"
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
                    
                    {/* Animated Map Pin in Center of Map */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="flex h-3.5 w-3.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600"></span>
                      </div>
                      <MapPin className="h-7 w-7 text-rose-600 drop-shadow-md animate-bounce" />
                      <div className="bg-[#2D3E50] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-md mt-1 border border-white/20 whitespace-nowrap">
                        Wilayah {selectedItem.name.replace("Lingkungan ", "")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button Bottom */}
            <div className="pt-2 text-center">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2.5 bg-[#2D3E50] hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer inline-flex items-center gap-2 group hover:scale-[1.02]"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Daftar Lingkungan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
