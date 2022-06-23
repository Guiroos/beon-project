# Beon Project

Desafio técnico enviado pela Wine, onde deverá construir uma interface para busca 
de livros.

Os principais requisitos são: 

 - Buscar livros pelo título, autor ou idioma;
 - Listar livros (título, autor, idioma, ano);
 - Apresentar quantidades de registros encontrados;
 - Paginar o resultado da busca de 10 em 10 itens;
 - Filtrar livros pelo período (ano);
 - Visualizar detalhes do livro (apresentar todos os atributos);

 
## Instalação

Clone o repositório.

```bash
  git clone git@github.com:Guiroos/beon-project.git
```

Instale as dependências.

```bash
  cd beon-project
  npm install
```


## Rodando localmente

 Dentro da pasta raiz

 ### Iniciando servidor

 Dentro do repositório há um arquivo db.json com todos os dados dos livros.  
 Basta iniciar o json-server no modo "watch" nesse arquivo, que ele estará 
 disponível na rota [API](http://localhost:3001/books).

 OBS: porta pode ser alterada no json-server.json

```bash
  json-server --watch db.json
```

Depois iniciar o aplicativo React, disponível em [WEB](http://localhost:3000).

```bash
  npm run start
```
## Stacks utilizadas

**Front-end:** React, TailwindCSS, TypeScript.


## Documentação da API

#### Retorna todos os livros

```http
  GET /books
```
Os livros possuem as seguintes propriedades:

| Propriedades   | Tipo       
| :---------- | :--------- 
| `id` | `number` |
| `author` | `string` |
| `country` | `string` |
| `imageLink` | `string` |
| `link` | `string` 
| `pages` | `number` 
| `title` | `string` 
| `year` | `number` 



## Roadmap

- [ ] Desenvolver um layout mobile;

- [ ] Implementar testes  Unitários.
