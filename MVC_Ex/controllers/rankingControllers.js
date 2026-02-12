import Rank from '../models/Ranking.js'

//vetor de objetos de livros
let listaJogador = [
    new Jogador(1, "Guilherme", 500),
    new Jogador(2, "Yasmin", 350),
    new Jogador(3, 'Harry Potter', 100)
]

const rankingController = {
    listar: (req, res) => {
        res.render('Jogador.ejs', {Jogador: listaJogador})   //resposta
    },
    adicionar: (req, res) => {
        const {Jogador, pontuacao } = req.body;   //requisitar
        try{
            //construção de um novo objeto utilizando a classe livro 
            const novoJogador = new Livro(listaJogador.length + 1,   //length tamanho da lista
                                        Jogador,
                                        Number(pontuacao)
                                    );   
                                    listaJogador.push(novoJogador);
                                    res.redirect('/jogador');     //atualizando a lista 
        }catch(e)  //mesma coisa que new livro
        {
            res.status(400).render('Jogador.ejs', {lista: listaJogador, erro: e.message})
        }
    },
    //confirmando que o livro foi lido
    marcarComoLido: (req, res) =>{
        const {id} = req.body;
        const jogador = listaJogador.find(l => l.id === Number(id))     //validando com find comparando com o id formato objeto
        livro.marcarComoLido();
        res.redirect('/Jogador');
    }
}
export default rankingController;