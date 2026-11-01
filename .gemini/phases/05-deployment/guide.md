# Phase 5: Free Deployment Guide & Configuration

**Project**: Pakistan Islamic Car Ijarah Calculator (*Ijarah Muntahia Bittamleek*)  
**Repository**: `https://github.com/faiq-19/car-lease-calculator`  
**Deployment Target**: **GitHub Pages** (100% Free Forever)  
**Author**: Antigravity Assistant & Engineering Team  
**Date**: November 2026  
**Status**: Ready for Deployment Execution  

---

## 1. Hosting Strategy & Zero-Cost Architecture

In Phase 2, we researched free hosting options (GitHub Pages, Cloudflare Pages, Netlify, and Vercel). 

**GitHub Pages** was selected because:
1. **Zero External Accounts**: Directly integrated with your existing GitHub repository (`faiq-19/car-lease-calculator`).
2. **Zero Paid Dependencies or API Keys**: No credit card required, no third-party tokens, no build credit caps.
3. **No Cold Starts or Server Limits**: Static files (HTML5, Vanilla CSS3, ES Modules) are served via GitHub's global CDN with instant load times (<30ms).
4. **Primary Local Execution Maintained**: The deployed version is a mirrored convenience for evaluators; local execution (`python3 -m http.server 3000`) remains 100% self-contained and private.

---

## 2. GitHub Actions Automation Configured

We have configured two automated workflows in [`.github/workflows/`](file:///home/faiq/Development/Projects/knowledgecity/.github/workflows/):

1. **Continuous Integration (`.github/workflows/ci.yml`)**:
   - Triggers on every push and pull request.
   - Runs `npm test` using Node.js's built-in test runner.
   - Verifies that all 11 financial formulas and SBP regulatory rules pass before deployment.
2. **Continuous Deployment (`.github/workflows/deploy.yml`)**:
   - Triggers automatically upon pushing to `master`.
   - Uses official GitHub actions (`actions/configure-pages@v4`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`).
   - Publishes the application live to your public GitHub Pages URL:
     `https://faiq-19.github.io/car-lease-calculator/`

---

## 3. Step-by-Step Deployment Instructions

Because all Git operations are handled manually by you (Rule 9), follow these simple steps to deploy:

### Step 1: Enable GitHub Pages in your Repository Settings
1. Open your repository on GitHub:  
   `https://github.com/faiq-19/car-lease-calculator`
2. Click on the **Settings** tab (top right).
3. In the left navigation sidebar under *Code and automation*, click **Pages**.
4. Under **Build and deployment**:
   - In the **Source** dropdown, select **GitHub Actions**.

### Step 2: Commit and Push the Code to GitHub
Execute the Git commands locally in your terminal:
```bash
git add .
git commit -m "feat: complete Pakistan Islamic Car Ijarah calculator with automated CI/CD"
git push origin master
```

### Step 3: Verify Automated Deployment
1. Click the **Actions** tab on your GitHub repository.
2. You will observe two automated workflows run:
   - **Automated CI Test Suite** (validates all formulas).
   - **Deploy to GitHub Pages** (publishes the site).
3. Once completed (usually within 45 seconds), your application will be live at:
   **`https://faiq-19.github.io/car-lease-calculator/`**

---

## 4. Local Execution Verification

The application continues to run completely offline without depending on GitHub Pages or any cloud service:
```bash
# Verify local tests
npm test

# Run local web server
python3 -m http.server 3000
# or: npx serve -l 3000
```
Open `http://localhost:3000` to verify offline functionality.
