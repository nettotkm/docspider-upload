# DocSpider's Document Uploader


<p align="center">
  <img src="./src/assets/upload_capa.png" />
</p>

<p align="center">
<img src="./src/assets/v1.svg"/>
</p>

## Para todas as coisas que valem a pena compartilhar o Document Uploader pode ajudar.

## 🛠️ Como rodar a aplicação

1. Entre na linha de comando e execute:

```bash
npm install
```
2. Faça o setup do banco de dados local, executando: `npx prisma migrate dev`

3. Em seguida, execute `npm run dev`. Ele levantará dois servidores (client-side e server-side) rodando nas portas 1234 e 4000, respectivamente. Para acessar a aplicação, basta digitar no navegador `http://localhost:1234`

## Testes

Como a aplicação foi feita em cima de frameworks e bibliotecas, achei melhor
fazer testes básicos e2e, utilizando [Playwright](https://playwright.dev).
Para rodar os testes, execute: `npm run e2e`

## Escolhas de arquitetura

* Escolhi criar a aplicação em React para demonstrar bom conhecimento do framework.
* Preferi usar React puro sem um framework web por trás para que a avaliação não seja completamente enviesada.
* Para o backend escolhi o tRPC, que permite criar endpoints de maneira rápida e que sejam typesafe.
* Para o CSS, preferi usar o Tailwind porque ele permite uma rápida iteração de estilo sem que seja necessário um arcabouço de Design System pronto
* Como banco de dados, escolhi sqlite, por ser relativamente fácil configurar e também por ser uma tecnologia ubíqua. O ORM usado no projeto é o Prisma.
* Simulei um AWS S3 localmente expondo rotas /download e /upload no express rodando em server.ts. Os arquivos são uploaded para uma pasta local "uploads". Fiz assim para facilitar a execução mas num ambiente de produção o correto seria usar um S3 ou similar.