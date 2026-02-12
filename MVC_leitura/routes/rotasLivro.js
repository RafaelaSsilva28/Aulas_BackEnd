//responsavel p por o caminho da nossa pasta toda nossas routes que sera possivel acessar especificando o q cada uma vai fazer
import express from 'express'; //buscando as bibliotecas que são possiveis ser acessadas 
import livroController from '../controllers/livroControllers.js';

const router = express.Router();

//rota para listar os livros
router.get('/livros', livroController.listar);  // pegando os dados com o get buscando na rota livros o metodo get acessando a function listar 

//rota para adicionar livros 
router.post('/livros', livroController.adicionar);       //post para enviar os dados

//rota para marcar como lido 
router.post('/livros/marcar-lido', livroController.marcarComoLido);

export default router;
