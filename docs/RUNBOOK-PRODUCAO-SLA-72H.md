# Runbook de Produção — Vision Pages AI
> SLA de 72h · Fase manual (pré-Dashboard)
> Origem: adaptado de "Sampa Vision Pages — Esboço v1 · Julho 2026", mantendo
> apenas o SLA e as métricas — a stack de produção proposta naquele esboço
> (Framer/v0.dev/Leonardo/n8n) **não** foi adotada nesta fase.

## 1. Objetivo

Formalizar como a equipe opera a etapa manual de refinamento do rascunho
gerado pela IA, garantindo entrega dentro de 72h, usando só o que já existe
hoje: Supabase Table Editor + geração de e-mail manual (ou via Zapier, se
configurado).

Este runbook é temporário por natureza — quando o Dashboard existir, estas
métricas passam a ser visualizadas ali, e este documento é aposentado.

## 2. SLA

| Etapa | Prazo alvo |
|---|---|
| Rascunho gerado pela IA | Poucos segundos (já automático) |
| Refinamento humano | Até 48h após o lead entrar em `em_producao` |
| Entrega ao cliente | Até 72h a partir do `created_at` do lead |

O prazo de 72h é contado a partir de `leads.created_at` (quando o visitante
envia o briefing), não do momento em que a equipe começa o refinamento —
isso é proposital: pressão de fila deve aparecer cedo, não só perto do prazo.

## 3. Métricas monitoradas

### Leading (acompanhar durante a produção, permitem agir antes do atraso)

| Métrica | Como medir hoje (manual) |
|---|---|
| Tempo por etapa | Diferença entre `created_at` → mudança para `em_producao` → `delivered_at`. Sem automação ainda: anotar manualmente ou olhar o histórico de edições no Table Editor. |
| Acurácia do briefing | Quantas vezes a equipe precisou pedir mais contexto ou refazer uma seção do rascunho gerado. Registrar em `leads.notes`. |
| Fila em aberto | `SELECT count(*) from vision.leads WHERE status = 'aguardando_refinamento'` — rodar direto no SQL Editor do Supabase. |

### Lagging (medem o resultado, olhadas em retrospectiva/semanal)

| Métrica | Como medir hoje (manual) |
|---|---|
| SLA de entrega | % de leads com `delivered_at - created_at <= 72h`. Query abaixo. |
| Taxa de conversão do briefing | Leads criados ÷ visitas na `/briefing` (por enquanto sem analytics implantado — fica pendente até GA4/Clarity entrarem, fora de escopo desta fase). |

### Query pronta para rodar no SQL Editor (SLA de entrega)

```sql
select
  count(*) filter (where delivered_at is not null) as entregues,
  count(*) filter (
    where delivered_at is not null
      and delivered_at - created_at <= interval '72 hours'
  ) as dentro_do_sla,
  round(
    100.0 * count(*) filter (
      where delivered_at is not null
        and delivered_at - created_at <= interval '72 hours'
    ) / nullif(count(*) filter (where delivered_at is not null), 0),
    1
  ) as percentual_dentro_do_sla
from vision.leads
where created_at >= now() - interval '30 days';
```

## 4. Fluxo operacional (atualizado em 26/11/2026)

Os dados ficam no projeto Supabase **Sampa-Core**, schema `vision` (`vision.leads`,
`vision.generation_events`, `vision.events`). Os avisos saem de
`avisos@notify.sampa.vision` pela Resend, disparados pelo banco.

| # | Etapa | Quem / o quê | Status |
|---|---|---|---|
| 1 | Visitante envia o briefing; o navegador grava o lead com um `id` próprio | App | `aguardando_refinamento` |
| 2 | **Aviso "Novo lead"** com o briefing completo → `leads@app.sampa.vision` (ou `leads@try.sampa.vision` se `origem = try`) | Gatilho `on_lead_insert` | — |
| 3 | A IA gera o rascunho; o servidor grava `draft_page` e `rascunho_salvo_em` | `/api/generate` (chave de serviço) | — |
| 4 | **Aviso "Rascunho pronto"** com `rascunho.html` (prévia) e `rascunho.json` → `draft@app.sampa.vision` | Gatilho `on_draft_saved` | — |
| 5 | Equipe revisa briefing + rascunho e assume o lead | Equipe | `em_producao` |
| 6 | Produz e publica a página final; preenche `final_url` | Equipe | `em_producao` |
| 7 | Envia o link ao cliente; preenche `delivered_at` (now()) | Equipe | `entregue` |

Prazo: **72 h** entre `created_at` e `delivered_at`.

### 4.1 Quando algo falha (o lead nunca se perde)

O lead é gravado **antes** da geração. Se a IA falhar, o briefing já está no banco.

- **Geração com erro** (chave da Anthropic, tempo esgotado, resposta inválida): o servidor grava
  `generation_events.status = failed` com o erro → **alerta imediato** em `draft@sampa.vision`.
- **Lead do app sem rascunho após 1 h** (ex.: o visitante fechou a aba durante a geração): a rotina
  `vision-alerta-sem-rascunho` (pg_cron, a cada 15 min) envia alerta para `draft@sampa.vision`
  e marca `alerta_sem_rascunho_em`.
- Nos dois casos a equipe produz a página **a partir do briefing**, seguindo os passos 5 a 7.

### 4.2 Acompanhamento

- **Dashboard interno** da fila (status, idade, prazo de 72 h, rascunho sim/não), atualizado a cada 2 h,
  das 8h às 20h, em dias úteis. E-mails aparecem mascarados (LGPD).
- **Relatório diário às 08:00** em `leads@sampa.vision`: abandono do briefing (`vision.events`),
  fila e prazos vencendo.
- Leads de teste: marcar `notes` começando com `[TESTE]` — ficam fora de avisos e relatórios.

## 5. O que fica de fora, por decisão explícita

O esboço original (`sampa_vision_pages_brief.html`) propõe uma esteira de
produção completa — Framer, v0.dev, Leonardo AI, n8n self-hosted, Qdrant,
Apollo/Hunter para SDR, Search Console/GA4/Clarity para SEO. Nenhum desses
foi adotado nesta fase: o time decidiu manter a operação manual simples
(Table Editor + e-mail) até o volume de leads justificar automatizar.

Revisitar esta decisão quando:
- a fila (`aguardando_refinamento`) consistentemente tiver mais itens do
  que a equipe consegue processar dentro do SLA, ou
- o Dashboard (Fase 2 do roadmap arquitetural) começar a ser construído —
  nesse momento, essas métricas migram para lá.
