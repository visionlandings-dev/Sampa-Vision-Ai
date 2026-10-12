# ADR-008: Migração do Landing System MVP para a Arquitetura GS-OIF

> **Status:** Proposed (não aprovado)
> **Data:** 2026-10-11
> **Depende de:** ADR-002, ADR-003, ADR-004, ADR-005, ADR-006, ADR-007 (Precedência da Foundation Edition e separação entre identidade institucional e expressão de produto da Sampa Vision AI; ACCEPTED em 2026-10-05; Sampa Group Brand Governance)
> **Nota de numeração:** renumerada de ADR-007 para ADR-008. A ADR-007 pertence à precedência Foundation (já aceita); uma proposta não desloca uma decisão aceita.

## 1. Contexto

O MVP ativo da Sampa Vision AI (Next.js App Router) validou o fluxo briefing -> geração por IA -> página. A arquitetura GS-OIF (contexto v0.6) estabelece que o modelo é a fonte da verdade, produtos são engines, instâncias são configurações, o Compiler Core é agnóstico a produto e renderers são targets substituíveis.

## 2. Decisão

O MVP **não** será refatorado diretamente como uma aplicação Next.js maior. Ele será decomposto em:

```text
MVP validado -> Conhecimento explícito -> Contratos -> Engine -> Instâncias -> Renderer
```

### 2.1 Preservado (validado no MVP)

- `BriefingAnswers` como contrato canônico de entrada (7 campos)
- `GeneratedPage` como base do `LandingContentIR` (`src/types/index.ts`)
- `GenerationEvent` como contrato de runtime (`status`, `delta`, `complete`, `error`)
- JSON estruturado como formato de saída; SSE como streaming
- Conteúdo separado dos componentes; componentização por camada
- Next.js App Router como renderer ativo

### 2.2 Não congelado (hipóteses / lacunas)

Brand Memory, demonstrações segmentadas, publisher, analytics de conversão, versionamento de instâncias, negociação completa de capacidades.

## 3. Decisões de governança

| Tema | Decisão |
|---|---|
| Diretório canônico das ADRs | `model/decisions/` |
| `additionalProperties` do briefing | `false` em cada objeto |
| Extensões do briefing | `BriefingExtras`, fora dos sete campos canônicos |
| Identificadores de schema | URNs versionadas (`urn:gs-oif:schema:...`) |
| Fonte dos eventos | Tipos reais do MVP |
| Limites de validação | `minLength` específicos da interface do MVP (10/10/10/10/15/8/8), aplicados após trim no Normalizer |
| IR em dois níveis | `LandingContentIR` (conteúdo gerado, os 8 campos do `GeneratedPage`) agora; `LandingPageIR` composto em versão posterior |
| Cardinalidade | `painPoints` e `benefits` com exatamente 3 itens; violação gera `IR_COLLECTION_CARDINALITY_VIOLATION` ou nova geração, nunca ajuste silencioso |

## 4. Divergência a eliminar

`validateBriefing()` em `src/lib/claude.ts` exige apenas 5 caracteres para todos os campos, divergindo da interface. Após a adoção do schema, a API deve consumi-lo, eliminando a validação paralela.

## 5. Limites arquiteturais

- Conhecimento do Landing System vive em `products/landing-system/`.
- `packages/compiler-core/` não conhece briefing, headlines, CTAs, dores, regras de CRO ou segmentos.
- Pipeline macro (`Model -> Contracts -> Compiler -> ViewModel -> Renderer -> Artifact`) e pipeline interno de 7 estágios são níveis diferentes, não concorrentes.
- Cor: a identidade e a expressão cromática do produto obedecem aos namespaces, papéis e restrições definidos pela ADR-007. A ADR-008 não cria, preserva nem redefine cores de identidade ou de interface.

## 6. Pré-requisito de integração

O repositório ainda não contém ADRs. A versão aceita da ADR-007 (PDF do projeto; os `.md` do workspace são versões anteriores `PROPOSED — BLOCKED` e não devem ser usados) deve entrar no mesmo commit ou em commit anterior a esta ADR. O contexto v0.6 deve ser integrado na versão integral (240 linhas).

## 7. Consequências

Após aprovação: `LandingBriefingContract` sai de draft quando os critérios do seu §13 forem atendidos, seguido de `LandingContentIR` e, depois, do `LandingPageIR` composto, `LandingInstance`, `LandingEngineDefinition`, `RendererCapabilities`, `CompilationInput` e `CompilationOutput`.

## 8. Nota sobre o `#38BDF8` no contexto v0.6

O uso de `#38BDF8` no exemplo de resolução de alias do contexto v0.6 é histórico e não normativo após a aceitação da ADR-007. Esse valor não deve originar ou sobrescrever tokens. A atualização do exemplo será tratada em revisão posterior do contexto, preservando o documento v0.6 nesta integração.

Em uma futura v0.7, o exemplo deverá migrar de cor literal para token semântico governado pela ADR-007. Isso resolve o conflito de precedência sem reescrever retroativamente o contexto v0.6.
