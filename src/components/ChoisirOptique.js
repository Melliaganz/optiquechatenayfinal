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
                        <li>Une équipe de professionels de l'optique<br/>
                        pour vous accompagner dans votre choix.
                        <br/>Nous choisissons avec vous l'équipement
                        <br/> qui vous convient en conformité avec
                        <br/> vos besoins esthétiques, optiques et <br/>
                        dans le respect de votre budget </li>
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
                        <li>Lentilles journalières et "freshlook colors" en stock magasin</li>
                        <li>Plus de 1200 montures de marques pour femme <br/> homme et enfant et la deuxième paire à 1€* </li>
                        <li>OFFRE 100% SANTE: 300 modèles <br/> Femmes Hommes et enfants pris en charge à 100%</li>
                    </ul>
                </div>
            </div>
            <div className='paragrapheTextChoisir'>
                <div className='paragraphe1'>
                <span className='services'><FontAwesomeIcon icon={faArrowsToEye} /></span>
                <h4 className='rose'>Nos services</h4>
                </div>
                <div className='liste'>
                    <ul>
                        <li>Examen de vue*</li>
                        <li>Remise en état et nettoyage</li>
                        <li>Ajustage de vos lunettes</li>
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
                        <li>Nous vous proposons un paiement <br/> en 3 ou 4 fois sans frais en carte bancaire <br/> avec notre patenaire ONEY*</li>
                        <li>Un paiement en plusieurs chèques est également possible*</li>
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