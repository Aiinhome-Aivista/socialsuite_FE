import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Check, Minus } from "lucide-react";
import { getToken } from "../lib/api";
import Footer from "./Footer";

/**
 * Pricing
 * Route this at /pricing in your router (e.g. <Route path="/pricing" element={<Pricing />} />).
 *
 * - Monthly / yearly billing toggle (yearly shows a discount)
 * - 3 plan cards, middle one highlighted as "Most popular"
 * - Each CTA button calls handleSelectPlan(planId, billing) — wire your
 *   payment gateway (Stripe Checkout, Razorpay, Paddle, etc.) there.
 * - Comparison table + FAQ accordion below for a complete page.
 */

type BillingCycle = "monthly" | "yearly";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals getting started with social management.",
    monthly: 19,
    yearly: 15,
    highlight: false,
    features: [
      "3 connected accounts",
      "30 scheduled posts / month",
      "Basic analytics",
      "AI caption generator",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "For teams who post often and need to move fast.",
    monthly: 49,
    yearly: 39,
    highlight: true,
    features: [
      "10 connected accounts",
      "Unlimited scheduled posts",
      "Advanced analytics & reports",
      "AI caption + image generation",
      "Unified inbox & comments",
      "Priority support",
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "For agencies and larger teams managing multiple brands.",
    monthly: 99,
    yearly: 79,
    highlight: false,
    features: [
      "Unlimited connected accounts",
      "Unlimited scheduled posts",
      "Competitor tracking",
      "Team roles & approvals",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
];

const COMPARISON_ROWS: { label: string; values: (boolean | string)[] }[] = [
  { label: "Connected accounts", values: ["3", "10", "Unlimited"] },
  { label: "Scheduled posts", values: ["30 / month", "Unlimited", "Unlimited"] },
  { label: "AI caption generator", values: [true, true, true] },
  { label: "AI image generation", values: [false, true, true] },
  { label: "Unified inbox", values: [false, true, true] },
  { label: "Competitor tracking", values: [false, false, true] },
  { label: "Team roles & approvals", values: [false, false, true] },
  { label: "Dedicated account manager", values: [false, false, true] },
];

const FAQS = [
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade or downgrade at any time from your billing settings — changes are prorated automatically.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan comes with a 14-day free trial, no credit card required to start.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards. Annual plans can also be paid via invoice for Business customers.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, there are no long-term contracts. Cancel anytime and you'll keep access until the end of your billing period.",
  },
];

function formatPrice(n: number) {
  return n.toLocaleString("en-US");
}

export default function Pricing() {
  const isLoggedIn = !!getToken();
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // TODO: wire this up to your payment gateway (Stripe Checkout session,
  // Razorpay order, Paddle checkout, etc.) — e.g.
  //   const res = await fetch("/api/checkout", { method: "POST", body: JSON.stringify({ planId, billing }) });
  //   const { url } = await res.json();
  //   window.location.href = url;
  function handleSelectPlan(planId: string) {
    console.log("Selected plan:", planId, billing);
  }

  return (
    <div className="min-h-screen bg-neutral-50 overflow-hidden relative font-sans">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px] translate-y-1/3" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/80 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">SocialSuite</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/pricing" className="text-sm font-bold text-gray-900">
              Pricing
            </Link>
            {isLoggedIn ? (
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm border border-gray-200 transition-all hover:bg-gray-50 hover:shadow-md hover:scale-105">
                Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className="h-[72px]" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-indigo-100 backdrop-blur-md mb-6 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">14-day free trial · No card required</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
          Simple pricing.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Room to grow.
          </span>
        </h1>
        <p className="text-lg text-gray-600 font-medium leading-relaxed">
          Pick a plan that fits your team today, and upgrade the moment you need more.
        </p>

        {/* Billing toggle */}
        <div className="mt-10 inline-flex items-center gap-1 rounded-full bg-white border border-gray-200 p-1 shadow-sm">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              billing === "monthly" ? "bg-gray-900 text-white shadow" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all ${
              billing === "yearly" ? "bg-gray-900 text-white shadow" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Yearly
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                billing === "yearly" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
              }`}
            >
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => {
            const price = billing === "monthly" ? plan.monthly : plan.yearly;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 transition-all ${
                  plan.highlight
                    ? "bg-gray-900 shadow-2xl shadow-indigo-900/30 md:-translate-y-4 border border-gray-800"
                    : "bg-white/80 backdrop-blur-xl shadow-xl shadow-indigo-900/5 border border-white/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/10"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-lg">
                    Most popular
                  </span>
                )}

                <h3 className={`text-xl font-extrabold mb-2 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm font-medium mb-6 leading-relaxed ${plan.highlight ? "text-gray-400" : "text-gray-600"}`}>
                  {plan.description}
                </p>

                <div className="flex items-end gap-1.5 mb-1">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    ${formatPrice(price)}
                  </span>
                  <span className={`text-sm font-bold pb-1 ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                    /month
                  </span>
                </div>
                <p className={`text-xs font-medium mb-7 ${plan.highlight ? "text-gray-500" : "text-gray-400"}`}>
                  {billing === "yearly" ? `Billed $${formatPrice(price * 12)} / year` : "Billed monthly"}
                </p>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all mb-8 ${
                    plan.highlight
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      : "bg-gray-900 text-white hover:bg-gray-800 hover:-translate-y-0.5"
                  }`}
                >
                  Start free trial <ArrowRight className="h-4 w-4" />
                </button>

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm font-medium">
                      <Check
                        className={`h-4 w-4 mt-0.5 shrink-0 ${plan.highlight ? "text-indigo-400" : "text-indigo-600"}`}
                      />
                      <span className={plan.highlight ? "text-gray-300" : "text-gray-700"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-500 font-medium mt-10">
          Need a custom plan for a larger organization?{" "}
          <a href="#" className="text-indigo-600 font-bold hover:underline">
            Contact sales
          </a>
        </p>
      </div>

      {/* Comparison table */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-10">
          Compare plans in detail
        </h2>
        <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-xl shadow-indigo-900/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left font-bold text-gray-500 px-6 py-4">Feature</th>
                {PLANS.map((p) => (
                  <th key={p.id} className="text-center font-extrabold text-gray-900 px-6 py-4">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-gray-50/60" : ""}>
                  <td className="px-6 py-4 font-semibold text-gray-700">{row.label}</td>
                  {row.values.map((v, j) => (
                    <td key={j} className="px-6 py-4 text-center">
                      {typeof v === "boolean" ? (
                        v ? (
                          <Check className="h-4 w-4 text-indigo-600 mx-auto" />
                        ) : (
                          <Minus className="h-4 w-4 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-gray-700">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pb-32">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-10">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const open = openFaq === i;
            return (
              <div
                key={item.q}
                className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="font-bold text-gray-900">{item.q}</span>
                  <span
                    className={`shrink-0 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-transform ${
                      open ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {open && <p className="px-6 pb-5 text-sm text-gray-600 font-medium leading-relaxed">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}