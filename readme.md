# FIAP Farms Mobile

## 📄 Descrição

O **FIAP Farms Mobile** é um aplicativo de gerenciamento agrícola desenvolvido com **React Native** e **Expo**, que integra diversos recursos modernos para facilitar o controle e monitoramento de atividades rurais.

O projeto oferece funcionalidades completas para:

- **Dashboard interativo** com gráficos e métricas da produção;
- **Gestão de produtos** com categorização e controle de estoque;
- **Acompanhamento de produções** com status e cronogramas;
- **Controle de vendas** e análise de receitas;
- **Gerenciamento de metas** e objetivos de produção;
- **Alertas e notificações** sobre estoque e prazos;
- **Navegação intuitiva** via React Navigation (Drawer e Stack);
- **Formulários otimizados** com React Hook Form e Zod;
- **Autenticação e armazenamento** com Firebase (Auth, Firestore e Storage);
- **Interface moderna e responsiva** utilizando Gluestack-UI com TailwindCSS;

---

## ✨ Principais Destaques Técnicos

- Estrutura baseada na **Clean Architecture** (`Domain`, `Data`, `Infra`, `Presentation`, `Main`);
- Utilização de **TDD (Test-Driven Development)** e abordagem **AAA (Arrange, Act, Assert)**;
- Aplicação dos princípios **SOLID**;
- Gerenciamento de estado com **Redux**;
- **Dependency Injection (DI)** para controle de dependências;
- **Gráficos interativos** com React Native Chart Kit;
- **Controle de imagens** com Expo Image Picker;
- **Máscaras de input** para melhor UX em formulários;
- Padrões utilizados:
  - **Repository Pattern**
  - **Factory Pattern**
  - **System Under Test (SUT)** nos testes
- **Small Commits** com Git, promovendo histórico limpo e revisões eficientes;
- Interface moderna e altamente responsiva, com foco na **usabilidade do usuário**;
- **Gráficos e visualizações** para análise de dados de produção;
- **Performance otimizada** com FlatList para listas de dados.

---

## ⚙️ Estrutura do Projeto

<pre>
<code class="language-text">├── domain # Entidades, casos de uso e contratos (interfaces)</code>
<code class="language-text">├── data # Implementações dos repositórios</code>
<code class="language-text">├── infra # Integrações externas (ex: Firebase)</code>
<code class="language-text">├── presentation # Componentes, páginas, hooks e UI</code>
<code class="language-text">├── main # Inicialização da aplicação, rotas e providers</code>
</pre>

## ☕ Tecnologias Utilizadas

- **React Native** com **Expo**
- **React Navigation** (Drawer e Stack)
- **React Hook Form** + **Zod**
- **Firebase** (Auth, Firestore e Storage)
- **Gluestack-UI** + **TailwindCSS**
- **React Native Chart Kit** para gráficos e visualizações
- **Expo Image Picker** para upload de imagens
- **React Native Mask Input** para máscaras em formulários
- **TypeScript** para tipagem estática

---

## � Funcionalidades Principais

### Dashboard

- **Gráficos interativos** de produção e vendas
- **Métricas em tempo real** de estoque e receitas
- **Visão geral** das atividades da fazenda

### Gestão de Produtos

- **Cadastro e edição** de produtos agrícolas
- **Categorização** por tipo de produto
- **Controle de estoque** com alertas de níveis mínimos e máximos
- **Upload de imagens** dos produtos

### Controle de Produção

- **Acompanhamento do ciclo produtivo** (plantio → produção → colheita)
- **Status de produção** em tempo real
- **Cronograma de atividades** com datas de início e fim
- **Quantidades produzidas** vs planejadas

### Vendas e Receitas

- **Registro de vendas** com detalhamento
- **Análise de receitas** e lucros
- **Histórico de transações**

### Metas e Objetivos

- **Definição de metas** de produção/vendas
- **Acompanhamento de objetivos** mensais/anuais
- **Relatórios de performance**

### Sistema de Alertas

- **Notificações de estoque baixo**
- **Lembretes de atividades** agrícolas
- **Alertas de prazos** importantes

---

## �💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você precisa instalar a versão mais recente do **NodeJS** e **Expo**.

## 🚀 Instalação e Execução

### 1. Clone o repositório:

```sh
  git clone https://github.com/lucas-ssv/fiap-farms-mobile.git
  cd fiap-farms-mobile
```

### 2. Instale as dependências:

```sh
  npm install
  # ou
  yarn install
```

### 3. Configure as variáveis de ambiente do Firebase:

Crie um arquivo `.env` na raiz do projeto e adicione:

```env
EXPO_PUBLIC_APP_ID="SUA_APP_ID"
EXPO_PUBLIC_PROJECT_ID="SEU_PROJECT_ID"
EXPO_PUBLIC_API_KEY="SUA_API_KEY"
EXPO_PUBLIC_BUCKET_URL="SEU_BUCKET_URL"
```

### 4. Execute o projeto:

Para rodar o app, utilize um dos seguintes comandos:

```sh
  npm start       # Inicia o projeto no Expo
  npm run android # Executa no emulador ou dispositivo Android
  npm run ios     # Executa no simulador iOS (macOS apenas)
  npm run web     # Executa no navegador
```

### 5. Teste o projeto:

Para testar o app, utilize o seguinte comando:

```sh
  npm test       # Executa todos os testes
```
