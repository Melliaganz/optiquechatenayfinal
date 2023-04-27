import React, { useState } from 'react';
import Image from '../img/1977_photo5A9FB77F-OPTIQUE-CHATENAY.JPG';

function Gallery() {
  const [images, setImages] = useState([
    {
      src: 'image1.jpg',
      alt: 'Image 1',
      caption: 'Description de l\'image 1'
    },
    {
      src: 'image2.jpg',
      alt: 'Image 2',
      caption: 'Description de l\'image 2'
    },
    {
      src: 'image3.jpg',
      alt: 'Image 3',
      caption: 'Description de l\'image 3'
    }
  ]);

  return (
    <div className="gallery">
      {images.map(image => (
        <Image src={image.src} alt={image.alt} caption={image.caption} />
      ))}
    </div>
  );
}

export default Gallery;