import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">TransportPay</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Entrar
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300">
                Registrar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Bem-vindo ao TransportPay</h1>
            <p className="text-gray-600 text-base">Sistema de pagamento rápido para transporte público</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:-translate-y-1 transition-transform duration-300">
              <svg className="w-12 h-12 mx-auto mb-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2m0 0V4m0 16-4-4h14l-4 4m-6-4v1" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">QR Code</h2>
              <p className="text-sm text-gray-600">Pague rapidamente escaneando o QR code</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 hover:-translate-y-1 transition-transform duration-300">
              <svg className="w-12 h-12 mx-auto mb-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">USSD</h2>
              <p className="text-sm text-gray-600">Utilize códigos USSD para pagamentos sem internet</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link 
              to="/login" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              Entrar na sua conta
            </Link>
            
            <div className="text-sm text-gray-600">
              Novo usuário?{' '}
              <Link 
                to="/register" 
                className="text-blue-600 hover:underline"
              >
                Registre-se aqui
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80">© 2025 TransportPay - Todos os direitos reservados</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-sm hover:underline opacity-80">Termos de Serviço</a>
              <a href="#" className="text-sm hover:underline opacity-80">Política de Privacidade</a>
              <a href="#" className="text-sm hover:underline opacity-80">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}