import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const storageRef = firebase.storage().ref('images');
    storageRef
      .listAll()
      .then(async (res) => {
        const imagePromises = res.items.map(async (itemRef) => {
          try {
            const url = await itemRef.getDownloadURL();
            const metadata = await itemRef.getMetadata();
            console.log('Metadata:', metadata); // Log the complete metadata for debugging
        
            return {
              url,
              alt: metadata.name,
              description: metadata.customMetadata?.description || '',
              uploadDate: metadata.timeCreated,
            };
          } catch (error) {
            console.error(error);
            setError(error);
          }
        });

        const resolvedImages = await Promise.all(imagePromises);
        const sortedImages = resolvedImages.reverse();

        setImages(sortedImages);
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

  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedImage(null); 
  };

  const handleImageClick = (index) => {
    setSelectedImage(currentImages[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className='galleriePhotoContainer'>
      <div className='titreGalleriePhotosPage'>
      <h1>Gallerie de Photos</h1>
      </div>
      <div className='image-grid' id="grilleImages">
        {currentImages.map((image, index) => (
          <div key={index} className='image-container'>
            <img
              src={image.url}
              alt={image.alt}
              className='image'
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? 'selected-page' : 'page'}
          >
            {page}
          </button>
        ))}
      </div>
      {selectedImage && (
        <div className='modal' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <img src={selectedImage.url} alt={selectedImage.alt} className='modal-image' />
            {selectedImage.description ?
            <p className='title'>{selectedImage.description}</p> :
            null
}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
