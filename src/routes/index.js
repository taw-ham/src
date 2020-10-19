/*
criar txt  /create/txt   | {nome, txt} Taw-ham
atualizar txt  /update/txt            | {id, txt} Edclaudio
criar folder /create/folder           | {nome} Taw-ham
atualizar folder /update/folder  | {id, nome} Edclaudio
ver folders criados  /look/folders  Taw-ham
ver txts de um folder /look/txts | {id}    | {id} Edclaudio
deletar txt /delete/txt                  | {id} Taw-ham
deletar folder /delete/folder  | {id} Edclaudio
*/
const controller = require('../controller/');
const express = require ('express');
const router = express.Router();
router.post('/create/txt', controller.Create_txt);
router.put('/update/txt', controller.Update_txt);
router.post('/create/folder', controller.Create_folder);
router.put('/update/folder', controller.Update_folder);
router.get('/look/folder',controller.View_folder);
router.get('/look/txts',controller.Filters_txt);
router.delete('/delete/txt', controller.Delete_txt);
router.delete('/delete/folder',controller.Delete_folder);

module.exports = router;








