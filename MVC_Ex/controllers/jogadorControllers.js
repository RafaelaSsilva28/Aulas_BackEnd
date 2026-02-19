
import jogador from '../models/Jogador.js'

//vetor de objetos de jogador
let listaJogadores = [
    new jogador(1, "Douglas", 95),
    new jogador(2, "Ricardo", 88),
    new jogador(3, 'Marco Antonio', 300)
]

const jogadorController = {
    listar: (req, res) => {
        res.render('jogadores.ejs', {jogadores: listaJogadores})   //resposta
    },
    adicionar: (req, res) => {
        const {nome, pontuacao } = req.body;   //requisitar

        try{   //toda vez que entra no try ele tenta toda vez q não consegue ele entra no catch para dar um erro
            //construção de um novo objeto utilizando a classe jogador 
            const novoJogador = new jogador(
                                        listaJogadores.length + 1,   //length tamanho da lista adiciona mais um para o ID
                                        nome,
                                        Number(pontuacao)
                                    );   
                                    listaJogadores.push(novoJogador);
                                    res.redirect('/jogadores');     //atualizando a rota jogadores
        }catch(e)  //mesma coisa que new livro
        {
            res.status(400).render('jogadores.ejs', {lista: listaJogadores, erro: e.message})
        }
    },
    //confirmando que o livro foi lido
    adicionarPontos: (req, res) =>{
        const {id} = req.body;
        const jogador = listaJogadores.find(j => j.id === Number(id))     //validando com find comparando com o id formato objeto
        jogador.adicionarPontos();
        res.redirect('/jogadores');
    }
}
export default jogadorController;