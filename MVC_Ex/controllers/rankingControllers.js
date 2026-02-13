
import jogador from '../models/Ranking.js'

//vetor de objetos de jogador
let listaJogador = [
    new jogador(1, "O Alienista", 95),
    new jogador(2, "Dom Casmurro", 288),
    new jogador(3, 'Harry Potter', 300)
]

const rankingController = {
    listar: (req, res) => {
        res.render('jogador.ejs', {jogador: listaJogador})   //resposta
    },
    adicionar: (req, res) => {
        const {id, nome, pontuacao } = req.body;   //requisitar
        try{
            //construção de um novo objeto utilizando a classe jogador 
            const novoJogador = new jogador(listaJogador.length + 1,   //length tamanho da lista
                                        id,
                                        nome,
                                        Number(pontuacao)
                                    );   
                                    listaJogador.push(novoJogador);
                                    res.redirect('/');     //atualizando a lista 
        }catch(e)  //mesma coisa que new livro
        {
            res.status(400).render('jogador.ejs', {lista: listaJogador, erro: e.message})
        }
    },
    //confirmando que o livro foi lido
    marcarComoLido: (req, res) =>{
        const {id} = req.body;
        const jogador = listaJogador.find(j => j.id === Number(id))     //validando com find comparando com o id formato objeto
        jogador.marcarComoLido();
        res.redirect('/jogador');
    }
}
export default rankingController;jogador