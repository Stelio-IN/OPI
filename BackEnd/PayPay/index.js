const express = require('express');
const cors = require('cors'); // Importando o pacote cors
const { syncDatabase } = require('./models'); // Importando a função de sincronização
const routes = require('./routes');
const path = require('path');

// Criando o servidor Express
const app = express();

// Habilitar CORS para todas as rotas
app.use(cors()); // Usando o middleware do cors

// Configurando o JSON parser
app.use(express.json());

// Chamar a função para sincronizar o banco de dados
syncDatabase();

// Configurar as rotas
app.use('/api', routes);

// Definir a rota de teste
app.get('/', (req, res) => {
  res.send('Paypay');
});

// Rota para servir a imagem
app.get('/image', (req, res) => {
  const imagePath = path.join(__dirname, 'uploads', '9f9b6370-009b-473b-8a2f-cc99e79941ce-1739316551896.jpeg');
  console.log(imagePath);
  res.sendFile(imagePath);
});

// Rota para servir imagens da pasta uploads
app.get('/img/:filename', (req, res) => {
  const { filename } = req.params; // Mantém o nome do arquivo recebido na URL
  const imagePath = path.join(__dirname, 'uploads', filename);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('Erro ao enviar o arquivo:', err);
      res.status(404).send('Imagem não encontrada');
    }
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
