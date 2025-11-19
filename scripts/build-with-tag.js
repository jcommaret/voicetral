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
  const easCommand = args.join(' ');

  if (!easCommand) {
    console.error('❌ Veuillez fournir une commande EAS build');
    process.exit(1);
  }

  // Lire la version avant le build
  const versionBefore = getVersion();
  console.log(`📦 Version actuelle (app.json) : ${versionBefore}`);
  
  // Synchroniser package.json avec app.json avant le build
  syncPackageJsonVersion(versionBefore);

  try {
    // Lancer la commande EAS build
    console.log(`🚀 Lancement de la build EAS...`);
    execSync(easCommand, { stdio: 'inherit' });

    // Lire la version après le build
    const versionAfter = getVersion();
    console.log(`📦 Version après build (app.json) : ${versionAfter}`);

    // Synchroniser package.json avec la nouvelle version
    const packageJsonUpdated = syncPackageJsonVersion(versionAfter);

    // Si la version a changé, créer un tag Git
    if (versionAfter !== versionBefore) {
      console.log(`\n🔄 Version incrémentée de ${versionBefore} à ${versionAfter}`);
      
      // Vérifier si on est dans un dépôt Git
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
    } else {
      console.log(`\nℹ️  La version n'a pas changé (${versionBefore}), aucun tag créé.`);
    }
  } catch (error) {
    console.error(`\n❌ Erreur lors de la build : ${error.message}`);
    process.exit(1);
  }
}

main();

