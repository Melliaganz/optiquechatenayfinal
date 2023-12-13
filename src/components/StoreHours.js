import React, { useEffect, useState } from 'react';

const StoreHours = () => {
  const [storeDetails, setStoreDetails] = useState(null);
  const [nextOpeningDay, setNextOpeningDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoursUnavailable, setHoursUnavailable] = useState(false);

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID;

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
        const response = await fetch(`${proxyUrl}${encodeURIComponent(url)}`);
        const data = await response.json();
        setStoreDetails(data.result);

        // Extract opening periods for further processing
        const openingPeriods = data.result?.opening_hours?.periods;
        if (openingPeriods) {
          const nextOpening = getNextOpeningTime(openingPeriods);
          setNextOpeningDay(nextOpening?.open?.day);
        } else {
          setHoursUnavailable(true);
        }

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching place details:', error);
        setLoading(false); // Set loading to false in case of an error
        setHoursUnavailable(true);
      }
    };

    fetchPlaceDetails();
  }, [apiKey, placeId]);

  const renderStoreStatus = () => {
    if (loading) {
      return <p>Chargement des informations...</p>;
    }

    if (hoursUnavailable) {
      return <p>Les horaires ne sont pas disponibles pour le moment.</p>;
    }

    if (!storeDetails || storeDetails.hasOwnProperty('permanently_closed')) {
      return <p>Informations sur le magasin non disponibles.</p>;
    }

    const isOpenNow = storeDetails.opening_hours && storeDetails.opening_hours.open_now;

    const statusMessage = isOpenNow ? "Le magasin est ouvert actuellement." : "Le magasin est fermé actuellement.";

    if (isOpenNow) {
      const nextClosing = getNextClosingTime(storeDetails.opening_hours.periods);
      const closingTime = formatTime(nextClosing.close);

      return (
        <div className='blocTextHeures'>
          <p>{statusMessage}</p>
          <p>Le magasin est ouvert jusqu'à {closingTime}.</p>
        </div>
      );
    } else {
      return (
        <div className='blocTextHeures'>
          <p>{statusMessage}</p>
          {nextOpeningDay !== null && (
            <p>Le magasin ouvrira le {getDayName(nextOpeningDay)}.</p>
          )}
          {nextOpeningDay !== null && renderNextOpeningHours(storeDetails.opening_hours.periods)}
        </div>
      );
    }
  };

  const getDayName = (dayNumber) => {
    // Suppose that Sunday is day 0
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[dayNumber];
  };

  const renderNextOpeningHours = (periods) => {
    const nextOpening = getNextOpeningTime(periods); // Use the same logic as getNextOpeningTime

    if (nextOpening) {
      const openingTime = formatTime(nextOpening.open);
      const closingTime = formatTime(getNextClosingTime(periods).close); // Use getNextClosingTime to get the closing time
      console.log('nextOpeningRender haha', nextOpening);
      return (
        <p>
          Les prochains horaires d'ouverture sont de {openingTime} à {closingTime}.
        </p>
      );
    }

    return null;
  };

  const getNextClosingTime = (periods) => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours() * 100 + now.getMinutes();

    const nextClosing = periods.find(
      (period) => period.open.day > currentDay || (period.open.day === currentDay && period.close.time > currentHour)
    );

    return nextClosing || periods[0];
  };

  const getNextOpeningTime = (periods) => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours() * 100 + now.getMinutes();

    const nextOpening = periods.find(
      (period) => period.open.day > currentDay || (period.open.day === currentDay && period.open.time > currentHour)
    );

    if (nextOpening) {
      console.log('next Opening lol', nextOpening);
      return nextOpening;
    } else {
      const nextDayOpening = periods.find((period) => period.open.day > currentDay);
      return nextDayOpening || periods[0];
    }
  };

  const formatTime = (dateTime) => {
    const hours = Math.floor(dateTime.time / 100);
    const minutes = dateTime.time % 100;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes}`;
  };

  return (
    <div className='blocTextHeures'>
      <h2>Horaires du d'Optique Chatenay</h2>
      {renderStoreStatus()}
    </div>
  );
};

export default StoreHours;
