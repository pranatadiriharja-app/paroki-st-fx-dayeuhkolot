import React, { useState, useEffect } from "react";
import { Lock, LogIn, Calendar, Users, Home, Bell, CheckSquare, MessageSquare, Plus, Edit, Trash, Check, X, FileSpreadsheet, Image } from "lucide-react";
import { AgendaParoki, DewanPastoral, Lingkungan, SacramentRegistration, Suggestion, Announcement, Dokumentasi } from "../types";
import { apiFetch as fetch } from "../lib/mockFetch";

interface AdminPanelProps {
  agenda: AgendaParoki[];
  dpp: DewanPastoral[];
  lingkungan: Lingkungan[];
  dokumentasi: Dokumentasi[];
  onRefreshData: () => void;
}

export default function AdminPanel({ agenda, dpp, lingkungan, dokumentasi, onRefreshData }: AdminPanelProps) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("sfxd-token"));
  const [role, setRole] = useState<"superadmin" | "sekretariat" | null>(() => {
    return localStorage.getItem("sfxd-role") as "superadmin" | "sekretariat" | null;
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeSubTab, setActiveSubTab] = useState<"agenda" | "announcement" | "sacraments" | "suggestions" | "dokumentasi">("agenda");

  // Keep subtab in sync with role constraints
  useEffect(() => {
    if (role === "sekretariat" && !["announcement", "sacraments", "suggestions"].includes(activeSubTab)) {
      setActiveSubTab("sacraments");
    }
  }, [role, activeSubTab]);

  // Sacrament & Suggestion data inside admin
  const [registrations, setRegistrations] = useState<SacramentRegistration[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementType, setAnnouncementType] = useState<"info" | "warning" | "success">("info");

  // Editing states
  const [editingAgenda, setEditingAgenda] = useState<AgendaParoki | null>(null);
  const [isAddingAgenda, setIsAddingAgenda] = useState(false);
  const [newAgenda, setNewAgenda] = useState({ title: "", content: "", date: "", imageUrl: "", category: "agenda" as "agenda" | "katekese" | "berita" | "pengumuman" });

  const [editingDpp, setEditingDpp] = useState<DewanPastoral | null>(null);
  const [isAddingDpp, setIsAddingDpp] = useState(false);
  const [newDpp, setNewDpp] = useState({ name: "", role: "", category: "seksi" as "pimpinan" | "wakil" | "sekretaris" | "bendahara" | "seksi", imageUrl: "" });
  const [editingLingkungan, setEditingLingkungan] = useState<Lingkungan | null>(null);

  // Dokumentasi states
  const [editingDokumentasi, setEditingDokumentasi] = useState<Dokumentasi | null>(null);
  const [isAddingDokumentasi, setIsAddingDokumentasi] = useState(false);
  const [newDokumentasi, setNewDokumentasi] = useState({ title: "", date: "", googlePhotosUrl: "", imageUrl: "" });

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          base64Data,
          filename: file.name
        })
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      return data.url;
    } catch (err) {
      console.error("Error uploading image:", err);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Load admin-only data when token is valid
  useEffect(() => {
    if (token) {
      fetchSacraments();
      fetchSuggestions();
    }
  }, [token]);

  const fetchSacraments = async () => {
    try {
      const res = await fetch("/api/sacrament-registrations");
      const data = await res.json();
      setRegistrations(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const res = await fetch("/api/suggestions");
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const exportSacramentsToExcel = () => {
    if (registrations.length === 0) {
      alert("Tidak ada data pendaftaran untuk diekspor.");
      return;
    }

    // Header column names
    const headers = [
      "ID",
      "Nama Lengkap",
      "No. Telepon",
      "Email",
      "Jenis Sakramen",
      "Tempat & Tanggal Lahir",
      "Alamat Rumah",
      "Catatan / Keterangan",
      "Status",
      "Tanggal Daftar"
    ];

    // Build CSV rows
    const csvRows = [
      headers.join(","), // Header row
      ...registrations.map(reg => {
        const rowData = [
          reg.id || "",
          reg.fullName || "",
          reg.phone || "",
          reg.email || "",
          reg.sacramentType || "",
          reg.birthPlaceDate || "",
          reg.address || "",
          reg.details || "",
          reg.status || "",
          reg.createdAt ? new Date(reg.createdAt).toLocaleDateString("id-ID") : ""
        ];
        
        // Escape quotes and wrap fields in double quotes to handle commas, newlines and quotes inside data
        return rowData
          .map(value => `"${value.replace(/"/g, '""').replace(/\r?\n|\r/g, " ")}"`)
          .join(",");
      })
    ];

    // UTF-8 BOM to ensure Excel opens Indonesian/UTF-8 characters properly
    const csvContent = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Data_Pendaftaran_Sakramen_SFXD_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        setRole(data.role);
        localStorage.setItem("sfxd-token", data.token);
        localStorage.setItem("sfxd-role", data.role);
        
        // Coerce starting sub-tab based on role
        if (data.role === "sekretariat") {
          setActiveSubTab("sacraments");
        } else {
          setActiveSubTab("agenda");
        }
      } else {
        setLoginError(data.message || "Gagal masuk.");
      }
    } catch (err) {
      setLoginError("Koneksi gagal.");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("sfxd-token");
    localStorage.removeItem("sfxd-role");
  };

  // Agenda actions
  const handleAddAgenda = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAgenda),
      });
      if (res.ok) {
        setNewAgenda({ title: "", content: "", date: "", imageUrl: "", category: "agenda" });
        setIsAddingAgenda(false);
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateAgenda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAgenda) return;
    try {
      const res = await fetch(`/api/admin/agenda/${editingAgenda.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAgenda),
      });
      if (res.ok) {
        setEditingAgenda(null);
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAgenda = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus agenda kegiatan ini?")) return;
    try {
      const res = await fetch(`/api/admin/agenda/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Dokumentasi actions
  const handleAddDokumentasi = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/dokumentasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDokumentasi),
      });
      if (res.ok) {
        setNewDokumentasi({ title: "", date: "", googlePhotosUrl: "", imageUrl: "" });
        setIsAddingDokumentasi(false);
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateDokumentasi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDokumentasi) return;
    try {
      const res = await fetch(`/api/admin/dokumentasi/${editingDokumentasi.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDokumentasi),
      });
      if (res.ok) {
        setEditingDokumentasi(null);
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDokumentasi = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus album dokumentasi ini?")) return;
    try {
      const res = await fetch(`/api/admin/dokumentasi/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // DPP actions
  const handleAddDpp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/dpp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDpp),
      });
      if (res.ok) {
        setNewDpp({ name: "", role: "", category: "seksi", imageUrl: "" });
        setIsAddingDpp(false);
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateDpp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDpp) return;
    try {
      const res = await fetch(`/api/admin/dpp/${editingDpp.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDpp),
      });
      if (res.ok) {
        setEditingDpp(null);
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDpp = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pengurus DPP ini?")) return;
    try {
      const res = await fetch(`/api/admin/dpp/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Lingkungan actions
  const handleUpdateLingkungan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLingkungan) return;
    try {
      const res = await fetch(`/api/admin/lingkungan/${editingLingkungan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingLingkungan),
      });
      if (res.ok) {
        setEditingLingkungan(null);
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Push Announcement action
  const handlePushAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: announcementText, type: announcementType, active: true }),
      });
      if (res.ok) {
        setAnnouncementText("");
        alert("Notifikasi Pengumuman berhasil dipublikasikan live ke Beranda!");
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Sacrament Status update
  const handleUpdateSacramentStatus = async (id: string, status: "Disetujui" | "Ditolak") => {
    try {
      const res = await fetch(`/api/admin/sacrament-registrations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchSacraments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- RENDER LOGIN IF NOT LOGGED IN ---
  if (!token) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-[2rem] border border-[#E5E3DB] p-6 md:p-8 shadow-sm space-y-6 my-12 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#F5F4F0] text-[#D4AF37] border border-[#E5E3DB] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-[#2D3E50] serif-heading">Portal Administrator</h2>
          <p className="text-xs text-[#7C7A74]">Gunakan akun admin paroki Anda untuk mengelola konten website</p>
        </div>

        {loginError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-2xl text-xs font-semibold text-center">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#2D3E50]">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="cth. admin"
              className="w-full px-4 py-2.5 bg-white border border-[#E5E3DB] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none rounded-2xl text-sm transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#2D3E50]">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-white border border-[#E5E3DB] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none rounded-2xl text-sm transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#D4AF37] hover:bg-[#2D3E50] text-white hover:text-white font-extrabold rounded-full text-sm transition-all shadow-md cursor-pointer uppercase tracking-wider"
          >
            <LogIn className="h-4.5 w-4.5" /> MASUK KE PORTAL
          </button>
        </form>
      </div>
    );
  }

  // --- RENDER ADMIN DASHBOARD IF LOGGED IN ---
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E5E3DB] pb-4 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D3E50] serif-heading">Dashboard Admin Paroki</h1>
          <p className="text-xs text-[#7C7A74]">
            Status Akun: <span className="font-bold text-[#D4AF37]">{role === "superadmin" ? "Super Admin" : "Admin Sekretariat"}</span> (Live Mode)
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#F5F4F0] hover:bg-rose-50 hover:text-rose-700 text-[#7C7A74] font-bold text-xs rounded-xl transition-all border border-[#E5E3DB] cursor-pointer"
        >
          Keluar Admin
        </button>
      </div>

      {/* Admin Subtabs Menu */}
      <div className="flex flex-wrap gap-2 border-b border-[#E5E3DB] pb-3">
        {role !== "sekretariat" && (
          <>
            <button
              onClick={() => setActiveSubTab("agenda")}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all border ${
                activeSubTab === "agenda"
                  ? "bg-[#2D3E50] text-white border-[#2D3E50] shadow-sm"
                  : "text-[#7C7A74] bg-[#F5F4F0] hover:bg-white border-[#E5E3DB] hover:text-[#2D3E50]"
              }`}
            >
              <Calendar className="h-4 w-4" /> Kelola Warta ({agenda.length})
            </button>
            <button
              onClick={() => setActiveSubTab("dokumentasi")}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all border ${
                activeSubTab === "dokumentasi"
                  ? "bg-[#2D3E50] text-white border-[#2D3E50] shadow-sm"
                  : "text-[#7C7A74] bg-[#F5F4F0] hover:bg-white border-[#E5E3DB] hover:text-[#2D3E50]"
              }`}
            >
              <Image className="h-4 w-4" /> Kelola Dokumentasi ({dokumentasi ? dokumentasi.length : 0})
            </button>
          </>
        )}
        <button
          onClick={() => setActiveSubTab("announcement")}
          className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all border ${
            activeSubTab === "announcement"
              ? "bg-[#2D3E50] text-white border-[#2D3E50] shadow-sm"
              : "text-[#7C7A74] bg-[#F5F4F0] hover:bg-white border-[#E5E3DB] hover:text-[#2D3E50]"
          }`}
        >
          <Bell className="h-4 w-4" /> Push Pengumuman
        </button>
        <button
          onClick={() => setActiveSubTab("sacraments")}
          className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all border ${
            activeSubTab === "sacraments"
              ? "bg-[#2D3E50] text-white border-[#2D3E50] shadow-sm"
              : "text-[#7C7A74] bg-[#F5F4F0] hover:bg-white border-[#E5E3DB] hover:text-[#2D3E50]"
          }`}
        >
          <CheckSquare className="h-4 w-4" /> Pendaftaran Sakramen ({registrations.length})
        </button>
        <button
          onClick={() => setActiveSubTab("suggestions")}
          className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all border ${
            activeSubTab === "suggestions"
              ? "bg-[#2D3E50] text-white border-[#2D3E50] shadow-sm"
              : "text-[#7C7A74] bg-[#F5F4F0] hover:bg-white border-[#E5E3DB] hover:text-[#2D3E50]"
          }`}
        >
          <MessageSquare className="h-4 w-4" /> Kotak Saran ({suggestions.length})
        </button>
      </div>

      {/* SUBTAB CONTENT */}

      {/* 1. KELOLA AGENDA */}
      {activeSubTab === "agenda" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-5 rounded-[2rem] border border-[#E5E3DB]">
            <h3 className="font-bold text-[#2D3E50] text-sm md:text-base">Daftar Warta Paroki Saat Ini</h3>
            {!isAddingAgenda && (
              <button
                onClick={() => setIsAddingAgenda(true)}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#2D3E50] text-white font-extrabold text-xs rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Tambah Warta Baru
              </button>
            )}
          </div>

          {/* Form Add Agenda */}
          {isAddingAgenda && (
            <form onSubmit={handleAddAgenda} className="bg-white rounded-[2rem] border border-amber-200 p-6 space-y-4 shadow-sm">
              <h4 className="font-bold text-slate-900 text-sm border-b pb-2">Tambah Warta Paroki Baru</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Judul Kegiatan</label>
                  <input
                    type="text"
                    required
                    value={newAgenda.title}
                    onChange={(e) => setNewAgenda({ ...newAgenda, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Tanggal Kegiatan</label>
                  <input
                    type="date"
                    required
                    value={newAgenda.date}
                    onChange={(e) => setNewAgenda({ ...newAgenda, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Kategori Warta</label>
                  <select
                    value={newAgenda.category || "agenda"}
                    onChange={(e) => setNewAgenda({ ...newAgenda, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="agenda">Agenda Kegiatan</option>
                    <option value="katekese">Katekese Pastor</option>
                    <option value="berita">Berita Paroki</option>
                    <option value="pengumuman">Pengumuman</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-600">Gambar Banner URL (Atau biarkan default)</label>
                <input
                  type="text"
                  value={newAgenda.imageUrl}
                  onChange={(e) => setNewAgenda({ ...newAgenda, imageUrl: e.target.value })}
                  placeholder="cth. https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-600">Isi Konten Berita / Informasi</label>
                <textarea
                  rows={4}
                  required
                  value={newAgenda.content}
                  onChange={(e) => setNewAgenda({ ...newAgenda, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingAgenda(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-lg"
                >
                  Simpan Kegiatan
                </button>
              </div>
            </form>
          )}

          {/* Form Edit Agenda */}
          {editingAgenda && (
            <form onSubmit={handleUpdateAgenda} className="bg-white rounded-[2rem] border border-amber-300 p-6 space-y-4 shadow-md">
              <h4 className="font-bold text-slate-900 text-sm border-b pb-2 font-serif">Ubah Data Warta Paroki</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Judul Kegiatan</label>
                  <input
                    type="text"
                    required
                    value={editingAgenda.title}
                    onChange={(e) => setEditingAgenda({ ...editingAgenda, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Tanggal Kegiatan</label>
                  <input
                    type="date"
                    required
                    value={editingAgenda.date}
                    onChange={(e) => setEditingAgenda({ ...editingAgenda, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Kategori Warta</label>
                  <select
                    value={editingAgenda.category || "agenda"}
                    onChange={(e) => setEditingAgenda({ ...editingAgenda, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="agenda">Agenda Kegiatan</option>
                    <option value="katekese">Katekese Pastor</option>
                    <option value="berita">Berita Paroki</option>
                    <option value="pengumuman">Pengumuman</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-600">Gambar Banner URL</label>
                <input
                  type="text"
                  value={editingAgenda.imageUrl || ""}
                  onChange={(e) => setEditingAgenda({ ...editingAgenda, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-600">Isi Konten Berita / Informasi</label>
                <textarea
                  rows={4}
                  required
                  value={editingAgenda.content}
                  onChange={(e) => setEditingAgenda({ ...editingAgenda, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm resize-none"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setEditingAgenda(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-lg"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          )}

          {/* Agenda List */}
          <div className="grid grid-cols-1 gap-4">
            {agenda.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 justify-between items-start">
                <div className="flex gap-3 items-start">
                  <img src={item.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" referrerPolicy={item.imageUrl && item.imageUrl.startsWith("http") ? "no-referrer" : undefined} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight">{item.title}</h4>
                      <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {item.category || "agenda"}
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-700 font-semibold">{item.date}</span>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">{item.content}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => setEditingAgenda(item)}
                    className="p-1.5 bg-slate-100 hover:bg-amber-100 hover:text-amber-700 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAgenda(item.id)}
                    className="p-1.5 bg-slate-100 hover:bg-rose-100 hover:text-rose-700 rounded-lg transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}





      {/* 4. PENGUMUMAN PUSH */}
      {activeSubTab === "announcement" && (
        <form onSubmit={handlePushAnnouncement} className="bg-white rounded-3xl border border-amber-100 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 serif-heading flex items-center gap-2">
              <Bell className="h-5.5 w-5.5 text-amber-700" /> Publikasikan Pengumuman Push Live
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Publikasikan pengumuman mendesak atau kabar gembira terbaru yang akan langsung muncul sebagai banner push di atas Beranda situs web umat.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Teks Pengumuman</label>
              <textarea
                required
                rows={3}
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="cth. Pengumuman: Pelaksanaan Pelayanan Perubahan Data Kependudukan & Catatan Sipil diadakan pada Sabtu, 14 Maret 2026 di Aula Gereja pukul 09.00 WIB."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:outline-none rounded-xl text-slate-800 text-sm resize-none"
              />
            </div>

            <div className="space-y-1.5 max-w-xs">
              <label className="text-xs font-semibold text-slate-700 block">Kategori Visual Banner</label>
              <select
                value={announcementType}
                onChange={(e) => setAnnouncementType(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:outline-none rounded-xl text-slate-800 text-sm"
              >
                <option value="info">Informasi (Amber / Gold)</option>
                <option value="warning">Penting / Perhatian (Merah)</option>
                <option value="success">Pengumuman Sukacita (Hijau)</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              KIRIM & PUBLIKASIKAN SEKARANG
            </button>
          </div>
        </form>
      )}

      {/* 5. PENDAFTARAN SAKRAMEN */}
      {activeSubTab === "sacraments" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-amber-100 flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">Log Pendaftaran Sakramen Online Jemaat</h3>
              <p className="text-xs text-slate-400">Berikut adalah data pengajuan dari jemaat secara live melalui halaman E-Formulir.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportSacramentsToExcel}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <FileSpreadsheet className="h-4 w-4" /> Ekspor ke Excel
              </button>
              <button
                onClick={fetchSacraments}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-lg transition-all cursor-pointer"
              >
                Refresh Data
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {registrations.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                <CheckSquare className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Belum ada pendaftaran sakramen online yang masuk.</p>
              </div>
            ) : (
              registrations.map((reg) => (
                <div key={reg.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-50 pb-3">
                    <div>
                      <span className="text-[9px] font-extrabold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {reg.sacramentType}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base mt-1">{reg.fullName}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        reg.status === "Pending" ? "bg-amber-100 text-amber-800" :
                        reg.status === "Disetujui" ? "bg-emerald-100 text-emerald-800" :
                        "bg-rose-100 text-rose-800"
                      }`}>
                        {reg.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <p className="text-slate-400">Kontak Telepon / Email:</p>
                      <p className="font-semibold text-slate-800">{reg.phone} / {reg.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400">Tempat, Tanggal Lahir:</p>
                      <p className="font-semibold text-slate-800">{reg.birthPlaceDate}</p>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-slate-400">Alamat Rumah:</p>
                      <p className="font-semibold text-slate-800 leading-relaxed">{reg.address}</p>
                    </div>
                    {reg.details && (
                      <div className="space-y-1 md:col-span-2 bg-slate-50 p-3 rounded-xl">
                        <p className="text-slate-400">Catatan/Keterangan Tambahan:</p>
                        <p className="font-medium text-slate-700 mt-0.5 leading-relaxed">{reg.details}</p>
                      </div>
                    )}
                  </div>

                  {reg.status === "Pending" && (
                    <div className="flex gap-2 justify-end pt-2 border-t border-slate-50">
                      <button
                        onClick={() => handleUpdateSacramentStatus(reg.id, "Ditolak")}
                        className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl flex items-center gap-1 transition-all"
                      >
                        <X className="h-3.5 w-3.5" /> Tolak Berkas
                      </button>
                      <button
                        onClick={() => handleUpdateSacramentStatus(reg.id, "Disetujui")}
                        className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl flex items-center gap-1 transition-all"
                      >
                        <Check className="h-3.5 w-3.5" /> Setujui Pendaftaran
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 6. KOTAK SARAN MASUK */}
      {activeSubTab === "suggestions" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-amber-100 flex justify-between items-center flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">Logs Kotak Saran Umat</h3>
              <p className="text-xs text-slate-400">Kumpulan saran masukan jemaat yang tersimpan otomatis (terintegrasi ke database lokal & Google Sheets).</p>
            </div>
            <button
              onClick={fetchSuggestions}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-lg transition-all"
            >
              Refresh Data
            </button>
          </div>

          <div className="space-y-4">
            {suggestions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                <MessageSquare className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Belum ada saran atau kritik masukan dari umat yang dikirim.</p>
              </div>
            ) : (
              suggestions.map((sug) => (
                <div key={sug.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
                  <div className="flex justify-between items-start gap-2 flex-wrap border-b border-slate-200/50 pb-2">
                    <div>
                      <h4 className="font-bold text-slate-950 text-sm">{sug.name || "Anonim"}</h4>
                      <p className="text-xs text-slate-400">{sug.email || "Email tidak dicantumkan"}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full font-medium">
                      {new Date(sug.createdAt).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{sug.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 7. KELOLA DOKUMENTASI */}
      {activeSubTab === "dokumentasi" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-5 rounded-[2rem] border border-[#E5E3DB]">
            <div>
              <h3 className="font-bold text-[#2D3E50] text-sm md:text-base">Daftar Album Dokumentasi Gereja</h3>
              <p className="text-xs text-[#7C7A74]">Input album Google Photos rangkaian kegiatan liturgi atau pastoral paroki</p>
            </div>
            {!isAddingDokumentasi && (
              <button
                onClick={() => setIsAddingDokumentasi(true)}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#2D3E50] text-white font-extrabold text-xs rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Tambah Album
              </button>
            )}
          </div>

          {/* Form Add Dokumentasi */}
          {isAddingDokumentasi && (
            <form onSubmit={handleAddDokumentasi} className="bg-white rounded-[2rem] border border-[#D4AF37]/30 p-6 space-y-4 shadow-sm">
              <h4 className="font-bold text-slate-900 text-sm border-b pb-2 font-serif">Tambah Album Dokumentasi Baru</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Judul / Nama Album</label>
                  <input
                    type="text"
                    required
                    value={newDokumentasi.title}
                    onChange={(e) => setNewDokumentasi({ ...newDokumentasi, title: e.target.value })}
                    placeholder="cth. Perayaan Malam Paskah (04.04.2026)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Tanggal Album / Kegiatan</label>
                  <input
                    type="text"
                    required
                    value={newDokumentasi.date}
                    onChange={(e) => setNewDokumentasi({ ...newDokumentasi, date: e.target.value })}
                    placeholder="cth. 04.04.2026 atau 12 Juli 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Link Google Photos Album URL</label>
                  <input
                    type="url"
                    required
                    value={newDokumentasi.googlePhotosUrl}
                    onChange={(e) => setNewDokumentasi({ ...newDokumentasi, googlePhotosUrl: e.target.value })}
                    placeholder="cth. https://photos.app.goo.gl/..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Foto Sampul Album (Image URL / Upload Lokal)</label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={newDokumentasi.imageUrl}
                      onChange={(e) => setNewDokumentasi({ ...newDokumentasi, imageUrl: e.target.value })}
                      placeholder="Masukkan URL foto atau unggah di bawah..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await handleImageUpload(e.target.files[0]);
                            if (url) {
                              setNewDokumentasi({ ...newDokumentasi, imageUrl: url });
                            }
                          }
                        }}
                        className="text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                      />
                      {isUploading && <span className="text-[10px] text-slate-500 animate-pulse">Mengunggah...</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingDokumentasi(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#2D3E50] text-white text-xs font-extrabold rounded-lg"
                >
                  Simpan Album
                </button>
              </div>
            </form>
          )}

          {/* Form Edit Dokumentasi */}
          {editingDokumentasi && (
            <form onSubmit={handleUpdateDokumentasi} className="bg-white rounded-[2rem] border border-amber-300 p-6 space-y-4 shadow-md">
              <h4 className="font-bold text-slate-900 text-sm border-b pb-2 font-serif">Ubah Album Dokumentasi</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Judul / Nama Album</label>
                  <input
                    type="text"
                    required
                    value={editingDokumentasi.title}
                    onChange={(e) => setEditingDokumentasi({ ...editingDokumentasi, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Tanggal Album / Kegiatan</label>
                  <input
                    type="text"
                    required
                    value={editingDokumentasi.date}
                    onChange={(e) => setEditingDokumentasi({ ...editingDokumentasi, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Link Google Photos Album URL</label>
                  <input
                    type="url"
                    required
                    value={editingDokumentasi.googlePhotosUrl}
                    onChange={(e) => setEditingDokumentasi({ ...editingDokumentasi, googlePhotosUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-bold">Foto Sampul Album (Image URL / Upload Lokal)</label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={editingDokumentasi.imageUrl || ""}
                      onChange={(e) => setEditingDokumentasi({ ...editingDokumentasi, imageUrl: e.target.value })}
                      placeholder="Masukkan URL foto atau unggah di bawah..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const url = await handleImageUpload(e.target.files[0]);
                            if (url) {
                              setEditingDokumentasi({ ...editingDokumentasi, imageUrl: url });
                            }
                          }
                        }}
                        className="text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                      />
                      {isUploading && <span className="text-[10px] text-slate-500 animate-pulse">Mengunggah...</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setEditingDokumentasi(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-lg"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          )}

          {/* List of Albums */}
          <div className="grid grid-cols-1 gap-4">
            {dokumentasi && dokumentasi.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-[2rem] border border-dashed border-slate-200">
                <Image className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Belum ada album dokumentasi yang tersimpan.</p>
              </div>
            ) : (
              dokumentasi && dokumentasi.map((album) => (
                <div key={album.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 justify-between items-start shadow-sm">
                  <div className="flex gap-3 items-start">
                    <img
                      src={album.imageUrl || "/tampak_depan_gereja_1783397994892.jpg"}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      referrerPolicy={(album.imageUrl && album.imageUrl.startsWith("http")) ? "no-referrer" : undefined}
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight">{album.title}</h4>
                      <span className="text-[10px] text-[#D4AF37] font-semibold">{album.date}</span>
                      <p className="text-xs text-slate-400 mt-1 truncate max-w-md">{album.googlePhotosUrl}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => {
                        setEditingDokumentasi(album);
                        setIsAddingDokumentasi(false);
                      }}
                      className="p-1.5 bg-slate-100 hover:bg-amber-100 hover:text-amber-700 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDokumentasi(album.id)}
                      className="p-1.5 bg-slate-100 hover:bg-rose-100 hover:text-rose-700 rounded-lg transition-colors"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
