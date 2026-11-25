import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { geocode, getWeather, Weather } from "../../../../services/waterquality";

// Format a Date as YYYY-MM-DD using the device's local time
const toDateString = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const addDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toDateString(d);
};

const QUICK_DATES = [
  { label: "Today", offset: 0 },
  { label: "Tomorrow", offset: 1 },
  { label: "+3 days", offset: 3 },
  { label: "+7 days", offset: 7 },
];

export default function WeatherScreen() {
  const [place, setPlace] = useState("Curtolim, Goa");
  const [date, setDate] = useState(addDays(0));

  const [weather, setWeather] = useState<Weather | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!place.trim()) {
      setError("Please enter a location.");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setError("Date must be in YYYY-MM-DD format.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setCoords(null);

      const found = await geocode(`${place.trim()}, India`);
      if (!found) {
        setError("Location not found. Try a nearby town name.");
        return;
      }
      setCoords(found);

      const result = await getWeather(found.lat, found.lon, date);
      setWeather(result);
    } catch (err: any) {
      setError(
        err?.message ||
          "Could not load the forecast. Only the next ~16 days are supported."
      );
      console.log("Weather error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Text style={styles.title}>Cleanup Weather</Text>
        <Text style={styles.subtitle}>
          Check the forecast before organizing a river cleanup.
        </Text>

        {/* SEARCH CARD */}
        <View style={styles.card}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={place}
            onChangeText={setPlace}
            placeholder="Example: Curtolim, Goa"
            placeholderTextColor="#94A3B8"
          />

          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#94A3B8"
          />

          <View style={styles.chipRow}>
            {QUICK_DATES.map((q) => {
              const value = addDays(q.offset);
              return (
                <TouchableOpacity
                  key={q.label}
                  style={[styles.chip, date === value && styles.chipActive]}
                  onPress={() => setDate(value)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      date === value && styles.chipTextActive,
                    ]}
                  >
                    {q.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleSearch}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Check Forecast</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <ActivityIndicator size="large" color="#146C43" style={{ margin: 25 }} />
        )}

        {error !== "" && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* RESULT */}
        {weather && (
          <View style={[styles.resultCard, !weather.safe && styles.resultWarn]}>
            <Text style={styles.resultSummary}>{weather.summary}</Text>
            <Text style={styles.resultDate}>{date}</Text>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{weather.tempMax}°C</Text>
                <Text style={styles.statLabel}>High</Text>
              </View>

              <View style={styles.stat}>
                <Text style={styles.statValue}>{weather.rainMm} mm</Text>
                <Text style={styles.statLabel}>Rain</Text>
              </View>
            </View>

            <Text style={[styles.verdict, !weather.safe && styles.verdictWarn]}>
              {weather.safe
                ? "Good conditions for a cleanup"
                : "Heavy rain or storms expected. Consider another date."}
            </Text>
          </View>
        )}

        {coords && (
          <Text style={styles.coords}>
            Coordinates: {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
          </Text>
        )}

        <Text style={styles.footer}>
          Sources: OpenStreetMap Nominatim, Open-Meteo
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8F5",
    padding: 16,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#146C43",
    marginTop: 35,
  },
  subtitle: {
    color: "#666",
    marginTop: 6,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },
  label: {
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D5DDD7",
    borderRadius: 9,
    padding: 13,
    fontSize: 14,
    color: "#222",
    backgroundColor: "#FAFCFA",
    marginBottom: 15,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#B9C9BE",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  chipActive: {
    backgroundColor: "#146C43",
    borderColor: "#146C43",
  },
  chipText: {
    color: "#444",
    fontSize: 13,
  },
  chipTextActive: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#146C43",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  errorCard: {
    backgroundColor: "#FEE2E2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  errorText: {
    color: "#B91C1C",
  },
  resultCard: {
    backgroundColor: "#E8F5EC",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  resultWarn: {
    backgroundColor: "#FEF3C7",
  },
  resultSummary: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#146C43",
  },
  resultDate: {
    color: "#666",
    marginTop: 4,
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: "row",
    gap: 30,
    marginBottom: 18,
  },
  stat: {
    alignItems: "flex-start",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  verdict: {
    fontWeight: "bold",
    color: "#146C43",
  },
  verdictWarn: {
    color: "#92400E",
  },
  coords: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 12,
    marginTop: 5,
  },
  footer: {
    textAlign: "center",
    color: "#64748B",
    marginVertical: 20,
    fontSize: 12,
  },
});