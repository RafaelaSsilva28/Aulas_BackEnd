class Bruxo {
    //criando o metodo construtor
    constructor(nome, idade, feitico, casa, nivelMagia){
            //Atributos
        this.nome = nome;
        this.idade = idade;
        this.feitico = feitico;
        this.casa = casa;
        this.nivelMagia = nivelMagia;
    }
}

const Bruxo1 = new Bruxo('Flora', 21, 'Borboleta', 'Rosa', 'Fraco');
console.log(Bruxo1);
console.log(`Eu sou a ${Bruxo1.nome} e tenho ${Bruxo1.idade} anos minha casa é cor de ${Bruxo1.casa} solto feitiços de ${Bruxo1.feitico} porem meu  nivel de magia é ${Bruxo1.nivelMagia}`);
