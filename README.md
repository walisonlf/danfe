# Micro SaaS de Gerenciamento de NFe

## Descrição

Este é um Micro SaaS focado no gerenciamento de Notas Fiscais Eletrônicas (NFe), oferecendo as seguintes funcionalidades:

- Conversão de XML de NFe para PDF com layout profissional
- Consulta de NFe por chave de acesso diretamente na SEFAZ
- Processamento em lote para usuários premium
- Sistema de créditos e assinaturas

## Tecnologias Utilizadas

### Frontend
- Next.js (React)
- Tailwind CSS para estilização
- Axios para requisições HTTP

### Backend
- Node.js com Express.js
- Integração com API MeuDanfe para conversão XML para PDF
- Integração com SEFAZ para consultas de NFe

### Banco de Dados
- Supabase (PostgreSQL)

### Pagamentos
- Stripe para gerenciamento de assinaturas e pagamentos

## Funcionalidades Detalhadas

### 1. Autenticação e Gerenciamento de Usuários
- Registro e login de usuários
- Perfis de usuário com diferentes planos
- Gerenciamento de assinaturas

### 2. Conversão de XML para PDF
- Upload de arquivos XML
- Validação do XML contra schema da SEFAZ
- Conversão para PDF utilizando API MeuDanfe
- Download do PDF gerado

### 3. Consulta de NFe por Chave de Acesso
- Interface para inserção da chave de acesso
- Consulta direta na SEFAZ
- Exibição dos dados da NFe
- Opção de download do XML e PDF

### 4. Processamento em Lote (Premium)
- Upload de múltiplos XMLs
- Processamento assíncrono
- Notificação por e-mail quando concluído
- Download em massa dos PDFs gerados

## Instalação e Configuração

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
# NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
# NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
# MEUDANFE_API_KEY=sua_chave_api_meudanfe
# STRIPE_SECRET_KEY=sua_chave_secreta_stripe
# STRIPE_WEBHOOK_SECRET=seu_segredo_webhook_stripe

# Iniciar em modo desenvolvimento
npm run dev
```

## Estrutura do Projeto

```
/
├── public/            # Arquivos estáticos
├── src/
│   ├── app/           # Rotas e páginas (Next.js App Router)
│   ├── components/    # Componentes React reutilizáveis
│   ├── lib/           # Bibliotecas e utilitários
│   ├── services/      # Serviços de API e integrações
│   └── styles/        # Estilos globais
├── .env.example       # Exemplo de variáveis de ambiente
├── next.config.js     # Configuração do Next.js
├── package.json       # Dependências do projeto
└── README.md          # Documentação
```

## Próximos Passos

1. Configurar ambiente de desenvolvimento
2. Implementar autenticação com Supabase
3. Desenvolver interface de upload de XML
4. Integrar com API MeuDanfe para conversão
5. Implementar consulta por chave de acesso
6. Configurar sistema de assinaturas com Stripe
7. Desenvolver processamento em lote
8. Implementar sistema de notificações