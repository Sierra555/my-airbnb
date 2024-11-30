'use client';

import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useMemo } from 'react';

type DynamicMapProps = {
  center?: number[];
};

//@ts-ignore
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const DynamicMap = ({ center }: DynamicMapProps) => {
  const mapCenter = useMemo(() => center || [51, -0.09], [center]);

  return (
    <div className="h-[35vh] rounded-lg overflow-hidden">
      <MapContainer
        center={mapCenter as Leaflet.LatLngExpression}
        zoom={center ? 4 : 2}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {center && (
          <Marker position={mapCenter as Leaflet.LatLngExpression} />
        )}
      </MapContainer>
    </div>
  );
};

export default DynamicMap;
