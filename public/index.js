class TXT {
    constructor(nome, txt) {
        this.nome = nome;
        this.txt = txt;
    }
}
class TXT_put {
    constructor(txt) {
        this.txt = txt;
    }
}

class Txt_Service {
    constructor(urlCreate, urlUpdate, urlListAll, urlDelete, urlLook) {
      this.urlCreate = urlCreate;
      this.urlUpdate = urlUpdate;
      this.urlListAll = urlListAll;
      this.urlLook = urlLook;
      this.urlDelete = urlDelete;
    }

    inserir(nome, txt, idFolder) {
      // Cria um txt com nome e conteudo na pasta especificada
      let id = idFolder;
      return fetch(this.urlCreate, {
        method: "POST",
        body: JSON.stringify({nome, txt, id}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        resposta => resposta.json()
      );
    }

    listar(idFolder) {
      // Requisita uma lista com todos os txts de uma pasta
      let id = idFolder;
      return fetch(this.urlListAll, {
          method: "POST",
          body: JSON.stringify(id)

      }).then(resposta => resposta.json())
    }

    atualizar(idTxt, txt) {
      // Atualiza o conteudo de um txt
      let id = idTxt;
      return fetch(this.urlUpdate, {
        method: "PUT",
        body: JSON.stringify({id, txt}),
        headers: {
            'Content-Type': 'application/json'
        }

      }).then(resposta => resposta.json())
    }

    deletar(idTxt){
      // Deleta um txt
      let id = idTxt;
      return fetch(this.urlDelete + "/" + id, {
        method: "DELETE",
        body: JSON.stringify(id)
      })
    }

    olhar(idTxt){
      // Nice
      // Requisita o conteúdo de um txt
      let id = idTxt;
      return fetch(this.urlLook, {
        method: "POST",
        body: JSON.stringify(id)
      })
    }
}

class Folder_Service {
  constructor(urlCreate, urlUpdate, urlListAll, urlDelete) {
    this.urlCreate = urlCreate;
    this.urlUpdate = urlUpdate;
    this.urlListAll = urlListAll;
    this.urlDelete = urlDelete;
  }

  inserir(nome) {
   return fetch(this.urlCreate, {
      method: "POST",
      body: JSON.stringify({nome}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((resposta) => resposta.json());
  
  }

  listar() {
    // Lista todos os folders
    return fetch(this.urlListAll, {
      method: "GET",
    }).then(resposta => resposta.json())
  }

  atualizar(idFolder, nome) {
    // Atualiza o nome de uma pasta
    let id = idFolder;
    return fetch(this.urlUpdate, {
      method: "PUT",
      body: JSON.stringify({id, nome}),
      headers: {
        'Content-Type': 'application/json'
      }

    }).then(resposta => resposta.json())
  }

  deletar(idFolder){
    // Deleta um folder
    let id = idFolder;
    return fetch(this.urlDelete + "/" + id, {
      method: "DELETE",
      body: JSON.stringify(id)
    })
  }
}

const txt_Service = new Txt_Service("/create/txt", "/update/txt", "/look/txts", "/delete/txt", "/look/txt")
const folder_Service = new Folder_Service("/create/folder", "/update/folder", "/look/folders", "/delete/folder")
folder_Service.listar().then(resposta =>{
  const list_folders = document.getElementById("list_folders");
  for(let i = 0; i <= resposta.length -1; i++){
    const li = document.createElement("li");
    const button_folder = document.createElement("button");
    const button_folder_apagar = document.createElement("button");
    button_folder.innerHTML = resposta[i].nome;
    button_folder.setAttribute('id',resposta[i].id);
    button_folder_apagar.setAttribute('id',resposta[i].id);
    li.setAttribute('id',resposta[i].id);
    li.append(button_folder);
    li.append(button_folder_apagar);
    list_folders.append(li);
    button_folder_apagar.onclick = function(){
      const id_apagar = resposta[i].id;
      folder_Service.deletar(id_apagar).then(resposta => {
       


      })
    }



    

  }
})
/*
$("#area_criar_folder").hide("fast");
$("#area_historico").hide("fast");

document.getElementById("criar_folder").onclick = function () {
    $("#menu_opcao").hide("fast");
    $("#area_criar_folder").show("fast");

    document.getElementById("enviar_folder").onclick = function () {
      const nome_folder = document.getElementById("nome_folder").value;
        if (nome_folder == "") {
            swal('Digite o nome da sua pasta!', '- tente novamente -', 'error')
        } else {
            folder_Service.inserir(nome_folder).then(resposta => {


                $("#nome_folder").val(' ');
                $("#area_criar_folder").hide("fast");
                $("#menu_opcao").show("fast");
            })
          }
    }
}

document.getElementById("criar_txt").onclick = function () {
    $("area_historico").hide("fast");
    $("#area_criar_txt").show("fast");
}

document.getElementById("historico").onclick = function () {
    $("#menu_opcao").hide("fast");
    $("#area_historico").show("fast");
    $("#escolha_folder").show("fast");
    $("#area_criar_txt").hide("fast");
    $("#escolha_txt").hide("fast");
    $("#look_folder").hide("fast");
    $("#look_txt").hide("fast");

    document.getElementById("voltar_historico").onclick = function () {
        $("#historico_folder").empty();
        $("#area_historico").hide("fast");
        $("#menu_opcao").show("fast");
    }

    const ul_folder = document.getElementById("historico_folder");
    folder_Service.listar().then(resposta => {
        for (let i = 0; i <= resposta.length-1; i++) {
            const idPasta = resposta[i].id;
            const li = document.createElement("li");
            const button_folder = document.createElement("button");
            const button_folder_delete = document.createElement("button");
            button_folder.innerText = resposta[i].nome;
            button_folder_delete.innerText = "apagar";
            button_folder.innerHTML = "<img src='./imgs/docs.png' height='20%'' width='20%'>";
            button_folder.setAtribute('id', resposta[i].id);
            li.setAtribute('class',resposta[i].id)
            li.append(button_folder);
            li.append(button_folder_delete);
            ul_folder.append(li);
            button_folder_delete.onclick = function () {
              // TODO não confiar
              folder_Service.deletar(idPasta[i]);
              $("li").remove(`.${idPasta[i]}`);
            
            }
            
            button_folder.onclick = function () {
                $("#escolha_folder").hide("fast");
                $("#escolha_txt").show("fast");

                document.getElementById("enviar_txt").onclick = function () {
                    const txt = document.getElementById("txt").value;
                    const nome_txt = document.getElementById("nome_txt").value;
                    if (nome_txt == "" || txt == "") {
                        swal('digite o nome ou o seu texto!', '- tente novamente -', 'error')
                    } else {
                        txt_Service.inserir(nome_txt, txt, id_pasta).then(resposta => {
                            $("#nome_txt").val(' ');
                            $("#txt").val(' ');
                            $("#area_historico").show("fast");
                            $("#escolha_folder").show("fast");
                            $("#area_criar_txt").hide("fast");
                            $("#escolha_txt").hide("fast");
                            $("#look_folder").hide("fast");
                            $("#look_txt").hide("fast");
                        })
                      }
                }

                const ul_txt = document.getElementById("historico_txt/");
                txt_Service.listar(idFolder).then(resposta2 => {
                    for (let t = 0; t <= resposta2.length-1; t++) {
                        let idTxt = resposta2[t].id;
                        txt = resposta2[t];
                        const li = document.createElement("li");
                        const button_txt = document.createElement("button");
                        button_txt.innerText = resposta2[t].name;
                        button_txt.innerHTML = "<img src='./imgs/path.png' height='20%'' width='20%'>";
                        button_txt.setAtribute('id', resposta2[t].id);
                        const button_txt_delete = document.createElement("button");
                        button_txt_delete.innerText = "apagar";
                        li.append(button_txt);
                        li.append(button_txt_delete);
                        ul_txt.append(li);

                        button_txt.onclick = function () {
                            $("#escolha_txt").hide("fast");
                            $("#look_txt").show("fast");
                                            
                            txt_Service.olhar(idTxt).then( resposta => {
                                document.getElementById("put_txt").onclick = function () {
                                    const txt_put = document.getElementById("put_texto_txt").value = txt;
                                    const jhon_sleep = new TXT_put(txt_put);
                                    txt_Service.atualizar(idTxt, txt).then(response => { window.location.reload(); }) 
                                }
                            })

                            document.getElementById("cancelar_put_txt").onclick = function () {
                                $("#put_texto_txt").val(' ');
                                $("#look_txt").hide("fast");
                                $("#escolha_txt").show("fast");
                            }
                        }

                    }
                })
            }
        }
    })
}
*/