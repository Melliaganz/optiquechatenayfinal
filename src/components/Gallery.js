import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color:'#ED5EAF'  }}>
    <i className="fa fa-spinner fa-spin fa-3x"></i>
  </div>
);

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'YOUR_API_KEY',
      authDomain: 'YOUR_AUTH_DOMAIN',
      projectId: 'YOUR_PROJECT_ID',
      storageBucket: 'YOUR_STORAGE_BUCKET',
      messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
      appId: 'YOUR_APP_ID',
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedImage(null);
  };

  const handlePrevImage = () => {
    const currentIndex = images.findIndex((img) => img === selectedImage);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setSelectedImage(images[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = images.findIndex((img) => img === selectedImage);
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(images[nextIndex]);
  };

  const handleImageClick = (index) => {
    setSelectedImage(images[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div className='galleriePhotoContainer'> <div className='image-grid'><Spinner /> </div></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalPages = Math.ceil(images.length / 12);
  const startIndex = (currentPage - 1) * 12;
  const endIndex = startIndex + 12;
  const currentImages = images.slice(startIndex, endIndex);

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
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
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
            {selectedImage.description ? (
              <p className='title'>{selectedImage.description}</p>
            ) : null}
            <button className='modal-nav-button' onClick={handlePrevImage}>&lt;</button>
            <button className='modal-nav-button' onClick={handleNextImage}>&gt;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
