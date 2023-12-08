import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ apiKey }) => {
  const center = {
    lat: 48.8566,
    lng: 2.3522,
  };

  const position = {
    lat: 48.8566,
    lng: 2.3522,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '400px',
        }}
        center={center}
        zoom={13}
      >
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
