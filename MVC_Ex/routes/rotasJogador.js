//responsavel p por o caminho da nossa pasta toda nossas routes que sera possivel acessar especificando o q cada uma vai fazer
import express from 'express'; //buscando as bibliotecas que são possiveis ser acessadas 
import jogadorController from '../controllers/jogadorControllers.js';

const router = express.Router();

//rota para listar os livros
router.get('/jogadores', jogadorController.listar);  // pegando os dados com o get buscando na rota jogadores o metodo get acessando a function listar 

//rota para adicionar jogadores 
router.post('/jogadores', jogadorController.adicionar);       //post para enviar os dados

//rota para marcar como lido 
router.post('/jogadores/adicionar-ponto', jogadorController.adicionarPontos);

export default router;
