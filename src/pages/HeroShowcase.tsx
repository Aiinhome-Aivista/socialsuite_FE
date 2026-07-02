import { useEffect, useState, useRef } from "react";
import { Star, Sparkles, TrendingUp, Heart, MessageCircle, Youtube, Facebook, Twitter, Instagram, Linkedin, Timer, Pin, BarChart2, ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import humanHandPhone from "../human_hand_phone.png";

/**
 * HeroShowcase
 * Drop this in just below the <nav> in Landing.tsx, above (or in place of)
 * the existing text hero block.
 *
 * Structure mirrors the reference video:
 *  - giant background wordmark ("SOCIAL / MEDIA")
 *  - center phone mockup whose screen auto-cycles through app states
 *  - floating notification cards scattered around the phone, each with
 *    a slow independent float animation
 */

function SafeVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const attemptPlay = () => {
      video.play()
        .then(() => console.log("SafeVideo successfully playing:", src))
        .catch((err) => console.warn("SafeVideo autoplay failed/blocked:", src, err));
    };

    const handleError = (e: any) => {
      console.error("SafeVideo element error loading source:", src, e);
    };

    video.addEventListener("error", handleError);
    attemptPlay();

    // Re-trigger play on user interaction if autoplay was blocked initially
    const interactionEvents = ["click", "touchstart", "scroll", "mousemove"];
    const handler = () => {
      attemptPlay();
      interactionEvents.forEach(event => document.removeEventListener(event, handler));
    };

    interactionEvents.forEach(event => document.addEventListener(event, handler));

    return () => {
      video.removeEventListener("error", handleError);
      interactionEvents.forEach(event => document.removeEventListener(event, handler));
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    />
  );
}

const SCREENS = [
  {
    key: "instagram",
    render: (timeActive: number) => {
      const isLiked = timeActive > 1500;
      const showHeartPop = timeActive > 1500 && timeActive < 2500;
      return (
        <div className="flex h-full flex-col text-left font-sans bg-white select-none">
          {/* Instagram Header */}
          <div className="flex items-center justify-between px-2 py-1.5 border-b border-gray-100 bg-white z-10 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-[1px]">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center p-[1px]">
                  <div className="h-full w-full rounded-full bg-indigo-600" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-900">socialsuite</span>
            </div>
            <span className="text-gray-400 text-xs font-bold">•••</span>
          </div>
          {/* Scrollable Feed */}
          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 bg-white">
            {/* Post 1 */}
            <div className="flex flex-col relative bg-white">
              <div className="h-40 w-full relative flex items-center justify-center bg-gray-100 overflow-hidden">
                <SafeVideo
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {showHeartPop && (
                  <Heart className="h-14 w-14 text-white fill-white drop-shadow-lg animate-heart-pop absolute z-10" />
                )}
              </div>
              <div className="p-2 flex flex-col gap-1 bg-white">
                <div className="flex items-center gap-2.5 text-gray-700">
                  <Heart
                    className={`h-4.5 w-4.5 transition-all duration-300 ${isLiked ? "text-rose-500 fill-rose-500 scale-110" : "hover:text-red-500 cursor-pointer"
                      }`}
                  />
                  <MessageCircle className="h-4.5 w-4.5" />
                </div>
                <p className="text-[9px] font-bold text-gray-900">
                  Liked by {isLiked ? "1,205" : "1,204"} users
                </p>
                <p className="text-[8.5px] leading-tight text-gray-800">
                  <span className="font-bold mr-1">socialsuite</span>
                  Unleash your brand power with automated scheduling. 🚀
                </p>
                {timeActive > 3000 && (
                  <p className="text-[8.5px] leading-tight text-gray-800 animate-in fade-in slide-in-from-bottom-2 duration-500 mt-1">
                    <span className="font-bold mr-1">sarah_j</span>
                    Love this automated scheduler, so clean! 😍
                  </p>
                )}
              </div>
            </div>
            {/* Post 2 */}
            <div className="flex flex-col border-t border-gray-100 pt-2 bg-white">
              <div className="flex items-center gap-1.5 px-2 pb-1.5 bg-white">
                <div className="h-5 w-5 rounded-full bg-indigo-600" />
                <span className="text-[9px] font-bold text-gray-900">socialsuite</span>
              </div>
              <div className="h-40 w-full relative bg-gray-100 overflow-hidden">
                <SafeVideo
                  src="https://www.w3schools.com/html/movie.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-2 flex flex-col gap-1 bg-white">
                <div className="flex items-center gap-2.5 text-gray-700">
                  <Heart className="h-4.5 w-4.5" />
                  <MessageCircle className="h-4.5 w-4.5" />
                </div>
                <p className="text-[9px] font-bold text-gray-900">Liked by 842 users</p>
                <p className="text-[8.5px] leading-tight text-gray-800">
                  <span className="font-bold mr-1">socialsuite</span>
                  Track all growth parameters in one single screen.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    key: "twitter",
    render: (timeActive: number) => (
      <div className="flex h-full flex-col text-left font-sans bg-[#0f1419] text-white select-none">
        {/* Twitter Header */}
        <div className="p-2.5 border-b border-neutral-800 bg-[#0f1419] z-10 font-bold text-xs shrink-0">Home</div>
        {/* Scrollable Tweets */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-2.5 flex flex-col gap-4 bg-[#0f1419]">
          {/* Tweet 1 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1.5 bg-[#0f1419]">
              <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-[10px]">SS</div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  <span className="text-[9.5px] font-bold leading-none">SocialSuite</span>
                  <Sparkles className="h-3 w-3 text-sky-400 fill-sky-400" />
                </div>
                <span className="text-[8.5px] text-gray-500 leading-none">@socialsuite</span>
              </div>
            </div>
            <p className="text-[9.5px] leading-snug mb-2 font-normal text-gray-100">
              Simplify your social workflow. Schedule, analyze, and engage with your audience from a single intuitive dashboard. 📈✨
            </p>
            <div className="rounded-xl overflow-hidden border border-neutral-800 flex flex-col h-32 relative bg-neutral-900">
              <SafeVideo
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-neutral-900/90 border-t border-neutral-800 backdrop-blur-sm z-10">
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">socialsuite.com</p>
                <p className="text-[8.5px] font-bold text-white truncate">Start your free trial today</p>
              </div>
            </div>
          </div>
          {/* Tweet 2 */}
          <div className="flex flex-col border-t border-neutral-800 pt-3 bg-[#0f1419]">
            <div className="flex items-center gap-1.5 mb-1.5 bg-[#0f1419]">
              <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-[10px]">SS</div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  <span className="text-[9.5px] font-bold leading-none">SocialSuite</span>
                </div>
                <span className="text-[8.5px] text-gray-500 leading-none">@socialsuite</span>
              </div>
            </div>
            <p className="text-[9.5px] leading-snug text-gray-100">
              Stop context switching. Connect all platforms under 2 minutes. 🛠️
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "facebook",
    render: (timeActive: number) => (
      <div className="flex h-full flex-col text-left font-sans bg-white text-gray-900 select-none">
        {/* Facebook Header */}
        <div className="flex items-center gap-1.5 p-2 border-b border-gray-100 bg-white z-10 shrink-0">
          <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">f</div>
          <div className="flex flex-col">
            <span className="text-[9.5px] font-bold leading-none text-gray-900">SocialSuite</span>
            <span className="text-[8px] text-gray-500 leading-none mt-0.5">Sponsored • 🌐</span>
          </div>
        </div>
        {/* Feed */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 bg-white">
          {/* Post 1 */}
          <div className="flex flex-col bg-white">
            <p className="text-[9px] px-2 py-1.5 leading-snug text-gray-800">
              Reach more customers with target Facebook and Instagram ad campaigns. Tracking analytics included!
            </p>
            <div className="h-36 w-full relative bg-gray-100 overflow-hidden">
              <SafeVideo
                src="https://www.w3schools.com/html/movie.mp4"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            {/* FB Actions Bar */}
            <div className="flex items-center justify-between border-t border-gray-100 px-3 py-1.5 text-gray-500 text-[8.5px] bg-white">
              <div className={`flex items-center gap-1 cursor-pointer transition-colors duration-300 ${timeActive > 1500 ? "text-blue-600 font-bold" : "hover:text-gray-800"}`}>
                <ThumbsUp className="h-3 w-3" />
                <span>Like</span>
              </div>
              <div className={`flex items-center gap-1 transition-colors duration-300 ${timeActive > 3000 ? "text-blue-600 font-bold" : ""}`}>
                <MessageSquare className="h-3 w-3" />
                <span>Comment</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-3 w-3" />
                <span>Share</span>
              </div>
            </div>

            {/* Facebook Comments Area */}
            <div className="px-2.5 py-1.5 bg-gray-50 border-t border-gray-100 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[7.5px] text-gray-500 font-bold">
                <span>{timeActive > 1500 ? "1 Like" : "0 Likes"}</span>
                <span>{timeActive > 3000 ? "1 Comment" : "0 Comments"}</span>
              </div>

              {timeActive > 3000 && (
                <div className="flex gap-1.5 items-start mt-1 p-1 bg-white rounded-lg border border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-500 text-left">
                  <div className="h-4.5 w-4.5 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white text-[7px] shrink-0">SJ</div>
                  <div className="flex flex-col text-[8px] leading-tight">
                    <span className="font-bold text-gray-900">Sarah Jenkins</span>
                    <span className="text-gray-700 mt-0.5">This tool is a lifesaver! Saved me 4 hours this week. 🔥</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="max-w-[70%]">
                <p className="text-[8px] text-gray-500 uppercase tracking-wide">socialsuite.com</p>
                <p className="text-[9px] font-bold text-gray-900 truncate">Grow your audience today</p>
              </div>
              <span className="text-[8.5px] font-bold text-white bg-blue-600 px-2 py-1 rounded">Book Now</span>
            </div>
          </div>
          {/* Post 2 */}
          <div className="flex flex-col border-t border-gray-100 pt-2 bg-white">
            <div className="flex items-center gap-1.5 px-2 pb-1.5 bg-white">
              <div className="h-6 w-6 rounded-full bg-indigo-600" />
              <span className="text-[9px] font-bold text-gray-900">SocialSuite</span>
            </div>
            <p className="text-[9px] px-2 pb-1.5 leading-snug text-gray-800">
              Save hours of work every single week. Automate your posts.
            </p>
            <div className="h-32 w-full relative bg-gray-100 overflow-hidden">
              <SafeVideo
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "linkedin",
    render: (timeActive: number) => (
      <div className="flex h-full flex-col text-left font-sans bg-gray-50 text-gray-900 select-none animate-in fade-in duration-300">
        {/* LinkedIn Header */}
        <div className="flex items-center gap-1.5 p-2 bg-white border-b border-gray-150 shrink-0">
          <div className="h-7 w-7 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-[10px]">in</div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold leading-none text-gray-905">SocialSuite</span>
            <span className="text-[7.5px] text-gray-500 leading-none mt-0.5">14,209 followers • Promoted</span>
          </div>
        </div>
        {/* Feed */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3 bg-gray-50 p-1.5">
          {/* Post 1 */}
          <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-2 pb-2.5">
            <p className="text-[8.5px] pb-1.5 leading-snug text-gray-800">
              Supercharge your brand workflow. Connect all your social networks, generate content with AI, and track deep growth analytics in one connected suite.
            </p>
            <div className="rounded-lg overflow-hidden border border-gray-200 w-full mb-1 bg-white flex flex-col h-32 relative bg-gray-100 shrink-0">
              <SafeVideo
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-white/90 border-t border-gray-100 z-10 backdrop-blur-sm">
                <h4 className="text-[9px] font-bold text-gray-900 leading-tight">Scale your social channels with analytics</h4>
                <span className="text-[7.5px] text-gray-500">socialsuite.com • 3 min read</span>
              </div>
            </div>
          </div>

          {/* Post 2 */}
          <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-2 pb-2.5">
            <div className="flex items-center gap-1.5 pb-1.5">
              <div className="h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-[7px] shrink-0">SS</div>
              <div className="flex flex-col">
                <span className="text-[8.5px] font-bold leading-none text-gray-900">SocialSuite</span>
                <span className="text-[7px] text-gray-500 mt-0.5">Automated queue • 1d</span>
              </div>
            </div>
            <p className="text-[8.5px] pb-1.5 leading-snug text-gray-800">
              Save up to 15 hours every single week by automating your social media queue. Focus on building, let us handle sharing. 🚀
            </p>
            <div className="rounded-lg overflow-hidden border border-gray-200 w-full bg-white flex flex-col h-28 relative bg-gray-100 shrink-0">
              <SafeVideo
                src="https://www.w3schools.com/html/movie.mp4"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Post 3 */}
          <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-2">
            <div className="flex items-center gap-1.5 pb-1.5">
              <div className="h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-[7px] shrink-0">SS</div>
              <div className="flex flex-col">
                <span className="text-[8.5px] font-bold leading-none text-gray-900">SocialSuite</span>
                <span className="text-[7px] text-gray-500 mt-0.5">Growth Analytics</span>
              </div>
            </div>
            <p className="text-[8px] leading-snug text-gray-800 font-bold italic">
              "We doubled our click-through rate in just 14 days of scheduling with SocialSuite." - Tech Corp Growth Team.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "youtube",
    render: (timeActive: number) => {
      // Progress percent cycles from 0 to 100 every 10 seconds
      const progressPercent = (timeActive / 100) % 100;
      const totalSecs = 180; // 3 minutes
      const currentSeconds = Math.floor((progressPercent / 100) * totalSecs);
      const minutes = Math.floor(currentSeconds / 60);
      const secs = currentSeconds % 60;
      const timeString = `${minutes}:${secs < 10 ? "0" : ""}${secs}`;

      return (
        <div className="flex h-full flex-col text-left font-sans bg-[#0f0f0f] text-white select-none">
          {/* YouTube Video Player Mock */}
          <div className="relative aspect-video w-full bg-black shrink-0 flex items-center justify-center overflow-hidden">
            <SafeVideo
              src="https://www.w3schools.com/html/movie.mp4"
              className="absolute inset-0 h-full w-full object-cover opacity-85"
            />
            {/* Custom Red Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-850 z-10">
              <div
                className="h-full bg-red-600 transition-all duration-100"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          {/* Scrollable recommendations & info */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-2.5 flex flex-col gap-4 bg-[#0f0f0f]">
            <div>
              <h4 className="text-[9.5px] font-bold leading-snug text-gray-50 mb-1">
                Why we built SocialSuite — The developer story behind the automated workflow
              </h4>
              <div className="flex items-center justify-between text-[7.5px] text-gray-400">
                <span>14k views • 3 days ago</span>
                <span className="font-mono text-red-500 font-bold bg-neutral-900 px-1 rounded">
                  {timeString} / 3:00
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-y border-neutral-855 py-2 bg-[#0f0f0f]">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-[8px]">SS</div>
                <div className="flex flex-col">
                  <span className="text-[8.5px] font-bold text-gray-100 leading-none">SocialSuite</span>
                  <span className="text-[7px] text-gray-500 leading-none mt-0.5">
                    {timeActive > 3500 ? "12.1k subscribers" : "12.0k subscribers"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Like Button */}
                <button
                  className={`flex items-center gap-1 text-[8px] font-bold px-2 py-1 rounded-full transition-all duration-300 ${timeActive > 2000
                    ? "bg-white text-black scale-105"
                    : "bg-neutral-800 text-gray-300"
                    }`}
                >
                  <ThumbsUp className="h-2.5 w-2.5" />
                  <span>{timeActive > 2000 ? "1.2k" : "1.1k"}</span>
                </button>

                {/* Subscribe Button */}
                <button
                  className={`text-[8px] font-bold px-2 py-1 rounded-full transition-all duration-300 ${timeActive > 3500
                    ? "bg-neutral-800 text-gray-400"
                    : "bg-white text-black hover:bg-gray-200"
                    }`}
                >
                  {timeActive > 3500 ? "✓ Subscribed" : "Subscribe"}
                </button>
              </div>
            </div>

            {/* Related Video Item */}
            <div className="flex gap-2">
              <div className="h-10 w-16 bg-cover bg-center rounded-md shrink-0 relative bg-neutral-900 overflow-hidden">
                <SafeVideo
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[8.5px] font-bold leading-tight line-clamp-2">How to double organic reach with scheduler</p>
                <p className="text-[7px] text-gray-500 mt-0.5">SocialSuite • 8.2k views</p>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    key: "pinterest",
    render: (timeActive: number) => (
      <div className="flex h-full flex-col text-left font-sans bg-white text-gray-900 select-none animate-in fade-in duration-300">
        {/* Pinterest Search Header */}
        <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-white shrink-0">
          <div className="h-4.5 w-4.5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[7px]"><Pin className="h-2.5 w-2.5" /></div>
          <div className="flex-1 bg-gray-100 px-2 py-1 rounded-full text-[8.5px] text-gray-500">Search setups</div>
        </div>
        {/* Grid Pins */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-2 bg-white">
          <div className="grid grid-cols-2 gap-2 bg-white">
            {/* Pin 1 */}
            <div className="flex flex-col gap-1 bg-white">
              <div className="h-28 rounded-xl overflow-hidden relative bg-gray-100">
                <SafeVideo
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute top-1 right-1 bg-red-600 text-white text-[6px] font-extrabold px-1.5 py-0.5 rounded-full">Save</div>
              </div>
              <p className="text-[7.5px] font-bold leading-snug line-clamp-1">Cozy workspace ideas</p>
            </div>
            {/* Pin 2 */}
            <div className="flex flex-col gap-1 bg-white">
              <div className="h-28 rounded-xl overflow-hidden relative bg-gray-100">
                <SafeVideo
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute top-1 right-1 bg-red-600 text-white text-[6px] font-extrabold px-1.5 py-0.5 rounded-full">Save</div>
              </div>
              <p className="text-[7.5px] font-bold leading-snug line-clamp-1">Developer aesthetic room</p>
            </div>
            {/* Pin 3 */}
            <div className="flex flex-col gap-1 bg-white">
              <div className="h-24 rounded-xl overflow-hidden relative bg-gray-100">
                <SafeVideo
                  src="https://www.w3schools.com/html/movie.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute top-1 right-1 bg-red-600 text-white text-[6px] font-extrabold px-1.5 py-0.5 rounded-full">Save</div>
              </div>
              <p className="text-[7.5px] font-bold leading-snug line-clamp-1">Minimal design UI</p>
            </div>
            {/* Pin 4 */}
            <div className="flex flex-col gap-1 bg-white">
              <div className="h-28 rounded-xl overflow-hidden relative bg-gray-100">
                <SafeVideo
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute top-1 right-1 bg-red-600 text-white text-[6px] font-extrabold px-1.5 py-0.5 rounded-full">Save</div>
              </div>
              <p className="text-[7.5px] font-bold leading-snug line-clamp-1">Desk neon vibes</p>
            </div>
            {/* Pin 5 */}
            <div className="flex flex-col gap-1 bg-white">
              <div className="h-24 rounded-xl overflow-hidden relative bg-gray-100">
                <SafeVideo
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute top-1 right-1 bg-red-600 text-white text-[6px] font-extrabold px-1.5 py-0.5 rounded-full">Save</div>
              </div>
              <p className="text-[7.5px] font-bold leading-snug line-clamp-1">Creative space</p>
            </div>
            {/* Pin 6 */}
            <div className="flex flex-col gap-1 bg-white">
              <div className="h-28 rounded-xl overflow-hidden relative bg-gray-100">
                <SafeVideo
                  src="https://www.w3schools.com/html/movie.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute top-1 right-1 bg-red-600 text-white text-[6px] font-extrabold px-1.5 py-0.5 rounded-full">Save</div>
              </div>
              <p className="text-[7.5px] font-bold leading-snug line-clamp-1">Aesthetic setup hacks</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

function PhoneMock({ active }: { active: number }) {
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeActive, setTimeActive] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const intervalId = setInterval(() => {
      setTimeActive(Date.now() - start);
    }, 50);
    return () => clearInterval(intervalId);
  }, [active]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Reset scroll of inner wrapper if it exists
    const el = element.querySelector(".overflow-y-auto") as HTMLDivElement;
    if (el) {
      el.scrollTop = 0;
    }

    let frameId: number;

    const runScroll = () => {
      const outer = containerRef.current;
      if (!outer) return;
      const el = outer.querySelector(".overflow-y-auto") as HTMLDivElement;
      if (!el) {
        frameId = requestAnimationFrame(runScroll);
        return;
      }
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll > 0) {
        if (SCREENS[active].key === "pinterest") {
          el.scrollTop = 0;
        } else {
          // Hybrid scroll: Slow continuous auto-scroll when idle + landing page scroll sync
          el.scrollTop = ((Date.now() / 45) + window.scrollY * 0.35) % maxScroll;
        }
      }
      frameId = requestAnimationFrame(runScroll);
    };

    frameId = requestAnimationFrame(runScroll);
    return () => cancelAnimationFrame(frameId);
  }, [active]);

  useEffect(() => {
    const img = new Image();
    img.src = humanHandPhone;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const height = canvas.height;
      const width = canvas.width;

      // Bottom fade out starting threshold (fade starts at 60% of image height)
      const fadeStart = height * 0.6;
      // Right-side fade (on screen) maps to canvas left side (x near 0) because of scaleX(-1)
      const horizontalFadeStart = width * 0.5;

      for (let y = 0; y < height; y++) {
        const isFadeZoneY = y > fadeStart;
        const fadeAlphaY = isFadeZoneY ? 1.0 - (y - fadeStart) / (height - fadeStart) : 1.0;

        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Key out the solid white/grey background and compression halos (RGB close & bright > 200)
          const isGreyscale = Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && Math.abs(r - b) < 15;
          if (isGreyscale && r > 200) {
            data[idx + 3] = 0; // Set alpha to 0
          } else {
            // Apply horizontal fade on canvas right side (rendered right side of screen)
            const isFadeZoneX = x > width - horizontalFadeStart;
            const fadeAlphaX = isFadeZoneX ? (width - x) / horizontalFadeStart : 1.0;

            // Combine both bottom and horizontal fades
            const combinedAlpha = fadeAlphaY * fadeAlphaX;

            data[idx + 3] = Math.round(a * combinedAlpha);
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedImage(canvas.toDataURL("image/png"));
    };
  }, []);

  return (
    <div className="relative z-10 mx-auto w-full h-[507px] sm:h-[720px]">
      {/* 3D Real Human Hand holding phone PNG (Processed with transparent cutout and bottom fade) */}
      <img
        src={processedImage || humanHandPhone}
        alt="Human hand holding phone"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-20"
      />

      {/* React Active Screen Content overlayed directly over the phone screen area */}
      <div
        ref={containerRef}
        className="absolute z-30 overflow-hidden bg-white p-1 pt-2.5 border border-neutral-100 shadow-inner no-scrollbar flex flex-col"
        style={{
          top: "11.2%",
          left: "26.0%",
          width: "38.5%",
          height: "65.0%",
          borderRadius: "2.0rem",
        }}
      >
        <div className="flex items-center justify-between px-1 pb-2 text-[9px] font-bold text-gray-400">
          <span>9:41</span>
          <span>SocialSuite</span>
        </div>
        <div
          key={SCREENS[active].key}
          className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-500 overflow-hidden relative h-full"
        >
          {SCREENS[active].render(timeActive)}
        </div>
      </div>
    </div>
  );
}

type Float = {
  className: string;
  delay: string;
  children: React.ReactNode;
};

const CARDS: Float[] = [
  {
    className: "lg:left-[-230px] lg:top-[5%] lg:w-[220px]",
    delay: "0s",
    children: (
      <div className="w-[190px] sm:w-[220px] rounded-2xl bg-white p-2.5 shadow-xl shadow-indigo-900/10 border border-gray-100 flex flex-col gap-2 text-left transition-all duration-350 hover:scale-[1.03] hover:shadow-indigo-900/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Youtube className="h-4 w-4 text-red-600 fill-red-600 shrink-0" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">YouTube AI</span>
          </div>
          <span className="text-[9px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded">SCHEDULER</span>
        </div>
        <div
          className="h-20 w-full rounded-lg bg-cover bg-center border border-gray-150"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=240&auto=format&fit=crop&q=80')` }}
        />
        <div>
          <h4 className="text-[11px] font-extrabold text-gray-900 leading-tight">Video Chapters & Tags</h4>
          <p className="text-[9px] text-gray-500 font-medium mt-0.5">Automated queue active</p>
        </div>
      </div>
    ),
  },
  {
    className: "lg:right-[-210px] lg:top-[5%] lg:w-[210px]",
    delay: "0.3s",
    children: (
      <div className="w-[180px] sm:w-[210px] rounded-2xl bg-white p-2.5 shadow-xl shadow-indigo-900/10 border border-gray-100 flex flex-col gap-2 text-left transition-all duration-350 hover:scale-[1.03] hover:shadow-indigo-900/15">
        <div className="flex items-center gap-1.5">
          <Instagram className="h-4 w-4 text-pink-600 shrink-0" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">@creator_vibe</span>
        </div>
        <div
          className="h-24 w-full rounded-lg bg-cover bg-center border border-gray-150"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=240&auto=format&fit=crop&q=80')` }}
        />
        <div className="flex items-center justify-between text-[9px] text-gray-500 font-bold">
          <span>+3.2k reach today</span>
          <span className="text-pink-600 text-[8px]">★ VIRAL</span>
        </div>
      </div>
    ),
  },
  {
    className: "lg:left-[160px] lg:top-[-110px] lg:w-[220px]",
    delay: "1.8s",
    children: (
      <div className="w-[190px] sm:w-[220px] rounded-2xl bg-white p-2.5 shadow-xl shadow-indigo-900/10 border border-gray-100 flex flex-col gap-2 text-left transition-all duration-350 hover:scale-[1.03] hover:shadow-indigo-900/15">
        <div className="flex items-center gap-1.5">
          <Linkedin className="h-4 w-4 text-blue-800 fill-blue-800 shrink-0" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">LinkedIn Lead</span>
        </div>
        <div
          className="h-16 w-full rounded-lg bg-cover bg-center border border-gray-150"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=240&auto=format&fit=crop&q=80')` }}
        />
        <div>
          <h4 className="text-[11px] font-extrabold text-gray-900 leading-tight">B2B Outreach Engine</h4>
          <p className="text-[9px] text-gray-500 font-medium mt-0.5">82% replies • 1.2k views</p>
        </div>
      </div>
    ),
  },
  {
    className: "lg:left-[-320px] lg:top-[38%] lg:w-[230px]",
    delay: "0.6s",
    children: (
      <div className="w-[200px] sm:w-[230px] rounded-2xl bg-white p-2.5 shadow-xl shadow-indigo-900/10 border border-gray-100 flex flex-col gap-2 text-left transition-all duration-350 hover:scale-[1.03] hover:shadow-indigo-900/15">
        <div className="flex items-center gap-1.5">
          <Twitter className="h-4 w-4 text-black fill-black shrink-0" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">X Thread Builder</span>
        </div>
        <p className="text-[10px] text-gray-800 leading-snug font-medium">
          "Auto-compose nested X threads from blogs with intelligent preview & media attachment."
        </p>
        <div className="flex items-center justify-between text-[9px] text-gray-500 font-bold border-t border-gray-100 pt-1.5">
          <span className="text-emerald-600">✓ Ready to Schedule</span>
          <span>5 Posts</span>
        </div>
      </div>
    ),
  },
  {
    className: "lg:right-[-310px] lg:top-[42%] lg:w-[220px]",
    delay: "0.9s",
    children: (
      <div className="w-[190px] sm:w-[220px] rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 shadow-xl shadow-indigo-900/20 text-white flex flex-col gap-2 text-left transition-all duration-350 hover:scale-[1.03] hover:shadow-indigo-900/15 border border-transparent">
        <div className="flex items-center gap-1.5">
          <Facebook className="h-4 w-4 text-white fill-white shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-85">FB Campaign</span>
        </div>
        <div
          className="h-16 w-full rounded-lg bg-cover bg-center opacity-90 border border-white/10"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=240&auto=format&fit=crop&q=80')` }}
        />
        <div>
          <h4 className="text-[10px] font-bold truncate">Q3 Retargeting Funnel</h4>
          <p className="text-[9px] opacity-80 mt-0.5">CTR 4.8% • ROAS 4.2x</p>
        </div>
      </div>
    ),
  },
  {
    className: "lg:left-[-200px] lg:top-[74%] lg:w-[220px]",
    delay: "1.2s",
    children: (
      <div className="w-[190px] sm:w-[220px] rounded-2xl bg-white p-2.5 shadow-xl shadow-indigo-900/10 border border-gray-100 flex flex-col gap-2 text-left transition-all duration-350 hover:scale-[1.03] hover:shadow-indigo-900/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Pin className="h-4 w-4 text-rose-600 fill-rose-600 shrink-0" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">Pinterest Sync</span>
          </div>
          <span className="text-[9px] bg-rose-50 text-rose-600 font-bold px-1.5 py-0.5 rounded">SYNC</span>
        </div>
        <div
          className="h-20 w-full rounded-lg bg-cover bg-center border border-gray-150"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=240&auto=format&fit=crop&q=80')` }}
        />
        <div>
          <h4 className="text-[11px] font-extrabold text-gray-900 leading-tight">Board Automation</h4>
          <p className="text-[9px] text-gray-500 font-medium mt-0.5">+820% impressions</p>
        </div>
      </div>
    ),
  },
  {
    className: "lg:right-[-210px] lg:top-[76%] lg:w-[220px]",
    delay: "1.5s",
    children: (
      <div className="w-[190px] sm:w-[220px] rounded-2xl bg-gradient-to-br from-indigo-950 to-purple-900 p-2.5 shadow-xl shadow-indigo-900/20 text-white flex flex-col gap-2 text-left transition-all duration-350 hover:scale-[1.03] hover:shadow-indigo-900/15 border border-transparent">
        <div className="flex items-center gap-1.5">
          <BarChart2 className="h-4 w-4 text-indigo-400 shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-85">Workspace Growth</span>
        </div>
        <div className="flex items-end gap-2 my-1">
          <span className="text-2xl font-black text-white tracking-tight">+148%</span>
          <span className="text-[10px] text-emerald-400 font-extrabold pb-1">★ conversions</span>
        </div>
        <p className="text-[9.5px] opacity-80 leading-normal">
          Organic impressions multiplied by 2.4x using smart post scheduling.
        </p>
      </div>
    ),
  },
];

export default function HeroShowcase({ isDark }: { isDark: boolean }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let timerId: any;
    let lastScrollTime = 0;
    let lastScrollY = window.scrollY;

    const startTimer = () => {
      timerId = setInterval(() => {
        setActive((a) => (a + 1) % SCREENS.length);
      }, 2600);
    };

    startTimer();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = Date.now();

      // Bidirectional, rate-limited scroll listener
      if (now - lastScrollTime > 900 && Math.abs(currentScrollY - lastScrollY) > 5) {
        if (currentScrollY > lastScrollY) {
          setActive((a) => (a + 1) % SCREENS.length);
        } else {
          setActive((a) => (a - 1 + SCREENS.length) % SCREENS.length);
        }
        lastScrollTime = now;
      }
      lastScrollY = currentScrollY;

      // Reset the auto-cycle timer when user scrolls
      clearInterval(timerId);
      startTimer();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(timerId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={`relative isolate overflow-hidden pt-0 pb-1 sm:pt-0.5 sm:pb-2 transition-all duration-[800ms] ease-in-out hero-section-transition ${isDark ? "bg-slate-950 dark-mode-active" : "bg-neutral-50"}`}>
      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .hero-float { animation: hero-float 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-float { animation: none; }
        }
        
        /* Dark Mode styles for floating cards and fallback cards */
        .hero-section-transition {
          transition: background-color 0.8s ease-in-out;
        }
        .hero-float > div,
        .lg\\:hidden > div > div {
          transition: background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease, box-shadow 0.8s ease;
        }
        .dark-mode-active .hero-float > div:not(.bg-gradient-to-br),
        .dark-mode-active .lg\\:hidden > div > div:not(.bg-gradient-to-br) {
          background-color: #1e293b !important;
          border-color: #334155 !important;
          color: #f8fafc !important;
          box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.6), 0 0 15px 3px rgba(99, 102, 241, 0.15) !important;
        }
        .dark-mode-active .hero-float > div .text-gray-900,
        .dark-mode-active .hero-float > div .text-gray-800,
        .dark-mode-active .lg\\:hidden > div > div .text-gray-900,
        .dark-mode-active .lg\\:hidden > div > div .text-gray-800 {
          color: #f8fafc !important;
        }
        .dark-mode-active .hero-float > div .text-gray-500,
        .dark-mode-active .lg\\:hidden > div > div .text-gray-500 {
          color: #94a3b8 !important;
        }
        .dark-mode-active .opacity-95 {
          opacity: 0.75 !important;
          transition: opacity 0.8s ease;
        }
        
        /* Hide scrollbar on phone screen */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Heart pop animation for auto-like */
        @keyframes heart-pop {
          0% { transform: scale(0); opacity: 0; }
          15% { transform: scale(1.2); opacity: 0.95; }
          30% { transform: scale(1); opacity: 0.95; }
          80% { transform: scale(1); opacity: 0.95; }
          100% { transform: scale(0); opacity: 0; }
        }
        .animate-heart-pop {
          animation: heart-pop 1s ease-in-out forwards;
        }
      `}</style>

      <div className="relative mx-auto max-w-5xl px-6 flex flex-col items-center gap-0">

        <div className="relative text-center w-full select-none z-0 mb-[-15px] sm:mb-[-30px]">
          <span
            className="text-[6.5vw] sm:text-[5.5vw] font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 opacity-40 leading-none whitespace-nowrap inline-block"
            style={{ transform: "scaleX(1.35)", transformOrigin: "center" }}
          >
            SOCIAL
          </span>
        </div>

        {/* Middle container: Pinned phone + floating cards */}
        <div className="relative z-10 w-full flex justify-center py-0 mt-[-2px] sm:mt-[-35px]">
          <div className="relative w-[380px] sm:w-[540px] translate-x-[20px] sm:translate-x-[35px]">
            <PhoneMock active={active} />

            {CARDS.map((card, i) => (
              <div
                key={i}
                className={`hero-float absolute hidden lg:block ${card.className}`}
                style={{ animationDelay: card.delay }}
              >
                {card.children}
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-center w-full select-none z-25 -mt-40 sm:-mt-106">
          <span
            className="text-[6.5vw] sm:text-[5.5vw] font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 opacity-95 leading-none whitespace-nowrap inline-block"
            style={{ transform: "scaleX(1.35)", transformOrigin: "center" }}
          >
            SUITE
          </span>
        </div>

        {/* stacked mobile fallback: show cards in a row below phone on small screens */}
        <div className="mt-4 flex flex-wrap justify-center gap-3 lg:hidden">
          {CARDS.map((card, i) => (
            <div key={i}>{card.children}</div>
          ))}
        </div>

      </div>
    </section>
  );
}
