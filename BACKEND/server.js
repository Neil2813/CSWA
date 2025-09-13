import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weather.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Mount weather route
app.use("/api/weather", weatherRoutes);

// Health check
app.get("/", (_, res) => res.json({ status: "Backend running ✅" }));

app.listen(PORT, () => {
  console.log(`🌍 Server running at http://localhost:${PORT}`);
});
