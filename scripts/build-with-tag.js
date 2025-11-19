#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const appJsonPath = path.join(__dirname, '..', 'app.json');
const packageJsonPath = path.join(__dirname, '..', 'package.json');

// Fonction pour lire la version depuis app.json
function getVersion() {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  return appJson.expo.version;
}

// Fonction pour incrémenter la version (format semver: major.minor.patch)
function incrementVersion(version, type = 'patch') {
  const parts = version.split('.').map(Number);
  if (parts.length !== 3) {
    throw new Error(`Format de version invalide: ${version}. Attendu: major.minor.patch`);
  }
  
  switch (type) {
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'patch':
    default:
      parts[2]++;
      break;
  }
  
  return parts.join('.');
}

// Fonction pour incrémenter la version dans app.json
function incrementAppVersion(type = 'patch') {
  try {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
    const currentVersion = appJson.expo.version;
    const newVersion = incrementVersion(currentVersion, type);
    
    appJson.expo.version = newVersion;
    fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n', 'utf8');
    
    console.log(`🔄 Version incrémentée : ${currentVersion} → ${newVersion} (${type})`);
    return newVersion;
  } catch (error) {
    console.error(`❌ Erreur lors de l'incrémentation de la version : ${error.message}`);
    throw error;
  }
}

// Fonction pour synchroniser la version de package.json avec app.json
function syncPackageJsonVersion(version) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.version !== version) {
      packageJson.version = version;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
      console.log(`✅ Version de package.json synchronisée : ${version}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`⚠️  Erreur lors de la synchronisation de package.json : ${error.message}`);
    return false;
  }
}

// Fonction pour créer un tag Git
function createGitTag(version) {
  const tagName = `v${version}`;
  try {
    // Vérifier si le tag existe déjà
    execSync(`git rev-parse -q --verify "refs/tags/${tagName}"`, { stdio: 'ignore' });
    console.log(`⚠️  Le tag ${tagName} existe déjà, tag non créé.`);
    return false;
  } catch (error) {
    // Le tag n'existe pas, on peut le créer
    try {
      execSync(`git tag -a ${tagName} -m "Version ${version}"`, { stdio: 'inherit' });
      console.log(`✅ Tag Git créé : ${tagName}`);
      return true;
    } catch (tagError) {
      console.error(`❌ Erreur lors de la création du tag : ${tagError.message}`);
      return false;
    }
  }
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('❌ Veuillez fournir une commande EAS build');
    process.exit(1);
  }

  // Détecter le type d'incrémentation depuis les arguments (--major, --minor, ou patch par défaut)
  let incrementType = 'patch';
  const hasMajor = args.includes('--major');
  const hasMinor = args.includes('--minor');
  
  if (hasMajor) {
    incrementType = 'major';
  } else if (hasMinor) {
    incrementType = 'minor';
  }

  // Filtrer les flags d'incrémentation pour la commande EAS
  const easArgs = args.filter(arg => arg !== '--major' && arg !== '--minor');
  const easCommandToRun = easArgs.join(' ');

  if (!easCommandToRun || !easCommandToRun.trim()) {
    console.error('❌ Veuillez fournir une commande EAS build');
    process.exit(1);
  }

  // Lire la version avant le build
  const versionBefore = getVersion();
  console.log(`📦 Version actuelle (app.json) : ${versionBefore}`);
  
  // Incrémenter la version avant le build
  const versionAfter = incrementAppVersion(incrementType);
  
  // Synchroniser package.json avec la nouvelle version
  syncPackageJsonVersion(versionAfter);

  try {
    // Lancer la commande EAS build
    console.log(`🚀 Lancement de la build EAS...`);
    execSync(easCommandToRun, { stdio: 'inherit' });

    // Vérifier si on est dans un dépôt Git et créer un tag
    try {
      execSync('git rev-parse --git-dir', { stdio: 'ignore' });
      
      // Vérifier si app.json ou package.json a été modifié
      const gitStatus = execSync('git status --porcelain app.json package.json', { encoding: 'utf8' });
      if (gitStatus.trim()) {
        createGitTag(versionAfter);
        console.log(`\n💡 N'oubliez pas de pousser le tag avec : git push origin v${versionAfter}`);
      } else {
        console.log(`\n⚠️  Aucun fichier modifié, tag non créé.`);
      }
    } catch (gitError) {
      console.log(`\n⚠️  Ce n'est pas un dépôt Git, tag non créé.`);
    }
  } catch (error) {
    console.error(`\n❌ Erreur lors de la build : ${error.message}`);
    process.exit(1);
  }
}

main();

