import express from "express";
import axios from "axios";
import cors from "cors";

const router = express.Router();
router.use(cors()); // Allow cross-origin requests

router.get("/", async (req, res) => {
  const { location, days = 3 } = req.query;
  if (!location) return res.status(400).json({ error: "Location is required" });

  const apiKey = process.env.WEATHER_API_KEY;
  const daysNumber = Number(days);

  try {
    const [currentResp, forecastResp, astronomyResp, alertsResp] = await Promise.all([
      axios.get("http://api.weatherapi.com/v1/current.json", { params: { key: apiKey, q: location, aqi: "yes" } }),
      axios.get("http://api.weatherapi.com/v1/forecast.json", { params: { key: apiKey, q: location, days: daysNumber } }),
      axios.get("http://api.weatherapi.com/v1/astronomy.json", { params: { key: apiKey, q: location } }),
      axios.get("http://api.weatherapi.com/v1/alerts.json", { params: { key: apiKey, q: location } }),
    ]);

    // If location data is missing, return friendly error
    if (!currentResp.data?.location || currentResp.data.location.lat === undefined) {
      return res.status(404).json({ error: "Location not found. Try a bigger city or correct spelling." });
    }

    const data = {
      location: {
        name: currentResp.data.location.name,
        region: currentResp.data.location.region,
        country: currentResp.data.location.country,
        lat: currentResp.data.location.lat,
        lon: currentResp.data.location.lon,
      },
      current: currentResp.data.current,
      forecast: forecastResp.data.forecast,
      astronomy: astronomyResp.data.astronomy,
      alerts: alertsResp.data.alerts?.alert || [],
    };

    res.json(data);
  } catch (error) {
    console.error("Weather API Error:", error.message, error.response?.data);
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || "Could not fetch weather data";
    res.status(status).json({ error: message });
  }
});

export default router;
