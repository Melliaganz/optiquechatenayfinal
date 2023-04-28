import React from 'react'
import Accueil from "./Accueil"
import Carousel from './Carousel'
import ChoisirOptique from './ChoisirOptique'
import NousTrouver from './NousTrouver'
import Footer from './Footer'
import Gallery from './Gallery'

function Home() {
  return (
    <div>
    <Accueil />
    <Carousel />
    <ChoisirOptique />
    <Gallery />
    <NousTrouver />
    <Footer />
    </div>
  )
}

export default Home