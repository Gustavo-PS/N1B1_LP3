function pesquisaFact() {
    debugger;
    var maior = true;
    document.getElementById("lblFact").src = "";
    var req = new XMLHttpRequest();
    req.open("get", "https://uselessfacts.jsph.pl/random.json?language=en", false);
    req.send();
    var result = req.responseText;
    var resultArray = JSON.parse(result);

    while (maior) {
        if (resultArray.text.length > 115) {
            req.open("get", "https://uselessfacts.jsph.pl/random.json?language=en", false);
            req.send();
            var result = req.responseText;
            var resultArray = JSON.parse(result);
        }
        else
            maior = false;
    }

    if (resultArray == null) {
        document.getElementById("lblFact").value = "";
        aler("Nenhum fato foi encontrado");
    }
    else {
        document.getElementById("lblFact").innerHTML = resultArray.text;
    }
}