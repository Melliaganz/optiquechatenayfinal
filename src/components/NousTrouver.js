import React from 'react'
import Map from './Map'

function NousTrouver() {
  return (
    <section className='nousTrouver'>
        <div className='nousTrouverContainer'>
        <div className='titreEtBouttons'>
            <div className='titreNousTrouver'>
                <h2 className='titreNousTrouverh2'>
                    Nous Trouver
                </h2>
            </div>
            <div className='bouttonNousTrouver'>
                <a className='buttonNousTrouver' 
                href="https://goo.gl/maps/5D3itaxq6TTFxw9z6" 
                alt="Ouvrir sur Google Maps" 
                title="Ouvrir sur Google Maps" target="_blank" rel="noreferrer">
                    <button className='bouttonRose'>Ouvrir sur Google Maps</button>
                </a>
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
