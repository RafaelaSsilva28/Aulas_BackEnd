class Bruxo{
    constructor(nome, idade, feitico, casa, nivel_magia){
        this.nome = nome;
        this.idade = idade;
        this.feitico = feitico;
        this.casa = casa;
        this.nivel_magia = nivel_magia;
    }
    apresentar(){
        return`${this.nome}, ${this.idade}, ${this.feitico}, ${this.casa}, ${this.nivel_magia}`
    }
}

class BruxoGrifinoria extends Bruxo{
    casa = "Grifinoria";
    constructor(nome, cpf){
        super(nome);
        this.casa = casa
    }
     apresentar(){
        return `Olá ${this.nome}, sua casa ${this.casa}`
    }
}
class BruxoSonserina extends Bruxo{
    casa = "Sonserina";
    constructor(nome, casa){
        super(nome);
        this.casa = casa
    }
    apresentar(){
        return`Olá ${this.nome}, sua Casa: ${this.casa}`
    }
}