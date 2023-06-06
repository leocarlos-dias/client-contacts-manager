# Gerenciador de Contatos de Usuários

Este projeto é um sistema para gerenciar contatos de usuários, desenvolvido com o objetivo de demonstrar a aplicação de uma Arquitetura Limpa (Clean Architecture) e a prática de Desenvolvimento Orientado a Testes (TDD), incluindo testes unitários e de integração.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Nest.js
- Prisma
- PostgreSQL
- Jest

## Estrutura do Projeto

O projeto está dividido em duas pastas: `client` e `server`.

### Server

A pasta `server` contém o backend do sistema, desenvolvido com Node.js, TypeScript e Nest.js. O servidor se comunica com um banco de dados PostgreSQL usando o Prisma como ORM (Object-Relational Mapping).

Para iniciar o servidor, utilize o seguinte comando:

```
npm run start
```

O servidor estará disponível na porta `3000`.

A documentação do servidor pode ser encontrada no arquivo `index.html`, localizado na raiz do servidor.

### Client

A pasta `client` contém o frontend do sistema, cuja implementação não foi detalhada neste README.

Para iniciar o client, utilize o seguinte comando:

```
npm run dev
```

O client estará disponível na porta `3001`.

## Como Executar

Siga as instruções abaixo para executar o projeto em sua máquina local.

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório para o diretório desejado em sua máquina.
3. Navegue até a pasta `server` e execute o seguinte comando para instalar as dependências:

```
npm install
```

4. Crie um arquivo `.env` na pasta `server` e defina as configurações do banco de dados PostgreSQL, e a chave secreta do JWT:

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
JWT_SECRET="secret-key"
```


5. Execute o seguinte comando para iniciar o servidor:

```
npm run start:dev
```

O servidor estará disponível na porta `3333`.

6. (Opcional) Caso deseje executar o client, navegue até a pasta `client` e execute o seguinte comando para instalar as dependências:

```
npm install
```

Em seguida, execute o seguinte comando para iniciar o client:
```
npm run dev
```

## Testes

Para executar os testes, siga as etapas abaixo:

1. Certifique-se de ter todas as dependências instaladas seguindo as instruções anteriores.
2. Navegue até a pasta `server` e execute o seguinte comando:

```
npm test
```

Os testes unitários e de integração serão executados usando o framework de testes Jest.

## Documentação do API

A documentação da API pode ser acessada em `http://localhost:3000/doc`.

A documentação da API também pode ser importada para o Insomnia utilizando o arquivo JSON fornecido. O arquivo está localizado em `insomnia.json`. Importe o arquivo JSON para o Insomnia para obter a documentação completa das rotas e endpoints da API.

O client estará disponível na porta `3001`.

Agora você pode acessar o projeto em seu navegador em `http://localhost:3000` (para o servidor) e `http://localhost:3001` (para o client), respectivamente.

## Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature (`git checkout -b minha-feature`).
3. Faça as alterações necessárias e adicione os testes relevantes.
4. Confira se os testes estão passando (`npm run test`).
5. Faça o commit das suas alterações (`git commit -m 'Adicionando minha feature'`).
6. Envie a branch (`git push origin minha-feature`).
7. Abra uma Pull Request no GitHub.




