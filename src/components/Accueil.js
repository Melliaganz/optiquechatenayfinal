import React from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import background from "../img/pretty-young-woman-in-sunglasses-smiling-2021-08-26-19-58-23-utc.jpg"

function Accueil() {
  return (
    <section className='accueil'>
        <div className='accueilContainer'>
            <div className='accueilBackground'>
                <img src={background} alt="pretty-young-woman-in-sunglasses-smiling-2021-08-26-19-58-23-utc.jpg" />
            </div>
            <div className='blocText'>
            <div className='accueilBlocText'>
                <h1 className='titreAccueil'>
                    Voir net<br/>
                    Vivre mieux
                </h1>
                <div className='adresses'>
                    <div className='adresse'>
                <span> <PlaceIcon /></span>
                <a className='adresseEtTel' href="https://goo.gl/maps/5D3itaxq6TTFxw9z6" target="_blank" rel="noreferrer"> 432 Avenue de la Division Leclerct <br/>
                02290 CHATENAY MALABRY </a>
                </div>
                <div className='telephones'>
                <span><LocalPhoneIcon /></span>
                <a className='telephone' href="tel:+33146300359" target="_blank" rel="noreferrer">01 46 30 03 59</a>
                </div>
                </div>
                <div className='paragrapheAccueil'>
                    <p>Venez découvir notre magasin d'optique, où
                        notre équipe de professionnels vous accueillera
                        avec le sourire pour vous offrir les meilleurs conseils et soins pour vos yeux.
                    </p>
                </div>

                <button>Découvrir notre magasin</button>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Accueil