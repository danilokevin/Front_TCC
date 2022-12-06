function salvarDados() {
    var body = {
        nome: document.getElementById("inputNome").value,
        email: document.getElementById("inputEmail").value,
        senha: document.getElementById("inputPassword4").value,
        endereco: {
            logradouro: document.getElementById("inputLogradouro").value + ", " + document.getElementById("inputNumero").value,
            complemento: document.getElementById("inputComplemento").value,
            bairro: document.getElementById("inputBairro").value,
            cidade: document.getElementById("inputCidade").value,
            uf: document.getElementById("inputUF").value,
            cep: document.getElementById("inputCEP").value
        },
        telefone: {
            ddd: document.getElementById("inputDDD").value,
            numero: document.getElementById("inputTelefone").value
        },
        foto: "url"
    }

    cadastrarUsuario(body);
    console.log(JSON.stringify(body))
    
}

function cadastrarUsuario(body){

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };


    fetch("http://localhost:8080/usuarios", options)
    .then(response => {response.json()
        .then(data => {
            console.log(data)
            if (response.status == 201) {
                alert("Usuario Cadastrado com Sucesso")
                window.location.href = "http://127.0.0.1:5500/login.html"
            } else {
                alert('Favor preencher todos os campos!')
            }
            
        })
    })
    .catch(e => console.log(e.message))
}

/*
function Usuario (data) {
    this.idUsuario = data.idUsuario;
    this.nome = data.nome;
    this.email = data.email;
    this.status = data.status;
    this.endereco = new Endereco(data.endereco);
    this.telefone = new Telefone(data.telefone);
    this.foto = data.foto;
}

function Endereco (data) {
    this.logradouro = data.logradouro;
    this.complemento = data.complemento;
    this.bairro = data.bairro;
    this.cidade = data.cidade;
    this.uf = data.uf;
    this.cep = data.cep;
}

function Telefone (data) {
    this.ddd = data.ddd;
    this.numero = data.numero;
}
*/