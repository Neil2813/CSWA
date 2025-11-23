// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weather.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Optional: lock this to your frontend URL in prod
// e.g. FRONTEND_ORIGIN="https://your-frontend.vercel.app"
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  })
);

app.use(express.json());

// Weather API routes
app.use("/api/weather", weatherRoutes);

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "Backend running ✅", timestamp: new Date().toISOString() });
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler (so app doesn't crash on thrown errors)
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🌍 Server running at http://localhost:${PORT}`);
});
