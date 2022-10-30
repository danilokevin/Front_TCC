
$(function() {
    var usuario = JSON.parse(localStorage.getItem("usuario")) 
    var token = JSON.parse(localStorage.getItem("token"))

    getFerramentas(usuario.idUsuario, token.token)

    cardSection = document.getElementById('boxFerramentas')
    let ferramentas = JSON.parse(localStorage.getItem("ferramentas"))

    console.log(ferramentas)
    for (let i=0; i < ferramentas.length; i++){
        cardSection.innerHTML += cards(ferramentas[i])
    }
    
});

function getFerramentas(idUsuario, token) {
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    fetch(`https://ferramentaria-backend.herokuapp.com/ferramentas/proprietario/${idUsuario}`, options)
    .then(response => {response.json()
        .then(data => {
            if (data) {
                

                localStorage.setItem("ferramentas", JSON.stringify(data))
            } else {
                alert("Falha ao capturar ferramentas")
            }
        })
    })
    .catch(e => console.log(e.message))
    
}


function cards(ferramenta){
    return `
    <div class="col-md-2" style="margin-bottom: 15px;">
        <div class="card">
            <img src="img/profile4.jpg" class="card-img-top" alt="Imagem de Perfil 4">
            <div class="card-body">
                <h5 class="card-title">${ferramenta.nome}</h5> 
                <p class="card-text">${ferramenta.descricao}</p> 
                <div style="text-align: center;">
                    <a href="#" class="btn"><i class="fas fa-pen-to-square"></i></a>
                    <a href="#" class="btn"><i class="fas fa-plus"></i></a>
                    <a href="#" class="btn"><i class="fas fa-trash"></i></a>
                </div>
            </div>
        </div> 
    </div>`
}


