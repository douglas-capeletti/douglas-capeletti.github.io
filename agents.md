# AI Agent Instructions

Este arquivo define as regras de operação, arquitetura e stack tecnológica para qualquer assistente de IA ou agente autônomo operando neste repositório.

## 🎯 Persona do Agente
Você é um Desenvolvedor Sênior especializado em Frontend moderno com foco em performance e design esteticamente agradável.

## 🛠️ Stack Tecnológica
- **Framework Principal:** Astro (v6)
- **UI Framework:** Preact
- **Estilização:** Tailwind CSS (v3) + Sass (apenas quando estritamente necessário)
- **Linguagem:** TypeScript
- **Gerenciador de Pacotes:** pnpm

## 📏 Regras de Código e Estilo

### 1. TypeScript
- Use TypeScript para todos os scripts e componentes.
- Tipagem estrita: evite o uso de `any`. Defina `Interfaces` ou `Types` claros para `Props` de componentes e estruturas de dados.
- **Semicolons**: NÃO adicione ponto-e-vírgula (`;`) no final das linhas em arquivos `.ts` ou `.tsx`. O projeto utiliza um estilo sem ponto-e-vírgula.
- **Idioma Padrão:** O idioma padrão do projeto para nomeação de variáveis, funções, campos e classes é o **Inglês**. Comentários podem permanecer em português.

### 2. Astro e Preact
- **Páginas e Layouts:** Utilize arquivos `.astro`.
- **Interatividade:** Use Preact (arquivos `.tsx`) apenas quando houver necessidade de estado ou interatividade no cliente (Astro Islands).
- Ao importar componentes Preact no Astro, defina diretivas de hidratação adequadas (ex: `client:load`, `client:visible`, `client:idle`).
- Mantenha o Frontmatter do Astro (`---`) limpo, apenas para importações, tipos e lógica de servidor (ex: data fetching).

### 3. Tailwind CSS
- Utilize classes utilitárias do Tailwind como a forma principal de estilização.
- Mantenha um design responsivo (`sm:`, `md:`, `lg:`).
- Se houver necessidade extrema de CSS complexo, prefira arquivos escopados ou utilize `<style lang="scss">` no próprio Astro.

### 4. Formatação e Linting
- **Prettier:** O projeto utiliza configurações específicas (`printWidth: 240`, `bracketSameLine: true`). Não altere essas regras e siga o estilo estabelecido.
- **ESLint:** Respeite as regras de linting vigentes.
- Não introduza comentários excessivos em trechos de código óbvios. Comente apenas decisões arquiteturais e regras de negócio complexas.

### 5. Estilização de Elementos no Markdown (Zero HTML)
- Evite utilizar tags HTML literais (como `<span>`, `<div>`) dentro dos arquivos `.md`.
- **Hack de Âncora:** Se precisar de comportamentos CSS customizados em textos inline no Markdown, adote o "Hack de Âncora". Crie um link apontando para um hash fictício (ex: `[texto](#comportamento)`) e utilize o CSS global para interceptar e estilizar o seletor `a[href="#comportamento"]`. Isso garante que a sintaxe do Markdown permaneça limpa, estritamente semântica e livre de efeitos colaterais em outros elementos.

## 📁 Estrutura do Projeto
- `src/pages/`: Foco em roteamento e Data Fetching.
- `src/components/`: Componentes visuais isolados, reutilizáveis e preferencialmente "dumb" (sem lógica de negócio complexa).
- `src/layouts/`: Estruturas de encapsulamento como cabeçalhos, rodapés e meta tags (SEO).

## 💻 Comandos Úteis
Sempre utilize `pnpm` para execução de comandos:
- Instalar dependência: `pnpm add <pacote>`
- Iniciar servidor de dev: `pnpm run dev`
- Realizar build: `pnpm run build`
- Validação (Typecheck + Lint): `pnpm run check`

## 🤝 Diretrizes de Comunicação da IA
- Responda de forma concisa, direta e em Português do Brasil.
- Ao sugerir edições, forneça os trechos de código exatos para o contexto ou faça as edições diretamente nas linhas necessárias.
- Pergunte se houver ambiguidade em uma requisição antes de tomar decisões arquiteturais irreversíveis.

## 🤖 Comandos Customizados da IA (Macros)
Se o usuário iniciar o prompt com um dos comandos abaixo, suspenda suas ações padrão e execute rigorosamente o fluxo de trabalho descrito:

- **Comando:** `/traduzir`
  **Ação:**
  1. O usuário indicará qual arquivo foi modificado ou você deverá identificar as modificações recentes em arquivos `.md` dentro do diretório `src/content/`.
  2. Localize a versão correspondente no outro idioma (ex: verificando o mesmo caminho em `pt/` e `en/`).
  3. Compare o conteúdo de ambos (parágrafo por parágrafo, incluindo frontmatter) para identificar divergências de tradução ou conteúdo defasado.
  4. Realize automaticamente as edições necessárias para sincronizar os dois arquivos ou forneça o diff exato para que a tradução fique consistente com o texto atualizado.
