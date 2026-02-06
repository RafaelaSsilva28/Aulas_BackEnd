class Bruxo{
    constructor(nome, feitico){
        this.nome = nome;
        this.feitico = feitico;
    }
    apresentar(){
        return`${this.nome}, ${this.feitico}`
    }
}

class CasaGrifinoria extends Bruxo{
    casaG;
    constructor(nome, feiticoAssinatura ){
        super(nome, feitico);
        this.feiticoAssinatura = feiticoAssinatura
    }
}
class CasaSonserina extends Bruxo{
    casaS;
    constructor(nome, feiticoAssinatura){
        super(nome, feitico);
        this.feiticoAssinatura = feiticoAssinatura
    }
}


const bruxo1 = new Bruxo("Renato Cariani", "Procedimentos Faciais");
console.log(bruxo1.apresentar());

const bruxo2 = new Bruxo("Julio Balestrin", "Brisa Suprema")
console.log(bruxo2.apresentar());