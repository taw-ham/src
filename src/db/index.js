const path = require("path");
const Database = require("sqlite-async");
const dbfile = path.resolve(__dirname,'database.sqlite');
async function conn() {
  return await Database.open(dbfile);
}
module.exports = { conn, dbfile };

/// 
// vamo botar o front end na pasta public, blz?
// blz - victor gabriel