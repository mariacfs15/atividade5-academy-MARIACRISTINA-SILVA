import { faker } from '@faker-js/faker';
import CadastroPage from '../support/cadastro.page.js';

describe('Funcionalidade: Criar usuários - Sucesso', function () {
  var paginaCadastro = new CadastroPage();
  var nome = faker.person.firstName();
  var email = faker.internet.email();

  it('Cadastro realizado com sucesso - Nome e e-mail válidos', function () {
    
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
    
    cy.intercept('POST', '/api/v1/users').as('postUsuario');

    cy.get("a[href='/users/novo']").click();

    paginaCadastro.typeNome(nome + 'a');
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();

    cy.wait('@postUsuario')
    cy.contains('Usuário salvo com sucesso!').should('be.visible')
  });
});



describe('Funcionalidade: Criar usuários ', function () {
  var paginaCadastro = new CadastroPage();

  it('Cadastro não realizado com sucesso - E-mail inválido', function () {

    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

    cy.get("a[href='/users/novo']").click();

    paginaCadastro.cadastrar('Usuário Criado', 'email');
    cy.wait(1000)
    
    cy.contains('Formato de e-mail inválido').should('be.visible')
  });
});



describe('Funcionalidade: Criar usuários', function () {
  var paginaCadastro = new CadastroPage();
  var nome = faker.person.firstName();
  var email = faker.internet.email();

  it('Cadastro não realizado com sucesso - e-mail já cadastrado', function () {

    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

    cy.intercept('POST', '/api/v1/users').as('postUsuario');

    cy.get("a[href='/users/novo']").click();

    paginaCadastro.typeNome(nome + 'a');
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();

    cy.wait('@postUsuario')
    
    paginaCadastro.typeNome('UsuárioVálido');
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();

    cy.wait(3000)
    cy.contains('Erro').should('be.visible')
    cy.contains('Este e-mail já é utilizado por outro usuário').should('be.visible')
  });
});


describe('Funcionalidade: Criar usuários', function () {
  var paginaCadastro = new CadastroPage();
  var nome = faker.person.firstName();
  var email = faker.internet.email();
  
  it('Cadastro não realizado com sucesso - O nome do usuário não pode ter mais que 100 caracteres', function () {

    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

    cy.get("a[href='/users/novo']").click();

    paginaCadastro.typeNome(nome + 'Julieta Avelino Castro Torres Silva Sales Guimarães Santos Drummond Fernandes Oliveira Teixeira da Costa Souto ');
    paginaCadastro.typeEmail(email);
    paginaCadastro.clickButtonSalvar();

    cy.wait(3000)
    cy.contains('Informe no máximo 100 caracteres para o nome').should('be.visible')
  });
});



describe('Funcionalidade: Criar usuários', function () {
  var paginaCadastro = new CadastroPage();
  var nome = faker.person.firstName();

  it('Cadastro não realizado com sucesso - O e-mail não pode ter mais que 60 caracteres', function () {

    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
    cy.get("a[href='/users/novo']").click();

    paginaCadastro.typeNome(nome);
    paginaCadastro.typeEmail('paulapimentaguimaraessoutoaguiarsilvadrummond123457890245678@qa.com');
    paginaCadastro.clickButtonSalvar();

    cy.wait(3000)
    cy.contains('Informe no máximo 60 caracteres para o e-mail').should('be.visible')
  });
});
