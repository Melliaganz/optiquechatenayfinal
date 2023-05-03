import React from 'react'

function GalleriePhotos() {
  return (
    <section id="decouvrez" className='sectionGalleriePhotos'>
        <div className="gallerieDimageInterieur">
        <div className='imagesGalleriesContainer'>
        <div className='imagesHorizontalContainer'>
        <a href="/gallerie" alt="Galleries"><img src="https://firebasestorage.googleapis.com/v0/b/optiquechatenay-44520.appspot.com/o/ImagesHorizon%2FIMG-20221116-WA0001.jpg?alt=media&token=559ac80c-7394-421e-8847-f73b7ccd8b05" alt="magasin"></img></a>
        <a href="/gallerie" alt="Galleries"><img src="https://firebasestorage.googleapis.com/v0/b/optiquechatenay-44520.appspot.com/o/ImagesHorizon%2F2021-10-15.jpg?alt=media&token=d058de1e-770e-44c4-9d4e-7f2ad0e3d62b" alt="magasin"></img></a>
        </div>
        <div className='imagesVerticales'>
        <a href="/gallerie" alt="Galleries"><img src="https://firebasestorage.googleapis.com/v0/b/optiquechatenay-44520.appspot.com/o/ImagesVertical%2F5bd0d265-3e52-41ce-919f-ee2b72194ea9.jpg?alt=media&token=86067f1c-0115-4331-b392-0e477b379760" alt="magasin" /></a>
        </div>
        </div>
        <div className='titreGalleriePhotos'>
            <h4>Cliquez sur une image et découvrez notre galerie photo</h4>
        </div>
        </div>
    </section>
  )
}

export default GalleriePhotos