# Voicetral

## Description

Voicetral est une application mobile développée avec React Native et Expo qui permet d'interagir vocalement avec l'API Mistral. L'application utilise la reconnaissance vocale pour convertir la parole en texte, envoie ce texte à l'API Mistral, et utilise la synthèse vocale pour lire la réponse générée.

## Fonctionnalités

- Reconnaissance vocale pour capturer la parole de l'utilisateur
- Intégration avec l'API Mistral pour générer des réponses intelligentes
- Synthèse vocale pour lire les réponses générées
- Support prioritaire pour les voix françaises
- Interface utilisateur intuitive avec indicateurs d'état (écoute, chargement, lecture)

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Expo CLI
- Compte Mistral AI pour obtenir une clé API

## Installation

1. Clonez ce dépôt :

```bash
git clone https://github.com/jcommaret/voicetral.git
cd voicetral
```

2. Installez les dépendances :

```bash
npm install
# ou
yarn install
```

3. Configuration des variables d'environnement :
   - Créez ou modifiez le fichier `.env` à la racine du projet
   - Ajoutez vos variables d'environnement selon le modèle suivant :
   ```
   MISTRAL_API_KEY=votre_clé_api_mistral
   MISTRAL_MODEL=mistral-small-latest
   ```

## Démarrage

Pour lancer l'application en mode développement :

```bash
npm start
# ou
yarn start
```

Ensuite, vous pouvez exécuter l'application sur :

- iOS : `npm run ios` ou `yarn ios`
- Android : `npm run android` ou `yarn android`

## Structure du projet

```
voicetral/
├── .expo/                # Configuration Expo
├── assets/               # Ressources statiques (images, polices, etc.)
├── ios/                  # Configuration native iOS
├── node_modules/         # Dépendances
├── src/                  # Code source
│   ├── components/       # Composants React
│   │   ├── ResponseDisplay/ # Affichage des réponses
│   │   └── VoiceInput/      # Entrée vocale
│   ├── services/         # Services (API, polyfills)
│   ├── styles/           # Styles de l'application
│   └── App.tsx           # Composant principal
├── .env                  # Variables d'environnement
├── app.json              # Configuration de l'application
└── package.json          # Dépendances et scripts
```

## Technologies utilisées

- React Native
- Expo
- Expo Speech Recognition
- Expo Speech (synthèse vocale)
- API Mistral AI
- TypeScript

## Licence

Voir le fichier [LICENCE.MD](./LICENCE.MD) pour plus d'informations.
