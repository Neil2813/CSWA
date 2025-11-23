import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ✅ Fix default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface WorldMapProps {
  countries: {
    name: string;
    coords: [number, number];
    temp: number;
    condition: string;
  }[];
}

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const WorldMap: React.FC<WorldMapProps> = ({ countries }) => {
  const getTempColor = (temp: number) => {
    if (temp <= 15) return '#60A5FA'; // cold - blue
    if (temp <= 25) return '#34D399'; // mild - green
    return '#F59E0B'; // hot - orange
  };

  const selected = countries[0]; // assuming only one location is highlighted

  return (
    <section className="relative w-full my-6">
      <h2 className="text-center text-3xl font-bold mb-4 tracking-wide text-white">
        Global Weather Explorer
      </h2>

      <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-700 z-0">
        <MapContainer
          center={selected.coords}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <ChangeView center={selected.coords} zoom={8} />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='© OpenStreetMap contributors © CARTO'
            subdomains={['a', 'b', 'c', 'd']}
            maxZoom={19}
          />
          <Marker
            position={selected.coords}
            icon={
              L.divIcon({
                className: 'custom-marker',
                html: `<div style="background:${getTempColor(
                  selected.temp
                )};width:16px;height:16px;border-radius:50%;border:2px solid #fff;"></div>`,
                iconSize: [16, 16],
              }) as L.Icon
            }
          >
            <Popup>
              <div className="text-sm font-medium text-white bg-black p-2 rounded">
                <strong>{selected.name}</strong>
                <br />
                {selected.temp}°C – {selected.condition}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default WorldMap;
