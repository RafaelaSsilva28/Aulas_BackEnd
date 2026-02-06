//Criando nossa primeira classe
class Pessoa {
    //criando o metodo construtor
    constructor(nome, idade){
            //Atributos
        this.nome = nome;
        this.idade = idade;
    }
}

const pessoa1 = new Pessoa("Claudia", 25);
console.log(pessoa1);
const pessoa2 = new Pessoa("Rafaela", 17);