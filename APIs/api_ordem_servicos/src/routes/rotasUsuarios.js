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
        return res.status(200).json(ordem_servicos.rows); //rows são todas as linhas que foram retornadas da nossa query status 200ok

    }catch(error){
        console.log('Erro ao listar ordem_servicos', error.message);
        return res.status(500).json({error: 'Erro ao listar ordem_servicos'})
        
    }
})

// CRIAÇÃO DE UMA ROTA (ENDPOINT) QUE EXISTE A POSSIBILIDADE DE UMA INVASÃO -----------------------------------------------------------------------
   //ENDPOINT COM PARAMETROS DIRETOS NO COMANDO SQL PERMITE O SQL INJECTION
router.post('/usuarios', async(req, res) => {
    const { nome, email, senha } = req.body;
    try{                                                  //o VALUES não é colocado os valores da const pois se não ficara aberto a hacker
    const comando = `INSERT INTO USUARIOS(nome, email, senha) VALUES($1, $2, $3)`   //criação de uma variavel para armazenar nosso comando SQL 
    const valores = [nome, email, senha];

    await BD.query(comando, valores)
    console.log(comando, valores);

    return res.status(201).json("Usuario cadastrado.");
    }catch(error){
        console.log('Erro ao cadastrar usuarios', error.message);
        return res.status(500).json({error: 'Erro ao cadastrar usuarios'})
        
    }
})

//usando nosso metodo put de atualizar e editar
    //CRIAÇÃO DO ENDPOINT PARA ATUALIZAR UM UNICO USUARIO
            //recebendo o parametro pelo ID e buscando o usuario
router.put('/usuarios/:id_usuario', async(req, res) => {
    //id recebido via parametro
    const {id_usuario} = req.params;
    //dados do usuario recebido via corpo da pagina
    const {nome, email, senha} = req.body;
    try{
        //verificar se o usuario existe 
        const verificarUsuario = await BD.query(`SELECT * FROM USUARIOS WHERE id_usuario = $1`, [id_usuario])
        if(verificarUsuario.rows.length === 0){
            return res.status(404).json({message: 'Usuario não encontrado'})
        }
        //atualiza todos os campos da tabela(PUT SUBSTITUIÇÃO COMPLETA)
                                            //evitando que todos os usuarios sejam alterados
        const comando = `UPDATE USUARIOS SET nome = $1, email = $2, senha = $3 WHERE id_usuario = $4`;
        const valores = [nome, email, senha, id_usuario];
        await BD.query(comando, valores);
        return res.status(200).json('Usuario foi atualizado!')
        }catch(error){
        console.log('Erro ao cadastrar usuarios', error.message);
        return res.status(500).json({error: 'Erro ao atualizar usuarios'})
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
        const comando = `UPDATE DEPARTAMENTOS SET nome = $1, descricao = $2 WHERE id_departamento = $4`;
        const valores = [nome, descricao, id_departamento];
        await BD.query(comando, valores);
        return res.status(200).json('Departamento foi atualizado!')
        }catch(error){
        console.log('Erro ao cadastrar departamentos', error.message);
        return res.status(500).json({error: 'Erro ao atualizar departamentos'})
    }
})

//usando nosso metodo put de atualizar e editar
    //CRIAÇÃO DO ENDPOINT PARA ATUALIZAR UM UNICO ORDEM_SERVICOS
            //recebendo o parametro pelo ID e buscando o usuario
router.put('/ordem_servicos/:id_ordem', async(req, res) => {
    //id recebido via parametro
    const {id_ordem} = req.params;
    //dados do usuario recebido via corpo da pagina
    const {numero_ordem, titulo, descricao, prioridade, status, data} = req.body;
    try{
        //verificar se o usuario existe 
        const verificarOrdemServicos = await BD.query(`SELECT * FROM ORDEM_SERVICOS WHERE id_ordem = $1`, [id_ordem])
        if(verificarOrdemServicos.rows.length === 0){
            return res.status(404).json({message: 'Ordem de serviços não encontrado'})
        }
        //atualiza todos os campos da tabela(PUT SUBSTITUIÇÃO COMPLETA)
                                            //evitando que todos os usuarios sejam alterados
        const comando = `UPDATE DEPARTAMENTOS SET numero_ordem = $1, titulo = $2, descricao = $3, prioridade = $4, status = $5, data = $6 WHERE id_departamento = $7`;
        const valores = [numero_ordem, titulo, descricao, prioridade, status, data, id_ordem];
        await BD.query(comando, valores);
        return res.status(200).json('Ordem de serviços foi atualizado!')
        }catch(error){
        console.log('Erro ao cadastrar ordens', error.message);
        return res.status(500).json({error: 'Erro ao atualizar ordens'})
    }
})



export default router




// // CRIAÇÃO DE UMA ROTA (ENDPOINT) QUE EXISTE A POSSIBILIDADE DE UMA INVASÃO -----------------------------------------------------------------------
//    //ENDPOINT COM PARAMETROS DIRETOS NO COMANDO SQL PERMITE O SQL INJECTION
// router.post('/usuarios', async(req, res) => {
//     const nome = req.body.nome;
//     const email = req.body.email;
//     const senha = req.body.senha;
//     try{
//     const comando = `INSERT INTO teste(nome, email, senha) 
//     VALUES('${nome}', '${email}', '${senha}')`   //criação de uma variavel para armazenar nosso comando SQL 
//     console.log(comando);
//     await BD.query(comando)
//     res.status(201).json("Usuario cadastrado.");
//     }catch(error){
//         console.log('Erro ao cadastrar usuarios', error.message);
//         res.status(500).json({error: 'Erro ao cadastrar usuarios'})
        
//     }
// })
//----------------------------------------------------------------------------------------------------------------------------------------------
