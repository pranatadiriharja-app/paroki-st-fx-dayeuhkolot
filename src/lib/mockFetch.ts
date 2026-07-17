// Mock Fetch Interceptor for Client-Only/LocalStorage Execution
// This allows the entire app to run perfectly on Vercel as a static app with full interactive capabilities!

import { Announcement, AgendaParoki, DewanPastoral, Lingkungan, Dokumentasi, SacramentRegistration, Suggestion } from "../types";

// // Seed Data from db.json
import dbJson from "../../data/db.json";

const initialAnnouncements: Announcement[] = dbJson.announcements as Announcement[];
const initialAgenda: AgendaParoki[] = dbJson.agenda as AgendaParoki[];
const initialDpp: DewanPastoral[] = dbJson.dpp as DewanPastoral[];
const initialLingkungan: Lingkungan[] = dbJson.lingkungan as Lingkungan[];
const initialDokumentasi: Dokumentasi[] = dbJson.dokumentasi as any[] as Dokumentasi[];

// LocalStorage key mappings
const KEYS = {
  ANNOUNCEMENTS: "sfxd_announcements",
  AGENDA: "sfxd_agenda",
  DPP: "sfxd_dpp",
  LINGKUNGAN: "sfxd_lingkungan",
  DOKUMENTASI: "sfxd_dokumentasi",
  SACRAMENTS: "sfxd_sacraments",
  SUGGESTIONS: "sfxd_suggestions"
};

// Helper: Ensure LocalStorage is initialized
function initStorage() {
  const CURRENT_VERSION = "v_pastoral_sync_json_v15";
  const storedVersion = localStorage.getItem("sfxd_db_version");

  if (storedVersion !== CURRENT_VERSION) {
    // Reset/update data to make sure Cloudinary URLs and new items are loaded
    localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(initialAnnouncements));
    localStorage.setItem(KEYS.AGENDA, JSON.stringify(initialAgenda));
    localStorage.setItem(KEYS.DPP, JSON.stringify(initialDpp));
    localStorage.setItem(KEYS.LINGKUNGAN, JSON.stringify(initialLingkungan));
    localStorage.setItem(KEYS.DOKUMENTASI, JSON.stringify(initialDokumentasi));
    localStorage.setItem("sfxd_db_version", CURRENT_VERSION);
  } else {
    if (!localStorage.getItem(KEYS.ANNOUNCEMENTS)) {
      localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(initialAnnouncements));
    }
    if (!localStorage.getItem(KEYS.AGENDA)) {
      localStorage.setItem(KEYS.AGENDA, JSON.stringify(initialAgenda));
    }
    if (!localStorage.getItem(KEYS.DPP)) {
      localStorage.setItem(KEYS.DPP, JSON.stringify(initialDpp));
    }
    if (!localStorage.getItem(KEYS.LINGKUNGAN)) {
      localStorage.setItem(KEYS.LINGKUNGAN, JSON.stringify(initialLingkungan));
    }
    if (!localStorage.getItem(KEYS.DOKUMENTASI)) {
      localStorage.setItem(KEYS.DOKUMENTASI, JSON.stringify(initialDokumentasi));
    }
  }

  if (!localStorage.getItem(KEYS.SACRAMENTS)) {
    localStorage.setItem(KEYS.SACRAMENTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.SUGGESTIONS)) {
    localStorage.setItem(KEYS.SUGGESTIONS, JSON.stringify([]));
  }
}

// Map any path containing /src/assets/images/ to / for simple compatibility with Vite public static folder
function sanitizeItemPaths(item: any): any {
  if (!item || typeof item !== "object") return item;
  const copy = { ...item };
  for (const k in copy) {
    if (typeof copy[k] === "string" && copy[k].includes("/src/assets/images/")) {
      copy[k] = copy[k].replace("/src/assets/images/", "/");
    }
  }
  return copy;
}

function sanitizeArrayPaths(arr: any[]): any[] {
  return arr.map(sanitizeItemPaths);
}

// Intercept window.fetch safely
export function setupMockFetch() {
  if (typeof window === "undefined") return;

  initStorage();

  const originalFetch = window.fetch;

  const mockFetchHandler = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    
    // Check if it's an API request
    if (!url.includes("/api/")) {
      return originalFetch(input, init);
    }

    // Bypass agenda and admin agenda requests to the real Express server (db.json based)
    if (url.includes("/api/agenda") || url.includes("/api/admin/agenda")) {
      return originalFetch(input, init);
    }

    // Bypass dokumentasi (galeri) and admin/dokumentasi requests to the real Express server (db.json based)
    if (url.includes("/api/dokumentasi") || url.includes("/api/admin/dokumentasi")) {
      return originalFetch(input, init);
    }

    // Bypass announcements (pengumuman) and admin/announcements requests to the real Express server (db.json based)
    if (url.includes("/api/announcements") || url.includes("/api/admin/announcements")) {
      return originalFetch(input, init);
    }

    const method = init?.method?.toUpperCase() || "GET";
    const bodyData = init?.body ? JSON.parse(init.body as string) : null;

    console.log(`[MockFetch] ${method} ${url}`, bodyData);

    try {
      // 1. Announcements
      if (url.endsWith("/api/announcements")) {
        const data = JSON.parse(localStorage.getItem(KEYS.ANNOUNCEMENTS) || "[]");
        return mockResponse(sanitizeArrayPaths(data));
      }
      if (url.endsWith("/api/admin/announcements") && method === "POST") {
        const data = JSON.parse(localStorage.getItem(KEYS.ANNOUNCEMENTS) || "[]");
        const newAnn: Announcement = {
          id: `ann-${Date.now()}`,
          text: bodyData.text,
          type: bodyData.type || "info",
          active: true,
          createdAt: new Date().toISOString()
        };
        // Deactivate others
        const updated = data.map((a: Announcement) => ({ ...a, active: false })).concat(newAnn);
        localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(updated));
        return mockResponse({ success: true, item: newAnn });
      }

      // 2. Agenda
      if (url.endsWith("/api/agenda")) {
        const data = JSON.parse(localStorage.getItem(KEYS.AGENDA) || "[]");
        return mockResponse(sanitizeArrayPaths(data));
      }
      if (url.endsWith("/api/admin/agenda")) {
        const data = JSON.parse(localStorage.getItem(KEYS.AGENDA) || "[]");
        if (method === "POST") {
          const newItem: AgendaParoki = {
            id: `ag-${Date.now()}`,
            title: bodyData.title,
            content: bodyData.content,
            date: bodyData.date,
            imageUrl: bodyData.imageUrl || "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
            category: bodyData.category || "agenda"
          };
          data.push(newItem);
          localStorage.setItem(KEYS.AGENDA, JSON.stringify(data));
          return mockResponse({ success: true, item: newItem });
        }
      }
      if (url.includes("/api/admin/agenda/")) {
        const id = url.split("/").pop();
        let data = JSON.parse(localStorage.getItem(KEYS.AGENDA) || "[]");
        if (method === "PUT") {
          data = data.map((item: AgendaParoki) => item.id === id ? { ...item, ...bodyData } : item);
          localStorage.setItem(KEYS.AGENDA, JSON.stringify(data));
          return mockResponse({ success: true });
        }
        if (method === "DELETE") {
          data = data.filter((item: AgendaParoki) => item.id !== id);
          localStorage.setItem(KEYS.AGENDA, JSON.stringify(data));
          return mockResponse({ success: true });
        }
      }

      // 3. DPP
      if (url.endsWith("/api/dpp")) {
        const data = JSON.parse(localStorage.getItem(KEYS.DPP) || "[]");
        return mockResponse(sanitizeArrayPaths(data));
      }
      if (url.endsWith("/api/admin/dpp")) {
        const data = JSON.parse(localStorage.getItem(KEYS.DPP) || "[]");
        if (method === "POST") {
          const newItem: DewanPastoral = {
            id: `dpp-${Date.now()}`,
            name: bodyData.name,
            role: bodyData.role,
            category: bodyData.category,
            imageUrl: bodyData.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
          };
          data.push(newItem);
          localStorage.setItem(KEYS.DPP, JSON.stringify(data));
          return mockResponse({ success: true, item: newItem });
        }
      }
      if (url.includes("/api/admin/dpp/")) {
        const id = url.split("/").pop();
        let data = JSON.parse(localStorage.getItem(KEYS.DPP) || "[]");
        if (method === "PUT") {
          data = data.map((item: DewanPastoral) => item.id === id ? { ...item, ...bodyData } : item);
          localStorage.setItem(KEYS.DPP, JSON.stringify(data));
          return mockResponse({ success: true });
        }
        if (method === "DELETE") {
          data = data.filter((item: DewanPastoral) => item.id !== id);
          localStorage.setItem(KEYS.DPP, JSON.stringify(data));
          return mockResponse({ success: true });
        }
      }

      // 4. Lingkungan
      if (url.endsWith("/api/lingkungan")) {
        const data = JSON.parse(localStorage.getItem(KEYS.LINGKUNGAN) || "[]");
        return mockResponse(sanitizeArrayPaths(data));
      }
      if (url.includes("/api/admin/lingkungan/")) {
        const id = url.split("/").pop();
        let data = JSON.parse(localStorage.getItem(KEYS.LINGKUNGAN) || "[]");
        if (method === "PUT") {
          data = data.map((item: Lingkungan) => item.id === id ? { ...item, ...bodyData } : item);
          localStorage.setItem(KEYS.LINGKUNGAN, JSON.stringify(data));
          return mockResponse({ success: true });
        }
      }

      // 5. Dokumentasi
      if (url.endsWith("/api/dokumentasi")) {
        const data = JSON.parse(localStorage.getItem(KEYS.DOKUMENTASI) || "[]");
        return mockResponse(sanitizeArrayPaths(data));
      }
      if (url.endsWith("/api/admin/dokumentasi")) {
        const data = JSON.parse(localStorage.getItem(KEYS.DOKUMENTASI) || "[]");
        if (method === "POST") {
          const newItem: Dokumentasi = {
            id: `doc-${Date.now()}`,
            title: bodyData.title,
            date: bodyData.date,
            googlePhotosUrl: bodyData.googlePhotosUrl || "#",
            imageUrl: bodyData.imageUrl || "https://images.unsplash.com/photo-1548625361-155deee22154?auto=format&fit=crop&w=400&q=80"
          };
          data.push(newItem);
          localStorage.setItem(KEYS.DOKUMENTASI, JSON.stringify(data));
          return mockResponse({ success: true, item: newItem });
        }
      }
      if (url.includes("/api/admin/dokumentasi/")) {
        const id = url.split("/").pop();
        let data = JSON.parse(localStorage.getItem(KEYS.DOKUMENTASI) || "[]");
        if (method === "PUT") {
          data = data.map((item: Dokumentasi) => item.id === id ? { ...item, ...bodyData } : item);
          localStorage.setItem(KEYS.DOKUMENTASI, JSON.stringify(data));
          return mockResponse({ success: true });
        }
        if (method === "DELETE") {
          data = data.filter((item: Dokumentasi) => item.id !== id);
          localStorage.setItem(KEYS.DOKUMENTASI, JSON.stringify(data));
          return mockResponse({ success: true });
        }
      }

      // 6. Sacrament registrations
      if (url.endsWith("/api/sacrament-registrations")) {
        const data = JSON.parse(localStorage.getItem(KEYS.SACRAMENTS) || "[]");
        if (method === "GET") {
          return mockResponse(data);
        }
        if (method === "POST") {
          const newReg: SacramentRegistration = {
            id: `reg-${Date.now()}`,
            fullName: bodyData.fullName,
            phone: bodyData.phone,
            email: bodyData.email,
            sacramentType: bodyData.sacramentType,
            birthPlaceDate: bodyData.birthPlaceDate,
            address: bodyData.address,
            details: bodyData.details,
            status: "Pending",
            createdAt: new Date().toISOString()
          };
          data.push(newReg);
          localStorage.setItem(KEYS.SACRAMENTS, JSON.stringify(data));
          return mockResponse({ success: true, item: newReg });
        }
      }
      if (url.includes("/api/admin/sacrament-registrations/")) {
        const id = url.split("/").pop();
        let data = JSON.parse(localStorage.getItem(KEYS.SACRAMENTS) || "[]");
        if (method === "PUT") {
          data = data.map((item: SacramentRegistration) => item.id === id ? { ...item, ...bodyData } : item);
          localStorage.setItem(KEYS.SACRAMENTS, JSON.stringify(data));
          return mockResponse({ success: true });
        }
      }

      // 7. Suggestions
      if (url.endsWith("/api/suggestions")) {
        const data = JSON.parse(localStorage.getItem(KEYS.SUGGESTIONS) || "[]");
        if (method === "GET") {
          return mockResponse(data);
        }
        if (method === "POST") {
          const newSug: Suggestion = {
            id: `sug-${Date.now()}`,
            name: bodyData.name,
            email: bodyData.email,
            message: bodyData.message,
            createdAt: new Date().toISOString()
          };
          data.push(newSug);
          localStorage.setItem(KEYS.SUGGESTIONS, JSON.stringify(data));
          return mockResponse({ success: true, item: newSug });
        }
      }

      // 8. Admin Login
      if (url.endsWith("/api/admin/login") && method === "POST") {
        if (bodyData.username === "admin" && bodyData.password === "admin") {
          return mockResponse({
            success: true,
            token: "mock-token-sfxd-12345",
            role: "superadmin"
          });
        } else {
          return mockResponse({
            success: false,
            message: "Username atau Password salah. Gunakan admin/admin untuk uji coba."
          }, 401);
        }
      }

      return new Response(JSON.stringify({ error: "Endpoint not mapped" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    } catch (e) {
      console.error("[MockFetch Error]", e);
      return new Response(JSON.stringify({ error: "Serverless runtime error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  };

  // Expose on window so our apiFetch helper can call it directly
  (window as any)._mockFetchHandler = mockFetchHandler;

  // Attempt to intercept standard window.fetch
  try {
    Object.defineProperty(window, "fetch", {
      value: mockFetchHandler,
      writable: true,
      configurable: true,
      enumerable: true
    });
  } catch (err) {
    console.warn("Could not define property 'fetch' on window:", err);
    try {
      (window as any).fetch = mockFetchHandler;
    } catch (err2) {
      console.error("Critical: Cannot override window.fetch directly:", err2);
    }
  }
}

// Resilient helper to execute mock API requests even if window.fetch cannot be globally overridden
export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  if (typeof window !== "undefined" && (window as any)._mockFetchHandler) {
    return (window as any)._mockFetchHandler(input, init);
  }
  return fetch(input, init);
}

// Utility to wrap response mock
function mockResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
