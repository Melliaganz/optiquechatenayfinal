import React, { useState, useEffect } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
    Lundi: { matin: { ouverture: "Fermé", fermeture: "Fermé" }, apresMidi: { ouverture: "14:30", fermeture: "19:00" } },
    Mardi: { matin: { ouverture: "10:00", fermeture: "13:00" }, apresMidi: { ouverture: "14:30", fermeture: "19:00" } },
    Mercredi: { matin: { ouverture: "Fermé", fermeture: "Fermé" }, apresMidi: { ouverture: "14:30", fermeture: "19:30" } },
    Jeudi: { matin: { ouverture: "10:00", fermeture: "13:00" }, apresMidi: { ouverture: "14:30", fermeture: "18:30" } },
    Vendredi: { matin: { ouverture: "10:00", fermeture: "13:00" }, apresMidi: { ouverture: "14:30", fermeture: "19:00" } },
    Samedi: { matin: { ouverture: "10:00", fermeture: "13:00" }, apresMidi: { ouverture: "14:30", fermeture: "18:00" } },
    Dimanche: { matin: { ouverture: "Fermé", fermeture: "Fermé" }, apresMidi: { ouverture: "Fermé", fermeture: "Fermé" } }
  };

  const jourActuel = joursSemaine[currentDate.getDay()];
  const horairesOuverture = horairesMagasin[jourActuel];

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

      
      const getNextOpeningHour = () => {
        const { matin, apresMidi } = horairesOuverture;
    
        const heureActuelle = currentDate.getHours();
        // eslint-disable-next-line no-unused-vars
        const minuteActuelle = currentDate.getMinutes();
    
        // Si le magasin est déjà ouvert
        if (heureActuelle >= parseInt(matin.ouverture.split(':')[0]) && heureActuelle < parseInt(apresMidi.fermeture.split(':')[0])) {
          return `Le magasin est ouvert jusqu'à ${apresMidi.fermeture}`;
        }
    
        // Si le magasin ouvre dans la journée actuelle
        if (heureActuelle < parseInt(matin.ouverture.split(':')[0])) {
          return `Le magasin est fermé, il ouvre à ${matin.ouverture}`;
        } else if (heureActuelle < parseInt(apresMidi.ouverture.split(':')[0])) {
          return `Le magasin est fermé, il ouvre à ${apresMidi.ouverture}`;
        }
    
        // Si le magasin est fermé et qu'il n'ouvre pas dans la journée actuelle
        const joursOuverture = Object.keys(horairesMagasin);
        const indexJourActuel = joursOuverture.findIndex(jour => jour === jourActuel);
let i = 1;
while (i < joursOuverture.length) {
  const jourSuivant = joursOuverture[(indexJourActuel + i) % joursOuverture.length];
  const horairesSuivant = horairesMagasin[jourSuivant];
  if (horairesSuivant.matin.ouverture !== "Fermé") {
    return `Le magasin est fermé il ouvre ${jourSuivant} à ${horairesSuivant.matin.ouverture}`;
  } else if (horairesSuivant.apresMidi.ouverture !== "Fermé") {
    return `Le magasin est fermé il ouvre ${jourSuivant} à ${horairesSuivant.apresMidi.ouverture}`;
  }
  i++;
}

// Si le magasin n'a plus de jour d'ouverture dans la semaine
return `Le magasin est fermé pour la semaine`};

    if (magasinOuvertMatin && magasinOuvertApresMidi) {
      return (
        <div>
           Ouvert maintenant !<br/> Horaires : {matin.ouverture} -{" "}
          {matin.fermeture} / {apresMidi.ouverture} - {apresMidi.fermeture}
        </div>
      );
    } else if (magasinOuvertMatin) {
      return (
        <div>
           Ouvert maintenant !<br/> Horaires : {matin.ouverture} -{" "}
          {matin.fermeture}
        </div>
      );
    } else if (magasinOuvertApresMidi) {
      return (
        <div>
         <span> <AccessTimeIcon /> </span> Ouvert maintenant !<br/> Horaires : {apresMidi.ouverture} -{" "}
          {apresMidi.fermeture}
        </div>
      );
    } else {
      return <div>{getNextOpeningHour()}</div>;
    }
  };

  return (
    <div className='blocTextHeures'>
      {isMagasinOuvert()}
    </div>
  )};

  export default StoreHours;