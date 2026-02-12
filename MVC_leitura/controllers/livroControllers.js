import Livro from '../models/Livro.js'

//vetor de objetos de livros
let listaLivros = [
    new Livro(1, "O Alienista", "Machado de Assis", 95),
    new Livro(2, "Dom Casmurro", 'Machado de Assis', 288),
    new Livro(3, 'Harry Potter', 'J.K Rowling', 300)
]

const livroController = {
    listar: (req, res) => {
        res.render('Livros.ejs', {livros: listaLivros})   //resposta
    },
    adicionar: (req, res) => {
        const {titulo, autor, paginas } = req.body;   //requisitar
        try{
            //construção de um novo objeto utilizando a classe livro 
            const novoLivro = new Livro(listaLivros.length + 1,   //length tamanho da lista
                                        titulo,
                                        autor,
                                        Number(paginas)
                                    );   
                                    listaLivros.push(novoLivro);
                                    res.redirect('/livros');     //atualizando a lista 
        }catch(e)  //mesma coisa que new livro
        {
            res.status(400).render('livros.ejs', {lista: listaLivros, erro: e.message})
        }
    },
    //confirmando que o livro foi lido
    marcarComoLido: (req, res) =>{
        const {id} = req.body;
        const livro = listaLivros.find(l => l.id === Number(id))     //validando com find comparando com o id 
        livro.marcarComoLido();
        res.redirect('/livros');
    }
}
export default livroController;