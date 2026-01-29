# Rohit Mahajan - Portfolio

A modern, responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS v4.

## Features

- 🎨 Clean, modern design with dark mode support
- 📱 Fully responsive layout
- ⚡ Fast performance with Vite
- 🎯 Dynamic content loaded from JSON
- 📊 Auto-calculated years of experience
- 🔄 Smooth animations and transitions
- 🎭 Interactive drawer component
- 🌙 Persistent theme preferences

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **pnpm** - Package manager

## Run Locally

**Prerequisites:** Node.js 18+ and pnpm

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
pnpm build
```

Preview the production build:
```bash
pnpm preview
```

## Configuration

Edit `data.json` to customize:
- Profile information
- Experience history
- Skills and competencies
- Projects
- Education
- Social links

### Query Parameters

- `?oto=true` - Show "Open to Opportunities" badge
- `?oto=false` - Hide "Open to Opportunities" badge
- `?hidden=false` - Show all projects including hidden ones

## Project Structure

```
├── components/          # React components
├── data.json           # Portfolio content
├── App.tsx             # Main app component
├── App.css             # Tailwind CSS configuration
└── types.ts            # TypeScript type definitions
```

## License

MIT
