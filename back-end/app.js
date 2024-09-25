const express = require("express"); // Importando o express
const app = express(); // Iniciando o express, passando o express pra variável app
const port = 4000;
/**
 * Configuração do middleware Express.js para habilitar o CORS (Cross-Origin Resource Sharing) em uma aplicação Node.js
Instale o cors via npm: npm install cors 
*/
var cors = require('cors')
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
  app.use(cors());
  next();
});

//http://localhost:4000
app.get('/', (req, res) => {
  res.send('Rota Inicial do Projeto');
});
//http://localhost:4000/bemvindo
app.get("/bemvindo", (req, res) => {
  res.send("Bem vindo Desenvolvedor");
});

//Retorno com json
//http://localhost:4000/json
app.get("/json", function (req, res) {
  return res.json({
    course: 'Node Js',
    title: 'Desenvolvimento de API',
    description: 'Aprenda a desenvolver uma API com Node Js',
    date: '2024-07-20'
  })
});

// Query Params - parâmetros passados na frente da rota, na URL
//http:localhost:4000/curso?nome=Javascript
app.get("/curso", function (req, res) {
  let x = req.query.sobrenome;
  return res.json({ curso: `Aprendendo ${x}` });
});

// Route Params - parâmetros passados via URL com a barra (/)  
//http:localhost:4000/turma/1
app.get("/turma/:id", function (req, res) {
  let id = req.params.id;
  return res.json({ turma: `Turma: ${id}` });
});

//Request Body - parâmetros passados no corpo da requisição
//http://localhost:4000/contato/5?sit=ativo
app.get("/contato/:id", function (req, res) {
  let id = req.params.id;
  let sit = req.query.sit;
  return res.json({ id, sit, nome: 'Nelci', email: 'professornelcimariano@gmail.com' });
});


let cursos = ['Node JS', 'Javascript', 'React'];
//Retorno de Todos os Cursos -> http://localhost:4000/cursos
app.get("/cursos", function (req, res) {
  return res.json(cursos);
});

//Retorno de 1 curso específico -> http://localhost:4000/cursos/1
app.get("/cursos/:index", function (req, res) {
  const { index } = req.params;
  return res.json(cursos[index]);
});


// Requisição com axios
const path = require('path'); // Configuração para acessar o arquivo products.json
const axios = require('axios');
// Servindo arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public'))); // Configuração para acessar o arquivo products.json na pasta pública
app.use(express.json()); // para lidar com JSON
app.use(express.urlencoded({ extended: true }));

// npm install axios
// crie a const axios na parte de cima -> const axios = require('axios');
// http://localhost:4000/produtos
app.get("/products", function (req, res) {
  axios.get('http://localhost:' + port + '/products.json')
  // axios.get('http://10.55.49.38:4000/products.json')
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).send('Erro ao ler o arquivo');
    });
});

/*
A função de callback "response" acima, é chamada quando a promessa retornada por axios.get é resolvida. 
O valor response é passado para esta função, e ele contém a resposta da solicitação HTTP feita com o Axios.

O objeto response tem várias propriedades úteis, incluindo:

response.data: os dados retornados pelo servidor. No seu caso, isso seria o conteúdo do arquivo products.json.
response.status: o código de status HTTP da resposta.
response.statusText: a mensagem de status HTTP da resposta.
response.headers: os cabeçalhos da resposta.
response.config: a configuração que foi usada para fazer a solicitação.
*/


//Retorna um produto específico
//http://localhost:4000/produtos/1
app.get("/products/:id", function (req, res) { // Define uma rota que recebe um parâmetro id
  axios.get('http://localhost:' + port + '/products.json') // Faz uma solicitação GET para o arquivo products.json
    .then(response => { // função de callback que é chamada quando a promessa retornada. A resposta da solicitação é passada para esta função.
      // const {listProduct} = response.data; //extrai a lista de produtos dos dados da resposta.
      const listProduct = response.data.listProduct; //extrai a lista de produtos dos dados da resposta.
      // const {id} = req.params; //extrai o parâmetro id da URL
      const id = req.params.id; //extrai o parâmetro id da URL
      const product = listProduct.find(product => product.id == id); // Procura o produto com o ID correspondente no array listProduct
      res.json(product);
    })
    .catch(error => {
      res.status(500).send('Erro ao ler o arquivo');
    });
});


// Busca de produtos pesquisa
// Define uma rota para buscar produtos por uma palavra-chave
// http://localhost:4000/produtos/search?q=sushi
app.get("/products/search", function (req, res) {
  const query = req.query.q; // Obtém o parâmetro de consulta 'q' da URL

  // console.log('Query recebida:', query); // Log da query recebida
  // Faz uma requisição GET para o arquivo JSON
  axios.get('http://localhost:4000/products.json')
    .then(response => {
      const { listProduct } = response.data; // Extrai a lista de produtos dos dados da resposta

      // Faz a busca por palavra-chave no título ou descrição
      const filteredProducts = listProduct.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) || // Verifica se o título contém a palavra
        product.description.toLowerCase().includes(query.toLowerCase()) // Verifica se a descrição contém a palavra
      );

      // Retorna os produtos encontrados ou uma mensagem se nenhum for encontrado
      if (filteredProducts.length > 0) {
        res.json(filteredProducts);
      } else {
        res.status(404).send('Nenhum produto encontrado com essa palavra-chave');
      }
    })
    .catch(error => {
      console.error('Erro ao ler o arquivo:', error.message);
      res.status(500).send('Erro ao ler o arquivo');
    });
});


app.listen(port, () => {
  console.log('Servidor Iniciado na porta');
}); 