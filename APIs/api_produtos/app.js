import express from "express";
import {BD, testarConexao} from './db.js';
import rotasProdutos from './src/routes/rotasProdutos.js'

import cors from 'cors';

//------------------------------------ SWAGGER
//importando swagger
import swaggerUi from 'swagger-ui-express';
import documentacao from "./config/swagger.js";



// ----------------------------------------------------------------------------------
const app = express();
app.use(express.json());
//------------------------------------------------------------------------------------------ SWAGGER
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
app.use(cors())  //---CORS conectando BACK-END COM FRONT-END
//------------------------------------------------------------------------------------------

app.get('/', async(req, res) =>{
    await testarConexao();
    // res.status(200).json('API FUNCIONANDO');
//------------------------------- SWAGGER
    res.redirect('/swagger')
//---------------------------------
})

//utilizando rotas falando pro App que vamos urilizar as rotas em nossos metodos
app.use(rotasProdutos);


const porta = 3000;
app.listen(porta, () =>{
    console.log(`http:localhost:${porta}`);
    
})
// -----------------------------------------------------------------------------------