import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Zap,
  Wifi,
  Laptop,
  Lightbulb,
  Phone,
  Store,
  Home,
  BellRing,
  MapPin,
  ArrowRight,
  Flame,
  Activity,
  CalendarCheck,
  MessageCircle,
} from "lucide-react";
import {
  AREAS,
  REGIONS,
  STATUS_LABEL,
  LOAD_OPTIONS,
  TIERS,
  pickTier,
  zar,
  type OutageStatus,
} from "../lib/areas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PowerBrick — Thermal Backup Power for Soweto & Johannesburg" },
      {
        name: "description",
        content:
          "Affordable thermal backup power bricks for homes, backrooms and small businesses. Live outage tracking across Soweto and Johannesburg, with instant quotations.",
      },
      { property: "og:title", content: "PowerBrick — Backup power for every home and hustle" },
      {
        property: "og:description",
        content:
          "Thermal power bricks for lighting, wifi, laptops and small businesses. Check outages in your area and get an instant quote.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const STATUS_STYLE: Record<OutageStatus, string> = {
  outage: "bg-destructive/15 text-destructive border-destructive/30",
  loadshedding: "bg-ember/15 text-ember border-ember/30",
  unstable: "bg-signal/40 text-signal-foreground border-signal/60",
  stable: "bg-secondary text-secondary-foreground border-border",
};

const STATUS_DOT: Record<OutageStatus, string> = {
  outage: "bg-destructive",
  loadshedding: "bg-ember",
  unstable: "bg-signal",
  stable: "bg-green-500",
};

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <ProductStory />
      <OutageBoard />
      <QuoteTool />
      <Consultation />
      <Alerts />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember text-ember-foreground">
            <Flame className="h-5 w-5" />
          </span>
          PowerBrick
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <a href="#product" className="hover:text-foreground">The Brick</a>
          <a href="#areas" className="hover:text-foreground">Area power status</a>
          <a href="#quote" className="hover:text-foreground">Get a quote</a>
          <a href="#consult" className="hover:text-foreground">Book a consult</a>
          <a href="#alerts" className="hover:text-foreground">Alerts</a>
        </nav>
        <a
          href="#quote"
          className="rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-ember-foreground transition hover:opacity-90"
        >
          Get a quote
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-signal">
            <Activity className="h-3.5 w-3.5" /> Live across Soweto & Johannesburg
          </p>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight md:text-6xl">
            When the power goes off,{" "}
            <span className="text-ember">yours stays on.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-background/70">
            A thermal backup power brick made for our communities. It keeps your
            lights, wifi, laptop and phones running — in shacks, backrooms,
            flats, small homes and small businesses. On-grid or off-grid.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-lg bg-ember px-6 py-3 font-semibold text-ember-foreground transition hover:opacity-90"
            >
              Get an instant quote <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#areas"
              className="inline-flex items-center gap-2 rounded-lg border border-background/30 px-6 py-3 font-semibold text-background transition hover:bg-background/10"
            >
              <MapPin className="h-4 w-4" /> Check your area
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-display text-2xl font-bold text-signal">8–12 hrs</p>
              <p className="text-background/60">backup runtime</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-signal">R499</p>
              <p className="text-background/60">deposit from</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-signal">13</p>
              <p className="text-background/60">areas tracked live</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            <div className="rounded-3xl border border-background/15 bg-background/5 p-8 shadow-2xl">
              <div className="rounded-2xl bg-gradient-to-br from-ember to-primary p-1">
                <div className="rounded-xl bg-foreground p-6">
                  <div className="flex items-center justify-between">
                    <Flame className="h-8 w-8 text-ember" />
                    <span className="rounded-full bg-signal px-3 py-1 text-xs font-bold text-signal-foreground">
                      THERMAL CORE
                    </span>
                  </div>
                  <div className="mt-8 space-y-3">
                    {["Lights", "Wifi router", "Laptop", "Phones"].map((x) => (
                      <div key={x} className="flex items-center justify-between rounded-lg border border-background/15 px-4 py-2.5 text-sm">
                        <span className="text-background/80">{x}</span>
                        <span className="flex items-center gap-1.5 font-semibold text-signal">
                          <span className="h-2 w-2 rounded-full bg-signal" /> ON
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-center text-xs text-background/50">
                    Keeps heat. Keeps power. No noise, no fuel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const USES = [
  { icon: Lightbulb, label: "Lighting" },
  { icon: Wifi, label: "Wifi & routers" },
  { icon: Laptop, label: "Laptops" },
  { icon: Phone, label: "Phones" },
  { icon: Store, label: "Small businesses" },
  { icon: Home, label: "Shacks, backrooms & flats" },
];

function ProductStory() {
  return (
    <section id="product" className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Built for real life in our communities
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          The PowerBrick stores heat and power when electricity is available —
          from the grid, a solar panel, or a generator — and gives it back when
          the power goes off. It is safe indoors, silent, and costs less to run
          than paraffin, candles or petrol.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {USES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ember/15 text-ember">
              <Icon className="h-5 w-5" />
            </span>
            <p className="font-semibold">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {TIERS.map((t) => (
          <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-ember">{t.model}</p>
            <h3 className="mt-1 font-display text-2xl font-bold">{t.name}</h3>
            <p className="mt-3 font-display text-3xl font-extrabold">{zar(t.price)}</p>
            <p className="text-sm text-muted-foreground">
              or {zar(t.deposit)} deposit + {zar(t.monthly)}/month
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{t.bestFor}</p>
            <p className="mt-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              Up to {t.hours} hrs backup
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function OutageBoard() {
  const [region, setRegion] = useState(REGIONS[0]);
  const areas = useMemo(
    () => (region === REGIONS[0] ? AREAS : AREAS.filter((a) => a.region === region)),
    [region]
  );
  const active = areas.filter((a) => a.status !== "stable").length;

  return (
    <section id="areas" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Electricity issues, tracked area by area
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              We combine outage reports, census data and energy-poverty stats
              from government departments to show which areas need backup power
              most — and where our teams are active.
            </p>
          </div>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-lg border border-input bg-card px-4 py-2.5 text-sm font-medium"
          >
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <p className="mt-6 text-sm font-semibold text-ember">
          {active} of {areas.length} areas with power problems right now
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <div key={a.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-bold">{a.name}</h3>
                  <p className="text-xs text-muted-foreground">{a.region}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[a.status]}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[a.status]}`} />
                  {STATUS_LABEL[a.status]}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <p><span className="font-semibold text-foreground">{a.households.toLocaleString()}</span> households</p>
                <p><span className="font-semibold text-foreground">{a.energyPovertyPct}%</span> energy poverty</p>
                <p><span className="font-semibold text-foreground">{a.avgMonthlyIncome}</span> avg income</p>
                <p><span className="font-semibold text-foreground">{a.smallBusinesses.toLocaleString()}</span> small businesses</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Updated {a.lastUpdated}</p>
                <a href="#quote" className="text-sm font-semibold text-ember hover:underline">
                  Quote this area →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteTool() {
  const [selected, setSelected] = useState<string[]>(["lights", "wifi", "phones"]);
  const [hours, setHours] = useState(8);
  const [area, setArea] = useState(AREAS[0]?.id ?? "orlando");

  const totalWatts = useMemo(
    () =>
      LOAD_OPTIONS.filter((o) => selected.includes(o.id)).reduce(
        (s, o) => s + o.watts,
        0
      ),
    [selected]
  );
  const tier = pickTier(Math.max(totalWatts, 1), hours);
  const areaName = AREAS.find((a) => a.id === area)?.name ?? "";

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <section id="quote" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Get an instant quotation for your area
          </h2>
          <p className="mt-3 text-muted-foreground">
            Choose what you need to keep running. We size the right brick and
            give you a price on the spot.
          </p>
          <div className="mt-8">
            <p className="text-sm font-semibold">Your area</p>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm"
            >
              {AREAS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} — {a.region}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold">What must stay on?</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {LOAD_OPTIONS.map((o) => (
                <label
                  key={o.id}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-sm transition ${
                    selected.includes(o.id)
                      ? "border-ember bg-ember/10 font-semibold"
                      : "border-border bg-card"
                  }`}
                >
                  <span>{o.label}</span>
                  <input
                    type="checkbox"
                    checked={selected.includes(o.id)}
                    onChange={() => toggle(o.id)}
                    className="h-4 w-4 accent-[var(--ember)]"
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold">
              Backup hours needed: <span className="text-ember">{hours} hrs</span>
            </p>
            <input
              type="range"
              min={4}
              max={14}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--ember)]"
            />
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border-2 border-ember bg-card p-8 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Your quotation — {areaName}
            </p>
            <h3 className="mt-2 font-display text-3xl font-extrabold">
              {tier.name} <span className="text-lg font-semibold text-muted-foreground">({tier.model})</span>
            </h3>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Cash price</span>
                <span className="font-display text-2xl font-bold">{zar(tier.price)}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Lay-by / rent-to-own</span>
                <span className="font-semibold">{zar(tier.deposit)} deposit + {zar(tier.monthly)}/pm</span>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span className="text-muted-foreground">Your load</span>
                <span className="font-semibold">{totalWatts} W for {hours} hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Free delivery & setup in {areaName}</span>
                <span className="font-semibold text-ember">Included</span>
              </div>
            </div>
            <p className="mt-5 rounded-lg bg-secondary p-3 text-sm text-secondary-foreground">
              {tier.bestFor}.
            </p>
            <button className="mt-6 w-full rounded-lg bg-ember py-3.5 font-semibold text-ember-foreground transition hover:opacity-90">
              Reserve this quote — we call you back
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No obligation. Price locked for 14 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Consultation() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState(AREAS[0]?.id ?? "orlando");
  const [topic, setTopic] = useState("Home backup");
  const [slot, setSlot] = useState("Weekday morning");
  const [done, setDone] = useState(false);

  const inputCls =
    "mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm";

  return (
    <section id="consult" className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-2">
        <div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ember text-ember-foreground">
            <CalendarCheck className="h-6 w-6" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold md:text-4xl">
            Book a free consultation
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Not sure which Power brick fits your home or business? Book a free
            15-minute call or a doorstep visit. We check your load, explain
            the lay-by options, and answer your questions — no pressure, no
            obligation.
          </p>
          <a
            href="https://wa.me/27786711903"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-whatsapp bg-whatsapp/10 px-4 py-3 text-sm font-semibold text-whatsapp transition hover:bg-whatsapp/15"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp us to book: 078 671 1903
          </a>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-ember" /> Load check for your home or business
            </li>
            <li className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-ember" /> Deposit and monthly plan explained in plain language
            </li>
            <li className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-ember" /> Available in isiZulu, Sesotho and English
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          {done ? (
            <div className="py-8 text-center">
              <CalendarCheck className="mx-auto h-10 w-10 text-ember" />
              <p className="mt-4 font-display text-xl font-bold">
                Booked, {name.split(" ")[0] || "friend"}!
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                We'll SMS or WhatsApp {phone || "you"} to confirm your{" "}
                {slot.toLowerCase()} consultation about {topic.toLowerCase()}.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim() && phone.trim()) setDone(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-semibold">Your name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Thandi Mokoena"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Cellphone number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 073 123 4567"
                  className={inputCls}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold">Your area</label>
                  <select value={area} onChange={(e) => setArea(e.target.value)} className={inputCls}>
                    {AREAS.map((a) => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold">What for?</label>
                  <select value={topic} onChange={(e) => setTopic(e.target.value)} className={inputCls}>
                    {["Home backup", "Small business", "Backroom rental", "Community / stokvel"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold">Best time</label>
                <select value={slot} onChange={(e) => setSlot(e.target.value)} className={inputCls}>
                  {["Weekday morning", "Weekday afternoon", "Saturday", "Evening call"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <button className="w-full rounded-lg bg-ember py-3.5 font-semibold text-ember-foreground transition hover:opacity-90">
                Book my free consultation
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Free. We confirm by SMS or WhatsApp within one working day.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Alerts() {
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="alerts" className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-signal text-signal-foreground">
              <BellRing className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold md:text-4xl">
              We ping phones nearby when we're in your area
            </h2>
            <p className="mt-4 text-background/70">
              When a PowerBrick team is active near you, people in that area get
              a pop-up alert on their phones — outage warnings, pop-up demo
              days, and same-day delivery slots. Sign up once, and your phone
              lets you know when we're around.
            </p>
          </div>
          <div className="rounded-2xl border border-background/15 bg-background/5 p-8">
            {done ? (
              <div className="py-6 text-center">
                <Zap className="mx-auto h-10 w-10 text-signal" />
                <p className="mt-4 font-display text-xl font-bold">You're on the list!</p>
                <p className="mt-2 text-sm text-background/70">
                  We'll alert you about outages and when our team is in your area.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (phone.trim()) setDone(true);
                }}
              >
                <label className="text-sm font-semibold">Your cellphone number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 073 123 4567"
                  className="mt-2 w-full rounded-lg border border-background/25 bg-background/10 px-4 py-3 text-background placeholder:text-background/40"
                />
                <button className="mt-4 w-full rounded-lg bg-signal py-3 font-semibold text-signal-foreground transition hover:opacity-90">
                  Send me area alerts
                </button>
                <p className="mt-3 text-center text-xs text-background/50">
                  Free. SMS or WhatsApp. Stop anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground">
        <p className="flex items-center gap-2 font-display font-bold text-foreground">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-ember text-ember-foreground">
            <Flame className="h-3.5 w-3.5" />
          </span>
          PowerBrick
        </p>
        <p>Serving Soweto and Johannesburg North, South, East & West.</p>
        <p>Backup power for every home and every hustle.</p>
      </div>
    </footer>
  );
}
