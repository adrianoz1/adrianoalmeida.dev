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

1. consulta posts recentes no X via API oficial
2. aplica scoring editorial e deduplicacao
3. seleciona os 5-7 itens mais fortes
4. gera um unico rascunho diario em Markdown
5. abre uma PR automatica com o arquivo em `content/blog/drafts`

O objetivo do arquivo gerado e servir como compilado diario para revisao antes de publicar no blog ou transformar em newsletter.

## Variaveis de ambiente

Use `.env.example` como base.

Obrigatorias para o cron completo:

- `CRON_SECRET`
- `X_BEARER_TOKEN`
- `GITHUB_TOKEN`
- `GITHUB_REPO_OWNER`
- `GITHUB_REPO_NAME`

O OpenAI e opcional:

- com `OPENAI_API_KEY`, o corpo do digest e escrito pela IA
- sem `OPENAI_API_KEY`, o sistema gera um fallback deterministico em Markdown

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

- `src/lib/news-digest/sources/x.ts`: coletor do X
- `src/lib/news-digest/editorial.ts`: scoring, filtragem e deduplicacao
- `src/lib/news-digest/markdown.ts`: gera o rascunho em Markdown
- `src/lib/news-digest/github.ts`: cria branch, commit e pull request via API do GitHub
- `src/pages/api/cron/news-digest.ts`: endpoint do cron

## Proximos refinamentos

- adicionar fontes extras via RSS e portais tech
- reforcar filtros para rumor, duplicata fraca e marketing vazio
- criar um fluxo de promocao de `drafts` para `published`
