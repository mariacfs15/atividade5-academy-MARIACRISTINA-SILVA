import { faker } from '@faker-js/faker';
import CadastroPage from '../support/cadastro.page.js';

describe('Funcionalidade: Pesquisar usuários - Sucesso', function () {
  var paginaCadastro = new CadastroPage();
  var nome = faker.person.firstName();
  var email = faker.internet.email();

  it('Encontrar usuário utilizando nome válido', function () {

    //Visita o site 
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

    //Espiar a interação da aplicação
    cy.intercept('POST', '/api/v1/users').as('postUsuario');

    //Acessar a página para criação de usuário
    cy.get("a[href='/users/novo']").click();

    //Preencher os campos Nome e e-mail e salvar (Criar usuário)
    paginaCadastro.typeNome(nome + 'a');
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();

    //Cadastro realizado
    cy.wait('@postUsuario')
    cy.contains('Usuário salvo com sucesso!').should('be.visible')

    //Voltar a página principal 
    cy.wait(1000)
    cy.get("a[href='/users']").click();
    cy.log(nome + 'a');

    //Digitar nome do usuário no campo "E-mail ou nome"
    cy.wait(1000)
    cy.get('*[class^="sc-gsFSXq mUpIH"]').type(nome + 'a');

    cy.wait(2000)
    cy.contains(nome + 'a').should('be.visible')

    cy.get("#userDataDetalhe").click();
    cy.contains('id').should('be.visible')
    cy.contains('Nome').should('be.visible')
    cy.contains('E-mail').should('be.visible')

  });
});


describe('Funcionalidade: Pesquisar usuários - Sucesso', function () {
  var paginaCadastro = new CadastroPage();
  var nome = faker.person.firstName();
  var email = faker.internet.email();

  it('Encontrar usuário utilizando e-mail válido', function () {

    //Visita o site 
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

    //Espiar a interação da aplicação
    cy.intercept('POST', '/api/v1/users').as('postUsuario');

    //Acessar a página para criação de usuário
    cy.get("a[href='/users/novo']").click();

    //Preencher os campos Nome e e-mail e salvar (Criar usuário)
    paginaCadastro.typeNome(nome + 'a');
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();

    //Cadastro realizado
    cy.wait('@postUsuario')
    cy.contains('Usuário salvo com sucesso!').should('be.visible')

    //Voltar a página principal 
    cy.wait(1000)
    cy.get("a[href='/users']").click();
    cy.log(nome + 'a');

    //Digitar nome do usuário no campo "E-mail ou nome"
    cy.wait(1000)
    cy.get('*[class^="sc-gsFSXq mUpIH"]').type(email);

    cy.wait(2000)
    cy.contains(nome).should('be.visible')

    cy.get("#userDataDetalhe").click();
    cy.contains('id').should('be.visible')
    cy.contains('Nome').should('be.visible')
    cy.contains('E-mail').should('be.visible')
  });
});



describe('Funcionalidade: Pesquisar usuários - Usuário não encontrado', function () {

  it('Erro ao pesquisar usuário utilizando nome não cadastrado', function () {

    //Visita o site 
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

    //Espiar a interação da aplicação
    cy.intercept('POST', '/api/v1/users').as('postUsuario');

    //Digitar nome do usuário no campo "E-mail ou nome"
    cy.get('*[class^="sc-gsFSXq mUpIH"]').type('Julieta Maria Campos Gomes');

    cy.wait(1000)
    cy.contains('Ops! Não existe nenhum usuário para ser exibido.').should('be.visible')
    cy.contains('Cadastre um novo usuário').should('be.visible')

  });
});



describe('Funcionalidade: Pesquisar usuários - Usuário não encontrado', function () {
  var email = faker.internet.email();

  it('Erro ao encontrar usuário utilizando e-mail não cadastrado', function () {

    //Visita o site 
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

    //Digitar e-mail do usuário no campo "E-mail ou nome"
    cy.wait(1000)
    cy.get('*[class^="sc-gsFSXq mUpIH"]').type(email);

    cy.wait(1000)
    cy.contains('Ops! Não existe nenhum usuário para ser exibido.').should('be.visible')
    cy.contains('Cadastre um novo usuário').should('be.visible')

  });
});