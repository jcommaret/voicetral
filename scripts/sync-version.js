#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const appJsonPath = path.join(__dirname, '..', 'app.json');
const packageJsonPath = path.join(__dirname, '..', 'package.json');

// Fonction pour lire la version depuis app.json
function getAppVersion() {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  return appJson.expo.version;
}

// Fonction pour synchroniser la version de package.json avec app.json
function syncPackageJsonVersion() {
  try {
    const version = getAppVersion();
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    if (packageJson.version !== version) {
      const oldVersion = packageJson.version;
      packageJson.version = version;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
      console.log(`✅ Version synchronisée : ${oldVersion} → ${version}`);
      return true;
    } else {
      console.log(`ℹ️  Les versions sont déjà synchronisées : ${version}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la synchronisation : ${error.message}`);
    process.exit(1);
  }
}

syncPackageJsonVersion();

