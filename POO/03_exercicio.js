class Bruxo{
    //Atributo privado
    #nivelEnergia = 100;
    

    //Atributo publico
    nome;
    idade;
    feitico;
    casa;
    nivelMagia;

    constructor(nome, idade, feitico, casa, nivelMagia){
        this.nome = nome;
        this.idade = idade;
        this.casa = casa;
        this.feitico = feitico;
        this.nivelMagia = nivelMagia;
    }
    apresentar(){
         return `${this.nome}, ${this.idade}, ${this.feitico}, ${this.casa}, ${this.nivelMagia}`
    }
    //colocando metodo na classe
    recarregarEnergia(){
        return this.#nivelEnergia += 10;
    } 
    lancarFeitico(){
        return this.#nivelEnergia -= 10;
    }
    //metodo para mostrar o documento 
    verEnergia(){
        return this.#nivelEnergia;
    }
}
const bruxo1 = new Bruxo('Silvia', 28, '23432343421', 'rosa', 'borboleta');
console.log(bruxo1.apresentar());
console.log(bruxo1.verEnergia());
console.log(bruxo1.recarregarEnergia());
console.log(bruxo1.lancarFeitico());



