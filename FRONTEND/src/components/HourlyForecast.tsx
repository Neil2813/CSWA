import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

interface HourlyForecastProps {
  forecast: any[];
  temperatureRange: string;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast, temperatureRange }) => {
  const hourlyData = forecast.length > 0 ? forecast[0].hour : [];

  const getWeatherIcon = (condition: string, size = "h-6 w-6") => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className={`${size} text-yellow-500`} />;
      case 'cloudy':
        return <Cloud className={`${size} text-gray-400`} />;
      case 'partly cloudy':
        return <Cloud className={`${size} text-blue-400`} />;
      case 'rainy':
        return <CloudRain className={`${size} text-blue-500`} />;
      case 'windy':
        return <Wind className={`${size} text-gray-600`} />;
      default:
        return <Sun className={`${size} text-yellow-500`} />;
    }
  };

  return (
    <Card className="weather-card">
      <CardHeader>
        <CardTitle className={`text-2xl text-temp-${temperatureRange}`}>
          Hourly Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {hourlyData.map((hour, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-center p-4 bg-muted/30 rounded-lg min-w-[120px] hover:bg-muted/50 transition-colors duration-200"
            >
              <p className="text-sm font-medium mb-2 text-muted-foreground">
                {hour.time.slice(11)}
              </p>
              <div className="flex justify-center mb-2">
                {getWeatherIcon(hour.condition.text)}
              </div>
              <p className={`text-lg font-bold text-temp-${temperatureRange}`}>
                {hour.temp_c}°
              </p>
              <p className="text-xs text-muted-foreground capitalize mt-1">
                {hour.condition.text}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyForecast;
