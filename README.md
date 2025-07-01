# ConfigCat A/B Testing com Next.js

Uma aplicação web moderna desenvolvida com React e Next.js, integrada ao ConfigCat para realização de testes A/B com Percentage Rollout. Este projeto demonstra como implementar feature flags de forma profissional, com suporte a múltiplos ambientes e segmentação consistente de usuários.

## 🚀 Características Principais

- **Next.js 15** com TypeScript para desenvolvimento type-safe
- **ConfigCat SDK** integrado para feature flags e testes A/B
- **Percentage Rollout 50/50** para distribuição equitativa de usuários
- **Segmentação por user.identifier** para consistência entre sessões
- **Suporte a múltiplos ambientes** (desenvolvimento e produção)
- **CSS Modules** para estilização modular e isolada
- **VSCode configurado** com extensões e configurações otimizadas
- **Hooks personalizados** para consumo reativo de feature flags

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no ConfigCat (gratuita disponível)
- VSCode (recomendado para desenvolvimento)

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd configcat-ab-testing
```

2. **Instale as dependências:**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env.local
```

4. **Edite o arquivo `.env.local` com suas configurações:**
```env
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=sua-chave-sdk-aqui
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_DEBUG_MODE=true
```

5. **Execute a aplicação:**
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## 🔧 Configuração do ConfigCat

### 1. Criando a Feature Flag

No painel do ConfigCat ([https://app.configcat.com/](https://app.configcat.com/)):

1. Crie uma nova feature flag com a chave `ab_test_home_banner`
2. Defina o tipo como `Text`
3. Configure o valor padrão como `A`

### 2. Configurando o Percentage Rollout

1. Acesse a feature flag `ab_test_home_banner`
2. Adicione uma regra de targeting
3. Selecione "Percentage Rollout"
4. Configure:
   - 50% dos usuários recebem o valor `A`
   - 50% dos usuários recebem o valor `B`

### 3. Obtendo as Chaves SDK

1. No painel do ConfigCat, vá para "SDK Keys"
2. Copie a chave para o ambiente desejado:
   - **Desenvolvimento:** Use a chave do ambiente "Test"
   - **Produção:** Use a chave do ambiente "Production"

## 🌍 Configuração de Ambientes

### Desenvolvimento (.env.local)
```env
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=configcat-sdk-1/sua-chave-dev
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_DEBUG_MODE=true
```

### Produção (.env.production.local)
```env
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_CONFIGCAT_SDK_KEY=configcat-sdk-1/sua-chave-prod
NEXT_PUBLIC_API_URL=https://sua-api-producao.com/api
NEXT_PUBLIC_DEBUG_MODE=false
```

## 🎯 Como Funciona o Teste A/B

### Segmentação por user.identifier

A aplicação utiliza o atributo `user.identifier` para garantir que cada usuário sempre veja a mesma variação:

1. **Usuários não autenticados:** Um ID único é gerado e armazenado no localStorage
2. **Usuários autenticados:** Use o ID do usuário do seu sistema de autenticação
3. **Consistência:** O ConfigCat usa este ID para calcular deterministicamente qual variação mostrar

### Percentage Rollout

- **50% dos usuários** veem a **Variação A** (design clássico)
- **50% dos usuários** veem a **Variação B** (design inovador)
- A distribuição é baseada no hash do `user.identifier`
- Mesma variação é sempre exibida para o mesmo usuário

## 📁 Estrutura do Projeto

```
configcat-ab-testing/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal
│   │   └── layout.tsx            # Layout da aplicação
│   ├── components/
│   │   ├── EnvironmentInfo.tsx   # Componente de info do ambiente
│   │   ├── EnvironmentInfo.module.css
│   │   ├── ABTestDisplay.tsx     # Componente do teste A/B
│   │   └── ABTestDisplay.module.css
│   ├── hooks/
│   │   └── useConfigCat.ts       # Hooks para feature flags
│   ├── lib/
│   │   ├── configcat.ts          # Configuração do ConfigCat
│   │   └── env.ts                # Validação de variáveis de ambiente
│   └── utils/
│       └── userUtils.ts          # Utilitários para ID de usuário
├── .vscode/                      # Configurações do VSCode
├── .env.example                  # Exemplo de variáveis de ambiente
├── .env.local                    # Variáveis de desenvolvimento (não commitado)
├── .env.production.local         # Variáveis de produção (não commitado)
└── README.md                     # Este arquivo
```

## 🔨 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

## 🎨 Desenvolvimento no VSCode

### Extensões Recomendadas

O projeto inclui configurações para as seguintes extensões:

- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **Tailwind CSS IntelliSense** - Autocomplete para Tailwind
- **TypeScript Hero** - Organização de imports
- **Auto Rename Tag** - Renomeação automática de tags
- **Path Intellisense** - Autocomplete para caminhos

### Configurações Automáticas

- Formatação automática ao salvar
- Organização automática de imports
- Validação de TypeScript em tempo real
- Suporte completo ao Tailwind CSS

## 🧪 Testando a Aplicação

### Teste Manual

1. Acesse a aplicação em desenvolvimento
2. Observe qual variação (A ou B) é exibida
3. Clique em "Novo Usuário" para simular outro usuário
4. Verifique que a distribuição é aproximadamente 50/50

### Validação de Consistência

1. Anote o ID do usuário atual
2. Recarregue a página várias vezes
3. Confirme que a mesma variação é sempre exibida
4. Teste em diferentes navegadores com o mesmo localStorage

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente de produção
3. Deploy automático a cada push

### Outras Plataformas

1. Execute `npm run build`
2. Configure as variáveis de ambiente de produção
3. Sirva os arquivos da pasta `.next`

## 🔍 Monitoramento e Analytics

### ConfigCat Dashboard

- Monitore a distribuição de usuários entre variações
- Analise métricas de performance das feature flags
- Configure alertas para mudanças de configuração

### Integração com Analytics

Para rastrear conversões e métricas:

```typescript
// Exemplo de tracking
const { variant } = useABTest(userObject);

// Enviar evento para seu sistema de analytics
analytics.track('ab_test_view', {
  test_name: 'home_banner',
  variant: variant,
  user_id: userId
});
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

### Problemas Comuns

**Feature flags não carregam:**
- Verifique se a chave SDK está correta
- Confirme que a feature flag existe no ConfigCat
- Verifique a conectividade com a internet

**Variação sempre a mesma:**
- Confirme que o Percentage Rollout está configurado
- Verifique se o user.identifier está sendo enviado
- Teste com diferentes IDs de usuário

**Erros de TypeScript:**
- Execute `npm run type-check` para ver erros detalhados
- Verifique se todas as dependências estão instaladas
- Confirme que os tipos estão corretos

### Links Úteis

- [Documentação do ConfigCat](https://configcat.com/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Desenvolvido com ❤️ usando React, Next.js e ConfigCat**

