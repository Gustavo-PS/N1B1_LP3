function pesquisaTitulo() {
    debugger;
    document.getElementById("loading").hidden = false;
    if (document.getElementById('title').value != "") {
        var nome = document.getElementById('title').value;
        var req = new XMLHttpRequest();
        req.open("get", "https://imdb-api.com/en/API/Search/k_ph2u1n00/" + nome, false);
        req.send();
        var result = req.responseText;
        var resultArray = JSON.parse(result);
        var divListagem = document.getElementById('resultadoPesquisa');
        var innerHTML = "";
        if (resultArray.results != null) {
            divListagem.innerHTML = "";
            innerHTML += "<ul id='listaResultado'>";
            for (var i = 0; i < resultArray.results.length; i++) {
                innerHTML += "<li> Título: " + resultArray.results[i].title + " " + resultArray.results[i].description +
                    "</br><img src=" + resultArray.results[i].image + "width='150' height='180'>" +
                    "</br><a href='pgReportMovie.html?id=" + resultArray.results[i].id + "'>Saiba mais!</a>" + "</li>\n </br></br>";
            }
            document.getElementById("loading").hidden = true;
            divListagem.innerHTML += innerHTML;
            divListagem.innerHTML += "</ul>";
        }
        else {
            document.getElementById("loading").hidden = true;
            alert("Nenhum resultado encontrado");
        }

        document.getElementById('title').value = "";
    } else {
        document.getElementById("loading").hidden = true;
        alert("Preencha o campo de pesquisa");

    }
}

function getUrlVars() {
    debugger;
    var tagIMG = document.getElementById('imgReport');
    tagIMG.hidden = true;
    document.getElementById("loading").hidden = false;
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });


    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://imdb-api.com/pt/API/Report/k_ph2u1n00/" + vars.id, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById("loading").hidden = true;
                tagIMG.src = xhr.responseURL;
                tagIMG.width = "400";
                tagIMG.hidden = false;
            } else {
                console.error(xhr.statusText);
                document.getElementById("loading").hidden = true;
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
    //tagIMG.src = "https://imdb-api.com/pt/API/Report/k_ph2u1n00/" + vars.id;
}