import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useOrg } from "../lib/useOrg";
import { Users, Heart, Eye, Activity, TrendingUp, BarChart3, Youtube, Facebook, Instagram, Twitter } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z" />
  </svg>
);

export default function Dashboard() {
  const orgId = useOrg();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orgId) {
      setLoading(true);
      api.analyticsSummary(orgId)
        .then(setSummary)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [orgId]);

  if (loading) {
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <span className="text-lg font-medium text-neutral-600 animate-pulse">Syncing live analytics...</span>
      </div>
    );
  }

  const t = summary?.totals || {};
  const accounts = summary?.accounts || [];

  const cards = [
    { label: "Total Followers", value: t.followers ?? 0, icon: Users, color: "from-blue-500 to-cyan-400" },
    { label: "Total Likes", value: t.likes ?? 0, icon: Heart, color: "from-rose-500 to-pink-400" },
    { label: "Total Views", value: t.impressions ?? 0, icon: Eye, color: "from-violet-500 to-purple-400" },
  ];

  // Prepare chart data from accounts
  const chartData = accounts.map((acc: any) => ({
    name: acc.platform.charAt(0).toUpperCase() + acc.platform.slice(1),
    followers: acc.followers,
    likes: acc.likes,
    impressions: acc.impressions,
  }));

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return <Youtube className="h-5 w-5 text-red-500" />;
      case 'facebook': return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'instagram': return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'x': return <Twitter className="h-5 w-5 text-neutral-800" />;
      case 'pinterest': return <PinterestIcon className="h-5 w-5 text-red-600" />;
      default: return <Activity className="h-5 w-5 text-neutral-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
            <Activity className="h-6 w-6" />
          </div>
          Dashboard Overview
        </h1>
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full shadow-sm border border-emerald-100">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Live Data Synced
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div 
              key={c.label} 
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-neutral-100 transition-all hover:shadow-md hover:-translate-y-1 group"
            >
              <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${c.color} opacity-10 transition-transform group-hover:scale-150`}></div>
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-inner`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">{c.label}</p>
                  <h3 className="text-3xl font-bold text-neutral-900 tracking-tight">
                    {c.value.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-500">
                <TrendingUp className="h-5 w-5" />
              </div>
              Platform Engagement
            </h2>
          </div>
          <div className="h-80 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888' }} tickFormatter={(val) => val.toLocaleString()} />
                  <Tooltip 
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #f5f5f5', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                  <Bar dataKey="followers" name="Followers" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="likes" name="Likes" fill="#ec4899" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-neutral-400 space-y-4">
                <BarChart3 className="h-12 w-12 text-neutral-200" />
                <p>No account data available to display</p>
              </div>
            )}
          </div>
        </div>

        {/* Connected Accounts Breakdown */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:shadow-md flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-500">
                <Users className="h-5 w-5" />
              </div>
              Accounts Overview
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[340px] custom-scrollbar">
            {accounts.length > 0 ? accounts.map((acc: any) => (
              <div key={acc.account_id} className="group rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 transition-all hover:bg-white hover:shadow-md hover:border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-neutral-100 transition-transform group-hover:scale-110 group-hover:rotate-3">
                    {getPlatformIcon(acc.platform)}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900">{acc.display_name}</h4>
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{acc.platform}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3 text-center shadow-sm border border-neutral-50 transition-colors group-hover:border-indigo-50">
                    <div className="text-xs font-medium text-neutral-500 mb-1">Followers</div>
                    <div className="text-lg font-bold text-neutral-900">{acc.followers.toLocaleString()}</div>
                  </div>
                  <div className="rounded-xl bg-white p-3 text-center shadow-sm border border-neutral-50 transition-colors group-hover:border-indigo-50">
                    <div className="text-xs font-medium text-neutral-500 mb-1">Views</div>
                    <div className="text-lg font-bold text-neutral-900">{acc.impressions.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="flex h-full flex-col items-center justify-center text-neutral-400 space-y-4">
                <Activity className="h-10 w-10 text-neutral-200" />
                <p className="text-sm text-center">Connect your social accounts to see them here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
