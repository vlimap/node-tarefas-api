import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const config = {
  mongodbUri: process.env.MONGODB_URI,
  port: process.env.PORT
};

export default config;
