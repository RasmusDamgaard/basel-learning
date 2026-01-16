# Basel III Learning Assistant

An interactive web application for learning and practicing Basel III liquidity requirements: LCR, NSFR, and ALMM.

## Features

- **Conceptual Mastery**: Quiz questions testing understanding of liquidity regulations
- **Classification Practice**: Drill HQLA levels, ASF/RSF factors, and outflow rates
- **Calculation Exercises**: Step-by-step ratio computations with hints and solutions
- **Regulatory Interpretation**: Real-world scenarios for Danish mortgage institutions
- **Flashcards**: Spaced repetition learning for key concepts

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## Build for Production

```bash
npm run build
```

This creates a `dist` folder with static files ready for deployment.

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Vercel auto-detects Vite - just click "Deploy"
5. Your app will be live at `https://your-project.vercel.app`

### Option 2: Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"

### Option 3: GitHub Pages

1. Add to `vite.config.js`:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

2. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

3. Add to `package.json` scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

4. Run:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in your repo settings (Source: gh-pages branch)

### Option 4: Any Static Host

After running `npm run build`, upload the contents of the `dist` folder to:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Any web server (Apache, Nginx)
- Heroku (with static buildpack)

## Project Structure

```
basel-learning-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Customization

### Adding Questions

Edit the data objects in `src/App.jsx`:
- `conceptualQuestions` - Quiz questions by topic
- `classificationItems` - Classification practice items
- `calculationExercises` - Calculation problems
- `interpretationScenarios` - Regulatory scenarios
- `flashcards` - Flashcard decks

### Styling

The app uses Tailwind CSS. Modify classes directly in the JSX or extend the theme in `tailwind.config.js`.

## License

For educational purposes. Based on Basel Committee on Banking Supervision standards.
