const fs = require("fs");
const express = require("express");
const { dbFile } = require("./db");
const Migration = require("./migrations");
const routes = require('./routes');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

(async () => {
  if (!fs.existsSync(dbFile)) {
    await Migration.up();  
  }
})();
app.listen(3000, () => {
  console.log("app is running");
}); 
