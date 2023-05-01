import React from 'react'
import Gallery from './Gallery'
import { ArrowBackIos } from '@mui/icons-material'

function GalleriedePhotos() {
  return (
    <div>
    <div className='bouttonRetour3'>
            <a href="/" alt="retour">
            <span > <ArrowBackIos /></span>
            Retour</a>
        </div>
    <Gallery />
    </div>
  )
}

export default GalleriedePhotos