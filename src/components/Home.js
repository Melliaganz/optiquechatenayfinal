import React from 'react'
import Accueil from "./Accueil"
import Carousel from './Carousel'
import ChoisirOptique from './ChoisirOptique'
import NousTrouver from './NousTrouver.tsx'
import GalleriePhotos from './GalleriePhotos'

function Home() {
  return (
    <div>
    <Accueil />
    <Carousel />
    <GalleriePhotos />
    <ChoisirOptique />
    <NousTrouver />
    </div>
  )
}

export default React.memo(Home);