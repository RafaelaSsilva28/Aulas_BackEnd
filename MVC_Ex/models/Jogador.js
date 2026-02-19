class Jogador{
    constructor(id, nome, pontuacao){
        this.id = id;
        this.nome = nome;
        this.pontuacao = Number(pontuacao);
    }
    resumo(){
        return `${this.nome} - ${this.pontuacao}`
    }
    adicionarPontos(){
        this.pontuacao += 50;
    }
     //metodo com condição
    nivel(){
        if(this.pontuacao <= 100) return 'INICIANTE';
        if(this.paginas <= 300) return 'INTERMEDIARIO';
        return 'AVANÇADO';
    }
}

export default Jogador