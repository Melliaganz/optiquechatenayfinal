import React, { useState, useRef, useEffect } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StoreHours from './StoreHours';

function Horaires(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (popupRef.current) {
        setIsPopupOpen(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  function togglePopup() {
    setIsPopupOpen(!isPopupOpen);
  }
  return (
    <div className='blocHoraires'>
                    <div className='blocHorairesTexte'>
                        <StoreHours />
                        <button onClick={togglePopup} className='bouttonHoraires'>
                            Voir les horaires
                        </button>
                        {isPopupOpen && (
                          <div 
                          ref={popupRef}
                          className='tableauHoraires'
                          style={{ 
                            position: "fixed", 
                            width: "400px", height: "300px", padding: "40px" }}>
                          <h2>Horaires d'Optique Chatenay</h2>
                          <ul>
                            <li>Lundi : Fermé / 14:30-19h</li>
                            <li>Mardi : 10:00-13:00 / 14:30-19:00</li>
                            <li>Mercredi : Fermé / 14:30-19:30</li>
                            <li>Jeudi : 10:00-13:00 / 14:30-19:00</li>
                            <li>Vendredi : 10:00-13:00 / 14:30-19:00</li>
                            <li>Samedi : 10:00-13:00 / 14:30-18:00</li>
                            <li>Dimanche : fermé</li>
                          </ul>
                          <button className='bouttonMenuHoraires' onClick={togglePopup}>Fermer</button>
                        </div>
                        )}
                    </div>
                </div>
  )
}

export default Horaires