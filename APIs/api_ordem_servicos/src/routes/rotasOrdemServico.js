import {  Router  } from "express";
import {  BD  } from "../../db.js";

//-------------------------------------------------------------------------------------------------------- 
    //so com isso ja vai aparecer API
const router = Router();


//----------------------------------------------------------------------------------------------------------
//criando endpoint para listar todos os ordem_servicos
router.get('/ordem_servicos', async(req, res) =>{
    try{

        //criação de uma variavel para enviar o comando SQL
        const query = `SELECT * FROM ordem_servicos ORDER BY id_ordem`      //acesse seu banco de dados e chame o nome dos departamentos conforme o id_departamento
        
        //criação de uma variavel para receber o retorno SQL
        const ordem_servicos = await BD.query(query);   //executando dentro do banco de dados a query armazenada chamando sua function
        
        //retorno para a pagina o json com os dados buscados do SQL
        return res.status(200).json(ordem_servicos.rows); //rows são todas as linhas que foram retornadas da nossa query status 200ok

    }catch(error){
        console.log('Erro ao listar ordem_servicos', error.message);
        return res.status(500).json({error: 'Erro ao listar ordem_servicos'})
        
    }
})



// CRIAÇÃO DE UMA ROTA (ENDPOINT) QUE EXISTE A POSSIBILIDADE DE UMA INVASÃO -----------------------------------------------------------------------
   //ENDPOINT COM PARAMETROS DIRETOS NO COMANDO SQL PERMITE O SQL INJECTION
router.post('/ordem_servicos', async(req, res) => {
    const { numero_ordem, titulo, descricao, prioridade, status, data, id_usuario, id_departamento } = req.body;
    try{                                                  //o VALUES não é colocado os valores da const pois se não ficara aberto a hacker
    const comando = `INSERT INTO ORDEM_SERVICOS(numero_ordem, titulo, descricao, prioridade, status, data, id_usuario, id_departamento) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`   //criação de uma variavel para armazenar nosso comando SQL 
    const valores = [numero_ordem, titulo, descricao, prioridade, status, data, id_usuario,id_departamento];

    await BD.query(comando, valores)
    console.log(comando, valores);

    return res.status(201).json("Ordem de serviços cadastrado.");
    }catch(error){
        console.log('Erro ao cadastrar ordem', error.message);
        return res.status(500).json({error: 'Erro ao cadastrar ordem'})
        
    }
})


//usando nosso metodo put de atualizar e editar
    //CRIAÇÃO DO ENDPOINT PARA ATUALIZAR UM UNICO ORDEM_SERVICOS
            //recebendo o parametro pelo ID e buscando o usuario
router.put('/ordem_servicos/:id_ordem', async(req, res) => {
    //id recebido via parametro
    const {id_ordem} = req.params;
    //dados do usuario recebido via corpo da pagina
    const {numero_ordem, titulo, descricao, prioridade, status, id_usuario, id_departamento} = req.body;
    try{
        //verificar se o usuario existe 
        const verificarOrdemServicos = await BD.query(`SELECT * FROM ORDEM_SERVICOS WHERE id_ordem = $1`, [id_ordem])
        if(verificarOrdemServicos.rows.length === 0){
            return res.status(404).json({message: 'Ordem de serviços não encontrado'})
        }
        //atualiza todos os campos da tabela(PUT SUBSTITUIÇÃO COMPLETA)
                                            //evitando que todos os usuarios sejam alterados
        const comando = `UPDATE ORDEM_SERVICOS SET numero_ordem = $1, titulo = $2, descricao = $3, prioridade = $4, status = $5, id_usuario = $6, id_departamento = $7 WHERE id_ordem = $8`;
        const valores = [numero_ordem, titulo, descricao, prioridade, status, id_usuario, id_departamento, id_ordem];
        await BD.query(comando, valores);
        return res.status(200).json('Ordem de serviços foi atualizado!')
        }catch(error){
        console.log('Erro ao cadastrar ordens', error.message);
        return res.status(500).json({error: 'Erro ao atualizar ordens'})
    }
})

export default router