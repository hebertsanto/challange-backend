# Desafio backend

## contexto.

recentemente vi um repositório aqui no github e decidi replicar para ter no portifólio,
o desafio era pra ser feito em golang, porém resolvi fazer em node.

## funcionalidades.

#### conta
- [x] criar uma conta.

#### cartões
- [x] adicionar/criar cartões.
- [x] listar cartões.
- [x] listar somente um cartão.
      
#### transações
- [x] fazer uma transação.
- [x] listar transações.
- [x] listar somente uma transação.
- [ ] listar transações por um periodo. **não incluido no desafio**
- [ ] paginar transações. **não incluido no desafio**
- [ ] listar transações num arquivo pdf com seus respectivos dados.


## relacionamentos

#### uma conta pode ter muitos cartões,ou seja, uma relação de um para muitos.
#### um cartão pode ter muitas transações, ou seja, uma relação de um para muitos.
#### um cartão pode fazer muitas transações, ou seja, uma relação de um para muitos.

## tecnologias ultilizadas nesse projeto

- node js
- typescript
- express
- zod
- postgres
- prisma
- commitlint
- husky
- railway
- prettier
- eslint
- git
- github
- html-pdf-node
  
## abaixo estão as tabela
![Texto alternativo](https://raw.githubusercontent.com/devconductor/desafio-golang/master/img/diagrama.png)

## endpoints da api

### account
- **POST** `/account` cria uma nova conta.

### transations
- **POST** `/transaction` cria uma nova transação.
- **GET** `/transaction` pega todas as transações relacionado a um cartão.
- **GET** `/transaction/:id` pega uma transação específica.
- **GET** `/transaction/:id/file` gera um arquivo pdf com os dados da transação
  
### card

- **POST** `/card` cria um novo cartão.
- **GET** `/card` pega todos os cartões relacionados a uma conta.
- **GET** `/card/:id` pega um cartão específco.
- **GET** `/card/:id/file` pega informações da conta e todas as transações


