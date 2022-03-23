function pesquisaLetraMusica() {
    var nomeMusica = document.getElementById('title').value;
    var nomeArtista = document.getElementById('artist').value;

    if (nomeArtista != "" && nomeMusica != "") {
        document.getElementById("loading").hidden = false;
        var req = new XMLHttpRequest();
        var innerHTML = "";
        
        req.open("get", "https://api.vagalume.com.br/search.php?art=" + nomeArtista.trim() + "&mus=" + nomeMusica, false);
        req.send();
        var result = req.responseText;
        var resultArray = JSON.parse(result);
        var divListagem = document.getElementById('resultadoPesquisa');
        divListagem.innerHTML = innerHTML;

        if (resultArray.type != "notfound") {

            var artistName = resultArray.art.name.replace(/ /g, "-").toLowerCase()
            artistName = artistName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            req.open("get", "https://www.vagalume.com.br/" + artistName + "/index.js", false);
            req.send();
            var result = req.responseText;
            var resultArtistArray = JSON.parse(result);

            if (resultArtistArray != null) {
                innerHTML = "";
                innerHTML += "<label id='artistaResultado'>" + resultArray.art.name + "</label></br>";
                innerHTML += "<img id='imgArtist' src=https://www.vagalume.com.br" + resultArtistArray.artist.pic_small + "></br></br>";
                innerHTML += "<label id='artistaResultado'>" + resultArray.mus[0].name + "</label></br></br>";
                innerHTML += "<label id='letraResultado'>" + resultArray.mus[0].text.replace(/\n/g, "</br>") + "</label></br></br>";

                if (resultArray.mus[0].translate != null)
                    innerHTML += "<label id='letraResultadoTranslate'>" + resultArray.mus[0].translate[0].text.replace(/\n/g, "</br>") + "</label></br></br>";

                document.getElementById("loading").hidden = true;
                divListagem.innerHTML = innerHTML;
            }
        }
        else {
            document.getElementById("loading").hidden = true;
            alert("Desculpe, não encontramos nada :(");
        }
    }
    else {
        document.getElementById("loading").hidden = true;
        alert("Preencha ambos os campos!");
    }
    document.getElementById('title').value = "";
    document.getElementById('artist').value = "";
}