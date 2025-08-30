# How Many Tries

Attempt simulator based on success percentage.

## Description

This application allows you to simulate how many attempts are needed to achieve something based on a provided success percentage.

## Project Structure

- `backend/` - Express API with TypeScript
- `frontend/` - React application with Vite and TypeScript

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm run install:all
```

## Running the Project

### Development
To run backend and frontend simultaneously:
```bash
npm run dev
```

### Individually
- Backend: `npm run dev:backend`
- Frontend: `npm run dev:frontend`

## Build

To create production builds:
```bash
npm run build
```

## Technologies

- **Backend**: Express, TypeScript, Node.js
- **Frontend**: React, Vite, TypeScript
- **Tools**: Concurrently (for simultaneous execution)

## Features

- **5 Simultaneous Simulations**: Runs 5 simulations and averages the results
- **Real-time Results**: Shows individual simulation details
- **Modern UI**: Responsive design with loading animations
- **TypeScript**: Full type safety on both frontend and backend
- **MVC Architecture**: Clean separation of concerns in the backend

## API Endpoints

- `POST /api/simulate` - Run simulations
- `GET /api/health` - Health check
- `GET /api` - API information

## Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api
