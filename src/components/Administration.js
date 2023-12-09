import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Visibility from '@mui/icons-material/Visibility';

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
  const imagesPerPage = 4; // Choisir le nombre d'images par page selon tes préférences

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

      // Trier les images par date d'upload (du plus récent au plus ancien)
      const sortedImages = imagesWithMetadata.sort((a, b) =>
        b.metadata.timeCreated - a.metadata.timeCreated
      );

      setUploadedImages(sortedImages.map((image) => image.url));
    } catch (error) {
      console.error('Erreur lors de la récupération des images :', error);
    }
  };

  useEffect(() => {
    fetchUploadedImages();
  }, []);

  const handleImageClick = (imageUrl) => {
    const shouldDelete = window.confirm("Voulez-vous vraiment supprimer cette image ?");

    if (shouldDelete) {
      const storage = firebase.storage();
      const imageRef = storage.refFromURL(imageUrl);

      imageRef
        .delete()
        .then(() => {
          fetchUploadedImages();
          setSelectedImage(null);
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de l\'image :', error);
        });
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setVisibilityButtonActive(!isVisibilityButtonActive);
  };

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

  const cancelFileUpload = () => {
    setSelectedFiles(null);
    setUploadProgress(0);
    setImagePreview(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

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

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = uploadedImages.slice(indexOfFirstImage, indexOfLastImage);

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
          {currentImages.length > 0 && (
            <div className="uploaded-images-container">
              <h3>Images déjà téléchargées :</h3>
              <div className="uploaded-images">
                {currentImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`uploaded-image ${selectedImage === imageUrl ? 'selected' : ''}`}
                    onClick={() => handleImageClick(imageUrl)}
                  >
                    <img src={imageUrl} alt={`${index + 1}`} />
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
