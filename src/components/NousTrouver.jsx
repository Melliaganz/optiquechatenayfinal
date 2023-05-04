import React, {FormEvent, useState } from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Map from './Map'
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function NousTrouver() {
    const formSparkUrl = `https://submit-form.com/VNw27FMx`;
    const [submitting, setSubmitting] = useState(false);
    const submitForm = async (event: FormEvent) => {
    setSubmitting(true);
  }
  return (
    <section className='contactezNousSection' id="contact">
        <div className='nousTrouverContainer'>
        <div className='titreEtBouttons'>
            <div className='titreNousTrouver'>
                <h2 className='titreNousTrouverh2'>
                    Contactez-nous
                </h2>
            </div>
            <div className='textEtFormulaires'>
                <div className='texte'>
                    <p className='textP'>Nous serions ravis de pouvoir vous aider ! 
                        Remplissez simplement le formulaire de contact ci-dessous pour toutes vos questions ou 
                        pour prendre rendez-vous dans notre magasin d'optique </p>
                </div>
            </div>
            <div className='formulaire'>
                <form 
                className='formulaireContact'
                action={formSparkUrl}
                onSubmit={submitForm}>
                <label>
                    <input placeholder='Nom' type="text"name="nom" required={true} />
                </label>
                <br />
                <label>
                    <input placeholder='Prénom' type="text"name="prénom" required={true} />
                </label>
                <br />
                <label>
                    <input placeholder='Numéro de téléphone' type="tel" name="tel"required={true} />
                </label>
                <br />
                <label>
                    <input placeholder='Email' type="email" name='email' required={true} />
                </label>
                <br />
                <label>
                    <textarea style={{resize: "none"}} spellCheck="true" rows="1" cols="1" placeholder='Que pouvons-nous faire pour vous?' name="message" required={true} />
                </label>
                <br />
                <input type="hidden" name="_redirect" value="http://localhost:3000/"></input>
                <button disabled={submitting} type="submit" className='bouttonRose'>{submitting ? "Envoi... " : "Envoyer "}</button>
                </form>
            </div>
            <div className='infosContact'>
                <div className='telephoneInfos'>
                <div className='interieurInfosContact'>
                <div className='contactTitre'>
                    <h5> Téléphone</h5>
                </div>
                <div className='numéroTel'>
                    <a className='téléphoneRose' href="tel:+33146300359" > +33146300359 </a>
                </div>
                </div>
                <div className='iconeTel'>
                    <span className='logoTel'><LocalPhoneIcon /></span>
                </div>
                </div>
                <div className='telephoneInfos'>
                <div className='interieurInfosContact'>
                <div className='contactTitre'>
                    <h5> Email </h5>
                </div>
                <div className='numéroTel'>
                    <a className='téléphoneRose' href="mailto:optiquechatenay@free.fr" > optiquechatenay@free.fr </a>
                </div>
                </div>
                <div className='iconeTel'>
                    <span className='logoMel'><MailOutlineIcon /></span>
                </div>
            </div>
            </div>
        </div>
        <div className='mapLocation'>
            <Map />
        </div>
        </div>
    </section>
  )
}

export default NousTrouver
