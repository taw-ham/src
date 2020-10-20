
const funcoes = require('../models/index.js')
;
const Create_txt = async (req,res) => {
  const txt_data = req.body;
  const txt = await funcoes.create_txt(txt_data);
  res.json(txt);

}
const Create_folder = async (req,res) => {
  const folder_data = req.body;
  console.log(req)
  const folder = await funcoes.create_folders(folder_data);
  res.json(folder);

}

const Update_txt = async (req,res) => {
  const{id_txt,txt_data} = req.body;
  const txt = await funcoes.update_txt(id_txt,txt_data);
  res.json(txt);
}

const Update_folder = async (req,res) => {
  const{id_folder,folder_data} = req.body
  const folder =  await funcoes.Update_folder(id_folder,folder_data);
  res.json(folder);
}
const Filters_txt = async (req,res) => {
  const id_folder = req.body
  const filters_txt = await funcoes.filters_txt(id_folder);
  res.json(filters_txt);
}

const Delete_txt = async (req,res)=> {
  const id_txt = req.body
  const txt = await funcoes.delete_txt(id_txt);
  res.json(txt);
}

const Delete_folder = async (req,res)=>{
  const id_folder = req.body
  const folder = await funcoes.delete_folder(id_folder);
  res.json(folder);
}

const View_folder = async (req,res) => {
 const folder = await funcoes.view_folder();
  res.json(folder);
} 
module.exports = {Create_txt,Create_folder,Update_txt,Update_folder,Filters_txt,Delete_txt,Delete_folder,View_folder}

  





