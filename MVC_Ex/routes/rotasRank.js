//responsavel p por o caminho da nossa pasta toda nossas routes que sera possivel acessar especificando o q cada uma vai fazer
import express from 'express'; //buscando as bibliotecas que são possiveis ser acessadas 
import rankingController from '../controllers/rankingControllers.js';

const router = express.Router();

//rota para listar os livros
router.get('/jogador', rankingController.listar);  // pegando os dados com o get buscando na rota jogador o metodo get acessando a function listar 

//rota para adicionar jogador 
router.post('/jogador', rankingController.adicionar);       //post para enviar os dados

//rota para marcar como lido 
router.post('/jogador/marcar-lido', rankingController.marcarComoLido);

export default router;
