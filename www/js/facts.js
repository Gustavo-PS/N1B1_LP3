function pesquisaFact() {
    document.getElementById("lblFact").src = "";
    var req = new XMLHttpRequest();
    req.open("get", "https://uselessfacts.jsph.pl/random.json?language=en", false);
    req.send();
    var result = req.responseText;
    var resultArray = JSON.parse(result);

    if (resultArray == null) {
        document.getElementById("lblFact").value = "";
        aler("Nenhum fato foi encontrado");
    }
    else {
        document.getElementById("lblFact").innerHTML = resultArray.text;
    }
}