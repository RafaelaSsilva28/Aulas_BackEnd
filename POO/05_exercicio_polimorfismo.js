class Bruxo{
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
     apresentar(){
        return`Olá ${this.nome}, seu CPF: ${this.cpf}`
    }
}
class PessoaJuridica extends Pessoa{
    cnpj;
    constructor(nome, cnpj){
        super(nome);
        this.cnpj = cnpj
    }
    apresentar(){
        return `Olá ${this.nome}, seu CNPJ: ${this.cnpj}`
        }
}

const ana = new PessoaFisica("Ana", "123.456.789-00");
console.log(ana.apresentar());

const neoenergia = new PessoaJuridica("Neoenergia Elektro", "02.328.280/0001-97")
console.log(neoenergia.apresentar());
