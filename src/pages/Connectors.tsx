import { useEffect, useState } from "react";
import { Link2, Cable, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { api } from "../lib/api";
import { useOrg } from "../lib/useOrg";

const PLATFORMS = [
  { 
    id: "facebook", name: "Facebook", color: "from-blue-600 to-blue-700", bg: "bg-blue-50", text: "text-blue-600",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  { 
    id: "instagram", name: "Instagram", color: "from-pink-500 to-rose-500", bg: "bg-pink-50", text: "text-pink-600",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    )
  },
  { 
    id: "linkedin", name: "LinkedIn", color: "from-sky-600 to-blue-700", bg: "bg-sky-50", text: "text-sky-600",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  { 
    id: "x", name: "X (Twitter)", color: "from-gray-800 to-black", bg: "bg-gray-100", text: "text-gray-900",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
      </svg>
    )
  },
  { 
    id: "youtube", name: "YouTube", color: "from-red-500 to-red-600", bg: "bg-red-50", text: "text-red-600",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  { 
    id: "pinterest", name: "Pinterest", color: "from-red-600 to-rose-700", bg: "bg-rose-50", text: "text-rose-600",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z"/>
      </svg>
    )
  },
  { 
    id: "google_analytics", name: "Google Analytics", color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-600",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.434 20.286c-.571 0-1.034-.463-1.034-1.034V10.222c0-.571.463-1.034 1.034-1.034.571 0 1.034.463 1.034 1.034v9.03c0 .571-.463 1.034-1.034 1.034zM12.017 20.286c-.571 0-1.034-.463-1.034-1.034V4.708c0-.571.463-1.034 1.034-1.034.571 0 1.034.463 1.034 1.034v14.544c0 .571-.463 1.034-1.034 1.034zM4.6 20.286c-.571 0-1.034-.463-1.034-1.034v-5.263c0-.571.463-1.034 1.034-1.034.571 0 1.034.463 1.034 1.034v5.263c0 .571-.463 1.034-1.034 1.034z" />
      </svg>
    )
  },
];

export default function Connectors() {
  const orgId = useOrg();
  const [connected, setConnected] = useState<any[]>([]);

  function refresh() {
    if (orgId) api.listConnectors(orgId).then(setConnected).catch(() => {});
  }
  useEffect(refresh, [orgId]);

  async function connect(platform: string) {
    if (!orgId) return;
    try {
      const { redirect_url } = await api.authorizeConnector(platform, orgId);
      window.location.href = redirect_url; // off to the platform's OAuth screen
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function remove(id: number) {
    await api.disconnect(id);
    refresh();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ease-in-out opacity-100 translate-y-0">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-50 to-blue-100 text-indigo-600 rounded-xl shadow-sm border border-indigo-100/50">
              <Cable className="w-7 h-7" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Social Connections
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 flex items-center gap-2 font-medium ml-1">
            <Link2 className="w-4 h-4 text-indigo-400" />
            Link your social media accounts to enable cross-platform publishing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLATFORMS.map((p) => {
          const accounts = connected.filter((c) => c.platform === p.id);
          const isConnected = accounts.length > 0;
          
          return (
            <div 
              key={p.id} 
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/80 p-6 shadow-xl shadow-indigo-900/5 border border-indigo-50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/10"
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${p.color} opacity-80`} />
              
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${p.bg} ${p.text} shadow-sm border border-white/50 ring-1 ring-black/5`}>
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{p.name}</h3>
                    <p className="text-xs font-medium text-gray-500">
                      {isConnected ? `${accounts.length} account${accounts.length > 1 ? 's' : ''} connected` : 'Not connected'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {accounts.length ? (
                    accounts.map((a) => (
                      <div key={a.id} className="flex items-center justify-between group/account bg-gray-50/50 rounded-xl p-3 border border-gray-100 transition-colors hover:bg-gray-50">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          <span className="text-sm font-medium text-gray-700 truncate">
                            {a.display_name || a.platform}
                          </span>
                        </div>
                        <button 
                          onClick={() => remove(a.id)} 
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Disconnect"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center py-6 px-4 rounded-xl border border-dashed border-gray-200 bg-gray-50/50">
                      <p className="text-sm text-gray-400 font-medium">Ready to connect</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => connect(p.id)}
                className={`w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 
                  ${isConnected 
                    ? 'bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300' 
                    : `bg-gradient-to-r ${p.color} text-white shadow-md hover:shadow-lg hover:opacity-90`
                  }
                `}
              >
                {isConnected ? (
                  <>
                    <Plus className="w-4 h-4" /> Add Another
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4" /> Connect {p.name}
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
