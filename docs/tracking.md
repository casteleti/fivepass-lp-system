# Tracking — GA4 / GTM / Meta Pixel

Tracking centralizado em [`lib/analytics.ts`](../lib/analytics.ts) (função `track`) e
disparado a partir de [`components/ui/Analytics.tsx`](../components/ui/Analytics.tsx)
(listener global, montado em todas as páginas via `app/layout.tsx`), com eventos
adicionais específicos de estado interno em
[`components/sections/FinalCTA.tsx`](../components/sections/FinalCTA.tsx),
[`components/ui/Quiz.tsx`](../components/ui/Quiz.tsx) e
[`app/thank-you/page.tsx`](../app/thank-you/page.tsx).

## Transporte

- Todo evento vai para `window.dataLayer.push({ event, ...payload })` (GTM) **e**
  `window.gtag("event", ...)` (GA4 direto).
- **Não chamamos `fbq` diretamente.** O Meta Pixel já está instalado via tag no GTM —
  ela deve escutar os eventos custom do dataLayer abaixo. Chamar `fbq` aqui duplicaria
  o `PageView`/eventos no Pixel.
- `payload` sempre inclui `page` (o `window.location.pathname` no momento do disparo).
- `NEXT_PUBLIC_META_PIXEL_ID` está vazio em `.env.local`/`.env.example` — o snippet do
  Pixel em `app/layout.tsx` só carrega se essa env tiver valor, então está **inativo**
  de propósito (Pixel já vem pelo GTM).

## Sections (`section_name`)

`id` da `<section>` na LP → `section_name` enviado nos eventos
(mapa em `SECTION_NAMES`, `components/ui/Analytics.tsx`):

| `id` HTML | `section_name` | Componente |
|---|---|---|
| `hero` | `hero` | Hero |
| `hero-pitch` | `hero` | HeroPitch (mobile) |
| `conta` | `perda_taxa` | Loss |
| `problema` | `problema` | PainPoints |
| `virada` | `solucao` | HowItWorks |
| `muda` | `beneficios` | Benefits |
| `plataforma` | `plataforma` | Plataforma |
| `prova` | `prova_social` | SocialProof |
| `faq` | `faq` | FAQ |
| `porte` | `casos_uso` | UseCases |
| `agora` | `urgencia` | Urgency |
| `cta` | `cta_final` | FinalCTA |

> O `id` real no HTML do UseCases é `porte` (âncora de scroll já em produção — não
> renomeado para não quebrar links existentes). O evento usa `section_name: casos_uso`.

Valores de `section_name` fora das sections numeradas (resolvidos por contexto do clique):

- `navbar` — clique dentro do `<header>`
- `footer` — clique dentro do `<footer>`
- `sticky_mobile` — clique no botão fixo mobile (`.mobile-sticky-cta`)
- `thank_you` — clique no botão de WhatsApp da página `/thank-you`
- `outro` — fallback se não identificar nenhum container

## CTAs (`button_name`)

Não existe enum fixo de `cta_name`. O parâmetro **`button_name`** é o texto literal do
botão/link clicado, normalizado (espaços colapsados) e truncado em 60 caracteres. Use
em conjunto com `section_name` (enum fechado) para segmentar CTAs nos relatórios.

## Eventos

| Evento | Disparo | Frequência |
|---|---|---|
| `section_view` | seção entra 40% na viewport (IntersectionObserver) | 1x por seção |
| `cta_click` | clique em qualquer `a[href="#cta"]` | toda vez |
| `whatsapp_click` | clique em qualquer `a[href*="wa.me"]` na LP, ou botão de WhatsApp em `/thank-you` | toda vez |
| `form_start` | primeiro `focusin` em INPUT/TEXTAREA/SELECT | 1x por `form_type` |
| `form_submit` | evento `submit` do **form principal** (`FinalCTA`) — tentativa de envio, não confirma sucesso | 1x por sessão |
| `quiz_start` | quiz abre (clique em CTA WhatsApp que intercepta pro modal, ou mount em `/quiz` standalone) | toda vez que abre |
| `quiz_complete` | última pergunta do quiz respondida (antes da etapa de contato) | 1x por sessão de quiz |
| `quiz_submit` | clique em "Enviar" no quiz — tentativa de envio, não confirma sucesso | 1x por sessão de quiz |
| `lead_success` | confirmação de sucesso pós-API (`res.ok` ou `409` duplicado) — **único evento de conversão real**, tanto do form principal quanto do quiz | 1x por envio confirmado |
| `scroll_25` / `scroll_50` / `scroll_75` / `scroll_100` | marcos de rolagem da página | 1x cada marco |
| `time_on_page_30s` / `time_on_page_60s` / `time_on_page_120s` | tempo decorrido na página | 1x cada |

## Parâmetros por evento

Todo evento recebe `page` automaticamente. Parâmetros adicionais:

| Evento | Parâmetros extras |
|---|---|
| `section_view` | `section_name` |
| `cta_click` | `section_name`, `button_name`, `destination: "form_final"` |
| `whatsapp_click` | `section_name`, `button_name`, `destination: "whatsapp"` |
| `form_start` | `form_type: "main_form" \| "quiz"` |
| `form_submit` | `form_type: "main_form"` |
| `quiz_start` | `form_type: "quiz"`, `trigger: "wa_cta" \| "standalone_page"` |
| `quiz_complete` | `form_type: "quiz"`, `eventType`, `volume`, `dor` |
| `quiz_submit` | `form_type: "quiz"`, `eventType`, `volume`, `dor` |
| `lead_success` | `form_type: "main_form" \| "quiz"` (+ `eventType`, `volume`, `dor` quando `form_type` é `quiz`) |
| `scroll_25/50/75/100` | — (valor embutido no nome do evento) |
| `time_on_page_*` | — (valor embutido no nome do evento) |

## Notas de implementação

- **Conversão a configurar como meta no GA4/GTM/Meta**: `lead_success`. É o único
  evento que reflete envio confirmado ao RD Station/banco — `form_submit` e
  `quiz_submit` são apenas tentativas (podem falhar silenciosamente na rede).
- Use `form_type` para segmentar funil do form principal (LP, seção `#cta`) vs. funil
  do quiz (`/quiz` ou modal aberto a partir de um CTA de WhatsApp na LP).
- `button_name` é texto livre — bom para análise qualitativa de copy, não para
  segmentação dura em audiences.
- O quiz embutido na LP intercepta cliques em `a[href*="wa.me"]` (preventDefault) e
  abre como modal — por isso o mesmo clique pode disparar **`whatsapp_click`** (intenção
  de ir pro WhatsApp) e **`quiz_start`** (já que o usuário foi redirecionado pro quiz
  em vez do WhatsApp direto). Isso é esperado, não duplicação de bug.
