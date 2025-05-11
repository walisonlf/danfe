// Este arquivo é necessário para o Next.js reconhecer a estrutura de diretórios
// Redireciona para a página inicial do App Router

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/');
  }, []);
  
  return null;
}