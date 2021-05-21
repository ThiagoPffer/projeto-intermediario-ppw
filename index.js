const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', function(req, res) {
    const cursos = [];

    res.json(cursos);
});

app.listen(PORT, function() {
    console.log("Initial Commit");
});