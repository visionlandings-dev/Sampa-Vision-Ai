# LandingBriefingContract

> **Versão:** 0.1.0-draft  
> **Status:** RECONSTRUCTED — não normativo  
> **Contract ID:** `gs-oif.product.landing-system.briefing`  
> **Schema:** `urn:gs-oif:schema:landing-system:briefing:v1`  
> **Data da reconstrução:** 2026-10-12

## 1. Status e natureza

Este documento foi reconstruído porque o contrato original citado pela ADR-008 não foi localizado no repositório, na baseline v0.3.2, no pacote de CI v0.1.1 nem nas fontes históricas disponibilizadas.

Enquanto permanecer com o estado `RECONSTRUCTED — não normativo`, ele é uma proposta de consolidação técnica. Não substitui um original eventualmente recuperado e não autoriza, por si só, mudanças no runtime ou a promoção da ADR-008 para `ACCEPTED`.

## 2. Objetivo

Definir o envelope, os campos canônicos, as extensões permitidas, a normalização e as regras de validação do briefing de entrada do Landing System.

O contrato não define geração de conteúdo, `LandingContentIR`, composição de página, interface do wizard, tratamento de dados pessoais ou publicação de artefatos.

## 3. Fontes e precedência

Esta reconstrução usa, nesta ordem:

1. os tipos e o comportamento verificáveis do MVP;
2. `briefing.schema.json` da baseline v0.3.2;
3. ADR-008, ainda `PROPOSED`;
4. o patch de normalização do §7 da CI v0.1.1.

Em caso de divergência com o código atual, a divergência deve ser registrada e resolvida por decisão humana. Não se presume que este draft prevaleça sobre o runtime existente.

## 4. Envelope canônico

O briefing é um objeto fechado com:

- `answers`: obrigatório, contendo os sete campos canônicos;
- `extras`: opcional, contendo apenas extensões expressamente previstas.

Propriedades desconhecidas são rejeitadas no objeto raiz, em `answers` e em `extras`.

## 5. Respostas canônicas

| Campo | Pergunta representada | Comprimento mínimo após `trim` |
|---|---|---:|
| `produto` | O que você vende? | 10 |
| `publico` | Quem é o cliente ideal? | 10 |
| `dor` | Qual é a maior dor antes de contratar? | 10 |
| `diferencial` | Por que escolher você e não o concorrente? | 10 |
| `beneficios` | Quais são os três principais benefícios práticos? | 15 |
| `oferta` | Existe alguma condição especial ou urgência? | 8 |
| `cta` | Qual é a ação única do botão? | 8 |

Todos os sete campos são obrigatórios e textuais. `beneficios` permanece uma única resposta textual no briefing; a cardinalidade de três itens pertence ao `LandingContentIR`, não a este campo.

## 6. Extensões

`extras` é opcional e fechado. Nesta versão, admite:

- `concorrentes`: texto opcional;
- `referencia`: texto opcional.

Uma nova extensão exige revisão do schema e deste contrato. Extensões não podem ser promovidas silenciosamente ao conjunto de respostas canônicas.

## 7. Normalização

### Normalização anterior à validação

Antes da aplicação das regras do JSON Schema, o `Normalizer` deve aplicar
`trim` a todos os campos textuais de `answers`. Os limites `minLength` são
avaliados sobre os valores normalizados.

A expressão `pattern: "\\S"` funciona como proteção adicional contra conteúdo
exclusivamente composto por espaços e não substitui a normalização.

Fluxo normativo:

`Loader → Normalizer (trim) → Validator (JSON Schema)`

O sistema não pode completar, ampliar ou reescrever respostas para satisfazer
os limites mínimos de comprimento.

Nesta versão, o contrato não impõe transformação aos campos de `extras` além das regras declaradas no schema.

## 8. Validação

O JSON Schema Draft 2020-12 é a representação executável das regras estruturais deste contrato. A validação deve ocorrer somente depois da normalização.

Regras mínimas:

- exigir `answers` e seus sete campos;
- aplicar os `minLength` da seção 5 aos valores normalizados;
- rejeitar texto sem caractere não espacial por meio de `pattern: "\\S"`;
- rejeitar propriedades não declaradas;
- não corrigir automaticamente entradas inválidas.

## 9. Identificação e versionamento

O schema usa a URN `urn:gs-oif:schema:landing-system:briefing:v1` e JSON Schema Draft 2020-12.

Mudanças incompatíveis no envelope ou nos sete campos canônicos exigem nova versão da URN. Ajustes editoriais que não alterem a validação podem permanecer na mesma versão, desde que documentados.

## 10. Integração com o runtime

O wizard e a API devem executar a mesma política de validação. Após a adoção deste contrato, a API deve consumir o schema e eliminar a validação paralela de cinco caracteres hoje existente em `validateBriefing()`.

Até essa adoção, a diferença entre os limites do wizard e os da API permanece uma divergência conhecida e impede classificar o contrato como implementado em produção.

## 11. Falhas e diagnósticos

Uma entrada inválida deve ser rejeitada com evidência suficiente para identificar o campo e a regra violada. Nesta versão, a CI comprova os erros estruturais emitidos pelo Ajv; este contrato não declara como implementado um código de diagnóstico de domínio específico.

Falhas de entrada não podem ser resolvidas por truncamento, preenchimento, expansão ou reescrita silenciosa do conteúdo fornecido.

## 12. Limites e segurança

Este draft não define comprimentos máximos, sanitização de HTML, classificação de dados pessoais, retenção ou controles de autorização. A ausência dessas regras não equivale a permissão irrestrita; elas devem ser definidas nos contratos ou políticas responsáveis antes da exposição a entradas não confiáveis.

## 13. Critérios de promoção

O estado `RECONSTRUCTED — não normativo` só pode ser removido quando todos os critérios abaixo forem atendidos:

- [ ] revisão humana confirmar a fidelidade aos tipos e ao fluxo real do MVP;
- [ ] ADR-008 for aprovada pela autoridade decisória;
- [ ] `briefing.schema.json` for validado como Draft 2020-12 na CI;
- [ ] o runtime aplicar `trim` antes do schema, sem completar ou reescrever respostas;
- [ ] a API substituir a validação paralela de cinco caracteres pelo contrato adotado;
- [ ] fixtures e testes de contrato passarem no ambiente de integração;
- [ ] a autoridade responsável aprovar explicitamente a versão normativa e sua procedência;
- [ ] eventual contrato original recuperado for reconciliado com esta reconstrução.

Até essa promoção, qualquer integração deste arquivo deve preservar o cabeçalho de reconstrução e manter a ADR-008 como `PROPOSED`.
