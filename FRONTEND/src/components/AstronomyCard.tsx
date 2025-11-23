import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AstronomyCardProps {
  astronomy: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
  };
}

const AstronomyCard: React.FC<AstronomyCardProps> = ({ astronomy }) => {
  return (
    <Card className="weather-card">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Astronomy Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Sun className="mx-auto h-8 w-8 text-yellow-400" />
            <p className="mt-2 text-sm text-gray-300">Sunrise</p>
            <p className="font-bold">{astronomy.sunrise}</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Sun className="mx-auto h-8 w-8 text-orange-400" />
            <p className="mt-2 text-sm text-gray-300">Sunset</p>
            <p className="font-bold">{astronomy.sunset}</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Moon className="mx-auto h-8 w-8 text-blue-400" />
            <p className="mt-2 text-sm text-gray-300">Moonrise</p>
            <p className="font-bold">{astronomy.moonrise}</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <Moon className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-300">Moonset</p>
            <p className="font-bold">{astronomy.moonset}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AstronomyCard;
