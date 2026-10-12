# LandingContentIR

> **Contract ID:** `gs-oif.product.landing-system.content-ir`
> **Version:** `0.3.0-draft`
> **Schema:** `urn:gs-oif:schema:landing-system:content-ir:v1`
> **Authority:** Normative Product Contract (proposta; não aprovada)
> **Owner:** `products/landing-system/`
> **Depends on:** ADR-008 (aprovação pendente), LandingBriefingContract

## 1. Objetivo

Representação do **conteúdo gerado** pelo Engine a partir do `LandingBriefingContract`. Formaliza o `GeneratedPage` do MVP (`src/types/index.ts`). Não descreve a composição completa da página.

```text
LandingBriefingContract
        ↓
LandingContentIR
        ↓ Resolver
LandingPageIR   (futuro; composição, ordem, evidências, oferta, instância)
        ↓ Renderer
Artifact
```

O `LandingPageIR` completo fica para versão posterior, sem campos inventados agora.

## 2. Campos (confirmados no MVP)

| Campo | Tipo | Cardinalidade |
|---|---|---|
| `heroTitle` | string | |
| `heroSubtitle` | string | |
| `heroCta` | string | |
| `painPoints` | string[] | exatamente 3 |
| `benefits` | `{ title, description }[]` | exatamente 3 |
| `socialProofHook` | string | |
| `offerSection` | string | |
| `footerCta` | string | |

## 3. Regras

1. Conteúdo semântico apenas: sem estilos, classes CSS ou tokens de design.
2. Sem propriedades específicas de React, Next.js, Tailwind ou HTML.
3. O Compiler Core transporta o IR sem interpretá-lo.
4. Um único CTA primário, herdado do briefing.
5. Objeto fechado (`additionalProperties: false`); extensões exigem versão nova.
6. A cardinalidade é verificada pelo Validator. Se a geração produzir quantidade diferente, emite-se o diagnóstico `IR_COLLECTION_CARDINALITY_VIOLATION` ou tenta-se nova geração. Nunca completar, cortar ou reordenar silenciosamente.

## 4. Mapeamento inicial para o Copy Deck

| Seção do Copy Deck | Origem |
|---|---|
| `navbar` | shell/configuração da instância |
| `hero` | `heroTitle`, `heroSubtitle`, `heroCta` |
| `proofbar` | `socialProofHook` + evidências resolvidas |
| `diagnosis` | `painPoints` e `benefits` |
| `process` | conhecimento do Landing System |
| `modules` | catálogo/capacidades do produto |
| `pricing` | `offerSection` + configuração da oferta |
| `faq` | base de conhecimento da instância |
| `final-cta` | `footerCta` |

## 5. Pendências normativas

1. Definir o `LandingPageIR` composto (conteúdo + conhecimento do produto + instância + evidências + oferta + ordem das seções).
2. Definir a versão mínima compatível do Landing System Engine.
