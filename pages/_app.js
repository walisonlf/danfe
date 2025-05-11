// Este arquivo é necessário para o Next.js reconhecer a estrutura de diretórios
// Mesmo usando o App Router (src/app), mantemos este arquivo para compatibilidade com o Netlify

import '../src/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;