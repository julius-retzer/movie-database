# Movie Database Application

A modern React application for searching and managing your favorite movies. Built with TypeScript, Material UI, and React Query.

## Features

- **Movie Search**: Search for movies with pagination and persistent search results
- **Movie Details**: View comprehensive information about each movie
- **Favorites Management**: Save and manage your favorite movies
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 19** with TypeScript
- **Material UI 7** with Emotion for styling
- **React Router 7** for navigation
- **React Query** for data fetching and caching
- **React Hook Form** with Zod for form validation
- **Vite** for fast development and optimized builds

## Prerequisites

- Node.js (v18 or newer)
- pnpm (v9.15.4 or newer)

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd movie-database

# Install dependencies
pnpm install
```

### Configuration

Create a `.env` file in the root directory with your OMDb API key:

```
VITE_OMDB_API_KEY=your_api_key_here
```

You can get an API key from [OMDb API](https://www.omdbapi.com/apikey.aspx).

## Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Format code with Prettier
pnpm format

# Check code formatting
pnpm format:check
```

## Application Structure

```
src/
├── components/        # Shared components
├── features/          # Feature-based modules
│   ├── movie/         # Movie details feature
│   ├── search/        # Movie search feature
│   └── favorites/     # Favorites management feature
├── types/             # TypeScript type definitions
├── api/               # API and other services
└── App.tsx            # Main application component
```