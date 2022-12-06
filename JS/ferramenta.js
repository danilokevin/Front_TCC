var idAnuncioVisualizar = JSON.parse(localStorage.getItem("idAnuncioVisualizar"))


$(function() {
    var anuncios = JSON.parse(localStorage.getItem("ferramentasAnunciadas"))
    anuncio = anuncios.find(i => i.idAnuncio == parseInt(idAnuncioVisualizar))
    getAnuncioVisualizar(anuncio)
});

function getAnuncioVisualizar(anuncio) {
    boxCards = document.getElementById("about-ferramenta")

    boxCards.innerHTML =
    `<div class="container" >
    <div class="row" style="background-color: rgba(254, 248, 248, 0.763); height: auto;">
      <div class="col-md-6">
        <img class="img-fluid" src="img/chaves03.webp" alt="Agência hDC">
      </div>
      <div class="col-md-6" style="margin-top: 50px;">
        <h2 class="about-title">${anuncio.nomeFerramenta}</h2>
        <p>${anuncio.descricaoFerramenta}</p>
        <p>Disponibilidade: ${anuncio.disponibilidadeFerramenta}</p>
        <p>Modalidade: ${anuncio.modalidadeFerramenta}</p>
        <p>Tensão: ${anuncio.tensaoFerramenta}</p>
        <p> ${anuncio.descricaoFerramenta}</p>
        <button class="main-btn" id="call-btn"><a href="https://wa.me/5511951728989" target="_blank">Contato</a> </button>
      </div>
    </div>
    </div>
    `
}
