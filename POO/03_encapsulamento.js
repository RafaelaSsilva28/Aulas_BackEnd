class Pessoa{
    //Atributo privado
    #documento;

    //Atributo publico
    nome;
    idade;

    constructor(nome, idade, documento){
        this.nome = nome;
        this.idade = idade;
        this.#documento = documento;//privado
    }
    //colocando metodo na classe
    apresentar(){
        return `${this.nome}, ${this.idade}`
    } 
    //metodo para mostrar o documento 
    mostrarDocumento(){
        return this.#documento;
    }
}

const pessoa1 = new Pessoa('Silvia', 28, '23432343421');
console.log(pessoa1.apresentar());
