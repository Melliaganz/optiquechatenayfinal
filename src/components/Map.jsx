import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '900px',
};

const center = {
  lat: 48.76853,
  lng: 2.25204,
};

const position = {
  lat: 48.76853,
  lng: 2.25204,
};
const address = '432 Av. de la Division Leclerc, 92290 Châtenay-Malabry';


function Map(props) {
  const [map, setMap] = useState();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDahh31TOdHtTAhVYXoUe0yIOX5zGQwNU0',
  });
  const [showInfo, setShowInfo] = React.useState(true);

  const handleToggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="mapContainer">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onUnmount={onUnmount}
      >
        <Marker position={position} clickable={true} onClick={handleToggleInfo} />
        {showInfo && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              padding: "10px",
              background: "#fff",
              boxShadow: "0 0 10px rgba(0,0,0,.3)",
              zIndex: "50",
            }}
          >
            {address}
          </div>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default Map;