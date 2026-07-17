import React, { useState, useEffect } from "react";
import { Image, ExternalLink, Calendar } from "lucide-react";
import { Dokumentasi } from "../types";

interface DokumentasiCompProps {
  dokumentasi: Dokumentasi[];
}

export default function DokumentasiComp({ dokumentasi }: DokumentasiCompProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [dokumentasi]);

  const totalPages = Math.ceil(dokumentasi.length / ITEMS_PER_PAGE);
  const currentAlbums = dokumentasi.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="border-b border-[#E5E3DB] pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2D3E50] serif-heading">Dokumentasi Gereja</h1>
        <p className="text-sm text-[#7C7A74] mt-2 leading-relaxed">
          Galeri foto dan album dokumentasi dari berbagai rangkaian liturgi, hari raya, dan aktivitas pelayanan di Paroki Santo Fransiskus Xaverius Dayeuhkolot Bandung.
        </p>
      </div>

      {/* Grid Layout */}
      {dokumentasi.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-[2rem] border border-dashed border-[#E5E3DB]">
          <Image className="h-10 w-10 text-[#7C7A74] mx-auto mb-2 opacity-60" />
          <p className="text-sm text-[#7C7A74] font-medium">Belum ada album dokumentasi yang tersedia.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentAlbums.map((album) => (
              <div
                key={album.id}
                className="bg-white rounded-[2rem] overflow-hidden border border-[#E5E3DB] hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all duration-350 flex flex-col group justify-between animate-fade-in"
              >
                <div>
                  {/* Album Cover with Zoom Effect */}
                  <div className="h-60 overflow-hidden relative bg-[#F5F4F0]">
                    <img
                      src={album.imageUrl || "/tampak_depan_gereja_1783397994892.jpg"}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy={(album.imageUrl && album.imageUrl.startsWith("http")) ? "no-referrer" : undefined}
                    />
                    <div className="absolute top-4 left-4 bg-[#2D3E50]/90 backdrop-blur-sm text-[#D4AF37] text-xs font-bold px-3.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{album.date}</span>
                    </div>
                  </div>

                  {/* Album Details */}
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-[#2D3E50] leading-snug group-hover:text-[#D4AF37] transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-[#7C7A74] text-xs leading-relaxed">
                      Kumpulan dokumentasi foto bersama umat dan petugas liturgi yang terintegrasi secara langsung dengan album Google Photos.
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-6 pb-6 pt-2">
                  <a
                    href={album.googlePhotosUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2D3E50] hover:bg-[#D4AF37] text-white hover:text-white font-bold text-xs rounded-xl transition-all w-full uppercase tracking-wider shadow-sm cursor-pointer"
                  >
                    Buka Album Google Photos <ExternalLink className="h-3.5 w-3.5" />
                  </a>
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
