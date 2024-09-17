import express from 'express';
import routes from './tarefas/routes/routes.js'; 

const app = express();

app.use(express.json());

// rotas definidas em routes.js
app.use('/api', routes);

export default app;
