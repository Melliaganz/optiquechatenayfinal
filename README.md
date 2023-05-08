# Optique Chatenay

![Logo Du Magasin](https://firebasestorage.googleapis.com/v0/b/optiquechatenay-44520.appspot.com/o/logo%2Flogoalt.png?alt=media&token=922f1f96-e8f9-480d-b5c3-1b7e141485ce)

Optique Chatenay est un site vitrine pour un opticien. Le site a été créé en utilisant React et a pour but de présenter les différentes vitrines du magasin avec possibilité d'y mettre a jour la liste de photo par le propriétaire du site, de fournir un formulaire de contact, ainsi que les informations de contact et les directions pour trouver le magasin.

## Fonctionnalités

- Affichage des différentes vitrines du magasin
- Possibilité de mettre a jour la liste des photos du site
- Formulaire de contact pour les clients intéressés
- Informations de contact pour le magasin, y compris l'adresse et le numéro de téléphone
- Instructions pour trouver le magasin

## Exigences

- Node.js version 10.0 ou ultérieure
- Une clé d'API Firebase valide

## Installation

1. Clonez le dépôt sur votre machine locale.
2. Exécutez `npm install` pour installer toutes les dépendances nécessaires.

## Comment lancer le projet

1. Configurez votre projet Firebase en suivant les instructions de la section Firebase du README.md.
2. Exécutez `npm start` pour lancer l'application en mode développement.
3. Ouvrez votre navigateur et accédez à http://localhost:3000 pour afficher le site.

## Technologies utilisées

- React
- HTML
- CSS
- Firebase


## Firebase

Firebase est une plate-forme de développement d'applications mobiles et web proposée par Google. Elle fournit des outils pour créer des applications web et mobiles, y compris une base de données en temps réel, une authentification d'utilisateurs, des notifications push, des analyses et bien plus encore. 

Dans le cadre de ce projet, Firebase est utilisé pour stocker les données des formulaires de contact soumis par les utilisateurs, et pour gérer l'authentification des utilisateurs connectés.

### Configuration de Firebase

Avant de pouvoir utiliser Firebase avec ce projet, vous devez créer un projet Firebase, configurer les informations d'identification et les autorisations, et configurer le projet React pour l'utiliser.

1. Créez un projet Firebase en suivant les instructions sur le site Web Firebase: https://console.firebase.google.com/
2. Cliquez sur "Ajouter une application" pour ajouter votre application React
3. Configurez l'authentification de votre application React en accédant à l'onglet "Authentification" dans le menu de gauche, en sélectionnant "Méthode de connexion" et en activant l'authentification par e-mail et mot de passe.
4. Créez une nouvelle base de données Firestore pour votre projet en accédant à l'onglet "Firestore" dans le menu de gauche, en cliquant sur "Créer une base de données" et en sélectionnant "Démarrer en mode test".
5. Activez les autorisations d'écriture pour la base de données Firestore en accédant à l'onglet "Règles" dans le menu de gauche et en remplaçant les règles par les suivantes:
``` Firebase
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```
Ces règles autorisent les utilisateurs connectés à écrire des données dans la collection

6. Créez un fichier .env dans la racine de votre projet avec les informations d'identification de votre projet Firebase. Les informations d'identification peuvent être trouvées dans l'onglet "Paramètres du projet" de votre console Firebase. Le contenu du fichier doit ressembler à ceci :
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_DATABASE_URL=your_database_url
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```
7. Dans le fichier src/firebase.js, vous pouvez modifier la configuration de Firebase pour utiliser votre configuration Firebase. Vous pouvez remplacer le contenu actuel de ce fichier avec le code suivant :
```React.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
```
Vous devriez maintenant être prêt a utiliser Firebase avec votre projet React.

### Contributeurs
- [Lengrand Lucas](https://github.com/Melliaganz)
- [HecateStudio](https://www.malt.fr/profile/valentinebarbier1?q=Valentine+barbier&searchid=645890a1d8ae5555590602a7)

#### Licence
Ce projet est sous licence MIT

