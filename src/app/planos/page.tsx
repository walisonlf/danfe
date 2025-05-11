'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  creditsPerMonth?: number;
}

export default function PlanosPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 0,
      description: 'Para usuários com baixo volume de NFe',
      features: [
        { name: 'Conversão de XML para PDF', included: true },
        { name: 'Consulta de NFe por chave de acesso', included: true },
        { name: '5 conversões por mês', included: true },
        { name: 'Processamento em lote', included: false },
        { name: 'Armazenamento de NFe', included: false },
        { name: 'Suporte prioritário', included: false },
      ],
      creditsPerMonth: 5
    },
    {
      id: 'basic',
      name: 'Básico',
      price: billingPeriod === 'monthly' ? 49.90 : 479.00,
      description: 'Para pequenas empresas',
      features: [
        { name: 'Conversão de XML para PDF', included: true },
        { name: 'Consulta de NFe por chave de acesso', included: true },
        { name: '50 conversões por mês', included: true },
        { name: 'Processamento em lote (até 10 NFe)', included: true },
        { name: 'Armazenamento de NFe por 3 meses', included: true },
        { name: 'Suporte prioritário', included: false },
      ],
      popular: true,
      creditsPerMonth: 50
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingPeriod === 'monthly' ? 99.90 : 959.00,
      description: 'Para empresas com alto volume',
      features: [
        { name: 'Conversão de XML para PDF', included: true },
        { name: 'Consulta de NFe por chave de acesso', included: true },
        { name: 'Conversões ilimitadas', included: true },
        { name: 'Processamento em lote ilimitado', included: true },
        { name: 'Armazenamento de NFe por 12 meses', included: true },
        { name: 'Suporte prioritário', included: true },
      ],
      creditsPerMonth: 9999
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-4">Planos de Assinatura</h1>
          <p className="text-gray-600 text-center mb-8">Escolha o plano ideal para o seu negócio</p>
          
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${billingPeriod === 'monthly' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${billingPeriod === 'yearly' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Anual <span className="text-xs text-green-600 font-normal">Economize 20%</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`plan-card border rounded-lg overflow-hidden ${plan.popular ? 'border-blue-500 relative' : 'border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {plan.price === 0 ? 'Grátis' : `R$${plan.price.toFixed(2)}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-500 text-sm ml-1">
                        /{billingPeriod === 'monthly' ? 'mês' : 'ano'}
                      </span>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className={`flex-shrink-0 h-5 w-5 ${feature.included ? 'text-green-500' : 'text-gray-300'}`}>
                          {feature.included ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                        <span className={`ml-2 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-500'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`w-full py-2 px-4 rounded-md font-medium ${plan.id === 'free' ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    {plan.id === 'free' ? 'Começar Grátis' : 'Assinar Agora'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Perguntas Frequentes</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">O que são créditos?</h4>
                <p className="text-gray-600 text-sm">Créditos são utilizados para conversão de XML para PDF e consultas de NFe. Cada operação consome 1 crédito.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Os créditos acumulam?</h4>
                <p className="text-gray-600 text-sm">Não, os créditos são renovados mensalmente e não acumulam para o mês seguinte.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Posso mudar de plano?</h4>
                <p className="text-gray-600 text-sm">Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Como funciona o processamento em lote?</h4>
                <p className="text-gray-600 text-sm">O processamento em lote permite enviar múltiplos arquivos XML de uma só vez, economizando tempo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}