# SBRA

This document outlines the project requirements for the Restaurant Rating Web Application. This web application allows users to rate spareribs from different restaurants. The application is built with Next.js and TypeScript, ensuring scalability, maintainability, and robustness.

## Table of Contents

- [Features](#features)
- [Technical Requirements](#technical-requirements)
- [Non-Functional Requirements](#non-functional-requirements)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)

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
