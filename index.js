const express = require('express');
const axios = require('axios');
const parser = require('node-html-parser').parse;
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', function(req, res) {
    const url = "https://pt.wikipedia.org/wiki/Unidades_federativas_do_Brasil";
    var estados = [];

    var requisicao = axios.get(url);

    requisicao.then(function(resposta) {
        var root = parser(resposta.data);
        var table = root.querySelector(".wikitable");
        var tableRows = table.querySelectorAll("tr");
        var content = [];
        var filteredContent = [];

        for (let i = 1; i < tableRows.length; i++) {
            content[i] = tableRows[i].textContent.split("\n");
        }

        for (let i = 1; i < content.length; i++) {
            for (let j = 0; j < content[i].length; j++) {
                filteredContent[i] = content[i].filter(function(value) {
                    return value != '';
                });
            }
        }

        estados = filteredContent.map(function(value) {
            return {
                "nome": value[0],
                "capital": value[2],
                "IDH": value[9],
                "alfabetização": value[10]
            }
        });

        res.json(estados);
    });
});

app.listen(PORT, function() {
    console.log("Inicializado!");
});