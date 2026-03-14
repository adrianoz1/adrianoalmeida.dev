## Blog em Markdown

Este projeto usa Next.js com posts em Markdown armazenados no proprio repositorio:

- `content/blog/published/*.md`: posts publicos
- `content/blog/drafts/*.md`: rascunhos gerados pelo pipeline editorial
- `/blog`: listagem publica
- `/blog/[slug]`: pagina estatica de cada post

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Pipeline editorial diario

Foi adicionada a etapa 2 do projeto com um worker serverless em `/api/cron/news-digest`.

Fluxo atual:

1. consulta feeds RSS oficiais de TechCrunch, Ars Technica e WIRED
2. aplica scoring editorial e deduplicacao
3. seleciona os 5-7 itens mais fortes
4. gera um unico rascunho diario em Markdown
5. abre uma PR automatica com o arquivo em `content/blog/drafts`

O objetivo do arquivo gerado e servir como compilado diario para revisao antes de publicar no blog ou transformar em newsletter.

## Variaveis de ambiente

Use `.env.example` como base.

Obrigatorias para o cron completo:

- `CRON_SECRET`
- `GITHUB_TOKEN`
- `GITHUB_REPO_OWNER`
- `GITHUB_REPO_NAME`

O OpenAI e opcional:

- com `OPENAI_API_KEY`, o corpo do digest e escrito pela IA
- sem `OPENAI_API_KEY`, o sistema gera um fallback deterministico em Markdown

Feeds RSS podem ser sobrescritos por env se voce quiser trocar a curadoria:

- `RSS_TECHCRUNCH_FEED`
- `RSS_ARS_TECHNICA_FEED`
- `RSS_WIRED_FEED`

## Teste local

Dry-run sem abrir PR:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" "http://localhost:3000/api/cron/news-digest?dryRun=1"
```

Execucao completa com abertura de PR:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" "http://localhost:3000/api/cron/news-digest"
```

## Vercel Cron

O arquivo `vercel.json` agenda o worker diariamente:

```json
{
  "crons": [
    {
      "path": "/api/cron/news-digest",
      "schedule": "0 11 * * *"
    }
  ]
}
```

`11:00 UTC` equivale a `08:00` em `America/Sao_Paulo`.

## Arquitetura adicionada

- `src/lib/news-digest/sources/rss.ts`: coletor RSS das fontes editoriais
- `src/lib/news-digest/editorial.ts`: scoring, filtragem e deduplicacao
- `src/lib/news-digest/markdown.ts`: gera o rascunho em Markdown
- `src/lib/news-digest/github.ts`: cria branch, commit e pull request via API do GitHub
- `src/pages/api/cron/news-digest.ts`: endpoint do cron

## Newsletter

Foi adicionada uma base de newsletter com:

- formulario de captura em `src/components/NewsletterSignup.tsx`
- `POST /api/newsletter/subscribe` para salvar emails no DynamoDB
- `GET /api/newsletter/unsubscribe` para cancelamento simples
- `POST /api/newsletter/send-latest` para enviar o post publicado mais recente via Resend
- workflow em `.github/workflows/send-newsletter-on-main.yml` para disparar o envio quando `content/blog/published/**` mudar na `main`

### Envs da newsletter

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `NEWSLETTER_TABLE_NAME`
- `RESEND_API_KEY`
- `NEWSLETTER_FROM_EMAIL`
- `NEWSLETTER_REPLY_TO` opcional
- `NEWSLETTER_DISPATCH_SECRET`
- `SITE_URL`

### Segredos no GitHub Actions

Crie estes secrets no repositorio:

- `NEWSLETTER_TRIGGER_URL`
  Exemplo: `https://a2dev.com.br/api/newsletter/send-latest`
- `NEWSLETTER_DISPATCH_SECRET`
  Mesmo valor configurado na Vercel

### Testes manuais

Cadastrar email:

```bash
curl -X POST "https://a2dev.com.br/api/newsletter/subscribe" \
  -H "Content-Type: application/json" \
  -d '{"email":"voce@exemplo.com"}'
```

Dry-run do disparo:

```bash
curl -X POST "https://a2dev.com.br/api/newsletter/send-latest?dryRun=1" \
  -H "Authorization: Bearer $NEWSLETTER_DISPATCH_SECRET"
```

Disparo real:

```bash
curl -X POST "https://a2dev.com.br/api/newsletter/send-latest" \
  -H "Authorization: Bearer $NEWSLETTER_DISPATCH_SECRET"
```

## Proximos refinamentos

- adicionar fontes extras via RSS e portais tech
- reforcar filtros para rumor, duplicata fraca e marketing vazio
- criar um fluxo de promocao de `drafts` para `published`
- substituir o `scan` do DynamoDB por indice dedicado quando a base crescer
