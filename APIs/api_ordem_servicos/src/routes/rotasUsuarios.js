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
        const verificarUsuario = await BD.query(`SELECT * FROM USUARIOS 
            WHERE id_usuario = $1`, [id_usuario])
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
//----------------------------------------------------------------------------------------------
    //endpoint patch para atualizar uma informação especifica 
//rota patch atualizando parcialmente informações(algumas)
                    //: para indicar q é um parametro
router.patch('/usuarios/:id_usuario', async(req, res) => {  //rota com metodo e blocos de codigos
    const { id_usuario } = req.params;
    const {nome, email, senha} = req.body; 

    try{
        const verificarUsuario = await BD.query(`SELECT * FROM USUARIOS WHERE id_usuario = $1`, [id_usuario])
        if(verificarUsuario.rows.length === 0){
            return res.status(404).json({message: 'Usuario não encontrado'})
        }

        //Montar o UPDATE dinamicamente (apenas campos enviados)
            //criação de tres variaveis (campos, contador e valores )
            const campos = [];  //não pode ser alterado variavel de estado (const)
            const valores = [];  //não pode ser alterado variavel de estado (const)
            let contador = 1;  //vai sofrer alteração (let)

            if(nome !== undefined){
                campos.push(`nome = $${contador}`)
                valores.push(nome);
                contador++;   //contador é um 1 com ++ adiciona mais 1 então fica 2
            }
            if(email !== undefined){
                campos.push(`email = $${contador}`)
                valores.push(email);
                contador++;   //contador é um 1 com ++ adiciona mais 1 então fica 2
            }
            if(senha !== undefined){
                campos.push(`senha = $${contador}`)
                valores.push(senha);
                contador++;   //contador é um 1 com ++ adiciona mais 1 então fica 2
            }

            //se nenhum campo foi enviado sera feito esse comando:
            if(campos.length === 0){  //return para encerrar 
                return res.status(400).json({message: "Nenhum campo a atualizar"})
            }
            //adicionando ID ao final de valores para identificar quem eu quero atualizar
            valores.push(id_usuario) //coloque o id_usuario no final dos valores

            //montando a query dinamicamente      //colocando virgula para separar os campos
            const comando = `UPDATE USUARIOS SET ${campos.join(', ')} WHERE id_usuario = $${contador}` 
            await BD.query(comando, valores)  //passando para o banco de dados o comandos e valores atualizados dos nossos vetor

            return res.status(200).json('Usuario atualizado com sucesso');
    }catch(error){
        console.error('Erro ao atualizar usuario', error.message)
        return res.status(500).json({message: "Erro interno no servidor" + error.message})
    }
})

//------------------------------------------------------------------------------------------------------
//endpoint DELETE
router.delete('/usuarios/:id_usuario', async (req, res) => {

    const { id_usuario } = req.params; //passando id_usuario como parametro

    try {
        //executando o comando de delete
        const comando = `DELETE FROM usuarios WHERE id_usuario = $1`;

        await BD.query(comando, [id_usuario]); //passando o comando alem dele pegando o valor que foi passado como id_usuario e colocou dentro do comando

        return res.status(200).json({
            message: "Usuário removido com sucesso"
        });

    } catch (error) {
        console.error('Erro ao deletar usuario', error.message);

        return res.status(500).json({
            message: "Erro interno no servidor: " + error.message
        });
    }
});

//endpoint de login
router.post('/login', async(req, res) =>{
    //recebendo as variaveis email e senha
    const {email, senha} = req.body;

    //validação de entrada de email e senha preenchidos
    if(!email || !senha){
        return res.status(400).json({message: 'Email e senha são obrigatorios'})
        
    }
    try{
        const comando = 'SELECT id_usuario, nome, email, senha FROM USUARIOS WHERE email = $1'
        const resultado = await BD.query(comando, [email]);

        if(resultado.rows.length === 0){
            return res.status(401).json({message: 'Email não encontrado.'})
        }

        const usuario = resultado.rows[0]

        //verifica senha se são iguais
        if(usuario.senha !== senha){
            return res.status(401).json({message: 'Senha invalida'})
        }
        return res.status(200).json({
            message: 'Login realizado com sucesso',
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        })

    }catch(error){
        console.error('Erro ao atualizar usuario', error.message);

        return res.status(500).json({
            message: "Erro interno no servidor: " + error.message
        });
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
