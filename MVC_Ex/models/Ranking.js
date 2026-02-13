class Ranking {
    constructor(id, nome, pontuacao){
        if(!nome || !pontuacao){
            throw new Error('Titulo ou autor são obrigatorios')
        }
        this.id = id;
        this.nome = nome;
        this.pontuacao = pontuacao;
        this.ponto = false;    //lido
    }
    //metodo
    descricao(){
        return`${this.nome} - ${this.pontuacao}`       //chamando o nome e o pontuacao do livro
    }
    //metodo com condição
    verificarPontuacao(){    //verificarTamanho
        if(this.pontuacao <= 150) return 'iniciante';
        if(this.pontuacao <= 350) return 'intermediario';
        return 'acima do nivel';
    }
    //metodo
    pontos(){  //como lido
        this.ponto = true;
        
    }
}
export default Ranking