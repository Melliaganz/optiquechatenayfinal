import React, {FormEvent, useState } from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
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
                    <textarea  spellCheck="true" placeholder='Que pouvons-nous faire pour vous?' name="message" required={true} />
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
        <iframe title='googleMaps' className="mapContainer" color='transparent' style={{backgroundColor: 'transparent', border:'none'}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629.703701226676!2d2.2520138000000003!3d48.768454399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e679f2137ceefd%3A0x160af71676c25dad!2sOptique%20Chatenay!5e0!3m2!1sfr!2sfr!4v1702055062277!5m2!1sfr!2sfr" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        </div>
    </section>
  )
}

export default NousTrouver
