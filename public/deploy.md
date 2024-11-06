# Deployment Instructions for Vue App Using Vite on GitHub Pages

This document provides step-by-step instructions to deploy a Vue app, built with Vite, on GitHub Pages.

---

## Prerequisites

- **GitHub Account**: You need a GitHub account and a repository to store your code.
- **Vite**: Ensure your project is set up with Vite using `npm create vue@latest`.
- **gh-pages Package**: To automate deployment, install the `gh-pages` package.

---

## Steps for Deployment

### 1. Install `gh-pages`

Run the following command in your project’s root directory to install `gh-pages`:

```bash
npm install gh-pages --save-dev
```

### 2. Update vite.config.js
Open or create the vite.config.js file in your project root, and configure it as follows. Replace vue-example with the name of your GitHub repository.

```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: process.env.NODE_ENV === 'production' 
    ? '/vue-example/' // Change 'vue-example' to your repository name
    : '/'             // Use '/' for local development
})
```

### 3. Add Deployment Scripts to package.json
Open package.json and add the following lines under "scripts":

```json
"scripts": {
  "build": "vite build",
  "deploy": "gh-pages -d dist"
}
```

### 4. Push Your Code to GitHub
Ensure all changes are committed, and push your code to GitHub:

```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main
```

### 5. Deploy the App
Run the following commands to build and deploy your app:

```bash
npm run build
npm run deploy
This will create a dist folder, push its contents to the gh-pages branch, and publish your site on GitHub Pages.
```

### 6. Configure GitHub Pages
Go to your GitHub repository.
Navigate to Settings > Pages.
In the Source section, select the gh-pages branch.
Save the settings. GitHub Pages will now serve your site from the gh-pages branch.


### 7. Access Your Deployed App
Your Vue app will be available at https://<username>.github.io/<repository-name>/.