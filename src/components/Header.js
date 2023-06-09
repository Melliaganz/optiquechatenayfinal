import React from 'react'
import logoalt from "../img/logoalt.webp";

function Header() {
  return (
    <header className='header'>
    <a className='logo' href="/#accueil" alt="logo.png" >
        <img src={logoalt} alt="logo OptiqueChatenay" title="Accueil"></img>
    </a>
    </header>
  )
}

export default React.memo(Header)