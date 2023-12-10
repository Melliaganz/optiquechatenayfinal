import React, { useState, useEffect } from 'react';

const StoreHours = () => {
  const [storeHours, setStoreHours] = useState([]);
  const [loading, setLoading] = useState(true);
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
          const periods = data.result?.opening_hours?.periods || [];
          setStoreHours(periods);
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
      // Nettoyer les effets, annuler des requêtes en cours, etc.
    };
  }, [apiKey, placeId]);

  const formatTime = (time) => {
    if (time === null || time === undefined) {
      return 'N/A';
    }

    return `${time.slice(0, 2)}:${time.slice(2)}`;
  };

  const getNextOpeningDay = () => {
    const today = new Date().getDay();
    const nextOpeningDayIndex = storeHours.findIndex(period => period.open?.day === (today + 1) % 7);
    return nextOpeningDayIndex !== -1 ? getDayName((today + 1) % 7) : null;
  };

  const getDayName = (dayIndex) => {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return daysOfWeek[dayIndex];
  };

  const getNextOpeningHours = () => {
    const openingHours = storeHours.find(period => period.open?.day === (new Date().getDay() + 1) % 7);

    if (openingHours) {
      const { open, close } = openingHours;
      return `${formatTime(open?.time)} à ${formatTime(close?.time)}`;
    }

    return 'N/A';
  };

  const getNextClosingHours = () => {
    const closingHours = storeHours.find(period => period.close?.day === (new Date().getDay() + 1) % 7);

    if (closingHours) {
      const { close } = closingHours;
      return `${formatTime(close?.time)}`;
    }

    return 'N/A';
  };

  const isStoreOpen = () => {
    const today = new Date().getDay();
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const todayOpeningHours = storeHours.find(period => period.open?.day === today);

    return todayOpeningHours
      ? currentHour * 60 + currentMinute >= parseInt(todayOpeningHours.open?.time)
        && currentHour * 60 + currentMinute <= parseInt(todayOpeningHours.close?.time)
      : false;
  };

  return (
    <div>
      <h2>Horaires du magasin</h2>
      {loading ? (
        <p>Chargement des horaires...</p>
      ) : storeHours.length === 0 ? (
        <p>Horaires non disponibles</p>
      ) : (
        <div>
          {isStoreOpen() ? (
            <div>
              <p>Le magasin est ouvert aujourd'hui.</p>
              <p>Il ferme à {getNextClosingHours()}</p>
            </div>
          ) : (
            <div>
              <p>Actuellement, le magasin est fermé.</p>
              <p>
                Prochaine ouverture :&nbsp;
                {getNextOpeningDay() !== null ? `${getNextOpeningDay()} de ${getNextOpeningHours()}` : 'N/A'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoreHours;
