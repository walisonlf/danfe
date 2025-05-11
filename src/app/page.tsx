'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Gerenciador de NFe</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Bem-vindo ao seu sistema de gerenciamento de Notas Fiscais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-medium mb-3">Conversão de XML para PDF</h3>
              <p className="text-gray-600 mb-4">Faça upload do seu arquivo XML de NFe e converta para PDF com layout profissional.</p>
              <Link href="/converter" className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
                Converter Agora
              </Link>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-medium mb-3">Consulta por Chave de Acesso</h3>
              <p className="text-gray-600 mb-4">Consulte NFe diretamente na SEFAZ utilizando a chave de acesso de 44 dígitos.</p>
              <Link href="/consultar" className="block text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors">
                Consultar NFe
              </Link>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-medium mb-4 text-center">Planos Premium</h3>
            <p className="text-gray-600 text-center mb-6">Acesse recursos avançados como processamento em lote e muito mais.</p>
            <Link href="/planos" className="block w-full md:w-1/2 mx-auto text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors">
              Ver Planos
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}