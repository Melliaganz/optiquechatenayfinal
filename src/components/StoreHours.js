import React, { useState, useEffect } from 'react';

const StoreHours = () => {
  const [storeHours, setStoreHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID;

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
        const response = await fetch(`${proxyUrl}${encodeURIComponent(url)}`);
        const data = await response.json();

        if (response.ok) {
          const openingHours = data.result?.opening_hours;
          setStoreHours(openingHours?.periods || []);
          setIsOpenNow(openingHours?.open_now || false);
          setLoading(false);
        } else {
          console.error('Error fetching place details:', data.error_message || 'Unknown error');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching place details:', error.message);
        setLoading(false);
      }
    };

    fetchPlaceDetails();

    return () => {
    };
  }, [apiKey, placeId]);

  const formatTime = (time) => {
    if (time === null || time === undefined) {
      return 'N/A';
    }

    return `${time.slice(0, 2)}:${time.slice(2)}`;
  };

  const getNextClosingHours = () => {
    const closingHours = storeHours.find(period => period.close?.day === (new Date().getDay() + 1) % 7);
    if (closingHours) {
      const { close } = closingHours;
      return `${formatTime(close?.time)}`;
    }

    return 'N/A';
  };

  const getNextOpeningDayAndHours = () => {
    const nextOpeningDayIndex = storeHours.findIndex(period => period.open?.day > new Date().getDay());
    if (nextOpeningDayIndex !== -1) {
      const nextOpeningHours = storeHours[nextOpeningDayIndex].open;
      return `${getDayName(nextOpeningHours?.day)} à ${formatTime(nextOpeningHours?.time)}`;
    }

    return 'N/A';
  };

  const getDayName = (dayIndex) => {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return daysOfWeek[dayIndex];
  };

  return (
    <div>
      <h2>Horaires du magasin</h2>
      {loading ? (
        <p>Chargement des horaires...</p>
      ) : isOpenNow ? (
        <div>
          <p>Le magasin est ouvert aujourd'hui.</p>
          <p>Il ferme à {getNextClosingHours()}</p>
        </div>
      ) : (
        <div>
          <p>Actuellement, le magasin est fermé.</p>
          <p>
            Prochaine ouverture :&nbsp;
            {getNextOpeningDayAndHours()}
          </p>
        </div>
      )}
    </div>
  );
};

export default StoreHours;
