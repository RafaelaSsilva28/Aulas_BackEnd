import express from "express";

const app = express();

//criação do primeiro endpoint
app.get("/", async (req, res) => {
  res.json("API FUNCIONANDO");

});


app.use('/dogs', express.static('public'))   //configurado para redirecionar a pasta public




//criando novo endpoint para consumir API VIACEP
app.get("/cep/:codigo", async (req, res) => {
  const codigo = req.params.codigo; //requisitando o codigo

  //metodo fetch é o mensageiro que ate a outra api e tras a outra resposta
  const resposta = await fetch(`https://viacep.com.br/ws/${codigo}/json/`);
  const dados = await resposta.json();

  const cidade = dados.localidade; //acessando dado da cidade
  const estado = dados.uf;
  res.json({ cidade, estado }); //mostrando ta tela apenas a cidade e o estado

  //res.json(dados);   //mostrando na tela tudo
});

//criando novo endpoint para consumir API SWAPI
app.get("/starwars/:id", async (req, res) => {
  const id = req.params.id; //requisitando o codigo

  //metodo fetch é o mensageiro que ate a outra api e tras a outra resposta
  const resposta = await fetch(`https://swapi.dev/api/people/${id}`);
  const dados = await resposta.json();

//         const caracteristicas = {
//    nome : dados.name,
//    altura : dados.height,
//    peso : dados.mass,
//    cor_dos_olhos : dados.eye_color
// }
   nome = dados.name;
   altura = dados.height;
   peso = dados.mass;
   cor_dos_olhos = dados.eye_color;

  res.json({ nome, altura, peso, cor_dos_olhos }); //mostrando na tela tudo
});

//novo endpoint com imagem
app.get('/dog/:id', async(req, res) =>{
    const id = req.params.id;
    const url = `https://http.dog/${id}.jpg`
    
        res.json({url})
});



const porta = 3000;
app.listen(porta, () => {
  console.log(`Servidor rodadondo http://localhost:${porta}`); 

});
