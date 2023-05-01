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
    // Initialiser Firebase Storage
    firebase.initializeApp({
      apiKey: "AIzaSyCPOZGC2k_sxBR5EtTr9g9RBr-70C7vros",
      authDomain: "optiquechatenay-44520.firebaseapp.com",
      databaseURL: "https://optiquechatenay-44520-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "optiquechatenay-44520",
      storageBucket: "optiquechatenay-44520.appspot.com",
      messagingSenderId: "288485416278",
      appId: "1:288485416278:web:d673706364c38c60978af7",
      measurementId: "G-Z75D2GEN9D"
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