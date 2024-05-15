# SBRA

This document outlines the project requirements for the Restaurant Rating Web Application. This web application allows users to rate spareribs from different restaurants. The application is built with Next.js and TypeScript, ensuring scalability, maintainability, and robustness.

## Table of Contents

- [Features](#features)
- [Technical Requirements](#technical-requirements)
- [Non-Functional Requirements](#non-functional-requirements)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)

## Features

- User authentication and authorization
- Restaurant listing
- Rating and reviewing food items
- Search and filter restaurants
- Responsive design

## Technical Requirements

### Frontend

- **Framework**: Next.js
- **Language**: TypeScript
- **State Management**: Redux, React Context API
- **Styling**: Tailwind CSS, NextUI
- **HTTP Client**: Axios

### Backend

- **API Routes**: Next.js API routes for server-side logic
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

### Testing

- **Unit Testing**: Jest
- **Component Testing**: React Testing Library
- **E2E Testing**: Cypress

### Linting and Formatting

- **Linting**: ESLint
- **Formatting**: Prettier

## Non-Functional Requirements

- **Performance**: The application should load quickly and handle a large number of simultaneous users.
- **Security**: Secure handling of user data and authentication.
- **Scalability**: Easily scalable to accommodate more features in the future.
- **Maintainability**: Codebase should be well-documented and follow best practices for readability and maintainability.

## Dependencies

The following dependencies are required for the project:

### Core Dependencies

- `react`
- `react-dom`
- `next`
- `typescript`
- `redux`
- `react-redux`
- `@reduxjs/toolkit`
- `axios`

### Styling Dependencies

- `styled-components` (if using styled-components)
- `tailwindcss` (if using Tailwind CSS)

### Linting and Formatting

- `eslint`
- `prettier`
- `eslint-config-next`

### Testing

- `jest`
- `@testing-library/react`
- `@testing-library/jest-dom`

## Environment Variables

The application requires the following environment variables to be set:

- `NEXT_PUBLIC_API_URL`: The base URL for the API.
- `DATABASE_URL`: The connection string for the database.
- `JWT_SECRET`: Secret key for JSON Web Tokens.

Create a `.env.local` file in the root directory and add the environment variables:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=mongodb://localhost:27017/restaurant-rating
JWT_SECRET=your-secret-key
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
