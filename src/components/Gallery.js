import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

require('dotenv').config();

const Gallery = () => {
  const [images, setImages] = useState([]);


  useEffect(() => {
    console.log(process.env)
    // Initialiser Firebase Storage
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID
    });
    const storage = firebase.storage();

    // Récupérer toutes les images à partir de Firebase Storage
    const storageRef = storage.ref('images');
    storageRef.listAll()
      .then((res) => {
        const images = [];
        const thumbnails = [];
        res.items.forEach((itemRef) => {
          // Récupérer l'URL de téléchargement de chaque image
          itemRef.getDownloadURL()
            .then((url) => {
              images.push({ original: url });
              thumbnails.push({ original: url, thumbnail: url }); 
            })
            .catch((error) => {
              console.error(error);
            });
        });
        // Mettre à jour le state avec les URLs des images
        setImages(images);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='gallerieImageContainer'>
    <div className='gallerieImage'>
      <ImageGallery
        items={images} 
        showPlayButton={false} 
        showFullscreenButton={false}
        showBullets={false} 
      />
      </div>
    </div>
  );
};

export default Gallery;