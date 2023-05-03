import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const Administration = () => {
    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handlePasswordSubmit = (event) => {
      event.preventDefault();
      // Vérifier si le mot de passe est correct
      const correctPassword = '1234';
      if (password === correctPassword) {
        setIsAuthorized(true);
      } else {
        alert('Mot de passe incorrect');
      }
      // Réinitialiser le champ de saisie
      setPassword('');
    };
  
    const handleFileSelect = (event) => {
      setSelectedFiles(event.target.files);
    };
  
    const handleFileUpload = () => {
      // Initialiser Firebase Storage
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
  
      // Uploader les fichiers sélectionnés vers Firebase Storage
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
            Retour</a>
        </div>
      {!isAuthorized ? (
        <div className="blockMotDePasseContainer">
          <form onSubmit={handlePasswordSubmit}>
            <label htmlFor="password-input" id="labelMdp">Entrez le mot de passe:</label>
            <input
              type="password"
              id="password-input"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">Valider</button>
          </form>
        </div>
      ) : (
        <div className="blockMotDePasseContainer">
          <label htmlFor="file-input">&nbsp;</label>
          <input type="file" id="file-input" multiple onChange={handleFileSelect} />
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