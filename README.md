# Mohammed Boussardi's Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects and services as a software developer specializing in Oracle APEX, PL/SQL, Python, and various other technologies.

## 🚀 Features

- **Responsive Design**: Looks great on all devices - mobile, tablet, and desktop
- **Dark/Light Mode**: Toggle between dark and light themes
- **Multilingual Support**: Available in English, French, and Spanish
- **Interactive UI**: Smooth animations and transitions
- **Project Showcase**: Detailed project cards with links to repositories
- **Contact Form**: Easy way for clients to reach out

## 🔧 Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Internationalization**: i18next
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 🛠️ Setup and Development

1. **Clone the repository**

```bash
git clone https://github.com/medboussardi/mboussardi.git
cd mboussardi
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
```

5. **Preview production build**

```bash
npm run preview
```

## 📱 Image Management

### Profile Images
- Located in `/public/lovable-uploads/`
- Main profile image: `Mohammed_Boussardi.png`

### Project Images
- Located in `/public/images/projects/`
- Project images: `project1.jpg`, `project2.jpg`, `project3.jpg`

### Favicon
- Located in `/public/favicon.ico`

## 🌐 Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages.

### Initial Setup (Already Done)

1. The `gh-pages` package has been installed
2. Deployment scripts have been added to `package.json`
3. Base path has been configured in `vite.config.ts`

### Deployment Process

Since you've already created a GitHub repository named "mboussardi", follow these steps:

1. **Add all project files and push to GitHub**

```bash
# Remove the README.md created by GitHub
rm README.md

# Add all project files
git add .

# Commit changes
git commit -m "Initial project commit"

# Push to GitHub
git push -u origin main
```

2. **Deploy to GitHub Pages**

```bash
npm run deploy
```

3. **Set up GitHub Pages in repository settings**
   - Go to your repository settings at https://github.com/medboussardi/mboussardi/settings/pages
   - Navigate to "Pages" section
   - Select source: "Deploy from a branch"
   - Select branch: "gh-pages" and folder: "/ (root)"
   - Save and wait for deployment to complete

4. **Access your deployed site**
   - Your site will be available at: https://medboussardi.github.io/mboussardi/

### Setting Up a Custom Domain

If you want to use mboussardi.dev or mboussardi.com:

1. **Purchase your domain** from a domain registrar (Namecheap, GoDaddy, Google Domains, etc.)

2. **Configure DNS records** at your domain provider:
   - Add an A record pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or add a CNAME record pointing to your GitHub Pages URL:
     ```
     CNAME: medboussardi.github.io
     ```

3. **Configure GitHub Pages**:
   - Go to your repository settings
   - Under Pages section, enter your custom domain
   - Check "Enforce HTTPS" for secure connections
   - Save the changes

4. **Update vite.config.ts** to use your custom domain:
   ```js
   base: "/", // Change to root path when using custom domain
   ```

5. **Add a CNAME file** to your project:
   - Create a file named `CNAME` in the `public` directory
   - Add your domain name (e.g., `mboussardi.dev`) as the only content
   - This ensures your custom domain setting persists after redeployment

### Updating the Deployed Site

After making changes to your code:

```bash
git add .
git commit -m "Your update message"
git push origin main
npm run deploy
```

## 🌍 Multilingual Support

This portfolio supports multiple languages. Translations are managed in:
- `src/i18n/locales/en.json` (English)
- `src/i18n/locales/fr.json` (French)
- `src/i18n/locales/es.json` (Spanish)

## 📄 License

All rights reserved. This project and its contents are not open source and should not be reproduced without permission.

---

© 2024 Mohammed Boussardi. All Rights Reserved.
