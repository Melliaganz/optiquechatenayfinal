import React, { useState, useEffect } from 'react';

const StoreHours = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const joursSemaine = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const horairesMagasin = {
    Lundi: { matin: { ouverture: "09:00", fermeture: "12:00" }, apresMidi: { ouverture: "14:00", fermeture: "18:00" } },
    Mardi: { matin: { ouverture: "09:00", fermeture: "12:00" }, apresMidi: { ouverture: "14:00", fermeture: "18:00" } },
    Mercredi: { matin: { ouverture: "09:00", fermeture: "12:00" }, apresMidi: { ouverture: "14:00", fermeture: "18:00" } },
    Jeudi: { matin: { ouverture: "09:00", fermeture: "12:00" }, apresMidi: { ouverture: "14:00", fermeture: "18:00" } },
    Vendredi: { matin: { ouverture: "09:00", fermeture: "12:00" }, apresMidi: { ouverture: "14:00", fermeture: "18:00" } },
    Samedi: { matin: { ouverture: "10:00", fermeture: "12:30" }, apresMidi: { ouverture: "14:00", fermeture: "17:00" } },
    Dimanche: { matin: { ouverture: "Fermé", fermeture: "Fermé" }, apresMidi: { ouverture: "Fermé", fermeture: "Fermé" } }
  };

  const jourActuel = joursSemaine[currentDate.getDay()];
  const horairesOuverture = horairesMagasin[jourActuel];

  const heureActuelle = currentDate.getHours();
  const minuteActuelle = currentDate.getMinutes();
  const secondeActuelle = currentDate.getSeconds();

  const formatDate = (date) => {
    return date < 10 ? `0${date}` : date;
  };

  const formatTime = (heure, minute) => {
    return `${formatDate(heure)}:${formatDate(minute)}`;
  };

  const isMagasinOuvert = () => {
    const { matin, apresMidi } = horairesOuverture;
    const heureOuvertureMatin = parseInt(matin.ouverture.split(":")[0]);
    const minuteOuvertureMatin = parseInt(matin.ouverture.split(":")[1]);
    const heureFermetureMatin = parseInt(matin.fermeture.split(":")[0]);
    const minuteFermetureMatin = parseInt(matin.fermeture.split(":")[1]);
    const heureOuvertureApresMidi = parseInt(apresMidi.ouverture.split(":")[0]);
    const minuteOuvertureApresMidi = parseInt(apresMidi.ouverture.split(":")[1]);
    const heureFermetureApresMidi = parseInt(apresMidi.fermeture.split(":")[0]);
    const minuteFermetureApresMidi = parseInt(apresMidi.fermeture.split(":")[1]);

    const heureActuelle = currentDate.getHours();
    const minuteActuelle = currentDate.getMinutes();

    const heureActuelleMinutes = heureActuelle * 60 + minuteActuelle;
    const heureOuvertureMatinMinutes =
      heureOuvertureMatin * 60 + minuteOuvertureMatin;
    const heureFermetureMatinMinutes =
      heureFermetureMatin * 60 + minuteFermetureMatin;
    const heureOuvertureApresMidiMinutes =
      heureOuvertureApresMidi * 60 + minuteOuvertureApresMidi;
    const heureFermetureApresMidiMinutes =
      heureFermetureApresMidi * 60 + minuteFermetureApresMidi;

    const magasinOuvertMatin =
      heureActuelleMinutes >= heureOuvertureMatinMinutes &&
      heureActuelleMinutes <= heureFermetureMatinMinutes;
    const magasinOuvertApresMidi =
      heureActuelleMinutes >= heureOuvertureApresMidiMinutes &&
      heureActuelleMinutes <= heureFermetureApresMidiMinutes;

    if (magasinOuvertMatin && magasinOuvertApresMidi) {
      return (
        <div>
          Le magasin est actuellement ouvert ! Horaires : {matin.ouverture} -{" "}
          {matin.fermeture} / {apresMidi.ouverture} - {apresMidi.fermeture}
        </div>
      );
    } else if (magasinOuvertMatin) {
      return (
        <div>
          Le magasin est ouvert ce matin ! Horaires : {matin.ouverture} -{" "}
          {matin.fermeture}
        </div>
      );
    } else if (magasinOuvertApresMidi) {
      return (
        <div>
          Le magasin est ouvert cet après-midi ! Horaires : {apresMidi.ouverture} -{" "}
          {apresMidi.fermeture}
        </div>
      );
    } else {
      return <div>Le magasin est actuellement fermé.</div>;
    }
  };

  return (
    <div className='blocTextHeures'>
      <div>Nous sommes le {joursSemaine[currentDate.getDay()]}</div>
      {isMagasinOuvert()}
    </div>
  )};

  export default StoreHours;