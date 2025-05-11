import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Gerenciador de NFe - Micro SaaS',
  description: 'Sistema para gerenciamento de Notas Fiscais Eletrônicas com conversão de XML para PDF e consulta por chave de acesso',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans bg-gray-100 min-h-screen`}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 flex items-center">
                <a href="/" className="text-blue-600 font-bold text-xl">NFe Manager</a>
              </div>
              <nav className="flex space-x-4">
                <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Início
                </a>
                <a href="/converter" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Converter XML
                </a>
                <a href="/consultar" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Consultar NFe
                </a>
                <a href="/planos" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Planos
                </a>
              </nav>
            </div>
          </div>
        </header>
        {children}
        <Toaster position="top-right" />
        <footer className="bg-white mt-auto py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} NFe Manager - Todos os direitos reservados
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}