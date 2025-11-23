import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import WeatherCard from './WeatherCard';
import SuggestionCard from './SuggestionCard';
import HourlyForecast from './HourlyForecast';
import AstronomyCard from './AstronomyCard';
import AlertsCard from './AlertsCard';
import WorldMap from './WorldMap';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
  forecast: any[];
  astronomy: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
  };
  alerts: { headline: string; msgType: string; severity: string; event: string }[];
  coords: [number, number];
}

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState('San Francisco');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTemperatureRange = (temp: number): string => {
    if (temp <= 5) return 'cold';
    if (temp <= 15) return 'cool';
    if (temp <= 20) return 'mild';
    if (temp <= 25) return 'warm';
    return 'hot';
  };

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/weather?location=${encodeURIComponent(city)}`
      );

      if (!response.ok) throw new Error('Location not found. Try a bigger city or correct spelling.');

      const data = await response.json();

      if (!data.location || data.location.lat === undefined || data.location.lon === undefined) {
        throw new Error('Invalid location data from API');
      }

      setWeatherData({
        location: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        description: data.current.condition.text,
        forecast: data.forecast.forecastday || [],
        astronomy: {
          sunrise: data.astronomy.astro.sunrise,
          sunset: data.astronomy.astro.sunset,
          moonrise: data.astronomy.astro.moonrise,
          moonset: data.astronomy.astro.moonset,
        },
        alerts: data.alerts || [],
        coords: [data.location.lat, data.location.lon],
      });
    } catch (err: any) {
      setError(err.message || 'Error fetching weather');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, []);

  const temperatureRange = weatherData ? getTemperatureRange(weatherData.temperature) : 'mild';

  return (
    <div className="relative min-h-screen bg-black text-white font-[LeagueSpartan] overflow-x-hidden">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4"
        >
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
  <img 
    src="/CSWA.webp" 
    alt="Logo" 
    className="w-full h-full object-cover" 
  />
</div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-white">
            Crimson Scriveners Weather and Alert
          </h1>
        </motion.div>
      </header>

      {/* About Section */}
      <section id="about" className="relative z-10 max-w-5xl mx-auto px-6 text-center py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl font-semibold text-gray-300 mb-4"
        >
          Part of the Crimson Scriveners Group
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-white"
        >
          Discover Weather Like Never Before
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-xl text-gray-400 leading-relaxed font-[Khand]"
        >
          Crimson Scriveners Weather delivers accurate and insightful forecasts, interactive global maps, astronomy data, and real-time alerts. Designed with elegance and precision, it empowers users to plan their day confidently while staying connected to the world’s weather.
        </motion.p>
      </section>

      {/* World Map */}
      <section id="map" className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <WorldMap
          countries={[
            {
              name: location,
              coords: weatherData ? weatherData.coords : [37.7749, -122.4194],
              temp: weatherData ? weatherData.temperature : 18,
              condition: weatherData ? weatherData.condition : 'partly cloudy',
            },
          ]}
        />
      </section>

      {/* Location Search Form */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-6 text-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchWeather(location);
          }}
          className="flex items-center justify-center gap-3"
        >
          <MapPin className="h-5 w-5 text-white" />
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-center bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 max-w-xs text-lg rounded-xl"
            placeholder="Enter location"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition"
          >
            Search
          </button>
        </form>
      </section>

      {/* Forecast Section */}
      <section id="forecast" className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-8">
        {loading && <p className="text-center text-gray-300">Loading weather…</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {weatherData && (
          <>
            <WeatherCard weather={weatherData} temperatureRange={temperatureRange} />
            <SuggestionCard
              temperature={weatherData.temperature}
              condition={weatherData.condition}
              temperatureRange={temperatureRange}
            />
            <HourlyForecast
              forecast={weatherData.forecast}
              temperatureRange={temperatureRange}
            />
            <AstronomyCard astronomy={weatherData.astronomy} />
            <AlertsCard alerts={weatherData.alerts} />
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-16 py-8 bg-black">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Crimson Scriveners Weather. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default WeatherApp;
