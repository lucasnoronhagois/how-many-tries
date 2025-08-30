# Project Structure - How Many Tries

## Overview

This project is an attempt simulator based on success percentage, developed with a modern and scalable architecture.

## Directory Structure

```
how-many-tries/
├── backend/                 # REST API with Express + TypeScript
│   ├── src/
│   │   ├── config/         # Application configurations
│   │   ├── controllers/    # Controllers (MVC pattern)
│   │   ├── middleware/     # Custom middlewares
│   │   ├── models/         # Models (business logic)
│   │   ├── routes/         # Route definitions
│   │   ├── types/          # Global TypeScript types
│   │   ├── utils/          # Utilities and helper functions
│   │   └── index.ts        # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend/               # React application with Vite + TypeScript
│   ├── src/
│   │   ├── App.tsx         # Main component
│   │   ├── main.tsx        # Entry point
│   │   ├── index.css       # Global styles
│   │   └── App.css         # Component styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .eslintrc.cjs
├── package.json            # Main project scripts
├── README.md              # Main documentation
├── .gitignore
└── PROJECT_STRUCTURE.md   # This file
```

## Backend Architecture (MVC)

### Model (Model)
**File**: `backend/src/models/Simulation.ts`

**Responsibilities**:
- Simulation business logic
- Parameter validation
- Mathematical calculations
- Random number generation

**Main Methods**:
- `simulateAttempts()`: Executes simulation
- `validateParameters()`: Validates input data
- `calculateTheoreticalProbability()`: Calculates probabilities

### View (View)
**Location**: React Frontend

**Responsibilities**:
- User interface
- Data presentation
- User interaction
- Result formatting

### Controller (Controller)
**File**: `backend/src/controllers/SimulationController.ts`

**Responsibilities**:
- Receive HTTP requests
- Validate input data
- Coordinate between Model and View
- Return formatted responses
- Logging and monitoring

**Main Methods**:
- `simulate()`: Main simulation endpoint
- `getApiInfo()`: API information
- `healthCheck()`: Health status

## Frontend (React + Vite)

### Main Components
- **App.tsx**: Main component with form and results
- **main.tsx**: Application entry point

### Features
- Modern and responsive interface
- Form validation
- Real-time result display
- Error handling
- Loading states

### Technologies
- **React 18**: Main framework
- **TypeScript**: Static typing
- **Vite**: Build tool and dev server
- **Axios**: HTTP client
- **CSS Modules**: Styling

## API Endpoints

### POST `/api/simulate`
Executes 5 simultaneous simulations and returns the average of attempts needed.

**Request Body**:
```json
{
  "successRate": 25,
  "maxAttempts": 1000
}
```

**Response**:
```json
{
  "averageAttempts": 18.4,
  "totalSuccesses": 4,
  "totalFailures": 1,
  "successRate": 25,
  "maxAttemptsReached": false,
  "individualResults": [
    {
      "attempts": 15,
      "success": true,
      "maxAttemptsReached": false,
      "successRate": 25
    },
    {
      "attempts": 22,
      "success": true,
      "maxAttemptsReached": false,
      "successRate": 25
    }
  ],
  "executionTime": 5,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET `/api/health`
Checks API health status.

### GET `/api`
Returns API information.

## Available Scripts

### Main Scripts
```bash
# Install all dependencies
npm run install:all

# Run backend and frontend simultaneously
npm run dev

# Run only backend
npm run dev:backend

# Run only frontend
npm run dev:frontend

# Production build
npm run build
```

### Backend Scripts
```bash
cd backend

# Development
npm run dev

# Build
npm run build

# Production
npm start
```

### Frontend Scripts
```bash
cd frontend

# Development
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Configurations

### Environment Variables
- `PORT`: Backend server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `CORS_ORIGIN`: Allowed origin for CORS

### Ports
- **Backend**: 3001
- **Frontend**: 3000

## Implemented Features

### ✅ Completed
- [x] MVC structure in backend
- [x] Functional REST API
- [x] Modern React frontend
- [x] Responsive interface
- [x] Data validation
- [x] Error handling
- [x] Structured logging
- [x] Centralized configurations
- [x] TypeScript on both sides
- [x] Hot reload in development

### 🔄 Next Improvements
- [ ] Authentication and authorization
- [ ] Rate limiting
- [ ] Cache (Redis)
- [ ] Structured logs (Winston)
- [ ] Unit and integration tests
- [ ] Swagger documentation
- [ ] Docker and Docker Compose
- [ ] CI/CD pipeline
- [ ] Monitoring and metrics
- [ ] Simulation history
- [ ] Multiple simultaneous simulations
- [ ] Result export

## How to Run

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm run install:all
   ```
3. **Run the project**:
   ```bash
   npm run dev
   ```
4. **Access**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **TypeScript**: Main language
- **CORS**: CORS middleware
- **ts-node-dev**: Development with hot reload

### Frontend
- **React 18**: Main framework
- **TypeScript**: Static typing
- **Vite**: Build tool and dev server
- **Axios**: HTTP client
- **CSS**: Modern styling

### Tools
- **Concurrently**: Simultaneous execution
- **ESLint**: Code linting
- **Git**: Version control
