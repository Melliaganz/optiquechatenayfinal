import React from 'react'
import Accueil from "./Accueil"
import Carousel from './Carousel'
import ChoisirOptique from './ChoisirOptique'
import NousTrouver from './NousTrouver'
import Gallery from './Gallery'

function Home() {
  return (
    <div>
    <Accueil />
    <Carousel />
    <ChoisirOptique />
    <Gallery />
    <NousTrouver />
    </div>
  )
}

export default Home