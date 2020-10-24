const funcoes = require('../models/index.js');
const Create_txt = async (req,res) => {
  const txt = await funcoes.create_txt(req.body);
  res.json(txt);
}
const Create_folder = async (req,res) => {
  const folder = await funcoes.create_folders(req.body);
  res.json(folder);
}
const Update_txt = async (req,res) => {
  const txt = await funcoes.update_txt(req.body);
  res.json(txt);
}
const Update_folder = async (req,res) => {
  const folder =  await funcoes.update_folder(req.body);
  res.json(folder);
}
const Filters_txt = async (req,res) => {
  const filters_txt = await funcoes.filters_txt(req.body);
  res.json(filters_txt);
}
const Delete_txt = async (req,res)=> {
  const id = Number(req.params.id);
  const txt = await funcoes.delete_txt(id);
  res.json(txt);
}
const Look_txt = async (req,res) => {
  const txt = await funcoes.look_txt(req.body);
  res.json(txt);

}
const Delete_folder = async (req,res)=>{
  const id = Number(req.params.id);

  const folder = await funcoes.delete_folders(id);
  res.json(folder);
}

const View_folder = async (req,res) => {
 const folder = await funcoes.view_folder();
  res.json(folder);
} 
module.exports = {Create_txt,Create_folder,Update_txt,Update_folder,Filters_txt,Delete_txt,Delete_folder,View_folder,Look_txt}

  





