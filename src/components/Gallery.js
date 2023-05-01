import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log(process.env)
    // Initialiser Firebase Storage
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: "optiquechatenay-44520.appspot.com",
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    });
    const storageRef = firebase.storage().ref('images');
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
              setImages(thumbnails);
            })
            .catch((error) => {
              console.error(error);
              setError(error);
            });
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ImageGallery items={images} />
  );
}

export default Gallery;