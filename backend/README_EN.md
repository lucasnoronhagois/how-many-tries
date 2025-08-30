# Backend - How Many Tries API

REST API for attempt simulation based on success percentage, following the MVC pattern.

## MVC Structure

```
src/
├── config/           # Application configurations
│   ├── app.ts       # General configurations
│   └── database.ts  # Database configurations
├── controllers/     # Controllers (HTTP request logic)
│   └── SimulationController.ts
├── middleware/      # Custom middlewares
│   └── errorHandler.ts
├── models/          # Models (business logic)
│   └── Simulation.ts
├── routes/          # Route definitions
│   └── simulationRoutes.ts
├── types/           # Global TypeScript types
│   └── index.ts
├── utils/           # Utilities and helper functions
│   └── helpers.ts
└── index.ts         # Main server file
```

## Implemented MVC Pattern

### Model (Model)
- **Location**: `src/models/Simulation.ts`
- **Responsibility**: Business logic, validations and calculations
- **Features**:
  - Attempt simulation
  - Parameter validation
  - Theoretical probability calculations

### View (View)
- **Location**: React Frontend (separate)
- **Responsibility**: User interface and data presentation

### Controller (Controller)
- **Location**: `src/controllers/SimulationController.ts`
- **Responsibility**: Manage HTTP requests and coordinate between Model and View
- **Features**:
  - Receive requests
  - Validate input data
  - Call Model methods
  - Return formatted responses

## API Endpoints

### POST `/api/simulate`
Executes 5 simultaneous simulations and returns the average of attempts needed.

**Body:**
```json
{
  "successRate": 25,
  "maxAttempts": 1000
}
```

**Response:**
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

## Middlewares

### Error Handler
- Centralized error handling
- Error logging with context
- Standardized error responses

### Logging
- Log of all requests
- Execution time measurement
- Structured logs with emojis

## Configurations

### Environment Variables
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `CORS_ORIGIN`: Allowed origin for CORS

## Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Run in production
npm start
```

## Technologies Used

- **Express.js**: Web framework
- **TypeScript**: Main language
- **CORS**: CORS middleware
- **ts-node-dev**: Development with hot reload

## Next Improvements

- [ ] Add authentication
- [ ] Implement rate limiting
- [ ] Add cache (Redis)
- [ ] Implement structured logs
- [ ] Add unit tests
- [ ] Implement Swagger documentation
