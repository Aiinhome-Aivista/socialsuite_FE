import { useEffect, useState } from "react";
import { TrendingUp, Users, Heart, Eye, BarChart3, Activity } from "lucide-react";
import { api } from "../lib/api";
import { useOrg } from "../lib/useOrg";

export default function Analytics() {
  const orgId = useOrg();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (orgId) api.analyticsSummary(orgId).then(setData).catch(() => {});
  }, [orgId]);

  const accounts = data?.accounts || [];
  
  // Calculate aggregates
  const totalFollowers = accounts.reduce((acc: number, cur: any) => acc + (cur.followers || 0), 0);
  const totalLikes = accounts.reduce((acc: number, cur: any) => acc + (cur.likes || 0), 0);
  const totalImpressions = accounts.reduce((acc: number, cur: any) => acc + (cur.impressions || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ease-in-out opacity-100 translate-y-0">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-50 to-blue-100 text-indigo-600 rounded-xl shadow-sm border border-indigo-100/50">
              <BarChart3 className="w-7 h-7" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Performance Analytics
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 flex items-center gap-2 font-medium ml-1">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Track your cross-platform social media growth and engagement
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/80 rounded-3xl p-6 shadow-xl shadow-indigo-900/5 border border-indigo-50 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Users className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-600">Total Followers</h3>
          </div>
          <p className="text-4xl font-bold text-gray-900 tracking-tight">
            {totalFollowers.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white/80 rounded-3xl p-6 shadow-xl shadow-indigo-900/5 border border-indigo-50 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Heart className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-600">Total Likes</h3>
          </div>
          <p className="text-4xl font-bold text-gray-900 tracking-tight">
            {totalLikes.toLocaleString()}
          </p>
        </div>

        <div className="bg-white/80 rounded-3xl p-6 shadow-xl shadow-indigo-900/5 border border-indigo-50 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Eye className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-600">Total Impressions</h3>
          </div>
          <p className="text-4xl font-bold text-gray-900 tracking-tight">
            {totalImpressions.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Analytics Table */}
      <div className="bg-white/80 rounded-3xl shadow-xl shadow-indigo-900/5 border border-indigo-50 backdrop-blur-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-indigo-50/50 flex justify-between items-center bg-white/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            Account Breakdown
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-semibold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 rounded-tl-xl">Account</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4 text-right">Followers</th>
                <th className="px-6 py-4 text-right">Likes</th>
                <th className="px-6 py-4 text-right rounded-tr-xl">Impressions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/50">
              {accounts.map((a: any) => (
                <tr key={a.account_id} className="hover:bg-indigo-50/30 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{a.display_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize shadow-sm border border-gray-200/50">
                      {a.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-700">
                    {(a.followers || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-700">
                    {(a.likes || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-700">
                    {(a.impressions || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
              {!accounts.length && (
                <tr>
                  <td className="px-6 py-12 text-center text-gray-400" colSpan={5}>
                    <div className="flex flex-col items-center justify-center gap-3">
                      <BarChart3 className="w-10 h-10 text-gray-300" />
                      <p className="text-base font-medium text-gray-500">No analytics data available yet</p>
                      <p className="text-sm">Connect accounts and let the metrics worker run to see data here.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
