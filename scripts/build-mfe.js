#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const apps = ['main-app', 'product-app', 'cart-app'];
const rootDir = path.resolve(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');
const distDir = path.join(rootDir, 'dist');

/**
 * Execute a command and return a promise
 */
function execCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`Executing: ${command}`);
    
    const childProcess = exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing: ${command}`);
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
    
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
  });
}

/**
 * Create directory if not exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

/**
 * Update the vite.config.js for production build
 */
function updateViteConfig(appName) {
  const configPath = path.join(packagesDir, appName, 'vite.config.js');
  let configContent = fs.readFileSync(configPath, 'utf-8');
  
  // During build, we should use relative paths for remotes instead of localhost URLs
  const remoteRegex = /(remotes:\s*{[^}]*})/gs;
  const remoteSection = configContent.match(remoteRegex)?.[0];
  
  if (remoteSection) {
    let updatedRemoteSection = remoteSection;
    
    if (appName === 'main-app') {
      // Update path to other MFE remoteEntry files
      updatedRemoteSection = updatedRemoteSection.replace(
        /product: process\.env\.NODE_ENV === 'production'[\s\S]*?\? "[^"]+"[\s\S]*?:/g,
        'product: process.env.NODE_ENV === \'production\' ? "./assets/product-remoteEntry.js" :'
      );
      updatedRemoteSection = updatedRemoteSection.replace(
        /cart: process\.env\.NODE_ENV === 'production'[\s\S]*?\? "[^"]+"[\s\S]*?:/g,
        'cart: process.env.NODE_ENV === \'production\' ? "./assets/cart-remoteEntry.js" :'
      );
    } else {
      // For other apps, no need to update as they will be copied to main-app assets
      updatedRemoteSection = updatedRemoteSection.replace(
        /http:\/\/localhost:3000\/assets\/remoteEntry\.js/g,
        './main-remoteEntry.js'
      );
    }
    
    configContent = configContent.replace(remoteRegex, updatedRemoteSection);
    fs.writeFileSync(configPath, configContent);
    console.log(`Updated Vite config for ${appName}`);
  }
}

/**
 * Copy files from app dist to main dist
 */
function copyBuildOutput(appName) {
  const appDistDir = path.join(packagesDir, appName, 'dist');
  
  if (appName === 'main-app') {
    // For main app, copy everything to the root dist directory
    fs.readdirSync(appDistDir).forEach(file => {
      const sourcePath = path.join(appDistDir, file);
      const targetPath = path.join(distDir, file);
      
      if (fs.lstatSync(sourcePath).isDirectory()) {
        // For directories, recursively copy
        ensureDir(targetPath);
        fs.cpSync(sourcePath, targetPath, { recursive: true });
      } else {
        // For files, just copy
        fs.copyFileSync(sourcePath, targetPath);
      }
    });
    console.log(`Copied main-app build output to dist/`);
  } else {
    // For other apps, copy only the remoteEntry.js and assets to the main dist/assets directory
    const assetsDir = path.join(appDistDir, 'assets');
    const targetAssetsDir = path.join(distDir, 'assets');
    
    ensureDir(targetAssetsDir);
    
    if (fs.existsSync(assetsDir)) {
      // Find the remoteEntry.js file
      const remoteEntryFile = fs.readdirSync(assetsDir).find(file => file.includes('remoteEntry.js'));
      
      if (remoteEntryFile) {
        const sourcePath = path.join(assetsDir, remoteEntryFile);
        const targetPath = path.join(targetAssetsDir, `${appName.replace('-app', '')}-remoteEntry.js`);
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${appName} remoteEntry to dist/assets/${appName.replace('-app', '')}-remoteEntry.js`);
        
        // Also copy to the root of assets to ensure all paths work
        fs.copyFileSync(sourcePath, path.join(targetAssetsDir, remoteEntryFile));
        console.log(`Also copied ${appName} remoteEntry to dist/assets/${remoteEntryFile}`);
      }
      
      // Copy other asset files
      fs.readdirSync(assetsDir).forEach(file => {
        if (!file.includes('remoteEntry.js')) {
          const sourcePath = path.join(assetsDir, file);
          const targetPath = path.join(targetAssetsDir, file);
          if (!fs.existsSync(targetPath)) {
            fs.copyFileSync(sourcePath, targetPath);
          }
        }
      });
    }
    
    console.log(`Copied ${appName} assets to dist/assets/`);
  }
}

/**
 * Setup root index.html for the dist directory
 * This function is no longer needed as we're copying the main-app index.html directly
 */
function finalizeDistFolder() {
  // Make sure any relative paths in index.html are correct
  const indexPath = path.join(distDir, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    console.log('Main app index.html is ready in dist directory');
    
    // Create necessary nested directories and copy files to handle path issues
    const assetsDir = path.join(distDir, 'assets');
    const nestedAssetsDir = path.join(assetsDir, 'assets');
    const productNestDir = path.join(nestedAssetsDir, 'product-');
    const cartNestDir = path.join(nestedAssetsDir, 'cart-');
    
    // Create nested directories
    ensureDir(nestedAssetsDir);
    ensureDir(productNestDir);
    ensureDir(cartNestDir);
    
    // Copy remoteEntry.js files to nested assets directory
    if (fs.existsSync(path.join(assetsDir, 'product-remoteEntry.js'))) {
      fs.copyFileSync(
        path.join(assetsDir, 'product-remoteEntry.js'), 
        path.join(nestedAssetsDir, 'product-remoteEntry.js')
      );
      console.log('Copied product-remoteEntry.js to assets/assets/ directory');
    }
    
    if (fs.existsSync(path.join(assetsDir, 'cart-remoteEntry.js'))) {
      fs.copyFileSync(
        path.join(assetsDir, 'cart-remoteEntry.js'), 
        path.join(nestedAssetsDir, 'cart-remoteEntry.js')
      );
      console.log('Copied cart-remoteEntry.js to assets/assets/ directory');
    }
    
    // Copy necessary files for product app
    if (fs.existsSync(path.join(assetsDir, 'style-CpMqDS0t.css'))) {
      fs.copyFileSync(
        path.join(assetsDir, 'style-CpMqDS0t.css'),
        path.join(productNestDir, 'style-CpMqDS0t.css')
      );
      console.log('Copied style-CpMqDS0t.css to assets/assets/product-/ directory');
    }
    
    // Copy necessary files for cart app
    if (fs.existsSync(path.join(assetsDir, 'style-DjGq9XYF.css'))) {
      fs.copyFileSync(
        path.join(assetsDir, 'style-DjGq9XYF.css'),
        path.join(cartNestDir, 'style-DjGq9XYF.css')
      );
      console.log('Copied style-DjGq9XYF.css to assets/assets/cart-/ directory');
    }
    
    // Copy federation files to nested assets directory
    const federationFiles = fs.readdirSync(assetsDir).filter(file => file.startsWith('__federation_'));
    for (const file of federationFiles) {
      fs.copyFileSync(
        path.join(assetsDir, file),
        path.join(nestedAssetsDir, file)
      );
      console.log(`Copied ${file} to assets/assets/ directory`);
    }
  } else {
    console.error('Error: index.html not found in dist directory');
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting build process for all micro frontends...');
    
    // Clean dist directory if it exists
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true, force: true });
      console.log(`Cleaned existing dist directory`);
    }
    
    // Create main dist directory
    ensureDir(distDir);
    
    // Build apps in specific order: first product-app and cart-app, then main-app
    // This ensures that all remoteEntry files are available when main-app is built
    const buildOrder = ['product-app', 'cart-app', 'main-app'];
    
    for (const app of buildOrder) {
      console.log(`\n=== Building ${app} ===`);
      
      // Update Vite config for production
      updateViteConfig(app);
      
      // Run build command with production environment
      await execCommand(`NODE_ENV=production npm run ${app}:build`, { cwd: rootDir });
      
      // Copy build output
      copyBuildOutput(app);
    }
    
    // Finalize dist folder
    finalizeDistFolder();
    
    console.log('\n✅ Build process completed successfully!');
    console.log(`\nYou can now serve the integrated application from the '${distDir}' directory.`);
    console.log('Run: npm run serve:mfe');
    
  } catch (error) {
    console.error('Build process failed:', error);
    process.exit(1);
  }
}

// Execute the script
main();
