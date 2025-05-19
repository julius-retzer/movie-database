---
trigger: always_on
---

# TypeScript & React Comprehensive Guidelines

## Core Principles
- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use early returns whenever possible to make the code more readable
- Use descriptive variable and function names

## TypeScript Usage
- Always use TypeScript
- Prefer `type` over `interface`
- Let TypeScript infer types when possible
- Avoid enums; use maps instead

## Component Structure
- Use functional components with TypeScript types
- Use arrow functions instead of function declarations
- Structure for component props:
  ```typescript
  type ComponentNameProps = {
    propName: PropType;
  };

  const ComponentName = ({ propName }: ComponentNameProps) => {
    // Component logic
  };
  ```
- In files with multiple components:
  - Main component (matching filename) should be at the top
  - Secondary components should be below
- Use consts instead of functions, e.g., `const toggle = () =>` with appropriate types

## File & Folder Structure
- Use lowercase with dashes for directories (e.g., `components/auth-wizard`)
- Favor named exports for components
- Structure component folders as:
  ```
  components/
  ├── FeatureName/              # e.g., CompanyHeader
  │   ├── FeatureName.tsx       # Main orchestrator component
  │   └── components/           # Subfolder for child components
  │       ├── ComponentA.tsx    # Child components specific to this feature
  │       └── ComponentB.tsx
  ```
- Within files, order as:
  1. Types
  2. Exported component
  3. Subcomponents
  4. Helpers
  5. Static content

## Coding Style
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`)
- Event functions should be named with a "handle" prefix (e.g., `handleClick`, `handleKeyDown`)
- Use curly braces in all conditionals
- Use declarative JSX
- Try to keep props to minimum; pass whole objects when possible
- Don't write unnecessary comments where the code is descriptive enough. Comment only where something unusual or non-obvious happens, or for organizational purposes

## UI Components & Styling


### Layout and Components
- Always prefer MUI components
- Always use the new Grid v2 component:
  ```typescript
  // CORRECT: Import Grid v2
  import { Grid2 } from '@mui/material';

  // INCORRECT: Don't use the legacy Grid component
  // import Grid from '@mui/material/Grid';
  // import { Grid } from '@mui/material';
  ```
- When using Grid2, use the `size` prop (xs, sm, md, lg, xl) for responsive layouts
- For layout, prefer `Stack` component over `Box` with `{ display: 'flex' }`
- For tables, always use MUI Table components

### Colors and Styling
- Keep default MUI border radius and box shadows unless necessary
- Minimize custom CSS; default to MUI styling
- Prefer using whole numbers for sizing properties: (mb: 2 is good, mb: 0.75 is bad)

## Performance Optimization
- Minimize `use client`, `useEffect`, and `setState`; favor React Server Components (RSC)
- Wrap client components in Suspense with fallback
- Use dynamic loading for non-critical components
- Optimize images: use WebP format, include size data, implement lazy loading
- Optimize Web Vitals (LCP, CLS, FID)
- Limit 'use client':
  - Favor server components and Next.js SSR
  - Use only for Web API access in small components
  - Avoid for data fetching or state management

## Common Practices
- Use React Query for data fetching
- Use 'nuqs' for URL search parameter state management
- Focus on readable code over premature optimization
- Write bug-free, fully functional code following DRY principles
- Ensure code is complete with no TODOs or placeholders
- Include all required imports with proper naming