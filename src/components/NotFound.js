import React from 'react'
import HandymanIcon from '@mui/icons-material/Handyman';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function NotFound() {
  return (
    <section className='pageNotFoundSection'>
        <div className='bouttonRetour'>
            <a href="/" alt="retour">
            <span > <ArrowBackIosIcon /></span>
            Retour</a>
        </div>
        <div className='pageNotFoundContainer'>
            <div className='erreur404'>
                <span className='settingIcon'><HandymanIcon /></span>
                <h1>
                404: Page Not Found
                </h1>
                <p>Il semble que la page à laquel vous essayez d'accéder n'existe plus/pas.</p>
                <div className='lienRetour'>
                <a href="/" alt="retour">Retour à l'accueil</a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default NotFound