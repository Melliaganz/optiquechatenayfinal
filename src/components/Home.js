import React from 'react'
import Accueil from "./Accueil"
import Carousel from './Carousel'
import ChoisirOptique from './ChoisirOptique'
import NousTrouver from './NousTrouver'

function Home() {
  return (
    <div>
    <Accueil />
    <Carousel />
    <ChoisirOptique />
    <NousTrouver />
    </div>
  )
}

export default Home