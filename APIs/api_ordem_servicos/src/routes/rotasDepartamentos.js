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


   //endpoint patch para atualizar uma informação especifica 
//rota patch atualizando parcialmente informações(algumas)
                    //: para indicar q é um parametro
router.patch('/departamentos/:id_departamento', async(req, res) => {  //rota com metodo e blocos de codigos
    const { id_departamento } = req.params;
    const {nome, descricao} = req.body; 

    try{
        const verificarDepartamento = await BD.query(`SELECT * FROM DEPARTAMENTOS WHERE id_departamento = $1`, [id_departamento])
        if(verificarDepartamento.rows.length === 0){
            return res.status(404).json({message: 'Departamento não encontrado'})
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
            if(descricao !== undefined){
                campos.push(`descricao = $${contador}`)
                valores.push(descricao);
                contador++;   //contador é um 1 com ++ adiciona mais 1 então fica 2
            }

            //se nenhum campo foi enviado sera feito esse comando:
            if(campos.length === 0){  //return para encerrar 
                return res.status(400).json({message: "Nenhum campo a atualizar"})
            }
            //adicionando ID ao final de valores para identificar quem eu quero atualizar
            valores.push(id_departamento) //coloque o id_usuario no final dos valores

            //montando a query dinamicamente      //colocando virgula para separar os campos
            const comando = `UPDATE DEPARTAMENTOS SET ${campos.join(', ')} WHERE id_departamento = $${contador}` 
            await BD.query(comando, valores)  //passando para o banco de dados o comandos e valores atualizados dos nossos vetor

            return res.status(200).json('Departamento atualizado com sucesso');
    }catch(error){
        console.error('Erro ao atualizar departamento', error.message)
        return res.status(500).json({message: "Erro interno no servidor" + error.message})
    }
})
//endpoint DELETE
router.delete('/departamentos/:id_departamento', async (req, res) => {

    const { id_departamento } = req.params; //passando id_usuario como parametro

    try {
        //executando o comando de delete
        const comando = `DELETE FROM DEPARTAMENTOS WHERE id_departamento = $1`;

        await BD.query(comando, [id_departamento]); //passando o comando alem dele pegando o valor que foi passado como id_usuario e colocou dentro do comando

        return res.status(200).json({
            message: "departamento removido com sucesso"
        });

    } catch (error) {
        console.error('Erro ao deletar departamento', error.message);

        return res.status(500).json({
            message: "Erro interno no servidor: " + error.message
        });
    }
});

export default router