import { useEffect, useState } from "react";
import { Star, Sparkles, TrendingUp, Heart, MessageCircle, Youtube, Facebook, Twitter, Instagram, Linkedin, Timer } from "lucide-react";

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
    key: "compose",
    render: () => (
      <div className="flex h-full flex-col">
        <div className="flex-1 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600" />
            <div className="h-2 w-16 rounded-full bg-gray-300" />
          </div>
          <div className="space-y-1.5 mb-3">
            <div className="h-2 w-full rounded-full bg-gray-200" />
            <div className="h-2 w-4/5 rounded-full bg-gray-200" />
          </div>
          <div className="h-24 w-full rounded-xl bg-white/70 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-indigo-500" />
          </div>
        </div>
        <div className="mt-3 rounded-xl bg-gray-900 text-white text-[11px] font-bold text-center py-2.5">
          Generate caption
        </div>
      </div>
    ),
  },
  {
    key: "analytics",
    render: () => (
      <div className="flex h-full flex-col gap-2">
        <div className="rounded-2xl bg-emerald-50 p-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-emerald-700 font-bold">FOLLOWERS</p>
            <p className="text-lg font-extrabold text-emerald-900">+1,204</p>
          </div>
          <TrendingUp className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="flex-1 rounded-2xl bg-gray-50 p-3 flex items-end gap-1.5">
          {[40, 65, 35, 80, 55, 95, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-purple-400"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "post",
    render: () => (
      <div className="flex h-full flex-col">
        <div className="h-28 rounded-2xl bg-gradient-to-br from-purple-200 via-indigo-200 to-pink-200" />
        <div className="mt-3 flex items-center gap-4 px-1">
          <span className="flex items-center gap-1 text-pink-600 text-xs font-bold">
            <Heart className="h-4 w-4 fill-pink-600" /> 482
          </span>
          <span className="flex items-center gap-1 text-gray-500 text-xs font-bold">
            <MessageCircle className="h-4 w-4" /> 36
          </span>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-2 w-full rounded-full bg-gray-200" />
          <div className="h-2 w-2/3 rounded-full bg-gray-200" />
        </div>
        <div className="mt-auto rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[11px] font-bold text-center py-2.5">
          Post to all platforms
        </div>
      </div>
    ),
  },
];

function PhoneMock() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SCREENS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-10 mx-auto w-[200px] sm:w-[240px]">
      
      {/* 3D Hand Overlay Graphic (Precision Corporate Outline style) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Arm Sleeve/Cuff (z-10) */}
        <div className="absolute bottom-[-100px] left-[50%] -translate-x-1/2 w-[90px] sm:w-[110px] h-[120px] bg-[#1e2023] border-[6px] border-gray-900 rounded-[12px] z-10 shadow-lg flex flex-col justify-end items-center pb-2">
          <div className="w-[100px] sm:w-[120px] h-[12px] bg-[#adc6ff] rounded-[4px] border-2 border-gray-900 mb-1" />
        </div>

        {/* Hand Palm (z-20) */}
        <div className="absolute bottom-[-35px] left-[50%] -translate-x-1/2 w-[70px] sm:w-[90px] h-[80px] bg-neutral-800 border-[6px] border-gray-900 rounded-t-[20px] z-20" />

        {/* Thumb wrapping left (z-40) */}
        <div className="absolute left-[-22px] sm:left-[-28px] bottom-[80px] sm:bottom-[100px] w-[28px] sm:w-[32px] h-[50px] sm:h-[60px] bg-neutral-805 bg-neutral-800 border-[6px] border-gray-900 rounded-l-[16px] rounded-r-[6px] z-40 origin-right rotate-[22deg]" />

        {/* Fingers wrapping right bezel (z-40) */}
        {/* Index */}
        <div className="absolute right-[-20px] sm:right-[-26px] top-[110px] sm:top-[130px] w-[32px] sm:w-[38px] h-[28px] sm:h-[34px] bg-neutral-800 border-[6px] border-gray-900 rounded-r-[14px] rounded-l-[4px] z-40" />
        {/* Middle */}
        <div className="absolute right-[-20px] sm:right-[-26px] top-[150px] sm:top-[170px] w-[34px] sm:w-[40px] h-[28px] sm:h-[34px] bg-neutral-800 border-[6px] border-gray-900 rounded-r-[14px] rounded-l-[4px] z-40" />
        {/* Ring */}
        <div className="absolute right-[-20px] sm:right-[-26px] top-[190px] sm:top-[210px] w-[32px] sm:w-[38px] h-[28px] sm:h-[34px] bg-neutral-800 border-[6px] border-gray-900 rounded-r-[14px] rounded-l-[4px] z-40" />
        {/* Pinky */}
        <div className="absolute right-[-18px] sm:right-[-22px] top-[230px] sm:top-[250px] w-[28px] sm:w-[34px] h-[26px] sm:h-[32px] bg-neutral-800 border-[6px] border-gray-900 rounded-r-[12px] rounded-l-[4px] z-40" />
      </div>

      {/* Center Smartphone */}
      <div className="relative rounded-[2.2rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl shadow-indigo-900/30 z-30">
        <div className="absolute left-1/2 top-0 h-4.5 w-24 -translate-x-1/2 rounded-b-xl bg-gray-900 z-20" />
        <div className="relative h-[330px] sm:h-[380px] overflow-hidden rounded-[1.8rem] bg-white p-3 pt-6">
          <div className="flex items-center justify-between px-1 pb-3 text-[10px] font-bold text-gray-400">
            <span>9:41</span>
            <span>SocialSuite</span>
          </div>
          <div
            key={SCREENS[active].key}
            className="h-[calc(100%-28px)] animate-in fade-in slide-in-from-bottom-3 duration-500"
          >
            {SCREENS[active].render()}
          </div>
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
    className: "lg:left-[-340px] lg:top-[12%] lg:w-[230px]",
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
    className: "lg:right-[-320px] lg:top-[6%] lg:w-[210px]",
    delay: "0.6s",
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
    className: "lg:right-[-330px] lg:bottom-[22%] lg:w-[220px]",
    delay: "1.2s",
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
    className: "lg:left-[-340px] lg:bottom-[18%] lg:w-[230px]",
    delay: "0.3s",
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
          className="h-16 w-full rounded-lg bg-cover bg-center border border-gray-100" 
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
    className: "lg:left-[-180px] lg:bottom-[-100px] lg:w-[230px]",
    delay: "0.9s",
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

export default function HeroShowcase() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-50 pt-0 pb-1 sm:pt-0.5 sm:pb-2">
      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .hero-float { animation: hero-float 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-float { animation: none; }
        }
      `}</style>

      <div className="relative mx-auto max-w-5xl px-6 flex flex-col items-center gap-0">
        
        {/* SOCIAL above the phone */}
        <div className="text-center w-full select-none z-0">
          <span className="text-[14vw] sm:text-[9vw] font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-25 leading-none whitespace-nowrap">
            SOCIAL
          </span>
        </div>

        {/* Middle container: Pinned phone + floating cards */}
        <div className="relative w-full flex justify-center py-0">
          <div className="relative w-[200px] sm:w-[240px]">
            <PhoneMock />

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

        {/* SUITE below the phone */}
        <div className="text-center w-full select-none z-0 -mt-3 sm:-mt-5">
          <span className="text-[14vw] sm:text-[9vw] font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-25 leading-none whitespace-nowrap">
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
