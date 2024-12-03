'use client';

import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo } from 'react';

type DynamicMapProps = {
  center?: number[];
};

//@ts-ignore
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconUrl: '/images/leaflet/marker-icon.png',
  iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
  shadowUrl: '/images/leaflet/marker-shadow.png',
});

const MapUpdater = ({ center }: { center: number[] }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center as Leaflet.LatLngExpression, 4);
    }
  }, [center, map]);

  return null;
};

const DynamicMap = ({ center }: DynamicMapProps) => {
  const mapCenter = useMemo(() => center || [51, -0.09], [center]);

  return (
    <div className="h-[35vh] rounded-lg overflow-hidden">
      <MapContainer
        center={mapCenter as Leaflet.LatLngExpression}
        zoom={2}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {center && (
          <>
            <MapUpdater center={mapCenter as number[]} />
            <Marker position={mapCenter as Leaflet.LatLngExpression} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default DynamicMap;
