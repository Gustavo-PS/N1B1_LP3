function pesquisaMeme() {
    document.getElementById("imgMeme").src = "";

    if (document.getElementById('title').value != "") {
        var txtPesquisa = document.getElementById('title').value;
        var req = new XMLHttpRequest();
        req.open("get", "https://api.humorapi.com/memes/search?keywords=" + txtPesquisa + "&api-key=66e2aeb543a3405fae9bc89e4cb9f225", false);
        req.send();
        var result = req.responseText;
        var resultArray = JSON.parse(result);

        if (resultArray == null) {
            document.getElementById("imgMeme").src = "";
            aler("Nenhum meme foi encontrado");
        }
        else{
            document.getElementById("imgMeme").src = resultArray.memes[0].url;
            document.getElementById("title").value = ""
        }

    } else
        alert("Preencha o campo de pesquisa");
}