import { useEffect, useState } from "react";
import { Star, Truck, Timer, Sparkles, TrendingUp, Heart, MessageCircle } from "lucide-react";

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
    <div className="relative z-10 mx-auto w-[260px] sm:w-[300px]">
      <div className="relative rounded-[2.5rem] border-[10px] border-gray-900 bg-gray-900 shadow-2xl shadow-indigo-900/30">
        <div className="absolute left-1/2 top-0 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-gray-900 z-20" />
        <div className="relative h-[420px] sm:h-[480px] overflow-hidden rounded-[2rem] bg-white p-3 pt-7">
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
    className: "left-2 top-[18%] sm:left-6",
    delay: "0s",
    children: (
      <div className="rounded-2xl bg-white px-5 py-3.5 shadow-xl shadow-indigo-900/10 border border-gray-100">
        <p className="text-sm font-extrabold text-gray-900">Trending now</p>
        <p className="text-xs text-gray-500 font-medium">#3 in Marketing</p>
      </div>
    ),
  },
  {
    className: "right-2 top-[14%] sm:right-6",
    delay: "0.6s",
    children: (
      <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-indigo-900/10 border border-gray-100">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Star className="h-5 w-5 text-white fill-white" />
        </div>
        <div>
          <p className="text-sm font-extrabold text-gray-900">Going viral</p>
          <p className="text-xs text-gray-500 font-medium">12.4k shares today</p>
        </div>
      </div>
    ),
  },
  {
    className: "right-0 bottom-[30%] sm:right-2",
    delay: "1.2s",
    children: (
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 shadow-xl shadow-indigo-900/20 text-white">
        <p className="flex items-center gap-1.5 text-xs font-bold opacity-90">
          <Timer className="h-3.5 w-3.5" /> Next post in
        </p>
        <p className="text-lg font-extrabold tabular-nums">00:14:32</p>
      </div>
    ),
  },
  {
    className: "left-0 bottom-[26%] sm:left-2",
    delay: "0.3s",
    children: (
      <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-indigo-900/10 border border-gray-100">
        <Truck className="h-4 w-4 text-indigo-600" />
        <div>
          <p className="text-xs font-extrabold text-gray-900">Auto-scheduled</p>
          <p className="text-[11px] text-gray-500 font-medium">6 posts queued</p>
        </div>
      </div>
    ),
  },
  {
    className: "left-[8%] bottom-2 sm:left-[12%]",
    delay: "0.9s",
    children: (
      <div className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-indigo-900/10 border border-gray-100 max-w-[220px]">
        <div className="relative h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500" />
        <p className="text-xs font-semibold text-gray-700 leading-snug">
          "Cut my posting time in half."
        </p>
      </div>
    ),
  },
];

export default function HeroShowcase() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-50 pt-10 pb-16 sm:pt-16 sm:pb-24">
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

      {/* giant background wordmark */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-6 select-none">
        <span className="text-[16vw] sm:text-[9vw] font-extrabold tracking-tight text-gray-900/[0.06] leading-none whitespace-nowrap">
          SOCIAL
        </span>
        <span className="text-[16vw] sm:text-[9vw] font-extrabold tracking-tight text-gray-900/[0.06] leading-none whitespace-nowrap">
          SUITE
        </span>
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <PhoneMock />

        {CARDS.map((card, i) => (
          <div
            key={i}
            className={`hero-float absolute hidden sm:block ${card.className}`}
            style={{ animationDelay: card.delay }}
          >
            {card.children}
          </div>
        ))}

        {/* stacked mobile fallback: show cards in a row below phone on small screens */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:hidden">
          {CARDS.map((card, i) => (
            <div key={i}>{card.children}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
