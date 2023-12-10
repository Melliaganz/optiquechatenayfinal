import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Visibility from '@mui/icons-material/Visibility';

// Composant Spinner
const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#ED5EAF' }}>
    <i className="fa fa-spinner fa-spin fa-3x"></i>
  </div>
);

// Initialisation de Firebase
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const Administration = () => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisibilityButtonActive, setVisibilityButtonActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingImages, setLoadingImages] = useState(true); // Nouvel état pour le chargement des images

  const imagesPerPage = 4; 

  // Fonction pour récupérer les images depuis Firebase Storage
  const fetchUploadedImages = async () => {
    const storage = firebase.storage();
    const storageRef = storage.ref('images');

    try {
      const imageList = await storageRef.listAll();
      const imagesWithMetadata = await Promise.all(
        imageList.items.map(async (item) => {
          const url = await item.getDownloadURL();
          const metadata = await item.getMetadata();
          return { url, metadata };
        })
      );

      const sortedImages = imagesWithMetadata.slice().reverse();
      setUploadedImages(sortedImages);
      setLoadingImages(false); 
    } catch (error) {
      console.error('Erreur lors de la récupération des images :', error);
    }
  };


  useEffect(() => {
    fetchUploadedImages();
  }, []);


  const handleImageClick = async (action, imageUrl) => {
    if (action === 'Supprimer') {
      const shouldDelete = window.confirm("Voulez-vous vraiment supprimer cette image ?");
  
      if (shouldDelete) {
        const storage = firebase.storage();
        const imageRef = storage.refFromURL(imageUrl);
  
        try {
          await imageRef.delete();
          fetchUploadedImages();
          setSelectedImage(null);
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'image :', error);
        }
      }
    } else if (action === 'Modifier') {
      const selectedImageMetadata = uploadedImages.find((image) => image.url === imageUrl);
      const description = prompt('Entrez une nouvelle description pour l\'image :', selectedImageMetadata.metadata.description || '');
      
      if (description !== null) {
        try {
          await firebase.storage().refFromURL(imageUrl).updateMetadata({
            customMetadata: {
              description: description,
            },
          });
          fetchUploadedImages();

          console.log('Nouvelle description :', description);
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la description de l\'image :', error);
        }
      }
    }
  };


  // Fonction pour gérer le changement de mot de passe
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Fonction pour gérer la soumission du mot de passe
  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    const correctPassword = process.env.REACT_APP_PASSWORD;
    if (password === correctPassword) {
      setIsAuthorized(true);
    } else {
      alert('Mot de passe incorrect');
    }
    setPassword('');
  };

  // Fonction pour basculer la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setVisibilityButtonActive(!isVisibilityButtonActive);
  };

  // Fonction pour gérer la sélection de fichiers
  const handleFileSelect = (event) => {
    const fileList = event.target.files;
    setSelectedFiles(fileList);

    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(fileList[0]);
    } else {
      setImagePreview(null);
    }
  };

  // Fonction pour annuler le téléchargement de fichiers
  const cancelFileUpload = () => {
    setSelectedFiles(null);
    setUploadProgress(0);
    setImagePreview(null);
  };

  // Fonction pour gérer le survol pendant le glisser-déposer
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Fonction pour gérer le lâcher de fichiers pendant le glisser-déposer
  const handleDrop = (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    setSelectedFiles(fileList);

    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(fileList[0]);
    } else {
      setImagePreview(null);
    }
  };

  // Fonction pour télécharger les fichiers sélectionnés
  const handleFileUpload = () => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imagesRef = storageRef.child('images');
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        const imageRef = imagesRef.child(file.name);
        const uploadTask = imageRef.put(file);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploadProgress(progress);
          },
          (error) => {
            console.error(error);
          },
          () => {
            setUploadProgress(0);
            setSelectedFiles(null);
            setImagePreview(null);
            fetchUploadedImages();
          }
        );
      });
    }
  };

  // Calculer les index des premières et dernières images de la page actuelle
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = uploadedImages.slice(indexOfFirstImage, indexOfLastImage);

  // Créer une liste de numéros de page pour la pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(uploadedImages.length / imagesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="adminBlock">
      <div className='bouttonRetour2'>
        <a href="/" alt="retour">
          <span > <ArrowBackIosIcon /></span>
          Retour
        </a>
      </div>
      {!isAuthorized ? (
        <div className="blockMotDePasseContainer">
          <form onSubmit={handlePasswordSubmit} className="motDePasseForm">
            <label htmlFor="password-input" id="labelMdp">
              Entrez le mot de passe :
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password-input"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              id="bouttonVisibilite"
              className={isVisibilityButtonActive ? 'activeButton' : ''}
              onClick={togglePasswordVisibility}
            >
              <Visibility />
            </button>
            <button type="submit" className="bouttonValider">
              Valider
            </button>
          </form>
        </div>
      ) : (
        <div
          className="blockMotDePasseContainer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {loadingImages ? (
            <Spinner />
          ) : (
            <div className="containeruploadFichier">
              <h5>Glissez une image ou des images pour les uploader</h5>
              <label htmlFor="file-input">&nbsp;</label>
              <input
                type="file"
                id="file-input"
                multiple
                onChange={handleFileSelect}
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
              {selectedFiles && (
                <div>
                  <progress value={uploadProgress} max="100" />
                  <button type="button" onClick={handleFileUpload}>
                    Upload
                  </button>
                  <button type="button" onClick={cancelFileUpload}>
                    Annuler
                  </button>
                </div>
              )}
            </div>
          )}
         {currentImages.length > 0 && (
  <div className="uploaded-images-container">
    <h3>Images déjà téléchargées :</h3>
    <div className="uploaded-images">
    {currentImages.map((image, index) => (
  <div
    key={index}
    className={`uploaded-image ${selectedImage === image.url ? 'selected' : ''}`}
  >
    <img src={image.url} alt={`${index + 1}`} />
    <div className="image-info">
      {image.metadata && image.metadata.customMetadata && image.metadata.customMetadata.description && (
        <div className="image-description">
          <p>{image.metadata.customMetadata.description}</p>
        </div>
      )}
      <div className="image-buttons">
        <button onClick={() => handleImageClick('Modifier', image.url)}>
          Modifier
        </button>
        <button onClick={() => handleImageClick('Supprimer', image.url)}>
          Supprimer
        </button>
      </div>
    </div>
  </div>
))}
    </div>
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
    </div>
  </div>
)}
        </div>
      )}
    </div>
  );
};

export default React.memo(Administration);
