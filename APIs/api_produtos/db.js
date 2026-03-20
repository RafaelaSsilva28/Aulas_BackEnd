import pkg from 'pg';
const { Pool } = pkg;
// import { Connection, Pool } from 'pg';   //importando a biblioteca PG para realizar a conexão com o banco de dados supabase
const BD = new Pool ({
    connectionString:"postgres://postgres.lymqdujrqccabstouqme:xnDLSe1HBE9SjOhR@aws-1-us-east-1.pooler.supabase.com:6543/postgres", 
    ssl: {
    rejectUnauthorized: false // O Supabase requer SSL

}
});
// ----------------------------------------------------------------------------------------------  
            //so com isso ja vai aparecer a API usuarios 
// const BD = new Pool ({
//     user: 'postgres',
//     host: 'localhost',  //va no seu supabase
//     database: 'produtos',
//     port: 5432,
//     password: 'admin'   //senha que foi feita quando vc criou o novo projeto
// })
// const BD = new Pool ({
//     user: 'postgres',
//     host: 'db.zyqtsgpkzbxvrziyawtw.supabase.co',  //va no seu supabase
//     database: 'postgres',
//     port: 5432,
//     password: 'bancodedadossenai'   //senha que foi feita quando vc criou o novo projeto
// })

const testarConexao = async () =>{   //objeto com as propriedades do Pool com metodo acessar
    try{            //tentando acessar o metodo para conectar o banco de dados
        const cliente = await BD.connect();
        console.log('CONEXÃO REALIZADA COM SUCESSO!');
        cliente.release();    //libera a conexão apos executar não fica conectado depois
        
    }
    catch(error){
        console.error('ERRO AO CONECTAR AO BANCO DE DADOS', error.message);
        
    }
}
// -------------------------------------------------------------------------------------------------------------------
export {BD, testarConexao};