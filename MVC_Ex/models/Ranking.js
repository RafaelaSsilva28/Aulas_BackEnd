class Rank {
    constructor(id, jogador, pontuacao, nivel, acoes){
        if(!titulo || !autor){
            throw new Error('Jogador ou pontuação obrigatorios')
        }
        this.id = id;
        this.jogador = jogador;
        this.pontuacao = pontuacao;
        this.nivel = nivel; 
        this.acoes = acoes;
    }
    //metodo
    descricao(){
        return`${this.id} - ${this.jogador}`       //chamando o titulo e o autor do livro
    }
    //metodo com condição
    verificarPontuacao(){
        if(this.pontuacao >= 450 ) return 'AVANÇADO';
        if(this.pontuacao <= 300) return 'INTERMEDIARIO';
        return 'INICIANTES';
    }
    // //metodo
    // marcarComoLido(){
    //     this.lido = true;
        
    // }
}
export default Rank