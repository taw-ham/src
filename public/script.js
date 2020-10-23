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
      body: JSON.stringify({
        nome,
        txt,
        id
      }),
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
      body: JSON.stringify({
        id
      }),
      headers: {
        'Content-Type': 'application/json'
      }

    }).then(resposta => resposta.json())
  }

  atualizar(idTxt, txt) {
    // Atualiza o conteudo de um txt
    let id = idTxt;
    return fetch(this.urlUpdate, {
      method: "PUT",
      body: JSON.stringify({
        id,
        txt
      }),
      headers: {
        'Content-Type': 'application/json'
      }

    }).then(resposta => resposta.json())
  }

  deletar(idTxt) {
    // Deleta um txt
    let id = idTxt;
    return fetch(this.urlDelete + "/" + id, {
      method: "DELETE",
    }).then(resposta => resposta.json())
  }

  olhar(idTxt) {
    // Requisita o conteúdo de um txt
    let id = idTxt;
    return fetch(this.urlLook, {
      method: "POST",
      body: JSON.stringify({
        id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resposta => resposta.json())
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
      body: JSON.stringify({
        nome
      }),
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
      body: JSON.stringify({
        id,
        nome
      }),
      headers: {
        'Content-Type': 'application/json'
      }

    }).then(resposta => resposta.json())
  }

  deletar(idFolder) {
    // Deleta um folder
    let id = idFolder;
    return fetch(this.urlDelete + "/" + id, {
      method: "DELETE",
      body: JSON.stringify({
        id
      })
    }).then(resposta => resposta.json())
  }
}
$("#view_txt").hide("fast");
$("#update_folder").hide("fast");
$("#area_create_folder").hide("fast");
$("#view_txt").hide("fast");
$("#area_create_txt").hide("fast");
$("#look_txt").hide("fast");

const txt_Service = new Txt_Service("/create/txt", "/update/txt", "/look/txts", "/delete/txt", "/look/txt")
const folder_Service = new Folder_Service("/create/folder", "/update/folder", "/look/folders", "/delete/folder")
document.getElementById("create_folder").onclick = function () {
  $("#area_create_folder").show("fast");
  $("#view_folders").hide("fast");

  document.getElementById("back_area_create_folder").onclick = function(){
     $("#area_create_folder").hide("fast");
     $("#view_folders").show("fast");
  }

  document.getElementById("save_name_folder").onclick = function () {
    const name_folder = $("#name_folder").val();

    if (name_folder == "") {
      swal('invalido', 'tente_novamente', 'error');
    } else {
      folder_Service.inserir(name_folder).then(resposta => {
        location.reload();
      })
    }
  }
}

folder_Service.listar().then(resposta => {
  const list_folders = document.getElementById("list_folders");
  for (let i = 0; i <= resposta.length - 1; i++) {
    const li = document.createElement("li");
    li.setAttribute('class', 'list-group-item')

    const button_folder = document.createElement("button");
    const button_folder_apagar = document.createElement("button");
    const button_folder_update = document.createElement("button");
    button_folder_update.innerHTML = "renomear";
    button_folder_update.setAttribute('id', resposta[i].id);
    button_folder_update.setAttribute("class", "btn btn-warning")
    button_folder.innerHTML = resposta[i].nome;
    button_folder.setAttribute('id', resposta[i].id);
    button_folder.setAttribute("class", "btn btn-primary")
    button_folder_apagar.innerHTML = "<img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd30y9cdsu7xlg0.cloudfront.net%2Fpng%2F3058-200.png&f=1&nofb=1' height='60%' width='60%'>";
    button_folder_apagar.setAttribute('id', resposta[i].id);
    button_folder_apagar.setAttribute("class", "btn btn-danger")
    li.setAttribute('id', resposta[i].id);
    li.append(button_folder);
    li.append(button_folder_update);
    li.append(button_folder_apagar);
    list_folders.append(li);
    button_folder_update.onclick = function () {
      $("#view_folders").hide("fast");
      $("#update_folder").show("fast");

      const id_folder = resposta[i].id;

      document.getElementById("voltar_update_folder").onclick = function(){
          $("#view_folders").show("fast");
          $("#update_folder").hide("fast");
      }

      document.getElementById("save_update_folder").onclick = function () {
        const valor = $("#content_folder").val();
        if (valor == '') {
          swal('invalido', 'tente-novamente', 'error');
        } else {
          folder_Service.atualizar(id_folder, valor).then(results => {
            $("#content_folder").text(' ');
            $("#view_folders").show("fast");
            $("#update_folder").hide("fast");
            location.reload();
          })
        }
      }
    }

    button_folder_apagar.onclick = function () {

      const id_apagar = resposta[i].id;

      folder_Service.deletar(id_apagar).then(resposta => {
        $("#list_folders li").remove(`#${id_apagar}`);
      })
    }
    button_folder.onclick = function () {

      const id_folder = resposta[i].id;

      $("#view_folders").hide("fast");
      $("#view_txt").show("fast");

      document.getElementById("back_view_txt").onclick = function(){
        $("#view_folders").show("fast");
        $("#view_txt").hide("fast");
      }
      
      txt_Service.listar(id_folder).then(resposta2 => {
        const list_txt = document.getElementById("list_txt")
        for (let e = 0; e <= resposta2.length - 1; e++) {
          const li = document.createElement('li');
          li.setAttribute('class', 'list-group-item')
          li.setAttribute('id', resposta2[e].id)
          const button_txt = document.createElement('button');
          const button_txt_apagar = document.createElement("button");
          button_txt_apagar.innerHTML = "<img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd30y9cdsu7xlg0.cloudfront.net%2Fpng%2F3058-200.png&f=1&nofb=1' height='60%' width='60%'>"
          button_txt_apagar.setAttribute('id', resposta2[e].id)
          button_txt_apagar.setAttribute("class", "btn btn-danger")
          button_txt.innerHTML = resposta2[e].nome
          button_txt.setAttribute('id', resposta2[e].id)
          button_txt.setAttribute("class", "btn btn-primary")
          li.append(button_txt)
          li.append(button_txt_apagar)
          list_txt.append(li);
          button_txt_apagar.onclick = function () {
            const id_txt = resposta2[e].id;
            txt_Service.deletar(id_txt).then(resposta3 => {
              $("#list_txt li").remove(`#${id_txt}`);
            })
          }
          button_txt.onclick = function () {
            $("#view_txt").hide("fast");
            $("#look_txt").show("fast");
            const id_txt = resposta2[e].id;
            document.getElementById("back_look_txt").onclick = function(){
              $("#view_txt").show("fast");
              $("#look_txt").hide("fast");

            }
            
            txt_Service.olhar(id_txt).then(resposta3 => {
              console.log(resposta3);
              let valor = document.getElementById("content").value = resposta3[0].content;
              button_txt_salvar = document.getElementById("Salvar_txt");
              button_txt_salvar.onclick = function () {
                valor = document.getElementById("content").value;
                console.log(valor);

                txt_Service.atualizar(id_txt, valor).then(resposta4 => {
                  console.log(resposta4)
                  valor.value = " ";
                  $("#view_txt").show("fast");
                  $("#look_txt").hide("fast");
                })
              }
            })
          }
        }
        button_create_txt = document.getElementById("create_txt");
        button_create_txt.onclick = function () {
          $("#view_txt").hide("fast");
          $("#area_create_txt").show("fast");
          document.getElementById("back_area_create_txt").onclick = function(){
             $("#view_txt").show("fast");
             $("#area_create_txt").hide("fast");

          }
          document.getElementById("save_txt").onclick = function () {
            const name_txt = $("#nome_txt").val();
            const content_txt = $("#content_txt").val();
            if (name_txt == '' || content_txt == '') {
              swal('invalido', 'tente novamente', 'error');
            } else {
              txt_Service.inserir(name_txt, content_txt, id_folder).then(results => {
                location.reload();
              })
            }
          }
        }
      })
    }
  }
})