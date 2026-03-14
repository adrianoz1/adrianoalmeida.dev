---
title: "Bem-vindo ao meu blog"
excerpt: "Este blog será a base editorial do projeto, com posts em Markdown publicados diretamente do repositório."
date: "2026-03-13"
author: "Adriano Almeida"
tags:
  - blog
  - markdown
  - tecnologia
coverTitle: "Nova área editorial"
---

Este blog foi criado para ser a camada editorial do site da **aa.dev**.

## O que este blog resolve

Ele cria uma base editorial simples, auditável e totalmente versionada dentro do próprio projeto.

Em vez de depender de um CMS externo ou de um banco de dados logo no início, a ideia é manter o fluxo leve:

- conteúdo em arquivo
- revisão por Pull Request
- publicação controlada no próprio repositório

## Como o conteúdo será organizado

A proposta é simples:

- os posts ficam versionados no próprio repositório
- o conteúdo é escrito em **Markdown**
- a publicação acontece sem banco de dados
- os rascunhos podem ser auditados antes de ir ao ar

## Próximos passos do fluxo editorial

Nos próximos passos, essa estrutura vai evoluir para receber:

1. rascunhos automáticos com base em notícias e discussões relevantes
2. uma rotina diária para sugerir novos artigos
3. um fluxo de revisão por Pull Request antes da publicação

### Separação entre rascunho e publicado

Os textos sugeridos automaticamente devem ficar em uma área de rascunho, enquanto os posts aprovados passam para a área pública do blog.

### Publicação sem banco de dados

Toda a operação editorial pode acontecer usando apenas Markdown, GitHub e deploy estático na Vercel.

## O que esta primeira PR entrega

Por enquanto, esta primeira versão deixa a fundação pronta para listar posts, renderizar páginas individuais e organizar o conteúdo do blog de forma simples e auditável.
