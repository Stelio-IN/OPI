import React from 'react';
import QRCode from 'react-qr-code';

function Qr_teste() {
  const dados = {
    numero: 842156451,
    nome: "Stelio",
    morada: "Magoanine C",
    valor: 18,
    autocarro: "12345",
    rota: "Zimpeto-Praca"
  };

  const valorQRCode = JSON.stringify(dados);

  return (
    <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Gerenciamento de Frota
      </h2>

      <QRCode value={valorQRCode} size={200} />

      <p className="mt-4 text-sm text-gray-600">QR Code com dados da viagem</p>
    </div>
  );
}

export default Qr_teste;
