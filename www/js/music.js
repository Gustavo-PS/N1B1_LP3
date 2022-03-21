function pesquisaLetraMusica() {
    debugger;
    var nomeMusica = document.getElementById('title').value;
    var nomeArtista = document.getElementById('artist').value;

    if (nomeArtista != "" && nomeMusica != "") {
        var req = new XMLHttpRequest();

        req.open("get", "https://api.vagalume.com.br/search.php?art=" + nomeArtista.trim() + "&mus=" + nomeMusica, false);
        req.send();
        var result = req.responseText;
        var resultArray = JSON.parse(result);
        var divListagem = document.getElementById('resultadoPesquisa');

        if (resultArray.type != "notfound") {

            var artistName = resultArray.art.name.replace(/ /g, "-").toLowerCase()
            artistName = artistName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            req.open("get", "https://www.vagalume.com.br/" + artistName + "/index.js", false);
            req.send();
            var result = req.responseText;
            var resultArtistArray = JSON.parse(result);

            if (resultArtistArray != null) {
                divListagem.innerHTML = "";
                divListagem.innerHTML += "<label id='artistaResultado'>" + resultArray.art.name + "</label></br>";
                divListagem.innerHTML += "<img id='imgArtist' src=https://www.vagalume.com.br" + resultArtistArray.artist.pic_small + "></br></br>";
                divListagem.innerHTML += "<label id='artistaResultado'>" + resultArray.mus[0].name + "</label></br></br>";
                divListagem.innerHTML += "<label id='letraResultado'>" + resultArray.mus[0].text.replace(/\n/g, "</br>") + "</label></br></br>";
                divListagem.innerHTML += "<label id='letraResultadoTranslate'>" + resultArray.mus[0].translate[0].text.replace(/\n/g, "</br>") + "</label></br></br>";
            }
        }
        else {
            alert("Desculpe, não encontramos nada :(");
        }
    }
    else
        alert("Preencha ambos os campos!");

    document.getElementById('title').value = "";
    document.getElementById('artist').value = "";
}