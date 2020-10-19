const conn = require('../db');
async function create_folders(data){
  const sql = `INSERT INTO folders (nome) VALUES (?)`;
  const {nome} = data;
  const db = await conn();
  const {lastID} = await db.run(sql, [nome]) /*db.all*/
  return lastID;
}
async function create_txt(data){
  const sql = `INSERT INTO folders (nome,content,id_estrangeiro) VALUES (?,?,?)`;
  const {nome,content,id_estrangeiro} = data;
  const db = await conn();
  const {lastID} = await db.run(sql, [nome,content,id_estrangeiro])
  return lastID;
}
async function filters_txt(data){
  const sql = `SELECT * FROM txt WHERE id_estrangeiro = ?`;
  const {id_estrangeiro} = data;
  const db = await conn();
  const{results} = await db.run(sql,[id_estrangeiro]);
  return results;
}
async function delete_txt(data){
  const sql = `DELETE FROM txt WHERE id = ?`;
  const { id } = data;
  const db = await conn();
  const {results} = await db.run(sql,[id]);
  return results;
}

async function delete_folders(data){
  const sql = `DELETE FROM folders WHERE id = ?`;
  const { id } = data;
  const db = await conn();
  const {results} = await db.run(sql,[id]);
  return results;
}
async function update_txt(id,content){
  const sql = `UPDATE txt SET content = ? WHERE id = ?`;
  const db = await conn();
  const {results} = await db.run(sql,[content,id]);
  return results; 
}
async function update_folder(id,nome){
  const sql = `UPDATE folder SET nome = ? WHERE id = ?`;
  const db = await conn();
  const {results} = await db.run(sql,[content,id]);
  return results; 
}
async function view_folder(){
  const sql = `SELECT * FROM folders`;
  const db = await conn();
  const {results} = await db.all(sql);
  return results;
}

module.exports = {create_folders, create_txt, update_folder, update_txt, filters_txt, view_folder, delete_folders, delete_txt}

/*

DELETE FROM artists_backup
WHERE artistid = 1;
*/
/*async function create(data) {

const sql = 'INSERT INTO folders (nome,id_estrageiro) VALUES (?,?)';

const db = await conn();



const {lastID} = await db.run(sql, [id,nome])

return lastID;

}

module.exports {create};
*/



// After