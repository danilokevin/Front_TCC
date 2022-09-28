import {apiRotas} from './apiRotas.js'
apiRotas

function logarUsuario() {
    var email = document.getElementById("emailUsuario").value;
    var senha = document.getElementById("senhaUsuario").value;
    
    var url = `${apiRotas.pesquisarPorId}${email}`;
    console.log(url);
}

function Usuario (data) {
    this.idUsuario = data.idUsuario;
    this.nome = data.nome;
    this.email = data.email;
    this.status = data.status;
    this.endereco = new Endereco(data.endereco);
    this.telefone = new Telefone(data.telefone);
}

function Endereco (data) {
    this.logradouro = data.logradouro;
    this.complemento = data.complemento;
    this.bairro = data.bairro;
    this.cidade = data.cidade;
    this.uf = data.uf;
    this.cep = data.cep;
}

function Telefone (data) {
    this.ddd = data.ddd;
    this.numero = data.numero;
}