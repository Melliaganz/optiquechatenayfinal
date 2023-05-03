import React from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Horaires from './Horaires';


function Accueil() {
  return (
    <section className='accueil' id="accueil">
        <div className='accueilContainer'>
            <div className='accueilBackground'>
            </div>
            <div className='accueilBlocText'>
                <div className='titreEtTextetBoutton'>
                <h1 className='titreAccueil'>
                    Voir net<br/>
                    Vivre mieux
                </h1>
                <div className='adressesEtTelBloc'>
                    <div className='adresseEtTel'>
                <span> <PlaceIcon /></span>
                <a className='adresse' href="https://goo.gl/maps/5D3itaxq6TTFxw9z6" target="_blank" rel="noreferrer"> 
                432 Avenue de la Division Leclerc <br/>
                92290 CHATENAY MALABRY </a>
                </div>
                <div className='telephones'>
                <span><LocalPhoneIcon /></span>
                <a className='telephone' href="tel:+33146300359" target="_blank" rel="noreferrer">01 46 30 03 59</a>
                </div>
                </div>
                <div className='paragrapheAccueil'>
                    <p>Venez découvir notre magasin d'optique, où<br/>
                        notre équipe de professionnels vous accueillera<br/>
                        avec le sourire pour vous offrir les meilleurs<br/>
                        conseils et soins pour vos yeux.
                    </p>
                </div>
                <div className='bouttonDecouvrir'>
                <button className='bouttonDecouvrirLien'><a href="#decouvrez">Découvrir notre magasin</a></button>
                </div>
                </div>
            </div>
            <div className='PositionBlocHoraire'>
                <Horaires />
            </div>
        </div>
    </section>
  )
}
export default React.memo(Accueil);