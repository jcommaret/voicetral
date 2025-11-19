# Voicetral

Une application vocale interactive utilisant React Native et l'API Mistral pour une expérience conversationnelle entièrement basée sur la voix.

## 🌟 Fonctionnalités

- Interface entièrement vocale
- Reconnaissance vocale en français
- Synthèse vocale pour les réponses
- Intégration avec l'API Mistral
- Design minimaliste et intuitif

## 🛠 Technologies Utilisées

- React Native
- Expo
- TypeScript
- API Mistral
- React Native Voice
- Expo Speech

## 🚀 Installation

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/voicetral.git
cd voicetral
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
- Créez un fichier `.env` à la racine du projet
- Ajoutez votre clé API Mistral :
```
MISTRAL_MODEL=nom_de_modele
MISTRAL_API_KEY=votre_clé_api
```

4. Lancez l'application :
```bash
npm start
```

## 📱 Utilisation

1. Appuyez sur le bouton microphone pour commencer à parler
2. Posez votre question en français
3. Attendez la réponse vocale de l'assistant
4. Utilisez le bouton de réinitialisation pour une nouvelle conversation

## 🔧 Structure du Projet

```
src/
├── components/
│   ├── MicrophoneInput/
│   ├── ResetButton/
│   └── VoiceResponse/
├── services/
├── styles/
└── types/
```

## 📝 Notes

- L'application nécessite l'autorisation d'accès au microphone
- Une connexion Internet est requise pour le fonctionnement de l'API
- L'application est optimisée pour une utilisation en français

## 🏗️ Build et Distribution

### Prérequis

1. Installer EAS CLI globalement :
```bash
npm install -g eas-cli
```

2. Se connecter à votre compte Expo :
```bash
eas login
```

### Commandes de Build

#### Build iOS locale avec incrémentation automatique

Crée une build iOS locale, incrémente automatiquement la version et crée un tag Git :

```bash
npm run build:ios:local
```

**Options d'incrémentation :**
- **Patch** (par défaut) : `1.0.3` → `1.0.4`
```bash
npm run build:ios:local
```

- **Minor** : `1.0.3` → `1.1.0`
```bash
npm run build:ios:local -- --minor
```

- **Major** : `1.0.3` → `2.0.0`
```bash
npm run build:ios:local -- --major
```

**Ce que fait cette commande :**
1. Lit la version actuelle dans `app.json`
2. Incrémente automatiquement la version (patch/minor/major)
3. Met à jour `app.json` avec la nouvelle version
4. Synchronise `package.json` avec la nouvelle version
5. Lance la build EAS locale
6. Crée un tag Git annoté avec la nouvelle version (ex: `v1.0.4`)

### Commandes de Synchronisation

#### Synchroniser les versions manuellement

Synchronise la version de `package.json` avec celle de `app.json` :

```bash
npm run sync:version
```

Utile si vous modifiez manuellement la version dans `app.json` et souhaitez synchroniser `package.json`.

### Commandes de Soumission

#### Soumettre une build à l'App Store / TestFlight

Soumet une build existante sur EAS à l'App Store ou TestFlight :

```bash
npm run submit:ios
```

Cette commande vous permet de sélectionner une build depuis votre compte EAS.

#### Soumettre une build locale

Soumet une build locale (fichier IPA) à l'App Store ou TestFlight :

```bash
npm run submit:ios:local -- chemin/vers/votre/app.ipa
```

### Gestion des Tags Git

Après chaque build, un tag Git est automatiquement créé. Pour pousser les tags vers le dépôt distant :

```bash
# Pousser un tag spécifique
git push origin v1.0.4

# Pousser tous les tags
git push --tags
```

## 📋 Commandes Disponibles

| Commande | Description |
|----------|-------------|
| `npm start` | Lance le serveur de développement Expo |
| `npm run ios` | Lance l'application sur iOS (simulateur) |
| `npm run android` | Lance l'application sur Android (émulateur) |
| `npm run web` | Lance l'application dans le navigateur |
| `npm run build:ios:local` | Build iOS locale avec incrémentation automatique |
| `npm run sync:version` | Synchronise la version entre `app.json` et `package.json` |
| `npm run submit:ios` | Soumet une build EAS à l'App Store/TestFlight |
| `npm run submit:ios:local` | Soumet une build locale à l'App Store/TestFlight |

## 🔄 Workflow de Version

Le projet utilise un système de gestion de version automatique :

- **Source de vérité** : `app.json` (utilisé par EAS)
- **Synchronisation** : `package.json` est automatiquement synchronisé avec `app.json`
- **Incrémentation** : Automatique lors des builds (patch par défaut)
- **Tags Git** : Création automatique d'un tag annoté à chaque nouvelle version

### Format de version

Le projet suit le format [SemVer](https://semver.org/) : `MAJOR.MINOR.PATCH`

- **MAJOR** : Changements incompatibles avec l'API précédente
- **MINOR** : Nouvelles fonctionnalités rétrocompatibles
- **PATCH** : Corrections de bugs rétrocompatibles

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## 📄 Licence

MIT
