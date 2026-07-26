// Opening-hours helpers. A single per-day `WeekHours` map drives three things:
// the displayed hours, the schema.org JSON-LD, and the live "Open now" badge.
// Each day's value is free text: one or more "9:00–17:00" ranges separated by
// commas, or "Closed"/"" for a closed day. En-dash or hyphen both work.

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type WeekHours = Record<DayKey, string>;

export const DAYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const LABELS: Record<DayKey, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};
const SCHEMA_DAYS: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export type Range = { open: number; close: number }; // minutes from midnight

/** Parse a day's value into time ranges. Empty / "closed" → no ranges. */
export function parseRanges(value: string | undefined): Range[] {
  if (!value) return [];
  const v = value.trim();
  if (v === "" || v.toLowerCase() === "closed") return [];
  return v
    .split(",")
    .map((part) => {
      const m = part.replace(/[–—]/g, "-").match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
      if (!m) return null;
      const open = Number(m[1]) * 60 + Number(m[2]);
      const close = Number(m[3]) * 60 + Number(m[4]);
      return { open, close };
    })
    .filter((r): r is Range => r !== null);
}

const pad = (n: number) => String(n).padStart(2, "0");
const hhmm = (mins: number) => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;

/** Display value for a day: its raw text, or "Closed". */
function dayText(value: string | undefined): string {
  const v = (value ?? "").trim();
  return v === "" || v.toLowerCase() === "closed" ? "Closed" : v;
}

/** Group consecutive days that share the same text into labelled lines,
 *  e.g. [{ label: "Mon–Fri", value: "9:00–17:00" }, { label: "Sat–Sun", value: "Closed" }]. */
export function hoursLines(hours: WeekHours): { label: string; value: string }[] {
  const lines: { label: string; value: string }[] = [];
  let start = 0;
  for (let i = 1; i <= DAYS.length; i++) {
    const same = i < DAYS.length && dayText(hours[DAYS[i]]) === dayText(hours[DAYS[start]]);
    if (!same) {
      const label =
        start === i - 1 ? LABELS[DAYS[start]] : `${LABELS[DAYS[start]]}–${LABELS[DAYS[i - 1]]}`;
      lines.push({ label, value: dayText(hours[DAYS[start]]) });
      start = i;
    }
  }
  return lines;
}

/** A compact one-line summary of the open days only (for footers/heroes). */
export function hoursShort(hours: WeekHours): string {
  return hoursLines(hours)
    .filter((l) => l.value !== "Closed")
    .map((l) => `${l.label} ${l.value}`)
    .join("; ");
}

/** schema.org OpeningHoursSpecification[] — one entry per (day-group, range). */
export function openingHoursSpec(hours: WeekHours) {
  // Group days by identical parsed ranges (serialized as a key).
  const groups = new Map<string, { days: DayKey[]; ranges: Range[] }>();
  for (const day of DAYS) {
    const ranges = parseRanges(hours[day]);
    if (ranges.length === 0) continue;
    const key = ranges.map((r) => `${r.open}-${r.close}`).join(",");
    const g = groups.get(key) ?? { days: [], ranges };
    g.days.push(day);
    groups.set(key, g);
  }
  const specs: { "@type": string; dayOfWeek: string[]; opens: string; closes: string }[] = [];
  for (const { days, ranges } of groups.values()) {
    for (const r of ranges) {
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days.map((d) => SCHEMA_DAYS[d]),
        opens: hhmm(r.open),
        closes: hhmm(r.close),
      });
    }
  }
  return specs;
}
