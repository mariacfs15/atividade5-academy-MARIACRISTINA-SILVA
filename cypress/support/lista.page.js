export default class ListarUsuarioPage {
    listaUsuario = '#listaUsuarios';

    getListUsuarios(){
        return cy.get(this.listaUsuario);
    }

}