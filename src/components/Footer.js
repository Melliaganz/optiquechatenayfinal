import React from 'react'
import  LogoOptique  from "../img/logo.webp"; 
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <section className='footerSection'>
        <footer className='footerPage'>
            <div className='headerFooter'>
              <div className='imageHeaderFooter'>
                <a href="/#accueil" alt="accueil">
                <img src={LogoOptique} alt="optiqueChatenayLogo"></img>
                </a>
                </div>
                <div className='headerFooterH5'>
                <h5>Optique Chatenay</h5>
                </div>
                <div className='logoReseaux'>
                  <div className='facebook'>
                <span>
                  <a href="https://www.facebook.com/optiquechatenay" alt="facebook optique chatenay" title="Facebook">
                    <FacebookIcon />
                    </a>
                    </span>
                </div>
                <div className='instagram'>
                <span>
                  <a href="http://www.instagram.com" alt="instagram" style={{display: "none"}}><InstagramIcon /></a></span>
                </div>
              </div>
            </div>
            <div className='footerListe'>
              <ul>
                <li className='elementListe2'><a href="/#accueil" alt="haut de page">Haut de page</a></li>
                <li className='elementListe1'><a href="/mentions-legales" alt="Mention"> Mentions légales</a></li>
                <li className='elementListe5'><a href="/administration" alt="administration">Administration</a></li>
                <li className='elementListe4'><a href="/#contact" alt="contact">Contact</a></li>
              </ul>
            </div>
            <div className='footerDescription'>
              <p>Optique Chatenay est votre opticien de référence à Chatenay Malabry.
                Notre équipe de professionnels de la santé visuelle est à votre disposition pour vous aider a trouver les meilleures solutions pour votre vue. Venez nous rendre visite en
                magasin pour découvrir nos produits de qualité supérieure et bénéficier de nos services personalisés.
              </p>
            </div>
            <div className='copyrightFooter'>
             <p> Powered by <a className='lienLengrandLucas' href="https://www.lengrandlucas.com/" alt="lengrandlucas.com"> Lengrand Lucas</a> & <a className='lienHécateStudio' href="https://www.malt.fr/profile/valentinebarbier1" alt="HécateStudio">HecateStudio</a> &copy; 2023 </p>
            </div>
        </footer>
    </section>
  )
}

export default React.memo(Footer)