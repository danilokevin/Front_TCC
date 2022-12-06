var usuario = JSON.parse(localStorage.getItem("usuario")) 
var token = JSON.parse(localStorage.getItem("token"))

var ferramentas = {}//JSON.parse(localStorage.getItem("ferramentas"))
var anuncios = {}//JSON.parse(localStorage.getItem("anuncios"))

$(function() {
    
    getFerramentas(usuario.idUsuario, token.token)
    getAnuncios(usuario.idUsuario, token.token)

    
    
});

function montarCardsFerramentas() {
    boxCards = document.getElementById("boxCards")
    boxCards.innerHTML = ""
    
    document.getElementById('call-btn').style.visibility = 'visible'

    for (let i=0; i < ferramentas.length; i++){
        boxCards.innerHTML += cardsFerramentas(ferramentas[i])
    }
    
}

function getFerramentas(idUsuario, token) {
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    fetch(`http://localhost:8080/ferramentas/proprietario/${idUsuario}`, options)
    .then(response => {response.json()
        .then(data => {
            if (data) {
                localStorage.setItem("ferramentas", JSON.stringify(data))
                ferramentas = JSON.parse(localStorage.getItem("ferramentas"))
                montarCardsFerramentas()
            } else {
                alert("Falha ao capturar ferramentas")
            }
        })
    })
    .catch(e => console.log(e.message))
    
}

//
function postFerramenta(body) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token
        },
        body: JSON.stringify(body)
    };

    fetch(`http://localhost:8080/ferramentas`, options)
    .then(response => {response.json()
        .then(data => {
            if (data) {
                alert(data.message)
                var idFerramentaInt = data.message.slice(23, data.message.length)
                body.idFerramenta = parseInt(idFerramentaInt)

                ferramentas.push(body)
                localStorage.setItem("ferramentas", JSON.stringify(ferramentas))
                montarCardsFerramentas()
            } else {
                alert("Falha ao salvar ferramentas")
            }
        })
    })
    .catch(e => console.log(e.message))

}

function cardsFerramentas(ferramenta){
    return `
    <div class="col-md-2" style="margin-bottom: 15px; id="${ferramenta.idFerramenta}">
        <div class="card">
            <img src="img/proj4.jpg" class="card-img-top" alt="Imagem de Perfil 4">
            <div class="card-body">
                <h5 class="card-title">${ferramenta.nome}</h5> 
                <p class="card-text">${ferramenta.descricao}</p> 
                <div style="text-align: center;">
                    <a href="#" class="btn" title="Editar" data-toggle="modal" data-target="#myModal" onclick="preencherCampos(${ferramenta.idFerramenta})"><i class="fas fa-pen-to-square"></i></a>
                    <a href="#" title="Anúncio" class="btn" onclick="anuncioFerramenta(${ferramenta.idFerramenta})"><i class="fas fa-plus"></i></a>
                    <a href="#" title="Inativar" class="btn"><i class="fas fa-trash"></i></a>
                </div>
            </div>
        </div> 
    </div>`
}

function adicionarFerramenta(){

    var body = {
        nome: document.getElementById("inputNome").value,
        descricao: document.getElementById("inputDescricao").value,
        tensao: document.getElementById("inputTensao").value,
        modalidade: document.getElementById("inputModalidade").value,
        disponibilidade: document.getElementById("inputDisponibilidade").value,
        proprietarioId: usuario.idUsuario
    }

    postFerramenta(body)

}

function preencherCampos(id){
    var edit = ferramentas.find(i => i.idFerramenta == id)
   
    document.getElementById("inputNome").value = edit.nome
    document.getElementById("inputDescricao").value = edit.descricao
    document.getElementById("inputTensao").value = edit.tensao
    document.getElementById("inputModalidade").value = edit.modalidade
    document.getElementById("inputDisponibilidade").value = edit.disponibilidade
}

function limparCampos() {
    document.getElementById("inputNome").value = ""
    document.getElementById("inputDescricao").value = ""
    document.getElementById("inputTensao").value = ""
    document.getElementById("inputModalidade").value = ""
    document.getElementById("inputDisponibilidade").value = ""
}

function anuncioFerramenta(idFerramenta, nomeFerramenta) {
    const body = {
        proprietarioId: usuario.idUsuario,
        ferramentaId: idFerramenta
    }
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token
        },
        body: JSON.stringify(body)
    };

    fetch(`http://localhost:8080/anuncios`, options)
    .then(response => {response.json()
        .then(data => {
            if (data) {
                alert(data.message)
                //console.log(data.message)
                localStorage.removeItem("anuncios")
                getAnuncios(usuario.idUsuario, token.token)
                
                //var idAnuncioInt = data.message.slice(20, data.message.length)
                //console.log(idAnuncioInt)
                //body.ferramentaId = parseInt(idAnuncioInt)

                //anuncios.push(body)
                //localStorage.setItem("anuncios", JSON.stringify(anuncios))
                //montarCardsAnuncios()
            } else {
                alert("Falha ao anunciar ferramenta")
                
            }
        })
    })
    .catch(e => console.log(e.message))

    

}


function getAnuncios(idUsuario, token) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    fetch(`http://localhost:8080/anuncios/proprietario/${idUsuario}`, options)
    .then(response => {response.json()
        .then(data => {
            if (data) {
                localStorage.setItem("anuncios", JSON.stringify(data))
                anuncios = JSON.parse(localStorage.getItem("anuncios"))
            } else {
                alert("Falha ao capturar anúncios")
            }
        })
    })
    .catch(e => console.log(e.message))
}


function montarCardsAnuncios() {
    document.getElementById('call-btn').style.visibility = "hidden";
    boxCards = document.getElementById("boxCards")
    boxCards.innerHTML = ""
    anuncios = JSON.parse(localStorage.getItem("anuncios"))
    

    for (let i=0; i < anuncios.length; i++){
        boxCards.innerHTML += cardsAnuncios(anuncios[i])
    }
    
}

function cardsAnuncios(anuncio){
    return `
    <div class="col-md-2" style="margin-bottom: 15px;">
        <div class="card">
            <img src="img/proj1.jpg" class="card-img-top" alt="Imagem de Perfil 4">
            <div class="card-body">
                <h5 class="card-title">${anuncio.nomeFerramenta}</h5> 
                <p class="card-text">${anuncio.descricaoFerramenta}</p> 
                <div style="text-align: center;">
                    <a href="#" title="Inativar" class="btn" onclick="putAnuncio(${anuncio.idAnuncio})"><i class="fas fa-trash"></i></a>
                </div>
            </div>
        </div> 
    </div>`

    
}