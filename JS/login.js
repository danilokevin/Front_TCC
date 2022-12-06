$(function() {
    
    localStorage.removeItem("ferramentas")
    localStorage.removeItem("usuario")
    localStorage.removeItem("token")
    localStorage.removeItem("ferramentasAnunciadas")
    localStorage.removeItem("idAnuncioVisualizar")
    localStorage.removeItem("anuncios")
});


function logarUsuario() {
    var email = document.getElementById("emailUsuario").value;
    var senha = document.getElementById("senhaUsuario").value;
    
    buscarUsuarioEmail(email, senha);
}



function buscarUsuarioEmail(emailUsuario, senha){

    const body = {
        email: emailUsuario,
        senha: senha
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };


    fetch(`http://localhost:8080/auth`, options)
    .then(response => {response.json()
        .then(data => {
            //usuario = new Usuario(data)
            if (data.token) {
                localStorage.setItem("token", JSON.stringify(data))
                armazenarUsuario(data.token, body.email)
            } else {
                alert('Usuário/Senha inválido')
            }
            
        })
    })
    .catch(e => console.log(e.message))
}

function armazenarUsuario(token, email) {
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    fetch(`http://localhost:8080/usuarios/email/${email}`, options)
    .then(response => {response.json()
        .then(data => {
            if (data) {
                localStorage.setItem("usuario", JSON.stringify(data))
                window.location.href = "http://127.0.0.1:5500/anuncios.html"
            } else {
                alert("Falha ao capturar dados do usuário")
            }
        })
    })
    .catch(e => console.log(e.message))
    
}

//http://localhost:8080/usuarios/email/${emailUsuario}
