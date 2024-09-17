import express from 'express';
import { 
  criarTarefa, 
  listarTarefas, 
  obterTarefa, 
  atualizarTarefa, 
  deletarTarefa 
} from '../controllers/tarefasController.js';

const router = express.Router();

// Rotas para tarefas
router.post('/tarefas', criarTarefa);
router.get('/tarefas', listarTarefas);
router.get('/tarefas/:id', obterTarefa);
router.put('/tarefas/:id', atualizarTarefa);
router.delete('/tarefas/:id', deletarTarefa);

export default router;
