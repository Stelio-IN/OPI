// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Configuração de armazenamento do Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Define o destino com base no tipo de arquivo
    if (file.fieldname === 'imagem') {
      cb(null, path.join(__dirname, '../img'));
    } else if (file.fieldname === 'video') {
      cb(null, path.join(__dirname, '../video'));
    } else {
      cb(null, path.join(__dirname, '../public/outros'));
    }
  },
  filename: function(req, file, cb) {
    // Define o nome do arquivo com timestamp para evitar duplicações
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.fieldname}${path.extname(file.originalname)}`);
  }
});

// Filtro para verificar tipos de arquivos permitidos
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'imagem') {
    // Aceita apenas imagens
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não suportado. Envie apenas imagens.'), false);
    }
  } else if (file.fieldname === 'video') {
    // Aceita apenas vídeos
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não suportado. Envie apenas vídeos.'), false);
    }
  } else {
    // Rejeita outros tipos de campos
    cb(new Error('Campo de arquivo não suportado.'), false);
  }
};

// Configuração do multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limita o tamanho do arquivo a 10MB
  }
});

module.exports = upload;