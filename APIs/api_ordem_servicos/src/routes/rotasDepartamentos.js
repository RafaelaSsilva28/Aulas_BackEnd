//todos os endpoints estara aqui tudo que o usuario vai conseguir fazer excluir, atualizar
import {  Router  } from "express";
import {  BD  } from "../../db.js";

    //so com isso ja vai aparecer API
const router = Router();
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

// CRIAÇÃO DE UMA ROTA (ENDPOINT) QUE EXISTE A POSSIBILIDADE DE UMA INVASÃO -----------------------------------------------------------------------
   //ENDPOINT COM PARAMETROS DIRETOS NO COMANDO SQL PERMITE O SQL INJECTION
router.post('/departamentos', async(req, res) => {
    const { nome, descricao } = req.body;
    try{                                                  //o VALUES não é colocado os valores da const pois se não ficara aberto a hacker
    const comando = `INSERT INTO DEPARTAMENTOS(nome, descricao) VALUES($1, $2)`   //criação de uma variavel para armazenar nosso comando SQL 
    const valores = [nome, descricao];

    await BD.query(comando, valores)
    console.log(comando, valores);

    return res.status(201).json("Departamentos cadastrado.");
    }catch(error){
        console.log('Erro ao cadastrar departamentos', error.message);
        return res.status(500).json({error: 'Erro ao cadastrar departamentos'})
        
    }
})

//usando nosso metodo put de atualizar e editar
    //CRIAÇÃO DO ENDPOINT PARA ATUALIZAR UM UNICO DEPARTAMENTO
            //recebendo o parametro pelo ID e buscando o usuario
router.put('/departamentos/:id_departamento', async(req, res) => {
    //id recebido via parametro
    const {id_departamento} = req.params;
    //dados do usuario recebido via corpo da pagina
    const {nome, descricao} = req.body;
    try{
        //verificar se o usuario existe 
        const verificarDepartamento = await BD.query(`SELECT * FROM DEPARTAMENTOS WHERE id_departamento = $1`, [id_departamento])
        if(verificarDepartamento.rows.length === 0){
            return res.status(404).json({message: 'Departamento não encontrado'})
        }
        //atualiza todos os campos da tabela(PUT SUBSTITUIÇÃO COMPLETA)
                                            //evitando que todos os usuarios sejam alterados
        const comando = `UPDATE DEPARTAMENTOS SET nome = $1, descricao = $2 WHERE id_departamento = $3`;
        const valores = [nome, descricao, id_departamento];
        await BD.query(comando, valores);
        return res.status(200).json('Departamento foi atualizado!')
        }catch(error){
        console.log('Erro ao cadastrar departamentos', error.message);
        return res.status(500).json({error: 'Erro ao atualizar departamentos'})
    }
})

export default router