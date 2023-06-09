import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { faGlasses } from '@fortawesome/free-solid-svg-icons'
import { faArrowsToEye } from '@fortawesome/free-solid-svg-icons'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

function ChoisirOptique() {
  return (
    <section id="decouvrir" className='choisirOptiqueChatenaySection'>
    <div className='choisirOptiqueContainer'>
        <div className='textChoisirOptique'>
            <div className='titreChoisirOptique'>
                <h2 className='choisirOptiqueh2'>Pourquoi choisir <b>Optique Chatenay ?</b></h2>
            </div>
            <div className='paragrapheTextChoisir'>
                <div className='paragraphe1'>
                <span className='docteur'><FontAwesomeIcon icon={faUserDoctor} /></span>
                <h4 className='rose'> Des spécialistes à votre écoute </h4>
                </div>
                <div className='liste'>
                    <ul>
                        <li>Équipe de professionnels de l'optique pour vous <br/> accompagner dans votre choix</li>
                    </ul>
                </div>
            </div>
            <div className='paragrapheTextChoisir'>
                <div className='paragraphe1'>
                <span className='glasses'><FontAwesomeIcon icon={faGlasses}/></span>
                <h4 className='rose'> Un large choix </h4>
                </div>
                <div className='liste'>
                    <ul>
                        <li>Large gamme de lentilles</li>
                        <li>Plus de 1000 montures de marques pour femme <br/> homme et enfant </li>
                        <li>2ème paire à 1€*</li>
                    </ul>
                </div>
            </div>
            <div className='paragrapheTextChoisir'>
                <div className='paragraphe1'>
                <span className='services'><FontAwesomeIcon icon={faArrowsToEye} /></span>
                <h4 className='rose'>Services à la personne</h4>
                </div>
                <div className='liste'>
                    <ul>
                        <li>Examen de vue*</li>
                        <li>Remise en état et ajustage</li>
                    </ul>
                </div>
            </div>
            <div className='paragrapheTextChoisir'>
                <div className='paragraphe1'>
                <span className='glasses'><FontAwesomeIcon icon={faWallet} /></span>
                <h4 className='rose'> Paiement sur mesure </h4>
                </div>
                <div className='liste'>
                    <ul>
                        <li>Équipe de professionnels de l'optique pour vous <br/> accompagner dans votre choix</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='imagesContainerChoisir'>
            <div className='imagesCadreContainer'>
            <div className='imagesLargeContainer'>
                <img src="https://firebasestorage.googleapis.com/v0/b/optiquechatenay-44520.appspot.com/o/ImagesHorizon%2F2021-10-15.jpg?alt=media&token=d058de1e-770e-44c4-9d4e-7f2ad0e3d62b" alt="photoDuMagasin" className='zoomed' />
            </div>
            <div className='imageNormContainer'>
                <img src="https://firebasestorage.googleapis.com/v0/b/optiquechatenay-44520.appspot.com/o/ImagesHorizon%2F1977_photo5A9FB77F-OPTIQUE-CHATENAY.JPG?alt=media&token=794a816c-c910-4617-9929-fc6b3495d4fa" alt="photoDuMagasin" className='zoomed2' />
            </div>
            </div>
            <div className='rondRoseContainer'>
            <div className='rondRose3'></div>
            </div>
        </div>
    </div>
    <div className="voirConditions">
        <p>Voir conditions en magasin *</p>
    </div>
    </section>
  )
}

export default React.memo(ChoisirOptique);