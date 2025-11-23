import React from 'react';
import { Droplet, Wind, Thermometer, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
}

interface WeatherCardProps {
  weather: WeatherData;
  temperatureRange: string; // "cold", "cool", "mild", "warm", "hot"
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, temperatureRange }) => {
  return (
    <Card className="relative overflow-hidden bg-black border border-white/20 rounded-2xl shadow-lg">
      <CardContent className="p-8 text-white font-[LeagueSpartan]">
        {/* Location + Description */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6 text-white" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
              {weather.location}
            </h2>
          </div>
          <p className="text-lg md:text-xl italic mt-2 md:mt-0 text-gray-300">
            {weather.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Temperature */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center"
          >
            <Thermometer className="h-10 w-10 text-white mb-2 animate-pulse" />
            <p className="text-sm uppercase text-gray-400 tracking-wider">
              Temperature
            </p>
            <p className="text-3xl font-bold">{weather.temperature}°C</p>
          </motion.div>

          {/* Humidity */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center"
          >
            <Droplet className="h-10 w-10 text-white mb-2 animate-pulse" />
            <p className="text-sm uppercase text-gray-400 tracking-wider">
              Humidity
            </p>
            <p className="text-3xl font-bold">{weather.humidity}%</p>
          </motion.div>

          {/* Wind */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center"
          >
            <Wind className="h-10 w-10 text-white mb-2 animate-bounce" />
            <p className="text-sm uppercase text-gray-400 tracking-wider">
              Wind
            </p>
            <p className="text-3xl font-bold">{weather.windSpeed} km/h</p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
