// routes/weather.js
import express from "express";
import axios from "axios";

const router = express.Router();

const WEATHER_API_BASE = "https://api.weatherapi.com/v1";

router.get("/", async (req, res) => {
  const { location, days = 3 } = req.query;

  // 1) Validate input
  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  // 2) Ensure API key is configured
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    console.error("Missing WEATHER_API_KEY in environment");
    return res
      .status(500)
      .json({ error: "Server misconfigured: WEATHER_API_KEY is not set" });
  }

  // 3) Clamp days to sane range (WeatherAPI free tier == up to 3 days)
  let forecastDays = Number(days) || 3;
  if (forecastDays < 1) forecastDays = 1;
  if (forecastDays > 3) forecastDays = 3;

  try {
    const baseParams = { key: apiKey, q: location };

    const [currentResp, forecastResp, astronomyResp, alertsResp] =
      await Promise.all([
        axios.get(`${WEATHER_API_BASE}/current.json`, {
          params: { ...baseParams, aqi: "yes" },
        }),
        axios.get(`${WEATHER_API_BASE}/forecast.json`, {
          params: { ...baseParams, days: forecastDays },
        }),
        axios.get(`${WEATHER_API_BASE}/astronomy.json`, {
          params: baseParams,
        }),
        axios.get(`${WEATHER_API_BASE}/alerts.json`, {
          params: baseParams,
        }),
      ]);

    const loc = currentResp.data?.location;

    // If location data is missing / invalid
    if (!loc || loc.lat === undefined || loc.lon === undefined) {
      return res.status(404).json({
        error: "Location not found. Try a bigger city or check spelling.",
      });
    }

    const payload = {
      location: {
        name: loc.name,
        region: loc.region,
        country: loc.country,
        lat: loc.lat,
        lon: loc.lon,
        tz_id: loc.tz_id,
        localtime: loc.localtime,
      },
      current: currentResp.data.current,
      forecast: forecastResp.data.forecast,
      astronomy: astronomyResp.data.astronomy,
      alerts: alertsResp.data.alerts?.alert || [],
    };

    return res.json(payload);
  } catch (error) {
    console.error("Weather API Error:", error.message);

    if (error.response) {
      console.error("Weather API response data:", error.response.data);
      const status = error.response.status || 500;
      const message =
        error.response.data?.error?.message ||
        "Could not fetch weather data from provider";
      return res.status(status).json({ error: message });
    }

    return res
      .status(500)
      .json({ error: "Unexpected server error while fetching weather data" });
  }
});

export default router;
