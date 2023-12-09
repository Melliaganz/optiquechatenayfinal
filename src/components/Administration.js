import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Visibility from '@mui/icons-material/Visibility';

const Administration = () => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisibilityButtonActive, setVisibilityButtonActive] = useState(false);


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
    setSelectedFiles(event.target.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    setSelectedFiles(fileList);
  };

  const handleFileUpload = () => {
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
            // Upload terminé
            setUploadProgress(0);
            setSelectedFiles(null);
            window.location.reload();
          }
        );
      });
    }
  };

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
          <h5>Glissez une image ou des images pour les uploader</h5>
          <label htmlFor="file-input">&nbsp;</label>
          <input
            type="file"
            id="file-input"
            multiple
            onChange={handleFileSelect}
          />
          {selectedFiles && (
            <div>
              <progress value={uploadProgress} max="100" />
              <button type="button" onClick={handleFileUpload}>
                Upload
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(Administration);
