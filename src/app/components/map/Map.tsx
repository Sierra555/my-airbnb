'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./DynamicMap'), { ssr: false });

type MapProps = {
  center?: number[];
};

const Map = ({ center }: MapProps) => {

  return (
    <div className="relative">
      <DynamicMap center={center} />
    </div>
  );
};

export default Map;