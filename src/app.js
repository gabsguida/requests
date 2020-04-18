'use strict'

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const router = express.Router();
const port = 3001;

// a raiz da página se encontra na public
app.use(express.static(__dirname + '/../public'));

// url dinâmica -> retornar o banco de dados inteiro
app.get('/user/all', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/database.json'));
});

// url dinâmica -> retornar apenas um usuário
app.get('/user/:id', (req, res) => {
    // readFileSync -> lê o arquivo e espera a leitura deste arquivo para continuar a execução do código
    let data = fs.readFileSync(path.join(__dirname + '/../public/database.json'));
    let results = JSON.parse(data);
    results.forEach(person => {
        if (person.id == req.params["id"]){
            res.send(JSON.stringify(person));
        };
    });    
    res.send('{"status": "error", "errorMessage": "id not found"}');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log('To shutdown the server: ctrl + c')
})