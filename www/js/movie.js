function pesquisaTitulo() {
    
    if (document.getElementById('title').value != "") {
        var nome = document.getElementById('title').value;
        var req = new XMLHttpRequest();
        req.open("get", "https://imdb-api.com/en/API/Search/k_ph2u1n00/" + nome, false);
        req.send();
        var result = req.responseText;
        var resultArray = JSON.parse(result);
        var divListagem = document.getElementById('resultadoPesquisa');

        if (resultArray.results != null) {
            divListagem.innerHTML = "";
            divListagem.innerHTML += "<ul id='listaResultado'>";
            for (var i = 0; i < resultArray.results.length; i++) {
                divListagem.innerHTML += "<li> Título: " + resultArray.results[i].title + " " + resultArray.results[i].description +
                    "</br>" +
                    "<a id='saibaMais' href='pgReportMovie.html?id=" + resultArray.results[i].id + "'><img src=" + resultArray.results[i].image + "width='150' height='180'></a>" + 
                    "</li>\n </br></br> </img>";
            }
            divListagem.innerHTML += "</ul>";
        }
        else
            alert("Nenhum resultado encontrado");

        document.getElementById('title').value = "";
    } else
        alert("Preencha o campo de pesquisa");
}

function getUrlVars() {
    
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    var req = new XMLHttpRequest();
    var urlRequest = "https://imdb-api.com/pt/API/Report/k_ph2u1n00/" + vars.id;
    document.getElementById('imgReport').src = urlRequest;
}