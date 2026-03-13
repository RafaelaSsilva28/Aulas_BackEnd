import express from "express";
import {BD, testarConexao} from './db.js';
import rotasUsuarios from './src/routes/rotasUsuarios.js'
import rotasDepartamentos from './src/routes/rotasDepartamentos.js'
import rotasOrdemServico from './src/routes/rotasOrdemServico.js'
//------------------------------------ SWAGGER
//importando swagger
import swaggerUi from 'swagger-ui-express';
import documentacao from "./config/swagger.js";



// ----------------------------------------------------------------------------------
const app = express();
app.use(express.json());
//------------------------------------------------------------------------------------------ SWAGGER
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
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
app.use(rotasDepartamentos);
app.use(rotasOrdemServico);

const porta = 3000;
app.listen(porta, () =>{
    console.log(`http:localhost:${porta}`);
    
})
// -----------------------------------------------------------------------------------