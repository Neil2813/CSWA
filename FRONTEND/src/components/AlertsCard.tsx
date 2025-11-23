import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Alert {
  headline: string;
  msgType: string;
  severity: string;
  event: string;
}

interface AlertsCardProps {
  alerts: Alert[];
}

const AlertsCard: React.FC<AlertsCardProps> = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <Card className="weather-card">
        <CardHeader>
          <CardTitle className="text-2xl text-white">No Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-400">You're safe! No alerts for now.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="weather-card">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Weather Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <AlertCircle className="h-6 w-6 text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold text-white">{alert.headline || alert.event}</h3>
                <p className="text-sm text-gray-300">{alert.msgType} - {alert.severity}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsCard;
