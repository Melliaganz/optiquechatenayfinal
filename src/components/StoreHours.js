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
      const getNextOpeningTime = () => {
        const weekDay = currentDate.getDay();
        let nextOpeningTime = null;
        let nextOpeningDay = null;
        let i = 1;
    
        while (!nextOpeningTime && i <= joursSemaine.length) {
          const day = (weekDay + i) % joursSemaine.length;
          const hours = horairesMagasin[joursSemaine[day]];
          if (hours.matin.ouverture !== "Fermé" || hours.apresMidi.ouverture !== "Fermé") {
            nextOpeningTime = `${joursSemaine[day]} : ${
              hours.matin.ouverture !== "Fermé"
                ? `de ${hours.matin.ouverture} à ${hours.matin.fermeture}`
                : `de ${hours.apresMidi.ouverture} à ${hours.apresMidi.fermeture}`
            }`;
            nextOpeningDay = day;
          }
          i++;
        }
        if (!nextOpeningTime) {
          return "Le magasin est fermé pour la journée";
        } else {
          return <div>Prochaine ouverture : <br/> {nextOpeningTime} </div>;
        }
      };
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
      return <div>{getNextOpeningTime()}</div>;
    }
  };

  return (
    <div className='blocTextHeures'>
      {isMagasinOuvert()}
    </div>
  )};

  export default StoreHours;