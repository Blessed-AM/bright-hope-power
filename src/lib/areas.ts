export type OutageStatus = "outage" | "loadshedding" | "unstable" | "stable";

export interface Area {
  id: string;
  name: string;
  region: string;
  status: OutageStatus;
  households: number;
  avgMonthlyIncome: string;
  energyPovertyPct: number;
  smallBusinesses: number;
  lastUpdated: string;
}

export const STATUS_LABEL: Record<OutageStatus, string> = {
  outage: "Power out now",
  loadshedding: "Loadshedding active",
  unstable: "Frequent cuts",
  stable: "Power stable",
};

export const AREAS: Area[] = [
  { id: "orlando", name: "Orlando", region: "Soweto", status: "outage", households: 31200, avgMonthlyIncome: "R3,200", energyPovertyPct: 68, smallBusinesses: 1450, lastUpdated: "12 min ago" },
  { id: "dobsonville", name: "Dobsonville", region: "Soweto", status: "loadshedding", households: 18900, avgMonthlyIncome: "R3,800", energyPovertyPct: 61, smallBusinesses: 980, lastUpdated: "25 min ago" },
  { id: "diepkloof", name: "Diepkloof", region: "Soweto", status: "unstable", households: 26400, avgMonthlyIncome: "R4,100", energyPovertyPct: 55, smallBusinesses: 1320, lastUpdated: "8 min ago" },
  { id: "pimville", name: "Pimville", region: "Soweto", status: "stable", households: 22100, avgMonthlyIncome: "R3,600", energyPovertyPct: 58, smallBusinesses: 1050, lastUpdated: "40 min ago" },
  { id: "alexandra", name: "Alexandra", region: "Johannesburg North", status: "outage", households: 45800, avgMonthlyIncome: "R2,900", energyPovertyPct: 74, smallBusinesses: 2900, lastUpdated: "5 min ago" },
  { id: "cosmo-city", name: "Cosmo City", region: "Johannesburg North", status: "unstable", households: 19800, avgMonthlyIncome: "R4,500", energyPovertyPct: 49, smallBusinesses: 860, lastUpdated: "18 min ago" },
  { id: "diepsloot", name: "Diepsloot", region: "Johannesburg North", status: "loadshedding", households: 52400, avgMonthlyIncome: "R2,600", energyPovertyPct: 79, smallBusinesses: 3100, lastUpdated: "11 min ago" },
  { id: "rosettenville", name: "Rosettenville", region: "Johannesburg South", status: "unstable", households: 12300, avgMonthlyIncome: "R3,400", energyPovertyPct: 57, smallBusinesses: 940, lastUpdated: "33 min ago" },
  { id: "el dorado-park", name: "Eldorado Park", region: "Johannesburg South", status: "stable", households: 16700, avgMonthlyIncome: "R4,000", energyPovertyPct: 46, smallBusinesses: 720, lastUpdated: "52 min ago" },
  { id: "kempton-park", name: "Kempton Park", region: "Johannesburg East", status: "loadshedding", households: 28900, avgMonthlyIncome: "R5,200", energyPovertyPct: 38, smallBusinesses: 1750, lastUpdated: "21 min ago" },
  { id: "tembisa", name: "Tembisa", region: "Johannesburg East", status: "outage", households: 61200, avgMonthlyIncome: "R3,100", energyPovertyPct: 71, smallBusinesses: 3400, lastUpdated: "3 min ago" },
  { id: "roodepoort", name: "Roodepoort", region: "Johannesburg West", status: "unstable", households: 24500, avgMonthlyIncome: "R4,800", energyPovertyPct: 41, smallBusinesses: 1500, lastUpdated: "27 min ago" },
  { id: "krugersdorp", name: "Krugersdorp", region: "Johannesburg West", status: "stable", households: 21100, avgMonthlyIncome: "R5,000", energyPovertyPct: 36, smallBusinesses: 1280, lastUpdated: "47 min ago" },
];

export const REGIONS = ["All regions", "Soweto", "Johannesburg North", "Johannesburg South", "Johannesburg East", "Johannesburg West"];

export const LOAD_OPTIONS = [
  { id: "lights", label: "Lights (4 LED bulbs)", watts: 24 },
  { id: "wifi", label: "Wifi router", watts: 15 },
  { id: "laptop", label: "Laptop", watts: 65 },
  { id: "phones", label: "Phones (x3 charging)", watts: 30 },
  { id: "tv", label: "Small TV / decoder", watts: 80 },
  { id: "fridge", label: "Bar fridge (small business)", watts: 120 },
  { id: "till", label: "Till / card machine", watts: 40 },
] as const;

export interface QuoteTier {
  name: string;
  model: string;
  price: number;
  deposit: number;
  monthly: number;
  hours: number;
  maxWatts: number;
  bestFor: string;
}

export const TIERS: QuoteTier[] = [
  { name: "Brick One", model: "Thermal 1kWh", price: 3499, deposit: 499, monthly: 250, hours: 8, maxWatts: 120, bestFor: "Rooms, backrooms and shacks — lights, wifi and phones" },
  { name: "Brick Two", model: "Thermal 2.4kWh", price: 6499, deposit: 899, monthly: 429, hours: 10, maxWatts: 240, bestFor: "Small homes and flats — lights, wifi, laptops and TV" },
  { name: "Brick Pro", model: "Thermal 5kWh", price: 11999, deposit: 1499, monthly: 749, hours: 12, maxWatts: 480, bestFor: "Spaza shops, salons and small businesses" },
];

export function pickTier(totalWatts: number, hoursNeeded: number): QuoteTier {
  const wh = totalWatts * hoursNeeded;
  const [one, two, three] = TIERS as [QuoteTier, QuoteTier, QuoteTier];
  if (totalWatts <= one.maxWatts && wh <= 960) return one;
  if (totalWatts <= two.maxWatts && wh <= 2400) return two;
  return three;
}

export const zar = (n: number) =>
  "R" + n.toLocaleString("en-ZA", { maximumFractionDigits: 0 });
