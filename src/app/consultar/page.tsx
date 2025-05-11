'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';

interface NFeData {
  chave: string;
  numero: string;
  serie: string;
  dataEmissao: string;
  valorTotal: string;
  emitente: {
    nome: string;
    cnpj: string;
    ie: string;
  };
  destinatario: {
    nome: string;
    documento: string;
  };
  status: string;
  xmlUrl?: string;
  pdfUrl?: string;
}

export default function ConsultarPage() {
  const [chaveAcesso, setChaveAcesso] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nfeData, setNfeData] = useState<NFeData | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNfeData(null);
    
    // Validação básica da chave de acesso
    const chaveRegex = /^\d{44}$/;
    if (!chaveRegex.test(chaveAcesso)) {
      setError('A chave de acesso deve conter exatamente 44 dígitos numéricos');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Chamada para a API de consulta
      const response = await axios.post('/api/consultar', { chaveAcesso });
      
      if (response.data.success) {
        setNfeData(response.data.nfeData);
        toast.success('NFe encontrada com sucesso!');
      } else {
        setError(response.data.message || 'Erro ao consultar NFe');
        toast.error(response.data.message || 'Erro ao consultar NFe');
      }
    } catch (error: any) {
      console.error('Erro ao consultar NFe:', error);
      const errorMessage = error.response?.data?.message || 'Ocorreu um erro ao consultar a NFe';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  };

  const formatDocumento = (doc: string) => {
    if (doc.length === 11) return formatCPF(doc);
    if (doc.length === 14) return formatCNPJ(doc);
    return doc;
  };

  const formatChaveAcesso = (chave: string) => {
    return chave.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})$/, '$1 $2 $3 $4 $5 $6 $7 $8 $9 $10 $11');
  };

  const formatMoney = (value: string) => {
    const num = parseFloat(value);
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-8">Consultar NFe por Chave de Acesso</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="chaveAcesso" className="block text-sm font-medium text-gray-700">
                Chave de Acesso da NFe (44 dígitos)
              </label>
              <input
                type="text"
                id="chaveAcesso"
                value={chaveAcesso}
                onChange={(e) => setChaveAcesso(e.target.value.replace(/\D/g, ''))}
                placeholder="Digite apenas os números da chave de acesso"
                maxLength={44}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={chaveAcesso.length !== 44 || isLoading}
                className={`px-6 py-3 rounded-md text-white font-medium ${chaveAcesso.length !== 44 || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Consultando...
                  </span>
                ) : 'Consultar NFe'}
              </button>
            </div>
          </form>
          
          {nfeData && (
            <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Dados da NFe</h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Chave de Acesso</h3>
                    <p className="mt-1 text-sm text-gray-900 break-all">{formatChaveAcesso(nfeData.chave)}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <p className={`mt-1 text-sm font-medium ${nfeData.status === 'Autorizada' ? 'text-green-600' : 'text-red-600'}`}>
                      {nfeData.status}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Número</h3>
                    <p className="mt-1 text-sm text-gray-900">{nfeData.numero}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Série</h3>
                    <p className="mt-1 text-sm text-gray-900">{nfeData.serie}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Data de Emissão</h3>
                    <p className="mt-1 text-sm text-gray-900">{nfeData.dataEmissao}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Valor Total</h3>
                  <p className="mt-1 text-sm text-gray-900 font-medium">{formatMoney(nfeData.valorTotal)}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Emitente</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Nome / Razão Social</h4>
                      <p className="mt-1 text-sm text-gray-900">{nfeData.emitente.nome}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">CNPJ</h4>
                      <p className="mt-1 text-sm text-gray-900">{formatCNPJ(nfeData.emitente.cnpj)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Destinatário</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Nome / Razão Social</h4>
                      <p className="mt-1 text-sm text-gray-900">{nfeData.destinatario.nome}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">CPF/CNPJ</h4>
                      <p className="mt-1 text-sm text-gray-900">{formatDocumento(nfeData.destinatario.documento)}</p>
                    </div>
                  </div>
                </div>
                
                {(nfeData.xmlUrl || nfeData.pdfUrl) && (
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-base font-medium text-gray-900 mb-3">Downloads</h3>
                    
                    <div className="flex flex-wrap gap-3">
                      {nfeData.xmlUrl && (
                        <a
                          href={nfeData.xmlUrl}
                          download={`nfe-${nfeData.chave}.xml`}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Baixar XML
                        </a>
                      )}
                      
                      {nfeData.pdfUrl && (
                        <a
                          href={nfeData.pdfUrl}
                          download={`nfe-${nfeData.chave}.pdf`}
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Baixar DANFE (PDF)
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}