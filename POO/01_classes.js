//Criando nossa primeira classe
class Pessoa {
    //Atributos
    nome;
    idade;
}

//Criando um novo OBJETO(instancia)
const pessoa1 = new Pessoa();
console.log(pessoa1);

//Aplicando valores aos atributos
pessoa1.nome = "Carlos";
console.log(pessoa1);
//mostrando so a propriedade 
console.log(pessoa1.nome); 
pessoa1.idade = 30;
console.log(pessoa1);

//CRIANDO A SEGUNDA PESSOA
const pessoa2 = new Pessoa();
pessoa2.nome = 'Rafaela';
pessoa2.idade = '17';
console.log(pessoa2);
console.log(`Meu nome é ${pessoa2.nome} e eu tenho ${pessoa2.idade} anos!`);





