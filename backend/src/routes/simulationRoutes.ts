import { Router } from 'express';
import { SimulationController } from '../controllers/SimulationController';

const router = Router();

// Rota principal para simulação
router.post('/simulate', SimulationController.simulate);

// Rota de verificação de saúde
router.get('/health', SimulationController.healthCheck);

// Rota de informações da API
router.get('/', SimulationController.getApiInfo);

export default router;
