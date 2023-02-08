import React, { useState, useEffect } from 'react';

let mapsApiLoaded = false;

const Map = (props) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!mapsApiLoaded) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}`;
      document.body.appendChild(script);

      script.addEventListener('load', () => {
        mapsApiLoaded = true;
        initMap();
      });
    } else {
      initMap();
    }
  }, [props.apiKey]);

  const initMap = () => {
    const googleMap = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: props.latitude, lng: props.longitude },
      zoom: props.zoom
    });
    setMap(googleMap);

    const marker = new window.google.maps.Marker({
      position: { lat: props.latitude, lng: props.longitude },
      map: googleMap
    });
    setMarker(marker);
  };

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
