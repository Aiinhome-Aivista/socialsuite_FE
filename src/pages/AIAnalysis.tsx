import { useEffect, useState } from "react";
import {
  Sparkles, TrendingUp, Youtube, Twitter, Instagram, Facebook,
  Linkedin, RefreshCw, ChevronRight, CheckCircle2, ChevronDown, Activity, AlertCircle, Calendar
} from "lucide-react";
import { api } from "../lib/api";
import { useOrg } from "../lib/useOrg";

const PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', activeBg: 'bg-blue-600', gradient: 'from-blue-600 to-blue-400' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100', activeBg: 'bg-pink-600', gradient: 'from-pink-600 to-purple-500' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100', activeBg: 'bg-blue-700', gradient: 'from-blue-700 to-blue-500' },
  { id: 'x', name: 'X (Twitter)', icon: Twitter, color: 'text-neutral-900', bg: 'bg-neutral-100', border: 'border-neutral-200', activeBg: 'bg-neutral-900', gradient: 'from-neutral-900 to-neutral-700' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', activeBg: 'bg-red-600', gradient: 'from-red-600 to-red-500' },
  { id: 'pinterest', name: 'Pinterest', icon: Activity, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', activeBg: 'bg-red-500', gradient: 'from-red-500 to-red-400' },
];

export default function AIAnalysis() {
  const orgId = useOrg();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null);

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<Record<number, any>>({});

  useEffect(() => {
    if (orgId) {
      setLoadingAccounts(true);
      api.analyticsSummary(orgId)
        .then(data => {
          setAccounts(data?.accounts || []);
          setLoadingAccounts(false);
        })
        .catch(() => {
          setLoadingAccounts(false);
        });
    }
  }, [orgId]);

  const handleAnalyze = async (account: any) => {
    setAnalyzing(true);
    try {
      const result = await api.analyzeAccount({
        platform: account.platform,
        followers: account.followers || 0,
        likes: account.likes || 0,
        impressions: account.impressions || 0,
        watch_time_seconds: account.watch_time_seconds || 0,
        demographics: account.demographics || {}
      });
      setAnalysisResults(prev => ({ ...prev, [account.account_id]: result }));
    } catch (err) {
      console.error("AI Analysis failed:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  const groupedAccounts = accounts.reduce((acc, current) => {
    const platform = current.platform.toLowerCase();
    if (!acc[platform]) acc[platform] = [];
    acc[platform].push(current);
    return acc;
  }, {});

  const handlePlatformClick = (platformId: string) => {
    if (selectedPlatform === platformId) {
      setSelectedPlatform(null);
      setSelectedAccount(null);
    } else {
      setSelectedPlatform(platformId);
      setSelectedAccount(null);
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ease-in-out">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-600 rounded-2xl shadow-sm border border-purple-200/50">
            <Sparkles className="w-8 h-8" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            AI Growth Analysis
          </span>
        </h1>
        <p className="mt-3 text-base text-gray-600 flex items-center gap-2 max-w-2xl">
          Deep dive into your account performance. Select a platform to analyze your metrics and let AI tell you exactly what to post next for maximum reach.
        </p>
      </div>

      {loadingAccounts ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      ) : selectedAccount ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button
            onClick={() => setSelectedAccount(null)}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"
          >
            <ChevronDown className="w-4 h-4 rotate-90" /> Back to Accounts
          </button>

          <div className="bg-white rounded-[2rem] shadow-2xl shadow-indigo-900/5 border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-gray-900">
                  {PLATFORMS.find(p => p.id === selectedPlatform)?.name || 'Account'} Analytics
                </h3>
                <p className="text-gray-500 mt-1">Deep analysis for <span className="font-semibold text-gray-900">{selectedAccount.display_name}</span></p>
              </div>
              {(() => {
                const platformConfig = PLATFORMS.find(p => p.id === selectedPlatform);
                if (!platformConfig || !platformConfig.icon) return null;
                const Icon = platformConfig.icon;
                return (
                  <div className={`p-4 rounded-2xl bg-white shadow-sm border border-gray-100 ${platformConfig.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                );
              })()}
            </div>

            <div className="p-8">
              {/* Stats row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5"><TrendingUp className="w-16 h-16" /></div>
                  <p className="text-sm font-bold text-indigo-600/80 mb-2 uppercase tracking-wide">Followers</p>
                  <p className="text-4xl font-black text-indigo-950">{(selectedAccount.followers || 0).toLocaleString()}</p>
                </div>
                <div className="bg-pink-50/50 rounded-2xl p-6 border border-pink-100/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="w-16 h-16" /></div>
                  <p className="text-sm font-bold text-pink-600/80 mb-2 uppercase tracking-wide">Total Likes / Engagement</p>
                  <p className="text-4xl font-black text-pink-950">{(selectedAccount.likes || 0).toLocaleString()}</p>
                </div>
                <div className="bg-purple-50/50 rounded-2xl p-6 border border-purple-100/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5"><Sparkles className="w-16 h-16" /></div>
                  <p className="text-sm font-bold text-purple-600/80 mb-2 uppercase tracking-wide">Reach / Impressions</p>
                  <p className="text-4xl font-black text-purple-950">{(selectedAccount.impressions || 0).toLocaleString()}</p>
                </div>
              </div>

              {/* AI Trigger */}
              {!analysisResults[selectedAccount.account_id] && !analyzing && (
                <div className="text-center py-10">
                  <div className="inline-block p-4 bg-purple-50 rounded-full mb-6">
                    <Sparkles className="w-10 h-10 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Ready for Deep AI Analysis?</h4>
                  <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                    Our AI will analyze your recent performance, compare it against platform algorithms, and generate a tailored growth strategy.
                  </p>
                  <button
                    onClick={() => handleAnalyze(selectedAccount)}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold shadow-xl shadow-purple-500/30 transition-all hover:scale-105 flex items-center justify-center gap-3 mx-auto"
                  >
                    <Sparkles className="w-5 h-5" />
                    Generate AI Deep Analysis
                  </button>
                </div>
              )}

              {analyzing && (
                <div className="w-full py-20 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                  <RefreshCw className="w-12 h-12 text-purple-600 animate-spin" />
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-purple-900 mb-2">Running Deep Analysis...</h4>
                    <p className="text-purple-700 font-medium">Crunching data & generating custom insights for {selectedAccount.display_name}</p>
                  </div>
                </div>
              )}

              {analysisResults[selectedAccount.account_id] && !analyzing && (
                <div className="bg-gray-900 rounded-3xl p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500 border border-gray-800">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles className="w-64 h-64" />
                  </div>

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      {/* Health Score & Verdict */}
                      <div className="flex items-start gap-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="text-center shrink-0">
                          <div className={`text-4xl font-black ${getHealthColor(analysisResults[selectedAccount.account_id].healthScore)}`}>
                            {analysisResults[selectedAccount.account_id].healthScore}
                          </div>
                          <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 font-bold">Health Score</div>
                        </div>
                        <div>
                          <h4 className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> The AI Verdict
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {analysisResults[selectedAccount.account_id].overall}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" /> Actionable Strategy
                        </h4>
                        <ul className="space-y-4">
                          {analysisResults[selectedAccount.account_id].improvements.map((imp: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-base text-gray-300">
                              <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                                <ChevronRight className="w-4 h-4" />
                              </div>
                              <span>{imp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-md border border-white/10 h-full flex flex-col justify-between">
                      <div>
                        <h4 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">
                          Next Best Post Idea
                        </h4>
                        <p className="text-white font-bold text-2xl leading-tight mb-8">
                          "{analysisResults[selectedAccount.account_id].postIdea}"
                        </p>

                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex items-center gap-4">
                          <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400">
                            <Calendar className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-indigo-300 uppercase tracking-wider font-bold mb-1">Optimal Time to Post</p>
                            <p className="text-white font-semibold">{analysisResults[selectedAccount.account_id].bestTimeToPost}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-white/10">
                        <button
                          onClick={() => handleAnalyze(selectedAccount)}
                          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center gap-2 w-full justify-center"
                        >
                          <RefreshCw className="w-4 h-4" /> Re-run Deep Analysis
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-in fade-in duration-500">
          {/* Platforms Grid */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              Platform
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {PLATFORMS.map((p) => {
                const Icon = p.icon;
                const pAccounts = groupedAccounts[p.id] || [];
                const hasAccounts = pAccounts.length > 0;
                const isSelected = selectedPlatform === p.id;

                return (
                  <div key={p.id} className="relative group">
                    <button
                      onClick={() => handlePlatformClick(p.id)}
                      disabled={!hasAccounts}
                      className={`w-full relative flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300 border-2 ${isSelected
                        ? `border-transparent bg-gradient-to-br ${p.gradient} shadow-xl scale-105 z-10`
                        : `bg-white hover:bg-gray-50 border-gray-100 ${hasAccounts ? 'hover:shadow-md hover:scale-105' : 'opacity-50 grayscale cursor-not-allowed'}`
                        }`}
                    >
                      <div className={`p-4 rounded-2xl mb-3 transition-colors duration-300 ${isSelected ? 'bg-white/20' : p.bg}`}>
                        <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : p.color}`} />
                      </div>
                      <span className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {p.name}
                      </span>
                      {hasAccounts && (
                        <span className={`text-xs mt-1 font-semibold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                          {pAccounts.length} {pAccounts.length === 1 ? 'account' : 'accounts'}
                        </span>
                      )}

                      {isSelected && (
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-gradient-to-br from-transparent to-transparent z-[-1]"
                          style={{ background: 'inherit' }} />
                      )}
                    </button>
                    {!hasAccounts && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20">
                        Not Connected
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Account Selection Dropdown */}
          {selectedPlatform && groupedAccounts[selectedPlatform] && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Select Account
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedAccounts[selectedPlatform].map((acc: any) => {
                  const isSelected = selectedAccount?.account_id === acc.account_id;
                  const platformConfig = PLATFORMS.find(p => p.id === selectedPlatform);

                  return (
                    <button
                      key={acc.account_id}
                      onClick={() => setSelectedAccount(acc)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 ${isSelected
                        ? `border-${platformConfig?.color.split('-')[1]}-500 shadow-lg bg-white`
                        : `border-gray-100 bg-white hover:border-${platformConfig?.color.split('-')[1]}-200 hover:shadow-md`
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg text-gray-900">{acc.display_name}</span>
                        {isSelected && <CheckCircle2 className={`w-5 h-5 ${platformConfig?.color}`} />}
                      </div>
                      <div className="text-sm text-gray-500 flex gap-4">
                        <span><strong className="text-gray-900">{(acc.followers || 0).toLocaleString()}</strong> followers</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
