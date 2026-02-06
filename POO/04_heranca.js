class Pessoa{
    constructor(nome){
        this.nome = nome;
    }
    apresentar(){
        return`${this.nome}`
    }
}

class PessoaFisica extends Pessoa{
    cpf;
    constructor(nome, cpf){
        super(nome);
        this.cpf = cpf
    }
}
class PessoaJuridica extends Pessoa{
    cnpj;
    constructor(nome, cnpj){
        super(nome);
        this.cnpj = cnpj
    }
}

const ana = new PessoaFisica("Ana", "123.456.789-00");
console.log(ana.apresentar());

const sesi = new PessoaJuridica("Sesi", "02.328.280/0001-97")
console.log(sesi.apresentar());