const {conn, dbfile} = require('../db');
async function create_folders(data){
  const sql = `INSERT INTO folders (nome) VALUES (?)`;
  const {nome} = data;
  const db = await conn();
  const lastID = await db.run(sql, [nome]) /*db.all*/
  const SQL = `SELECT * FROM folders`;
  const results2 = await db.all(SQL);
  return results2;

}
async function create_txt(data){
  const sql = `INSERT INTO txt (nome,content,id_estrangeiro) VALUES (?,?,?)`;
  const {nome,txt,id} = data;
  const db = await conn();
  const results = await db.run(sql, [nome,txt,id])
  const SQL = `SELECT * FROM txt WHERE id_estrangeiro = ?`;
  const results2 = await db.all(SQL,[id]);
  return results2;
}
async function filters_txt(data){
  const sql = "SELECT * from txt WHERE id_estrangeiro = ?";
  const {id} = data;
  console.log(data)
  const db = await conn();
  const results = await db.all(sql, [id]);
  console.log(await db.all(sql));
  return results;

  
}
async function delete_txt(data){
  const sql = `DELETE FROM txt WHERE id = ?`;
  const id = data;
  const db = await conn();
  const results = await db.run(sql,[id]);
  const SQL = `SELECT * FROM txt`;
  const results2 = await db.all(SQL);
  return results2;

}

async function delete_folders(data){
  const sql = `DELETE FROM folders WHERE id = ?`;
  const id = data;
  console.log(id);
  const db = await conn();
  const results = await db.run(sql,[id]);
  const SQL = `SELECT * FROM folders`;
  const results2 = await db.all(SQL);
  return results2;
}
async function update_txt(data){
  const sql = `UPDATE txt SET content = ? WHERE id = ?`;
  const db = await conn();
  const {id,txt} = data;
  const results = await db.run(sql,[txt,id]);
  const SQL = `SELECT * FROM txt WHERE id =?`;
  const results2 = await db.all(SQL,[id]);
  return results2;

}
async function update_folder(data){
  const sql = `UPDATE folders SET nome = ? WHERE id = ?`;
  const db = await conn();
  const{ id,nome } = data;
  const results = await db.run(sql,[nome,id]);
  const SQL = `SELECT * FROM folders WHERE id =?`;
  const results2 = await db.all(SQL,[id]);
  return results2;

}
async function view_folder(){
  const sql = `SELECT * FROM folders`;
  const db = await conn();
  const results = await db.all(sql);
  return results;
}
async function look_txt(data){
  const sql = `SELECT * FROM txt WHERE id = ?`;
  const {id} = data;
  const db = await conn();
  const results = await db.all(sql,[id]);
  return results;
}

module.exports = {create_folders, create_txt, update_folder, update_txt, filters_txt, view_folder, delete_folders, delete_txt,look_txt}

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