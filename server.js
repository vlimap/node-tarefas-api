import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './src/config/config.js'; 
import app from './src/app.js'; 

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao MongoDB usando a URI do arquivo de configuração
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
    
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
  });
