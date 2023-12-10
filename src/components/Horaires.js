import React, { useState, useRef, useEffect } from 'react'
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
                      <div className='encadréOuvertFermé'>
                        <StoreHours/>
                        </div>
                        <button onClick={togglePopup} className='bouttonHoraires'>
                            Voir les horaires
                        </button>
                        {isPopupOpen && (
                          <div 
                          ref={popupRef}
                          className='tableauHoraires'
                          style={{ 
                            position: "fixed", 
                            width: "300px", height: "400px", padding: "40px" }}>
                              <div className='textHorairesPopup'>
                          <h2>Horaires d'Optique Chatenay</h2>
                          <ul>
                            <li>Lundi : Fermé / 14:30-19:00</li>
                            <li>Mardi : 09:30-13:00 / 14:30-19:00</li>
                            <li>Mercredi : 09:30-13:00 / 14:30-19:0</li>
                            <li>Jeudi : 09:30-13:00 / 14:30-19:00</li>
                            <li>Vendredi : 09:30-13:00 / 14:30-19:00</li>
                            <li>Samedi : 09:30-13:00 / 14:30-18:00</li>
                            <li>Dimanche : Fermé</li>
                          </ul>
                          </div>
                          <button className='bouttonMenuHoraires' onClick={togglePopup}>Fermer</button>
                        </div>
                        )}
                    </div>
                </div>
  )
}

export default Horaires