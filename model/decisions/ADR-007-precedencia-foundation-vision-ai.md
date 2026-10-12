---
adr: ADR-007
title: Precedência da Foundation Edition e separação entre identidade institucional e expressão de produto da Sampa Vision AI
status: ACCEPTED
date: 2026-10-03
accepted_at: 2026-10-05
deciders: Sampa Group Brand Governance
supersedes: —
related: [ADR-001, ADR-004, ADR-005]
blocked_by: []
ratified:
  - id: DEC-02
    subject: Electric como token funcional de interação
    ratified_by: Fogaça — Diretor de Transformação e Inteligência Organizacional
    ratified_at: 2026-10-03
  - id: EVID-01
    subject: Registro de Homologação Recuperado da Foundation Edition v1.0 (Apêndice A)
    ratified_by: Fogaça — Diretor de Transformação e Inteligência Organizacional
    ratified_at: 2026-10-05
pending_before_merge:
  - Verificação final da numeração contra model/decisions/
---

# ADR-007 · Precedência da Foundation Edition e separação entre identidade institucional e expressão de produto da Sampa Vision AI

> **Status: ACCEPTED em 2026-10-05.** Todos os bloqueios foram encerrados por ratificação.
>
> **Pendente antes do merge:** o número `ADR-007` é provisório. Confirmar contra `model/decisions/`.
>
> **Fora do escopo desta aceitação:** a certificação dos ativos, do vetor mestre e dos Gates G01–G04 continua bloqueada. Derivados seguem em `FAIL-CLOSED`.

---

## 1. Bloqueios e ratificações

### 1.1 Bloqueios

Nenhum bloqueio aberto.

| ID | Bloqueio | Resolução | Estado |
|---|---|---|---|
| EVID-01 | Não havia documento homologado da Foundation Edition v1.0 nas fontes do projeto. | Ratificação do Registro de Homologação Recuperado (Apêndice A) em 2026-10-05. | Encerrado |

### 1.2 Decisões ratificadas

| ID | Decisão | Validação técnica | Ratificado por | Data |
|---|---|---|---|---|
| DEC-02 | Electric (`#00BFFF`) é token exclusivamente funcional de interação da Sampa Vision AI, subordinado às restrições da seção 4.4. | Reviewer | Fogaça — Diretor de Transformação e Inteligência Organizacional | 2026-10-03 |
| EVID-01 | Registro de Homologação Recuperado da Foundation Edition v1.0, no escopo do Apêndice A. | Reviewer | Fogaça — Diretor de Transformação e Inteligência Organizacional | 2026-10-05 |

Termo de ratificação de DEC-02:

> Aprovo a DEC-02 nos termos da seção 4.4 da versão vigente do ADR-007. Ratifico o Electric (`#00BFFF`) como token exclusivamente funcional de interação da Sampa Vision AI, subordinado às restrições estabelecidas nessa seção. Autorizo a remoção de DEC-02 do cabeçalho e da lista de bloqueios. O ADR permanece PROPOSED — BLOCKED, exclusivamente por EVID-01.

Termo de ratificação de EVID-01:

> Ratifico este registro recuperado como evidência institucional da homologação da Foundation Edition v1.0, nos limites do escopo estabelecido no Apêndice A. Ele não substitui o documento original, não certifica ativos e mantém a produção de derivados em FAIL-CLOSED até certificação específica.

Com a aceitação do ADR, DEC-02 passa a produzir efeito. As alterações da seção 5 ficam liberadas para execução, depois da verificação da numeração.

---

## 2. Contexto

O pacote **Hexágono-S v0.2.0** introduziu o *Transitional Identity Standard v1.0*. Esse padrão substitui a paleta Void · Electric pela paleta Ink · Institutional Blue e define o Vision Violet `#8B6AB0` como identificador da Sampa Vision AI. As instruções do projeto Vision AI, por sua vez, tratam Void, Asphalt, Concrete, Fog, White e Electric como "tokens oficiais".

Um comparativo de três alternativas avaliou o conflito:

| Opção | Proposta | Resultado |
|---|---|---|
| A | O Standard v1.0 governa a Vision AI. | Não aprovada como formulada |
| B | A Vision AI fica independente, com símbolo próprio. | Rejeitada |
| C | A Vision AI mantém o próprio sistema, com endosso do Sampa Group. | Rejeitada |
| **D** | **A Foundation governa a identidade; Precision Dark expressa o produto.** | **Aprovada em princípio** |

O comparativo partiu de uma premissa incorreta. Ele tratou pertencer ao grupo e ter posicionamento global como objetivos em conflito. A arquitetura de marcas não define o alcance geográfico da empresa.

O próprio pacote Hexágono-S se declara transitório e sem poder de precedência. Por isso ele não serve de base de autoridade para esta decisão.

Fontes anteriores registram que o `#00BFFF` já foi descartado como cor de posicionamento e substituído por Sky. Recuperar o Electric só se justifica se a função dele mudar.

---

## 3. Decisão

### 3.1 Precedência

1. A **Foundation Edition v1.0** é a autoridade de identidade da Logo Family, com base no Registro de Homologação Recuperado ratificado em 2026-10-05 (Apêndice A).
2. O *Transitional Identity Standard v1.0* não tem precedência sobre a Foundation. Nada dele é herdado automaticamente: nem paleta, nem tipografia, nem regras de uso.
3. **Precision Dark** é uma camada de expressão de produto subordinada à Foundation. **Void Intelligence** pode continuar como subconceito expressivo.
4. A camada de expressão não pode substituir, redesenhar ou estender a identidade institucional.

### 3.2 Arquitetura de marca

- Um único símbolo estrutural identifica as quatro marcas: Sampa Group, Sampa Educacional, Sampa School e Sampa Vision AI.
- A assinatura da vertical é **SAMPA + VISION AI**.
- A Sampa Vision AI é, ao mesmo tempo, uma vertical do Sampa Group e uma AI Business Platform de alcance global.

### 3.3 Separação de namespaces

As cores passam a pertencer a três namespaces disjuntos. Nenhum renderer pode promover um token de produto a identidade.

| Namespace | Responde a | Pode ser usado em símbolo, wordmark, favicon ou assinatura? |
|---|---|---|
| `identity.*` | Quem somos | Sim |
| `product.surface.*` / `product.content.*` | Onde a interface acontece | Não |
| `product.interaction.*` | O que está acontecendo na interface | Não |

---

## 4. Especificação

### 4.1 Contrato de tokens

```yaml
identity:
  vision:
    violet:
      value: "#8B6AB0"
      role: institutional_identifier
      permitted_surfaces: [product.surface.void]
      restricted_surfaces: [product.surface.asphalt]
      prohibited_uses:
        - symbol_on_asphalt
        - symbol_on_institutional_blue
        - small_text_on_asphalt
      fallback: monochrome_authorized

product:
  surface:
    void:     { value: "#0A0A0A", role: base }
    asphalt:  { value: "#1C1C1C", role: elevated }
    concrete: { value: "#2E2E2E", role: border }
  content:
    primary:  { value: "#F5F5F3", role: text_and_primary_action }
    muted:    { value: "#8A8A8A", role: metadata }
  interaction:
    electric:                       # DEC-02 ratificada
      value: "#00BFFF"
      role: functional_signal
      prohibited_in: [identity.*, symbol, wordmark, favicon, avatar, signature, brand_gradient]
```

A localização física dos arquivos segue o ADR-001. Os tokens de identidade ficam em `identity/foundation/*/tokens.json`. Os de produto ficam no mesmo diretório até existir o `design-system/` previsto no ADR-001. As projeções `.css`, `.ts` e `tailwind.ts` continuam geradas e read-only.

### 4.2 Contraste verificado (WCAG 2.x)

| Primeiro plano | Superfície | Razão | Uso permitido |
|---|---|---|---|
| Violet `#8B6AB0` | Void `#0A0A0A` | 4,51:1 | Símbolo, assinatura e texto de destaque |
| Violet `#8B6AB0` | Asphalt `#1C1C1C` | 3,88:1 | Só elemento gráfico não crítico, nunca o símbolo |
| Violet `#8B6AB0` | Concrete `#2E2E2E` | 3,10:1 | Proibido como identificador |
| Electric `#00BFFF` | Void `#0A0A0A` | 9,33:1 | Sinal funcional |
| Electric `#00BFFF` | Asphalt `#1C1C1C` | 8,03:1 | Sinal funcional |
| Electric `#00BFFF` | Concrete `#2E2E2E` | 6,40:1 | Sinal funcional |
| Content `#F5F5F3` | Void `#0A0A0A` | 18,14:1 | Texto e ação primária |
| Content `#F5F5F3` | Asphalt `#1C1C1C` | 15,61:1 | Texto e ação primária |
| Muted `#8A8A8A` | Void `#0A0A0A` | 5,73:1 | Metadata |
| Muted `#8A8A8A` | Asphalt `#1C1C1C` | 4,94:1 | Metadata |

### 4.3 Ação primária

O CTA principal usa `product.content.primary` (`#F5F5F3`) como fundo e `product.surface.void` como texto, com razão de 18,14:1. A ação primária não usa Violet nem Electric.

### 4.4 Electric como sinal funcional *(DEC-02 · ratificada em 2026-10-03)*

> **Regra.** Electric (`#00BFFF`) é um token funcional exclusivo da interface da Sampa Vision AI. Não integra a identidade institucional, não substitui o Violet e não é usado como CTA primário. Seu uso fica restrito a estados, feedback, foco, progresso, conexões, sinalização técnica e visualização de dados.

A tabela abaixo detalha a regra. Em caso de divergência, vale o texto da regra.

| Permitido | Vedado |
|---|---|
| `focus-visible` | Símbolo ou wordmark |
| Seleção e estado ativo | Avatar e favicon |
| Progresso e indicadores de execução | Assinatura institucional |
| Conexão, streaming, dados em tempo real | CTA primário |
| Links técnicos | Grandes campos decorativos |
| Cursor e caret | Gradientes de marca |
| Visualização de dados | Substituição do Violet |
| Feedback operacional | Definição cromática pública da Vision AI |

Com essas regras, Violet e Electric não competem como acentos, porque cada um pertence a um sistema semântico próprio:

- **Violet** identifica a marca.
- **Electric** sinaliza o estado da interface.

**Validação técnica (2026-10-03).** O Reviewer confirmou as razões de contraste da seção 4.2 e a coerência da regra com as seções 4.3 e 4.5. O parecer cobre o texto da regra, não a tabela linha a linha. A tabela foi alinhada à regra nesta revisão: o item vedado "CTA padrão das telas" passou a "CTA primário".

### 4.5 Validação no compilador

As regras desta seção ficam no contrato e são verificadas pelo Validator. Documentação narrativa não basta. O `compiler-core` permanece agnóstico de domínio (ADR-005): ele só avalia restrições declaradas nos contratos.

| Código | Severidade | Condição |
|---|---|---|
| `TOKEN_NAMESPACE_VIOLATION` | error | Token `product.*` resolvido em `SemanticRole` de identidade |
| `SURFACE_NOT_PERMITTED` | error | Token aplicado sobre uma superfície em `prohibited_uses` |
| `SURFACE_RESTRICTED` | warning | Token aplicado sobre uma superfície em `restricted_surfaces` |
| `ASSET_NOT_CERTIFIED` | error | Derivação gerada a partir de um asset sem status `CERTIFIED` |

### 4.6 Tipografia

- **Inter** é a fonte de implementação provisória do produto. Isso não constitui decisão de marca.
- **JetBrains Mono** segue nas funções técnicas.
- Nenhuma migração para Space Grotesk ou Manrope.
- A tipografia de marca só será congelada com o contrato tipográfico canônico da Foundation.

### 4.7 Símbolo e assets

```yaml
asset: Favicon_Sampa.svg
sha256: aa5965a26d87e305e2d1b7080b1656a167bcb3577b81ff1d9385ebca71520684
viewBox: "0 0 1024 1024"
paths: 2
status: CANDIDATE
certification: NOT CERTIFIED
derivatives: BLOCKED
gates: [G01, G02, G03, G04]   # nomes propostos, critérios pendentes
```

| Gate | Nome proposto | Estado |
|---|---|---|
| G01 | Integridade Geométrica | Critérios pendentes |
| G02 | Integridade Vetorial | Critérios pendentes |
| G03 | Integridade Perceptiva | Critérios pendentes |
| G04 | Integridade Produtiva | Critérios pendentes |

Os critérios, as tolerâncias, as evidências e os responsáveis de cada Gate precisam vir do documento original ou ser aprovados como nova especificação. Os Gates não entram neste ADR como critérios já aprovados.

### 4.8 Máscara de plataforma

O raio de 22,4% de ícones iOS é responsabilidade do **renderer de plataforma**. O master permanece geometricamente neutro. O raio não é registrado como exceção à identidade.

---

## 5. Consequências

### Liberado

- Preservar a arquitetura de quatro marcas.
- Desenvolver a expressão Precision Dark.
- Usar a tipografia atual do produto em caráter provisório.
- Analisar o SVG como candidato.
- Preparar templates sem alterar a geometria do símbolo.
- Produzir conteúdo textual, roteiros e storyboards.

### Bloqueado

- Criar símbolo exclusivo para a Vision AI.
- Reduzir o símbolo compartilhado a endosso.
- Homologar o Electric como cor institucional.
- Migrar a tipografia para o Transitional Standard.
- Criar favicon só com o núcleo do símbolo.
- Gerar Lottie, ícones ou derivações a partir de asset não certificado.
- Incorporar o arredondamento de plataforma à geometria do master.

### Alterações liberadas (após a verificação da numeração)

1. **Instruções do projeto.** Substituir a lista "Tokens oficiais" pelos três namespaces da seção 3.3. Redefinir o "ponto focal" conforme as seções 4.3 e 4.4.
2. **`identity/foundation/*/tokens.json`.** Incluir `identity.vision.violet` e os namespaces `product.*` com as restrições da seção 4.1.
3. **`@gs-oif/contracts`.** Incluir os campos `permitted_surfaces`, `restricted_surfaces`, `prohibited_uses` e `prohibited_in`, e os códigos de diagnóstico da seção 4.5.
4. **Landing atual da Vision AI.** Auditar os usos de `#00BFFF` como CTA ou destaque de marca e realocá-los para `content.primary`.

---

## 6. Alternativas rejeitadas

| Opção | Motivo |
|---|---|
| A · Standard v1.0 governa | Reintroduz paleta, tipografia e regras de uma identidade declarada transitória. |
| B · Vision AI independente | Rompe a Logo Family, exige um símbolo inexistente e cria uma segunda família institucional. |
| C · Híbrido com endosso | Reduz uma relação estrutural a endosso e cria uma arquitetura de marca nunca aprovada. |

A pontuação matemática do comparativo não é critério de aprovação.

---

## Apêndice A · Registro de Homologação Recuperado *(ratificado em 2026-10-05)*

Nenhuma fonte disponível constitui o documento homologado da Foundation Edition v1.0. Este registro documenta institucionalmente a decisão anterior recuperada. Ele não se apresenta como o documento original nem como documento contemporâneo à homologação.

O escopo é estrito. O registro confirma apenas a autoridade da Foundation e a arquitetura da Logo Family. Ele não certifica nenhum ativo.

### A.1 Evidências consultadas

Nenhuma das fontes abaixo encerra EVID-01 sozinha. A avaliação é do Reviewer; estas fontes não constam nos documentos do projeto e não foram verificadas nesta minuta.

| Fonte | O que sustenta | Por que não basta |
|---|---|---|
| `01_FOUNDATION.md` (`FROZEN / IMMUTABLE`) | Constituição institucional congelada | Não especifica Logo Family, tokens ou homologação visual |
| `Benchmark Executivo - Foundation-Edition-2026.md` | Governança e oportunidades estratégicas | Não é ato de homologação da identidade |
| `Founding Release v1.0` | Kit submetido ao crivo final | Contém símbolos e cores legados; não comprova a Foundation vigente |
| Registros históricos do Utility Pack | Reconstrução da decisão | Não equivalem a documento canônico homologado |

### A.2 Registro

```yaml
document_type: recovered_approval_record
status: RATIFIED
authority: Sampa Group Brand Governance
subject: Foundation Edition v1.0
nature: >
  Registro recuperado. Não reproduz nem substitui o documento original.

original_approval:
  date: não localizada
  approver: não localizado
  evidence: [01_FOUNDATION.md, Benchmark Executivo - Foundation-Edition-2026.md,
             Founding Release v1.0, registros do Utility Pack]

confirms:
  - foundation_edition_v1_as_identity_authority
  - logo_family: [Sampa Group, Sampa Educacional, Sampa School, Sampa Vision AI]
  - shared_structural_symbol: true
  - vision_ai_identifier: { token: identity.vision.violet, value: "#8B6AB0" }

does_not_certify:
  - Favicon_Sampa.svg
  - candidatos E03
  - vetor mestre do símbolo
  - Gates G01–G04 e seus critérios
  - identificadores cromáticos das demais marcas

production:
  derivatives: FAIL-CLOSED
  condition: certificação específica de cada ativo

ratification:
  ratified_by: Fogaça — Diretor de Transformação e Inteligência Organizacional
  ratified_at: 2026-10-05
  statement: >
    Ratifico este registro recuperado como evidência institucional da
    homologação da Foundation Edition v1.0, nos limites do escopo estabelecido
    no Apêndice A.
    Ele não substitui o documento original, não certifica ativos e mantém
    a produção de derivados em FAIL-CLOSED até certificação específica.
```

### A.3 Efeito da ratificação

| Item | Efeito |
|---|---|
| EVID-01 | Encerrado; ADR promovido a `ACCEPTED` em 2026-10-05 |
| Seção 3.1, cláusula 1 | Deixou de ser condicional |
| Seção 4.7 e Gates | Inalterados: ativos seguem `CANDIDATE` e derivados bloqueados |
