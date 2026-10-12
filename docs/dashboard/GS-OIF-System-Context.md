# GS-OIF & Sampa.Vision — System Architecture & Operating Context
> **Version:** v0.6 | **Milestone:** Platform Level & Capability-Driven Compiler | **Date:** July 2026
> **North Star:** "Create a Model-Driven Organizational Intelligence Platform that unifies humans, AI agents, and organizational knowledge."

---

## 1. Visão Geral & Arquitetura em 4 Camadas (MDA)

O ecossistema obedece a uma **Model-Driven Architecture (MDA)** estrita, onde **o modelo é a fonte da verdade e toda implementação é uma projeção derivada**.

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 1. PRODUCTS LAYER (Domínio & Configurações)                            │
│    products/landing-system/ • products/academy-system/ • products/crm/ │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ (Injeta Planos & Instâncias)
┌───────────────────────────────────┴────────────────────────────────────┐
│ 2. COMPILER PLATFORM LAYER (Infraestrutura Agnóstica)                  │
│    @gs-oif/compiler-core • @gs-oif/plugin-api • @gs-oif/compiler-cli    │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ (Consome Contratos & Schemas)
┌───────────────────────────────────┴────────────────────────────────────┐
│ 3. CONTRACTS LAYER (Fonte da Verdade de Tipos & Schemas)               │
│    @gs-oif/contracts (Types, Schemas, IR, Diagnostic Severity)         │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ (Satisfaz Requisitos Negociados)
┌───────────────────────────────────┴────────────────────────────────────┐
│ 4. RENDERERS & COMPONENTS LAYER (Targets Substituíveis)               │
│    renderer-nextjs/ • renderer-html/ • @gs-oif/components-hero-standard │
└────────────────────────────────────────────────────────────────────────┘

```

---

## 2. Registros de Decisão Arquitetural (ADRs 001 a 006)

* **ADR-001 (Brand Identity vs. Design System):** Unifica a Fundação visual em `identity/`, prevendo a criação de um `design-system/` independente quando surgirem múltiplos produtos.
* **ADR-002 (Landing System as a Product):** O `landing-system` é um produto/engine de software e conhecimento (`products/landing-system/`), não uma página isolada. Uma landing page é uma instância parametrizada desse produto.
* **ADR-003 (Products are Engines, Instances are Configurations):** Produtos definem capacidades (`Engine`). Instâncias são configurações declarativas puras que apenas parametrizam o Engine via herança (`inherits`).
* **ADR-004 (Semantic Contracts to Renderable Artifacts):** O produto compila contratos semânticos em uma Representação Intermediária (`IR`) agnóstica. Frameworks de UI (Next.js, React, HTML, PDF) são meros alvos de renderização (*renderers/targets*).
* **ADR-005 (Compiler Core is Product-Agnostic):** O `@gs-oif/compiler-core` opera exclusivamente sobre abstrações genéricas (`ASTNode`, `SemanticRole`, `ViewModel`), sem conhecimento de regras de negócios específicas de produtos.
* **ADR-006 (Compiler Platform is Capability-Driven):** O compilador executa um plano declarativo configurável e realiza **Negociação de Capacidades** (`requires` da instância vs. `supports` do renderer) antes da compilação.

---

## 3. Estrutura Canônica do Repositório (`v0.6`)

```text
GS-OIF-Sampa.Vision/
│
├── 📄 README.md                          <-- Homepage & Visão Geral
├── 📄 .gitignore                         <-- Proteções de Ambiente
│
├── 📂 model/                             <-- SOURCE OF TRUTH DA LINGUAGEM
│   ├── gs-ra/, gs-kmm/, gs-ont/          <-- Metamodelo GS-OIF
│   ├── principles/, glossary/            <-- Princípios e Glossário
│   └── decisions/                        <-- Registros de ADRs (001 a 006)
│
├── 📂 standards/                         <-- CONVENÇÕES OPERACIONAIS
│   ├── naming/, markdown/, prompts/      <-- Padrões de escrita e engenharia
│   └── diagrams/, versioning/            <-- Padrões de diagramas e versão
│
├── 📂 packages/                          <-- PLATAFORMA DE COMPILAÇÃO
│   ├── 📂 contracts/                     <-- @gs-oif/contracts (Tipos, Schemas, Diagnósticos)
│   ├── 📂 plugin-api/                    <-- @gs-oif/plugin-api (Interface de Plugins)
│   ├── 📂 compiler-core/                 <-- @gs-oif/compiler-core (Motor Agnostic)
│   ├── 📂 compiler-cli/                  <-- CLI de execução (compile.ts)
│   ├── 📂 components/                    <-- Componentes distribuídos (@gs-oif/components-hero-standard)
│   └── 📂 renderer-nextjs/               <-- Target Next.js/Tailwind (Registry & Capabilities)
│
├── 📂 identity/                          <-- DESIGN TOKENS & VISUAL SYSTEM
│   ├── 📂 foundation/                    <-- Tokens Matemáticos (README.md manifest por módulo)
│   │   ├── colors/, typography/, spacing/
│   │   ├── sizing/, radius/, shadows/
│   │   └── motion/, grids/
│   ├── 📂 assets/                        <-- Ativos de Marca (logos/, icons/, social/, illustrations/)
│   ├── 📂 components/                    <-- Especificação de Componentes (hero/, navbar/, button/)
│   ├── 📂 patterns/                      <-- Padrões Recorrentes (hero-proof/, pricing-stack/)
│   └── 📂 templates/                     <-- Composição de Páginas (landing/)
│
├── 📂 knowledge/                         <-- DOMÍNIOS DE CONHECIMENTO AUTOCONTIDOS
│   ├── brand/                            <-- objects/, evidence/, diagrams/, decisions/, assets/
│   ├── landing-system/                   <-- objects/, evidence/, diagrams/, decisions/
│   └── ai/, growth/, operations/         <-- Demais domínios da organização
│
├── 📂 products/                          <-- PRODUTOS DO ECOSSISTEMA
│   └── 📂 landing-system/                <-- Product Engine
│       ├── strategy/, copy/, wireframes/
│       ├── ui/, implementation/, analytics/
│       └── 📂 instances/                 <-- Instâncias Declarativas
│           └── sampa-vision/             <-- tokens.json, copy.md, metadata.json
│
├── 📂 runtime/                           <-- OS 4 MOTORES DE EXECUÇÃO
│   ├── humans/, agents/                  <-- Human & Agent Engines
│   └── workflows/, automations/          <-- Workflow & Automation Engines
│
├── 📂 prompts/                           <-- AI ASSEMBLY LINE (ROLE-FIRST)
│   ├── architect/chatgpt.md              <-- Papel 01: Arquiteto
│   ├── researcher/perplexity.md          <-- Papel 02: Pesquisador
│   ├── synthesis/chatgpt.md              <-- Papel 03: Síntese
│   ├── writer/claude.md                  <-- Papel 04: Redator
│   ├── designer/lovable.md               <-- Papel 05: Designer
│   ├── engineer/cursor.md                <-- Papel 06: Engenheiro
│   └── reviewer/chatgpt.md               <-- Papel 07: Revisor
│
├── 📂 docs/                              <-- TORRE DE CONTROLE & GOVERNANÇA
│   └── dashboard/                        <-- Control Panel & Documentos Executivos
│
└── 📂 experiments/                       <-- SANDBOX ISOLADO

```

---

## 4. Contratos da Plataforma (`@gs-oif/contracts`)

Tipagem oficial consumida pelo compilador, plugins e renderizadores (`packages/contracts/types.ts`):

```typescript
export type DiagnosticSeverity = 'error' | 'warning' | 'info' | 'hint';

export interface Diagnostic {
  code: string;
  message: string;
  severity: DiagnosticSeverity;
  nodeId?: string;
  suggestion?: string;
}

export interface RequirementContract {
  motion?: boolean;
  forms?: boolean;
  serverComponents?: boolean;
  pdfExport?: boolean;
}

export interface CapabilitiesContract {
  renderer: string;
  version: string;
  supports: RequirementContract;
}

export interface StageFingerprints {
  inputHash: string;
  normalizedHash: string;
  validatedHash: string;
  resolvedHash: string;
  artifactHash: string;
}

export interface CompilationInput {
  instancePath: string;
  target: string;
  pipelinePlan?: string[];
  options?: Record<string, unknown>;
}

export interface CompilationOutput {
  success: boolean;
  fingerprints: StageFingerprints;
  diagnostics: Diagnostic[];
  artifact?: {
    target: string;
    files: Array<{ path: string; content: string }>;
  };
}

```

---

## 5. Pipeline de Compilação em 7 Estágios

Toda execução de compilação consome um plano declarativo e atravessa 7 etapas:

1. **Loader:** Carrega o contrato pai do Engine e a declaração da Instância.
2. **Normalizer:** Preenche valores omissos e normaliza a estrutura.
3. **Validator:** Audita as regras declarativas (`rules.json`) e executa a **Negociação de Capacidades** (`requires` vs `supports`). Retorna diagnósticos com severidade.
4. **Resolver:** Resolve aliasing de tokens (`{color.brand.primary}` ➔ `#38BDF8`) e injeta objetos de estilo computado puro (`ComputedStyle`).
5. **Optimizer:** Executa a serialização canônica, calcula fingerprints por estágio (SHA-256) e aplica cache incremental.
6. **Renderer:** Mapeia a `ViewModel` resolvida contra o registro do target selecionado (`packages/renderer-nextjs/registry.json`).
7. **Artifact:** Emite o código ou documento final (`Hero.tsx`, `landing.html`, `spec.pdf`).

---

## 6. Mapeamento da AI Assembly Line (Role-First)

A produção por modelos de IA obedece à especialização por **Papel (Estável)**:

| # | Papel (Arquitetura) | Engine Padrão | Prompt Source (Git) | Entregável Canônico |
| --- | --- | --- | --- | --- |
| **01** | **Architect** | ChatGPT (GPT-5.5) | `prompts/architect/chatgpt.md` | Architecture Decision Record (ADR) |
| **02** | **Researcher** | Perplexity | `prompts/researcher/perplexity.md` | Benchmark & Dados de Mercado |
| **03** | **Synthesis Engine** | ChatGPT (GPT-5.5) | `prompts/synthesis/chatgpt.md` | GS Decision Model |
| **04** | **Writer** | Claude 3.5 Sonnet | `prompts/writer/claude.md` | Spec em Markdown / Copy Deck |
| **05** | **Designer** | Lovable / v0 | `prompts/designer/lovable.md` | UI Tokens & Specs de Componentes |
| **06** | **Engineer** | Cursor / Claude Code | `prompts/engineer/cursor.md` | Código Limpo (TSX, Tailwind, Next.js) |
| **07** | **Reviewer** | ChatGPT (GPT-5.5) | `prompts/reviewer/chatgpt.md` | Relatório de Auditoria e Conformidade |

---

## 7. Diretrizes de Governança para IA e Colaboradores

1. **Tokens são a Fonte da Verdade:** Nenhuma interface ou código pode inventar cores HEX, espaçamentos ou fontes sem que estejam declarados em `identity/foundation/*/tokens.json`.
2. **Projeções são Read-Only:** Arquivos `.css`, `.ts` e `tailwind.ts` são gerados automaticamente a partir dos arquivos `tokens.json`. Toda alteração deve ocorrer no JSON.
3. **Completude Local por Domínio:** Todo domínio em `knowledge/` (ex: `knowledge/brand/`) deve conter tudo o que precisa (`objects`, `evidence`, `diagrams`, `decisions`, `assets`).
4. **Instâncias são Declarativas:** Arquivos em `products/<product-name>/instances/` herdam e parametrizam o Engine pai via atributo `inherits`.
5. **Comunicação por Diagnósticos:** O compilador deve comunicar inconformidades via objetos `Diagnostic` (`error`, `warning`, `info`, `hint`), sem falhar silenciosamente.

