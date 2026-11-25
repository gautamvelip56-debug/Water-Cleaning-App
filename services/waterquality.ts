// services/geo.ts
// Free APIs, no key needed: Nominatim (geocoding) + Open-Meteo (weather)

export type Weather = {
  tempMax: number;
  rainMm: number;
  summary: string;
  safe: boolean;
};

type Coords = { lat: number; lon: number };

// Nominatim: understands full text like "Curtorim, Goa, India"
async function geocodeNominatim(query: string): Promise<Coords | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
        query
      )}`,
      { headers: { "User-Agent": "RiverCleaningApp/1.0" } }
    );
    console.log("Nominatim status:", res.status, "query:", query);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data[0]) return null;
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  } catch (e) {
    console.log("Nominatim error:", e);
    return null;
  }
}

// Open-Meteo geocoding: free, no key, expects a single place name (no commas)
async function geocodeOpenMeteo(name: string): Promise<Coords | null> {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        name
      )}&count=1&country_code=IN&language=en&format=json`
    );
    console.log("Open-Meteo geocode status:", res.status, "name:", name);
    if (!res.ok) return null;
    const data = await res.json();
    const r = data.results?.[0];
    if (!r) return null;
    return { lat: r.latitude, lon: r.longitude };
  } catch (e) {
    console.log("Open-Meteo geocode error:", e);
    return null;
  }
}

// Turn "Curtorim, Goa" into coordinates. Returns null if nothing is found.
// Tries Nominatim first, then each part of the text (town, then district/state).
export async function geocode(place: string): Promise<Coords | null> {
  const cleaned = place.trim();
  if (!cleaned) return null;

  const fromNominatim = await geocodeNominatim(cleaned);
  if (fromNominatim) return fromNominatim;

  const parts = cleaned
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p && p.toLowerCase() !== "india");

  for (const part of parts) {
    const found = await geocodeOpenMeteo(part);
    if (found) return found;
  }

  return null;
}

function describeCode(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 99) return "Thunderstorm";
  return "Unknown";
}

// Forecast for a single date (YYYY-MM-DD). Open-Meteo forecasts up to ~16 days ahead.
export async function getWeather(
  lat: number,
  lon: number,
  date: string
): Promise<Weather> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,precipitation_sum,weathercode` +
    `&timezone=auto&start_date=${date}&end_date=${date}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast not available for this date");

  const data = await res.json();
  const d = data.daily;
  if (!d || !d.time || d.time.length === 0) {
    throw new Error("No forecast data for this date");
  }

  const rainMm = d.precipitation_sum[0] ?? 0;
  const code = d.weathercode[0] ?? 0;

  return {
    tempMax: d.temperature_2m_max[0],
    rainMm,
    summary: describeCode(code),
    // Simple rule: heavy rain or thunderstorm = not a good day for river cleanup
    safe: rainMm < 10 && code < 95,
  };
}