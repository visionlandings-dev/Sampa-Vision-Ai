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
| Fila em aberto | `SELECT count(*) FROM leads WHERE status = 'aguardando_refinamento'` — rodar direto no SQL Editor do Supabase. |

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
from leads
where created_at >= now() - interval '30 days';
```

## 4. Fluxo operacional (usa o runbook manual já existente)

```text
1. Novo lead                    → status: aguardando_refinamento
2. Equipe pega o lead            → status: em_producao
3. Refina o rascunho (draft_page)
4. Publica onde for mais rápido hoje (fora do app — Framer, template
   próprio, ou o que a equipe já souber usar bem)
5. Preenche leads.final_url com o link publicado
6. Envia e-mail manual ao cliente com o link
7. Preenche leads.delivered_at (now())
8. status: entregue
```

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
