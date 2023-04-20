import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { faGlasses } from '@fortawesome/free-solid-svg-icons'
import { faArrowsToEye } from '@fortawesome/free-solid-svg-icons'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

function ChoisirOptique() {
  return (
    <section className='choisirOptiqueChatenaySection'>
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
                        <li>équipe de professionnels de l'optique pour vous <br/> accompagner dans votre choix</li>
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
                        <li> large gamme de lentilles</li>
                        <li>Plus de 1000 montures de marques pour femme <br/> homme et enfant </li>
                        <li>2ème paire à 1€*</li>
                    </ul>
                </div>
            </div>
            <div className='paragrapheTextChoisir'>
                <div className='paragraphe1'>
                <span className='docteur'><FontAwesomeIcon icon={faArrowsToEye} /></span>
                <h4 className='rose'>Services à la persone</h4>
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
                <h4 className='rose'> Des spécialistes à votre écoute </h4>
                </div>
                <div className='liste'>
                    <ul>
                        <li>équipe de professionnels de l'optique pour vous <br/> accompagner dans votre choix</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </section>
  )
}

export default ChoisirOptique