import express from "express";
import {BD, testarConexao} from '../api_produtos/db.js';
import rotasUsuarios from '../api_usuarios/src/routes/rotasUsuarios.js'

import cors from 'cors';

//------------------------------------ SWAGGER
//importando swagger
import swaggerUi from 'swagger-ui-express';
import documentacao from "../api_usuarios/config/swagger.js";



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
app.use(rotasUsuarios);


const porta = 3000;
app.listen(porta, () =>{
    console.log(`http:localhost:${porta}`);
    
})
// -----------------------------------------------------------------------------------