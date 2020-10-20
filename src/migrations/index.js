const {conn} = require('../db');
async function up(){
  const db = await conn();
  await db.run(`
  CREATE TABLE IF NOT EXISTS folders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT
  )
  `);
  await db.run(`
  CREATE TABLE IF NOT EXISTS txt(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    content TEXT,
    id_estrangeiro INTEGER,
    FOREIGN KEY (id_estrangeiro) REFERENCES folders (id)
  )
  `);
}
async function down () {
  const db =  await conn();
  await db.run ('DROP TABLE folder');
  await db.run ('DROP TABLE txt');
}
module.exports = {up,down};
