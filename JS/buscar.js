var usuario = JSON.parse(localStorage.getItem("usuario")) 
var token = JSON.parse(localStorage.getItem("token"))
var ferramentasAnunciadas = {}

$(function() {
    
    getFerramentas()
    

});



function getFerramentas(idUsuario, token) {
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    fetch(`https://ferramentaria-backend.herokuapp.com/anuncios?pagina=0&qtd=100`, options)
    .then(response => {response.json()
        .then(data => {
            if (data) {
                localStorage.setItem("ferramentasAnunciadas", JSON.stringify(data.content))
                
                ferramentasAnunciadas = JSON.parse(localStorage.getItem("ferramentasAnunciadas"))

                //montarCardsFerramentas(ferramentasAnunciadas)

                
            } else {
                alert("Falha ao capturar ferramentas anunciadas")
            }
        })
    })
    .catch(e => console.log(e.message))
    
}


function prepararFerramentas() {
    var filtro = document.getElementById("filtroPesquisa").value;
    console.log(filtro)

    anuncios = ferramentasAnunciadas.filter(i => i.proprietarioId != usuario.idUsuario)
    
    if (filtro) {
        anuncios = anuncios.filter(i => i.nomeFerramenta.toLowerCase().includes(filtro.toLowerCase()))
    }
    montarCardsFerramentas(anuncios)

}

function montarCardsFerramentas(anuncios) {
    boxCards = document.getElementById("boxCards")
    boxCards.innerHTML = ""
    //ferramentasAnunciadas = JSON.parse(localStorage.getItem("ferramentasAnunciadas"))
    console.log(anuncios)
    
    for (let i=0; i < anuncios.length; i++){
        boxCards.innerHTML += cardsFerramentasAnunciadas(anuncios[i])
    }
}

function cardsFerramentasAnunciadas(ferramenta){
    return `
    <div class="col-md-2 cardsFerramentasAnunciadas" style="margin-bottom: 15px;">
        <div class="card">
            <img src="img/profile4.jpg" class="card-img-top" alt="Imagem de Perfil 4">
            <div class="card-body">
                <h5 class="card-title">${ferramenta.nomeFerramenta}</h5>  
                <div style="text-align: center;">
                    <a href="#" class="btn" title="Ver" onclick="visualizarAnuncio(${ferramenta.ferramentaId})"><i class="fas fa-eye"></i></a>
                </div>
            </div>
        </div> 
    </div>`
}

function visualizarAnuncio(idAnuncio){
    localStorage.setItem("idAnuncioVisualizar", idAnuncio)
    window.open('http://127.0.0.1:5500/ferramenta.html', '_blank')
}