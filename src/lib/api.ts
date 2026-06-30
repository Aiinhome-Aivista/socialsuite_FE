// Thin API client. Token in localStorage for the starter; move to httpOnly
// cookies for production hardening.

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function setToken(t: string) {
  localStorage.setItem("token", t);
}

export function clearToken() {
  localStorage.removeItem("token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  const isFormData = options.body instanceof FormData;
  const headers: HeadersInit = {
    ...(!isFormData && options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error((detail as any).detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  register: (data: any) =>
    request<{ access_token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (data: any) =>
    request<{ access_token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  googleLogin: (data: { credential: string }) =>
    request<{ access_token: string }>("/auth/google", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  me: () => request<any>("/auth/me"),

  listConnectors: (orgId: number) => request<any[]>(`/connectors?org_id=${orgId}`),
  authorizeConnector: (platform: string, orgId: number) =>
    request<{ redirect_url: string }>(`/connectors/${platform}/authorize?org_id=${orgId}`),
  disconnect: (accountId: number) =>
    request<any>(`/connectors/${accountId}`, { method: "DELETE" }),

  uploadMedia: (file: File, onProgress?: (percent: number) => void): Promise<{ url: string }> => {
    return new Promise((resolve, reject) => {
      const token = getToken();
      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            reject(new Error("Invalid JSON response"));
          }
        } else {
          try {
            const error = JSON.parse(xhr.responseText);
            reject(new Error(error.detail || "Upload failed"));
          } catch (e) {
            reject(new Error("Upload failed"));
          }
        }
      };

      xhr.onerror = () => reject(new Error("Network error"));

      xhr.open("POST", `${BASE}/media/upload`);
      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }

      const formData = new FormData();
      formData.append("file", file);
      xhr.send(formData);
    });
  },

  generateCaption: (data: any) =>
    request<{ caption: string }>("/ai/caption", { method: "POST", body: JSON.stringify(data) }),
  generateHashtags: (data: any) =>
    request<{ hashtags: string[] }>("/ai/hashtags", { method: "POST", body: JSON.stringify(data) }),
  autoFill: (data: any) =>
    request<{ caption: string, hashtags: string[] }>("/ai/auto_fill", { method: "POST", body: JSON.stringify(data) }),
  analyzeAccount: (data: any) =>
    request<any>("/ai/analyze", { method: "POST", body: JSON.stringify(data) }),

  listPosts: (orgId: number) => request<any[]>(`/posts?org_id=${orgId}`),
  createPost: (data: any) =>
    request<any>("/posts", { method: "POST", body: JSON.stringify(data) }),
  deletePost: (postId: number) =>
    request<any>(`/posts/${postId}`, { method: "DELETE" }),

  analyticsSummary: (orgId: number) => request<any>(`/analytics/summary?org_id=${orgId}`),
};
