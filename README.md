# Triangles Frontend

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Building for Production](#building-for-production)
- [Development Guidelines](#development-guidelines)
  - [Branch Naming Convention](#branch-naming-convention)
  - [Pre-commit Checks](#pre-commit-checks)
  - [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)

## Overview

Triangles is a place where you can find the opportunities as a student to work on. It is going to be a go-to place for students to see the events, hackathons, talks, competitions, etc. It is an opportunity discovery, networking, and collaborating platform.

### Problem

Despite there being some platforms like Upwork and Devfolio, they do not cater to a more general audience and are limited to a very niche area. Not everyone knows about them, so they are not able to penetrate the market that well. There is a disconnect between opportunity seekers and opportunity providers. Existing platforms don’t have a global appeal and do not have all-in-one inclusive features.

## Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/blog/next-15)
- **Library:** [React 19 RC](https://react.dev/blog/2024/04/25/react-19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [React Hooks](https://react.dev/reference/rules/rules-of-hooks)
- **Type Checking:** [TypeScript](https://www.typescriptlang.org/)
- **Deployment:**
  - **Official Site:**
    - [triangles.site](https://triangles.site/)
  - **Main Branch:**
    - [Vercel](https://triangles-v0.vercel.app/)
    - [Netlify](https://triangles-v0.netlify.app/)

## Getting Started

### Prerequisites

- **Node.js:** Ensure you have Node.js (version 20 or later) installed. You can download it from [here](https://nodejs.org/).
- **Package Manager:** [PNPM](https://pnpm.io/) (recommended)

### Installation

1. Clone the Repository

2. Navigate to the Project Directory

3. Install Dependencies using PNPM

### Running the Application

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To build the application for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Development Guidelines

### Branch Naming Convention

- Feature branches: `feat/feature-name`
- Bug fixes: `fix/bug-name`
- Documentation: `docs/what-changed`
- Style changes: `style/what-changed`
- Refactoring: `refactor/what-changed`
- Performance improvements: `perf/what-changed`
- Test additions: `test/what-changed`
- Chores: `chore/what-changed`

Example:

```bash
git checkout -b feat/event-filtering
```

### Pre-commit Checks

Before committing your changes, ensure you run these checks:

```bash
# Format code using Prettier
pnpm format

# Run TypeScript compilation and ESLint checks
pnpm lint

# Verify build succeeds
pnpm build
```

### Commit Message Convention

Follow the Conventional Commits specification:

```bash
<type>[optional scope]: <description>
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

For major changes, it is recommended to include a detailed description in the commit message to provide context and clarity.

Examples:

```bash
git commit -m "feat(events): add event filtering functionality"
git commit -m "fix(ui): fix mobile navigation layout"
git commit -m "docs: update development guidelines"
git commit -m "style(ui): improve button hover states"
```

## Pull Request Process

1. Create a new branch following the naming convention.
2. Make your changes.
3. Pull the latest changes from the main (or other desired) branch:

   ```bash
   git pull
   # OR
   git pull origin main
   ```

4. Merge the pulled branch into your feature branch:

   ```bash
   git merge main
   ```

5. Resolve any merge conflicts that arise.
6. Run pre-commit checks.
7. Commit the resolved changes.
8. Push your changes to your branch.
9. Create a Pull Request with:
   - Clear description of changes
   - Screenshots (if UI changes)
   - Related issue numbers
   - Breaking changes (if any)

## Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use Tailwind CSS for styling
- Follow component structure from shadcn/ui
- Keep components compound, small and focused
- Use meaningful variable and function names
