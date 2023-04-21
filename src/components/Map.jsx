import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '490px',
    height: '250px',
};
const center = {
    lat: 48.76853,
    lng: 2.25204
};
const position = { lat:48.76853, lng: 2.25204}


function Map(props){

    // eslint-disable-next-line no-unused-vars
    const [map, setMap] = React.useState()
    const onLoad = React.useCallback(function callback(map){
        setMap()
    }, [])
    const { isLoaded } = useJsApiLoader({
        id:'google-map-script',
        googleMapsApiKey:"AIzaSyDahh31TOdHtTAhVYXoUe0yIOX5zGQwNU0"
    })
    const onUnmount = React.useCallback(function callback(map) {
        setMap()
      }, [])
    return  isLoaded? (
        <div className='mapContainer'>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center ={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        >
            <Marker 
            position={position}
            clickable= {true}
            />        
        </GoogleMap>
        </div>
        
    ) : <></>
}

export default Map