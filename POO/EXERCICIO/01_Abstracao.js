

class Heroi{
    //Atributo privado
    #energia;

    //Atributo publico
    nome;
    feitico;

    constructor(nome, feitico){
        this.nome = nome;
        this.feitico = feitico;
        this.#energia = 100;//privado
    }
    //colocando metodo na classe
    apresentar(){
        return `${this.nome}, ${this.feitico}`
    } 
    //metodo para mostrar o documento 
    lancarEnergia(){
        return this.#energia;
    }
}

class Heroi2 extends Heroi{
    curar;
    efeitoEspecial2 = "Curar instantaneamente"
    constructor(nome, curar, feitico){
        super(nome, feitico);
        this.curar = curar
    }
     apresentar(){
        return `${this.nome}, efeito especial ${this.efeitoEspecial2}`
    }
}

class Vilao extends Heroi{
    efeitoEspecial = "roubo de vida duo";
    roubarVida;
    constructor(nome, roubarVida, feitico){
        super(nome, feitico);
        this.roubarVida = roubarVida
    }
     apresentar(){
        return `${this.nome}, efeito especial ${this.efeitoEspecial}`
    }
}

const heroi1 = new Heroi('Britanny', 'efeito floral');
console.log(heroi1.apresentar());

const pers = new Heroi2("Giforny", 'verde espiral', 'efeito de grama');
console.log(pers.apresentar());

const pers2 = new Vilao("Hyuad", "fogo invertido", "efeito de trevas");
console.log(pers2.apresentar());




