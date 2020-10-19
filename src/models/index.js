const conn = require('../db');
async function create_folders(data){
  const sql = `INSERT INTO folders (name) VALUES (?)`;
  const {name} = data;
  const db = await conn();
  const {lastID} = await db.run(sql, [name]) /*db.all*/
  return lastID;
}
async function create_txt(data){
  const sql = `INSERT INTO folders (name,content,id_estrangeiro) VALUES (?,?,?)`;
  const {name,content,id_estrangeiro} = data;
  const db = await conn();
  const {lastID} = await db.run(sql, [name,content,id_estrangeiro])
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
async function update_folder(id,name){
  const sql = `UPDATE folder SET name = ? WHERE id = ?`;
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



/*

DELETE FROM artists_backup
WHERE artistid = 1;
*/
/*async function create(data) {

const sql = 'INSERT INTO folders (name,id_estrageiro) VALUES (?,?)';

const db = await conn();



const {lastID} = await db.run(sql, [id,name])

return lastID;

}

module.exports {create};
*/



// After