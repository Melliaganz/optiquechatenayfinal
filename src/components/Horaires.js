import React, { useState, useEffect } from 'react';
import StoreHours from './StoreHours';

const Horaires = () => {
  const [apiStoreHours, setApiStoreHours] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID; 

  const getDayName = (dayIndex) => {
    const daysTranslations = [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ];
    return daysTranslations[dayIndex] || '';
  };

  const formatTime = (time) => {
    if (time === null || time === undefined) {
      return 'N/A';
    }
    return `${time.slice(0, 2)}:${time.slice(2)}`;
  };

  useEffect(() => {
    const fetchApiStoreHours = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
        const response = await fetch(`${proxyUrl}${encodeURIComponent(url)}`);
        const data = await response.json();

        if (response.ok) {
          const openingHours = data.result?.opening_hours;
          setApiStoreHours(openingHours?.periods || []);
        } else {
          console.error('Erreur lors de la récupération des détails du lieu :', data.error_message || 'Erreur inconnue');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du lieu :', error.message);
      }
    };

    fetchApiStoreHours();
  }, [apiKey, placeId]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const formatDayHours = (periods) => {
    if (!periods) {
      return 'N/A';
    }

    const formattedPeriods = periods.reduce((acc, period) => {
      const dayName = getDayName(period.open.day);
      const formattedStartHour = formatTime(period.open.time);
      const formattedEndHour = formatTime(period.close.time);

      const formattedPeriod = `${dayName}: ${formattedStartHour} - ${formattedEndHour}`;
      const index = acc.findIndex((item) => item.startsWith(dayName));
      if (index !== -1) {
        const existingDay = acc[index];
        const combinedPeriod = `${existingDay.slice(existingDay.indexOf(':') + 2)} / ${formattedPeriod.slice(formattedPeriod.indexOf(':') + 2)}`;
        acc[index] = `${dayName}: ${combinedPeriod}`;
      } else {
        acc.push(formattedPeriod);
      }

      return acc;
    }, []);

    return formattedPeriods.join('\n');
  };

  return (
    <div className='blocHoraires'>
      <div className='blocHorairesTexte'>
        <div className='encadréOuvertFermé'>
          <StoreHours storeHours={apiStoreHours} />
        </div>
        <button onClick={togglePopup} className='bouttonHoraires'>
          Voir les horaires
        </button>
        {isPopupOpen && (
          <div className='tableauHoraires'>
            <div className='textHorairesPopup'>
              <h2>Horaires du magasin</h2>
              <pre>{formatDayHours(apiStoreHours)}</pre>
            </div>
            <button className='bouttonMenuHoraires' onClick={togglePopup}>
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Horaires;
