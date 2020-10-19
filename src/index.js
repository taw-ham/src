const fs = require("fs");
const express = require("express");
const { dbFile } = require("./db");
const Migration = require("./migrations");
const routes = require('./routes');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(routes);
(async () => {
  if (!fs.existsSync(dbFile)) {
    await Migration.up();  
  }
})();
app.listen(3000, () => {
  console.log(app);
});

/*
const fs = require("fs");
const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const Seed = require("./seeders");
const Migration = require("./migrations");
const { dbFile } = require("./db");

const app = express();

app.use(express.static("public"));
app.use(routes);

app.set("view engine", "njk");

nunjucks.configure("src/views", {
  express: app,
  autoescape: true,
  noCache: true
});

(async () => {
  if (!fs.existsSync(dbFile)) {
    await Migration.up();
    await Seed.up();
  }
})();



onst express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
const txts = [];
//let key = 0;
app.get("/txt", (req, res) => {
  let nomes = []
  for (let i = 0; i < txts.length; i++) {
    nomes.push(txts[i].nome);
  }
  return res.json(nomes);
})

// Envia conteúdo do arquivo requisitado
app.get("/atualizar/:nome", (req, res) => {
  const nome = req.params.nome;

  for (let i = 0; i < txts.length; i++){
    arquivo = txts[i];
    if (arquivo.nome == nome){
      return res.json(arquivo);
    } 
  }

  return res.status(404).json({});
});

// Recebe txt novo a ser adicionado
app.post('/enviar', (req,res) => {
  const arquivo = req.body;
  //key ++;
  //const user = {key,txt}
  txts.push(arquivo);
  res.status(201).json(arquivo); 
});

app.put("/atualizar/:nome", (req, res) => {
  const nome = req.params.nome;
  const {txt} = req.body; 
  for (let i = 0; i < txts.length; i++) {
    if (txts[i].nome == nome){
      txts[i].txt = txt;
      return res.json(txts[i]);
    }
  }
}) 


app.listen(port, () => {
  console.log(`app is running is port ${port}`)
});
*/