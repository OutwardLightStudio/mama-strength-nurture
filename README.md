# MamaStrong

Strength, resources & connection for your entire motherhood journey.

## GitHub Pages Deployment

This project is configured to deploy automatically to GitHub Pages through GitHub Actions.

### Automatic Deployment

Whenever changes are pushed to the `main` branch, GitHub Actions will automatically:
1. Build the application
2. Deploy it to GitHub Pages

You can also trigger the deployment manually from the GitHub Actions tab in the repository.

### Manual Deployment

If you need to deploy manually from your local machine:

```bash
# Install dependencies
npm install

# Build and deploy
npm run deploy
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- GitHub Pages
