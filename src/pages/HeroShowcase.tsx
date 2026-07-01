import { useEffect, useState } from "react";
import { Star, Sparkles, TrendingUp, Heart, MessageCircle, Youtube, Facebook, Twitter, Instagram, Linkedin, Timer, Pin, BarChart2 } from "lucide-react";
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

const SCREENS = [
  {
    key: "instagram",
    render: () => (
      <div className="flex h-full flex-col text-left font-sans bg-white select-none">
        {/* Instagram Header */}
        <div className="flex items-center justify-between px-2 py-1.5 border-b border-gray-100">
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
        {/* Instagram Image */}
        <div
          className="flex-1 w-full bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=240&auto=format&fit=crop&q=80')` }}
        />
        {/* Instagram Footer */}
        <div className="p-2 flex flex-col gap-1">
          <div className="flex items-center gap-2.5 text-gray-700">
            <Heart className="h-4.5 w-4.5 hover:text-red-500 cursor-pointer" />
            <MessageCircle className="h-4.5 w-4.5" />
          </div>
          <p className="text-[9px] font-bold text-gray-900">Liked by 1,204 users</p>
          <p className="text-[8.5px] leading-tight text-gray-800">
            <span className="font-bold mr-1">socialsuite</span>
            Unleash your brand power with automated scheduling. 🚀
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "twitter",
    render: () => (
      <div className="flex h-full flex-col text-left font-sans bg-[#0f1419] text-white p-2.5 select-none">
        {/* Twitter Header */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-[10px]">SS</div>
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5">
              <span className="text-[9.5px] font-bold leading-none">SocialSuite</span>
              <Sparkles className="h-3 w-3 text-sky-400 fill-sky-400" />
            </div>
            <span className="text-[8.5px] text-gray-500 leading-none">@socialsuite</span>
          </div>
        </div>
        {/* Tweet content */}
        <p className="text-[9.5px] leading-snug mb-2 font-normal text-gray-100">
          Simplify your social workflow. Schedule, analyze, and engage with your audience from a single intuitive dashboard. 📈✨
        </p>
        {/* Tweet Card */}
        <div className="flex-1 rounded-xl overflow-hidden border border-neutral-800 flex flex-col">
          <div
            className="flex-1 w-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=240&auto=format&fit=crop&q=80')` }}
          />
          <div className="p-1.5 bg-neutral-900 border-t border-neutral-800">
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">socialsuite.com</p>
            <p className="text-[8.5px] font-bold text-white truncate">Start your free trial today</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "facebook",
    render: () => (
      <div className="flex h-full flex-col text-left font-sans bg-white text-gray-900 select-none">
        {/* Facebook Header */}
        <div className="flex items-center gap-1.5 p-2 border-b border-gray-100">
          <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">f</div>
          <div className="flex flex-col">
            <span className="text-[9.5px] font-bold leading-none text-gray-900">SocialSuite</span>
            <span className="text-[8px] text-gray-500 leading-none mt-0.5">Sponsored • 🌐</span>
          </div>
        </div>
        {/* FB Text */}
        <p className="text-[9px] px-2 py-1.5 leading-snug text-gray-800">
          Reach more customers with target Facebook and Instagram ad campaigns. Tracking analytics included!
        </p>
        {/* FB Image */}
        <div
          className="flex-1 w-full bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=240&auto=format&fit=crop&q=80')` }}
        />
        {/* FB CTA */}
        <div className="p-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="max-w-[70%]">
            <p className="text-[8px] text-gray-500 uppercase tracking-wide">socialsuite.com</p>
            <p className="text-[9px] font-bold text-gray-900 truncate">Grow your audience today</p>
          </div>
          <span className="text-[8.5px] font-bold text-white bg-blue-600 px-2 py-1 rounded">Book Now</span>
        </div>
      </div>
    ),
  },
];

function PhoneMock({ active }: { active: number }) {
  const [processedImage, setProcessedImage] = useState<string | null>(null);

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
    <div className="relative z-10 mx-auto w-full h-[466px] sm:h-[586px]">
      {/* 3D Real Human Hand holding phone PNG (Processed with transparent cutout and bottom fade) */}
      <img
        src={processedImage || humanHandPhone}
        alt="Human hand holding phone"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-20"
      />

      {/* React Active Screen Content overlayed directly over the phone screen area */}
      <div
        className="absolute z-30 overflow-hidden bg-white p-1 pt-2.5 border border-neutral-100 shadow-inner"
        style={{
          top: "16.2%",
          left: "33.25%",
          width: "34.5%",
          height: "57.0%",
          borderRadius: "1.2rem",
        }}
      >
        <div className="flex items-center justify-between px-1 pb-2 text-[9px] font-bold text-gray-400">
          <span>9:41</span>
          <span>SocialSuite</span>
        </div>
        <div
          key={SCREENS[active].key}
          className="h-[calc(100%-20px)] animate-in fade-in slide-in-from-bottom-3 duration-500"
        >
          {SCREENS[active].render()}
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
    className: "lg:left-[-290px] lg:top-[1%] lg:w-[230px]",
    delay: "0s",
    children: (
      <div className="w-[200px] sm:w-[230px] rounded-2xl bg-white p-3 shadow-xl shadow-indigo-900/10 border border-gray-100 flex flex-col gap-2 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Youtube className="h-4 w-4 text-red-600 fill-red-600" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">YouTube</span>
          </div>
          <span className="text-[9px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded">LIVE</span>
        </div>
        <div
          className="h-20 w-full rounded-lg bg-cover bg-center border border-gray-100"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=240&auto=format&fit=crop&q=80')` }}
        />
        <div>
          <h4 className="text-[11px] font-extrabold text-gray-900 leading-tight">Scale social campaigns with AI</h4>
          <p className="text-[9px] text-gray-500 font-medium mt-0.5">12.4k views • 98% likes</p>
        </div>
      </div>
    ),
  },
  {
    className: "lg:right-[-240px] lg:top-[14%] lg:w-[210px]",
    delay: "0.3s",
    children: (
      <div className="w-[180px] sm:w-[210px] rounded-2xl bg-white p-3 shadow-xl shadow-indigo-900/10 border border-gray-100 flex flex-col gap-2 text-left">
        <div className="flex items-center gap-1.5">
          <Instagram className="h-4 w-4 text-pink-600" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">@socialsuite</span>
        </div>
        <div
          className="h-24 w-full rounded-lg bg-cover bg-center border border-gray-100"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=240&auto=format&fit=crop&q=80')` }}
        />
        <div className="flex items-center justify-between text-[9px] text-gray-500 font-bold">
          <span>+1.2k likes today</span>
          <span className="text-pink-600">★ VIRAL</span>
        </div>
      </div>
    ),
  },
  {
    className: "lg:left-[-420px] lg:top-[36%] lg:w-[230px]",
    delay: "0.6s",
    children: (
      <div className="w-[200px] sm:w-[230px] rounded-2xl bg-white p-3 shadow-xl shadow-indigo-900/10 border border-gray-100 flex flex-col gap-2 text-left">
        <div className="flex items-center gap-1.5">
          <Twitter className="h-4 w-4 text-black fill-black" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">@socialsuite</span>
        </div>
        <p className="text-[10px] text-gray-800 leading-snug">
          "Social Suite automated our entire workspace in minutes! 🚀"
        </p>
        <div 
          className="h-24 w-full rounded-lg bg-cover bg-center border border-gray-100" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=240&auto=format&fit=crop&q=80')` }}
        />
        <div className="flex items-center justify-between text-[9px] text-gray-500 font-bold">
          <span>34 Reposts</span>
          <span>210 Likes</span>
        </div>
      </div>
    ),
  },
  {
    className: "lg:right-[-370px] lg:top-[46%] lg:w-[220px]",
    delay: "0.9s",
    children: (
      <div className="w-[190px] sm:w-[220px] rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3 shadow-xl shadow-indigo-900/20 text-white flex flex-col gap-2 text-left">
        <div className="flex items-center gap-1.5">
          <Facebook className="h-4 w-4 text-white fill-white" />
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">FB Ad Campaign</span>
        </div>
        <div
          className="h-16 w-full rounded-lg bg-cover bg-center opacity-90 border border-white/10"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=240&auto=format&fit=crop&q=80')` }}
        />
        <div>
          <h4 className="text-[10px] font-bold truncate">Q3 Retargeting Active</h4>
          <p className="text-[9px] opacity-80 mt-0.5">Reached 45k • CTR 4.8%</p>
        </div>
      </div>
    ),
  },
  {
    className: "lg:left-[-180px] lg:bottom-[38%] lg:w-[230px]",
    delay: "1.2s",
    children: (
      <div className="w-[200px] sm:w-[230px] rounded-2xl bg-white p-3 shadow-xl shadow-indigo-900/10 border border-gray-100 flex flex-col gap-2 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Pin className="h-4 w-4 text-rose-600 fill-rose-600" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">Pinterest Pin</span>
          </div>
          <span className="text-[9px] bg-rose-50 text-rose-600 font-bold px-1.5 py-0.5 rounded">VIRAL</span>
        </div>
        <div 
          className="h-20 w-full rounded-lg bg-cover bg-center border border-gray-100" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=240&auto=format&fit=crop&q=80')` }}
        />
        <div>
          <h4 className="text-[11px] font-extrabold text-gray-900 leading-tight">Cozy home workspaces</h4>
          <p className="text-[9px] text-gray-500 font-medium mt-0.5">+820% saves this month</p>
        </div>
      </div>
    ),
  },
  {
    className: "lg:right-[-220px] lg:bottom-[2%] lg:w-[220px]",
    delay: "1.5s",
    children: (
      <div className="w-[190px] sm:w-[220px] rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-950 p-3 shadow-xl shadow-indigo-900/20 text-white flex flex-col gap-2 text-left">
        <div className="flex items-center gap-1.5">
          <BarChart2 className="h-4 w-4 text-indigo-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Workspace Growth</span>
        </div>
        <div className="flex items-end gap-2 my-1">
          <span className="text-2xl font-black text-white tracking-tight">+148%</span>
          <span className="text-[10px] text-emerald-400 font-extrabold pb-1">★ conversions</span>
        </div>
        <p className="text-[9.5px] opacity-80 leading-normal">
          Organic reach increased by 2.4x this month using smart scheduling.
        </p>
      </div>
    ),
  },
  {
    className: "lg:left-[-220px] lg:bottom-[20px] lg:w-[230px]",
    delay: "1.8s",
    children: (
      <div className="w-[200px] sm:w-[230px] rounded-2xl bg-white p-3 shadow-xl shadow-indigo-900/10 border border-gray-100 flex flex-col gap-2 text-left">
        <div className="flex items-center gap-1.5">
          <Linkedin className="h-4 w-4 text-blue-800 fill-blue-800" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">LinkedIn Article</span>
        </div>
        <div
          className="h-16 w-full rounded-lg bg-cover bg-center border border-gray-100"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=240&auto=format&fit=crop&q=80')` }}
        />
        <div>
          <h4 className="text-[11px] font-extrabold text-gray-900 leading-tight">Optimizing B2B Workflows</h4>
          <p className="text-[9px] text-gray-500 font-medium mt-0.5">42 Reactions • 8 Comments</p>
        </div>
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
        .dark-mode-active .hero-float > div,
        .dark-mode-active .lg\\:hidden > div > div {
          background-color: #f8fafc !important;
          border-color: #6366f1 !important;
          color: #0f172a !important;
          box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.5), 0 0 15px 3px rgba(99, 102, 241, 0.3) !important;
        }
        .dark-mode-active .hero-float > div .text-gray-900,
        .dark-mode-active .hero-float > div .text-gray-800,
        .dark-mode-active .lg\\:hidden > div > div .text-gray-900,
        .dark-mode-active .lg\\:hidden > div > div .text-gray-800 {
          color: #0f172a !important;
        }
        .dark-mode-active .hero-float > div .text-gray-500,
        .dark-mode-active .lg\\:hidden > div > div .text-gray-500 {
          color: #475569 !important;
        }
        .dark-mode-active .opacity-95 {
          opacity: 0.75 !important;
          transition: opacity 0.8s ease;
        }
      `}</style>

      <div className="relative mx-auto max-w-5xl px-6 flex flex-col items-center gap-0">

        <div className="relative text-center w-full select-none z-0 mb-[-15px] sm:mb-[-30px]">
          <span className="text-[14vw] sm:text-[9vw] font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 opacity-40 leading-none whitespace-nowrap">
            SOCIAL
          </span>
        </div>

        {/* Middle container: Pinned phone + floating cards */}
        <div className="relative z-10 w-full flex justify-center py-0 mt-[-30px] sm:mt-[-55px]">
          <div className="relative w-[350px] sm:w-[440px]">
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

        <div className="relative text-center w-full select-none z-25 -mt-22 sm:-mt-36">
          <span className="text-[14vw] sm:text-[9vw] font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 opacity-95 leading-none whitespace-nowrap">
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
