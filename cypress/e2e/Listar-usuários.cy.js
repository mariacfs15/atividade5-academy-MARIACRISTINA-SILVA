import { faker } from '@faker-js/faker';
import CadastroPage from '../support/cadastro.page.js';


describe('Funcionalidade: Listar usuários', function () {

  it('Listar usuários cadastrados', function () {

    //Visitar o site
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

    //Verificar usuários
    cy.get('#listaUsuarios').should('be.visible');
  });
});


describe('Funcionalidade: Listar usuários', function () {
  var paginaCadastro = new CadastroPage();
  var nome = faker.person.firstName();
  var email = faker.internet.email();

  it('Apresentar a opção cadastrar usuário, caso não existam usuários no banco de dados.', function () {

    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

    cy.intercept('GET', '/api/v1/users', { statusCode: 200, body: [] }).as('getUsuario');

    cy.wait('@getUsuario')
    cy.contains('Ops! Não existe nenhum usuário para ser exibido.').should('be.visible');
    cy.contains('Cadastre um novo usuário').should('be.visible');

    cy.intercept('POST', '/api/v1/users',).as('postUsuario');

    //Cadastrar um usuário para consulta
    cy.contains('Cadastre um novo usuário').click();

    paginaCadastro.typeNome(nome + 'a');
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();

    // cy.wait('@postUsuario')
    cy.contains('Usuário salvo com sucesso!').should('be.visible')
  });
});