# Movie Database Application

A modern React application for searching and managing your favorite movies. Built with TypeScript, Material UI, and React Query.

## Features

- **Movie Search**: Search for movies with pagination and persistent search results
- **Movie Details**: View comprehensive information about each movie
- **Favorites Management**: Save and manage your favorite movies
- **Responsive Design**: Works on desktop and mobile devices
- **Code Splitting**: Each feature (Search, Detail, Favorites) loads on demand for improved performance

## Tech Stack

- **React 19** with TypeScript
- **Material UI 7** with Emotion for styling
- **React Router 7** for navigation
- **React Query** for data fetching and caching
- **React Hook Form** with Zod for form validation
- **Vite** for fast development and optimized builds

## Prerequisites

- Node.js (v18 or newer)
- pnpm (v9.15.4 or newer, but you should be able to also use npm or yarn)

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

# Open Cypress Test Runner (interactive mode)
pnpm cypress:open

# Run Cypress tests headlessly
pnpm cypress:run

# Run end-to-end tests (starts dev server and runs tests)
pnpm test:e2e
```

## Testing

The application includes end-to-end tests using Cypress. The tests don't cover 100% of the application, but they showcase how to use e2e testing with React and Cypress.

### Test Structure

```
cypress/
├── e2e/
│   ├── search.cy.js         # Tests for search functionality
│   ├── movie-details.cy.js  # Tests for movie details page
│   ├── favorites.cy.js      # Tests for favorites functionality
│   └── navigation.cy.js     # Tests for navigation between pages
└── ...
```

### Running Tests

You can run the tests using the following commands:

- **Interactive Mode**: `pnpm cypress:open` - Opens the Cypress Test Runner UI where you can select and run tests with a visual interface. Requires dev server to be running.

- **Headless Mode**: `pnpm cypress:run` - Runs all tests in the terminal without a UI. Requires dev server to be running.

- **End-to-End with Server**: `pnpm test:e2e` - Starts the development server and runs all tests against it.

## Application Structure

```
src/
├── components/        # Shared components
├── features/          # Feature-based modules
│   ├── movie/         # Movie details feature
│   ├── search/        # Movie search feature
│   └── favorites/     # Favorites management feature
├── types/             # TypeScript type definitions
├── api/               # API services
└── App.tsx            # Main application component
```