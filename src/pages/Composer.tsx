import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useOrg } from "../lib/useOrg";
import { Sparkles, Image as ImageIcon, Calendar, Send, CheckCircle, Bot, Type, Hash, UploadCloud, X, LayoutTemplate } from "lucide-react";

const PLATFORMS = ["instagram", "facebook", "linkedin", "x", "youtube", "pinterest"];

const platformIcons: Record<string, React.ReactNode> = {
  facebook: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  instagram: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  linkedin: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  x: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>,
  youtube: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  pinterest: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z"/></svg>,
};

export default function Composer() {
  const orgId = useOrg();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [brief, setBrief] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [body, setBody] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("video");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (orgId) api.listConnectors(orgId).then(setAccounts).catch(() => {});
  }, [orgId]);

  function toggle(id: number) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  async function autoFill() {
    if (!orgId) return;
    setLoading(true);
    try {
      const { caption, hashtags } = await api.autoFill({ org_id: orgId, brief, platform });
      setBody(caption);
      setHashtags(hashtags);
    } catch (e: any) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setMsg("");
    try {
      const type = file.type.startsWith("image/") ? "image" : "video";
      setMediaType(type);
      
      const { url } = await api.uploadMedia(file, (percent) => {
        setUploadProgress(percent);
      });
      setMediaUrl(url);
    } catch (err: any) {
      setMsg("Failed to upload: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!orgId) return;
    if (selected.length === 0) {
      alert("Please select at least one platform to publish to!");
      return;
    }
    const targets = accounts
      .filter((a) => selected.includes(a.id))
      .map((a) => ({ social_account_id: a.id, platform: a.platform }));
    try {
      await api.createPost({
        org_id: orgId,
        body,
        media: mediaUrl ? [{ type: mediaType, url: mediaUrl }] : [],
        targets,
        scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      });
      setMsg(scheduledAt ? "Scheduled!" : "Draft saved.");
    } catch (e: any) {
      setMsg(e.message);
    }
  }

  return (
    <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-neutral-200/50 border border-neutral-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-md shadow-inner">
              <LayoutTemplate className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">Create New Post</h1>
              <p className="text-indigo-100 text-sm mt-1 font-medium">Design, generate and schedule your next viral content.</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          
          {/* AI Assistant Section */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-6 shadow-sm relative group">
            <div className="absolute -left-px top-6 bottom-6 w-1 rounded-r-md bg-indigo-500"></div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-indigo-950">
                <Bot className="h-5 w-5 text-indigo-600" />
                AI Assistant
              </h2>
              <div className="text-xs font-bold tracking-wider text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full uppercase">Beta</div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                 <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-indigo-900/60">Platform Style</label>
                 <select
                   value={platform}
                   onChange={(e) => setPlatform(e.target.value)}
                   className="w-full rounded-xl border border-white bg-white/80 px-4 py-3 text-sm font-semibold text-neutral-800 shadow-sm backdrop-blur-md outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all capitalize cursor-pointer appearance-none"
                 >
                   {PLATFORMS.map((p) => (
                     <option key={p} value={p}>{p}</option>
                   ))}
                 </select>
              </div>
              <div className="md:col-span-2">
                 <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-indigo-900/60">Content Brief</label>
                 <div className="flex gap-2">
                   <div className="relative flex-1">
                     <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                     <input
                       value={brief}
                       onChange={(e) => setBrief(e.target.value)}
                       placeholder="e.g. Launch of our summer collection..."
                       className="w-full rounded-xl border border-white bg-white/80 py-3 pl-11 pr-4 text-sm font-medium shadow-sm backdrop-blur-md outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-neutral-400"
                     />
                   </div>
                   <button
                     onClick={autoFill}
                     disabled={loading || !brief}
                     className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:hover:shadow-md"
                   >
                     <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0 disabled:hidden"></div>
                     {loading ? (
                       <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                     ) : (
                       <Sparkles className="h-4 w-4" />
                     )}
                     <span className="relative z-10">{loading ? "Generating" : "Generate"}</span>
                   </button>
                 </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-bold text-neutral-800">
              <LayoutTemplate className="h-4 w-4 text-neutral-500" />
              Post Content
            </label>
            <div className="relative rounded-2xl border border-neutral-200 bg-neutral-50 p-1.5 transition-all focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 hover:border-neutral-300">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={6}
                className="w-full resize-y rounded-xl border-none bg-transparent px-4 py-3 text-sm font-medium text-neutral-800 outline-none placeholder:text-neutral-400 placeholder:font-normal custom-scrollbar"
                placeholder="What do you want to share with your audience?"
              />
            </div>
            
            {/* Hashtags */}
            <div className={`mt-4 flex flex-wrap gap-2 transition-all duration-500 ${hashtags.length > 0 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden m-0'}`}>
              {hashtags.map((h) => (
                <button
                  key={h}
                  onClick={() => setBody((b) => `${b} ${h}`)}
                  className="flex items-center gap-1 rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-1.5 text-xs font-bold text-indigo-700 transition-all hover:-translate-y-0.5 hover:bg-indigo-100 hover:shadow-sm"
                >
                  <Hash className="h-3 w-3" />
                  {h.replace('#', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-bold text-neutral-800">
              <ImageIcon className="h-4 w-4 text-neutral-500" />
              Media Attachment
            </label>
            
            <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 hover:bg-indigo-50/50 hover:border-indigo-300 transition-colors group">
              <input
                type="file"
                accept="video/*,image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className={`absolute inset-0 z-10 w-full h-full cursor-pointer disabled:cursor-not-allowed opacity-0 ${mediaUrl || uploading ? 'hidden' : 'block'}`}
              />
              
              <div className={`p-10 text-center transition-all ${mediaUrl || uploading ? 'hidden' : 'block'}`}>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm border border-neutral-100 group-hover:scale-110 group-hover:shadow-md transition-transform duration-300">
                  <UploadCloud className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-base font-bold text-neutral-800">Drop your media here</h3>
                <p className="mt-1 text-sm text-neutral-500">Supports JPG, PNG, MP4</p>
                <div className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-700 shadow-sm border border-neutral-200 group-hover:bg-indigo-50 transition-colors">
                  Browse Files
                </div>
              </div>

              {uploading && (
                <div className="p-10 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"></div>
                  <h3 className="text-base font-bold text-neutral-800">Uploading media...</h3>
                  <div className="mt-5 mx-auto w-64 overflow-hidden rounded-full bg-neutral-200 h-2.5">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm font-bold text-indigo-600">{uploadProgress}% complete</p>
                </div>
              )}

              {mediaUrl && !uploading && (
                <div className="relative group/media p-2 bg-neutral-900/5">
                  <div className="overflow-hidden rounded-xl bg-neutral-900 flex justify-center shadow-inner">
                    {mediaType === "video" ? (
                      <video src={mediaUrl} controls className="max-h-[400px] w-auto object-contain" />
                    ) : (
                      <img src={mediaUrl} alt="Preview" className="max-h-[400px] w-auto object-contain" />
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); setMediaUrl(""); }}
                    className="absolute top-6 right-6 z-20 rounded-full bg-red-500 p-2.5 text-white shadow-lg transition-all hover:bg-red-600 hover:scale-110 opacity-0 group-hover/media:opacity-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* Publishing Options */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Platforms */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-bold text-neutral-800">
                <CheckCircle className="h-4 w-4 text-neutral-500" />
                Publish To
              </label>
              <div className="flex flex-col gap-2.5">
                {accounts.length === 0 && (
                  <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-5 text-center">
                    <p className="text-sm font-medium text-neutral-500">No connected accounts yet.</p>
                  </div>
                )}
                {accounts.map((a) => {
                  const isSelected = selected.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggle(a.id)}
                      className={`group relative flex items-center justify-between overflow-hidden rounded-xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-50/80 shadow-sm"
                          : "border-neutral-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                          isSelected ? "bg-indigo-600 text-white shadow-sm" : "bg-neutral-100 text-neutral-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                        }`}>
                          {platformIcons[a.platform] || <span className="text-xs font-bold uppercase tracking-wider">{a.platform.charAt(0)}</span>}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${isSelected ? "text-indigo-900" : "text-neutral-700"}`}>
                            {a.display_name || a.platform}
                          </p>
                          <p className={`text-xs font-medium capitalize ${isSelected ? "text-indigo-600" : "text-neutral-500"}`}>
                            {a.platform}
                          </p>
                        </div>
                      </div>
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                        isSelected ? "border-indigo-600 bg-indigo-600" : "border-neutral-300"
                      }`}>
                        {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-bold text-neutral-800">
                <Calendar className="h-4 w-4 text-neutral-500" />
                Schedule Post (Optional)
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 pl-11 text-sm font-medium text-neutral-800 shadow-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-neutral-300 cursor-pointer"
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              </div>
              <p className="mt-3 text-xs font-medium text-neutral-500 leading-relaxed">
                Leave blank to save as a draft. You can easily schedule it for a future date and time later.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 flex items-center justify-between border-t border-neutral-100">
            <div className="flex-1">
              {msg && (
                <div className="animate-in slide-in-from-left-2 fade-in flex w-max items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700 border border-emerald-100 shadow-sm">
                  <CheckCircle className="h-4 w-4" />
                  {msg}
                </div>
              )}
            </div>
            <button
              onClick={save}
              disabled={uploading}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-neutral-900/20 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full transition-transform group-hover:translate-y-0"></div>
              <span className="relative z-10">{scheduledAt ? "Schedule Post" : "Save Draft"}</span>
              <Send className="relative z-10 h-4 w-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
