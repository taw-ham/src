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

class txt_Service {
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
        body: JSON.stringify(nome, txt, id),
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
        body: JSON.stringify(id, txt),
        headers: {
            'Content-Type': 'application/json'
        }

      }).then(resposta => resposta.json())
    }

    deletar(idTxt){
      // Deleta um txt
      let id = idTxt;
      return fetch(this.urlDelete, {
        method: "DELETE",
        body: JSON.stringify(id)
      })
    }

    olhar(idTxt){
      // N
      // Requisita o conteúdo de um txt
      let id = idTxt;
      return fetch(this.urlLook, {
        method: "POST",
        body: JSON.stringify(id)
      })
    }
}

class folder_Service {
  constructor(urlCreate, urlUpdate, urlListAll, urlDelete) {
    this.urlCreate = urlCreate;
    this.urlUpdate = urlUpdate;
    this.urlListAll = urlListAll;
    this.urlDelete = urlDelete;
  }

  inserir(nome) {
    // Cria um folder (pasta) com o nome definido
    return fetch(this.urlCreate, {
      method: "POST",
      body: JSON.stringify(nome),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      resposta => resposta.json()
    );
  }

  listar() {
    // Lista todos os folders
    return fetch(this.urlListAll, {
      method: "GET", // ** verificar dps com taw o metodo
    }).then(resposta => resposta.json())
  }

  atualizar(idFolder, nome) {
    // Atualiza o nome de uma pasta
    let id = idFolder;
    return fetch(this.urlUpdate, {
      method: "PUT",
      body: JSON.stringify(id, nome),
      headers: {
        'Content-Type': 'application/json'
      }

    }).then(resposta => resposta.json())
  }

  deletar(idFolder){
    // Deleta um folder
    let id = idFolder;
    return fetch(this.urlDelete, {
      method: "DELETE",
      body: JSON.stringify(id)
    })
  }
}

const txt_Service = new txt_Service("/create/txt", "/update/txt", "/look/txts", "/delete/txt", "/look/txt")
const folder_Service = new folder_Service("/create/folder", "/update/folder", "/look/folders", "/delete/folder")

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
            folder_Service.inserir(nome).then(resposta => {
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

    document.getElementById("enviar_txt").onclick = function () {
        const txt_user = document.getElementById("txt").value;
        const txt_nome = document.getElementById("nome_txt").value;
        if (txt_user == "" || txt_nome == "") {
            swal('digite o nome ou o seu texto!', '- tente novamente -', 'error')
        } else {
            const texto = new TXT(txt_nome, txt_user);
            txt_Service.inserir(id, texto).then(resposta => {
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
    // **
    folder_Service.listar(id).then(resposta => {
        for (let i = 0; i <= resposta.length-1; i++) {
            const li = document.createElement("li");
            const button_folder = document.createElement("button");
            button_folder.innerText = resposta[i].nome;
            button_folder.setAtribute('id', resposta[i].id);
            li.append(button);
            ul_folder.append(li);

            button.onclick = function () {
                $("#escolha_folder").hide("fast");
                $("#escolha_txt").show("fast");

            const ul_txt = document.getElementById("historico_txt/");
            txt_Service.listar(idFolder).then(resposta => {
              for (let i = 0; i <= resposta.length-1; i++) {
                txt = resposta[i];
                const li = document.createElement("li");
                const button_txt = document.createElement("button");
                button_txt.innerText = resposta[i].name;
                button_txt.setAtribute('id', resposta[i].id);
                li.append(button);
                ul_txt.append(li);

                button.onclick = function () {
                $("#escolha_txt").hide("fast");
                $("#look_txt").show("fast");
                
                txt_Service.listar(idFolder)
                const txt_put = document.getElementById("put_texto_txt").value = txt;
                document.getElementById("put_txt").onclick = function ()
                  const jhon_sleep = new TXT_put(txt_put);
                  txt_Service.atualizar(id, jhon_sleep).then(response => {
                  window.location.reload();
                  }) 
                }

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