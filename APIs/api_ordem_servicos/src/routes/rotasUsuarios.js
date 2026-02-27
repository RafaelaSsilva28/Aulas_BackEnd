//todos os endpoints estara aqui tudo que o usuario vai conseguir fazer excluir, atualizar
import {  Router  } from "express";
import {  BD  } from "../../db.js";

//-------------------------------------------------------------------------------------------------------- 
    //so com isso ja vai aparecer API
const router = Router();

//criando endpoint para listar todos os usuarios
router.get('/usuarios', async(req, res) =>{
    try{

        //criação de uma variavel para enviar o comando SQL
        const query = `SELECT * FROM usuarios ORDER BY id_usuario`      //acesse seu banco de dados e chame o nome dos usuarios conforme o id_usuario
        
        //criação de uma variavel para receber o retorno SQL
        const usuarios = await BD.query(query);   //executando dentro do banco de dados a query armazenada chamando sua function
        
        //retorno para a pagina o json com os dados buscados do SQL
        res.status(200).json(usuarios.rows); //rows são todas as linhas que foram retornadas da nossa query status 200ok

    }catch(error){
        console.log('Erro ao listar usuarios', error.message);
        res.status(500).json({error: 'Erro ao listar usuarios'})
        
    }
})


//----------------------------------------------------------------------------------------------------------
//criando endpoint para listar todos os DEPARTAMENTOS
router.get('/departamentos', async(req, res) =>{
    try{

        //criação de uma variavel para enviar o comando SQL
        const query = `SELECT * FROM departamentos ORDER BY id_departamento`      //acesse seu banco de dados e chame o nome dos departamentos conforme o id_departamento
        
        //criação de uma variavel para receber o retorno SQL
        const departamentos = await BD.query(query);   //executando dentro do banco de dados a query armazenada chamando sua function
        
        //retorno para a pagina o json com os dados buscados do SQL
        res.status(200).json(departamentos.rows); //rows são todas as linhas que foram retornadas da nossa query status 200ok

    }catch(error){
        console.log('Erro ao listar usuarios', error.message);
        res.status(500).json({error: 'Erro ao listar departamentos'})
        
    }
})


//----------------------------------------------------------------------------------------------------------
//criando endpoint para listar todos os ordem_servicos
router.get('/ordem_servicos', async(req, res) =>{
    try{

        //criação de uma variavel para enviar o comando SQL
        const query = `SELECT * FROM ordem_servicos ORDER BY id_ordem`      //acesse seu banco de dados e chame o nome dos departamentos conforme o id_departamento
        
        //criação de uma variavel para receber o retorno SQL
        const ordem_servicos = await BD.query(query);   //executando dentro do banco de dados a query armazenada chamando sua function
        
        //retorno para a pagina o json com os dados buscados do SQL
        res.status(200).json(ordem_servicos.rows); //rows são todas as linhas que foram retornadas da nossa query status 200ok

    }catch(error){
        console.log('Erro ao listar ordem_servicos', error.message);
        res.status(500).json({error: 'Erro ao listar ordem_servicos'})
        
    }
})


export default router