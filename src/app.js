'use strict'

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const router = express.Router();
const port = 3001;

// a raiz da página se encontra na public
app.use(express.static(__dirname + '/../public'));

function getUserById(id){
    // readFileSync -> lê o arquivo e espera a leitura deste arquivo para continuar a execução do código
    let data = fs.readFileSync(path.join(__dirname + '/../public/database.json'));
    let results = JSON.parse(data);
    let personFound = results.find(person => person.id == id)
    return personFound;    
}

// Função para pegar imagem a partir de uma busca
async function getImage(searchKey){
    let apiUrl =  "https://pixabay.com/api/";
    let apiKey = "16098436-a2cbebade72d6ae3824e3d9b2";
    let url = apiUrl + "?key=" + apiKey + "&q=" + searchKey + "&per_page=3";
    let imageURL = null;
    try {
        let response = await fetch(url);
        let json = await response.json();
        imageURL = json.hits[0].webformatURL;
    }catch (error){
        console.log(error)
    }
    return imageURL;
}

// url dinâmica -> retornar o banco de dados inteiro
app.get('/user/all', (req, res) => {
   res.sendFile(path.join(__dirname + '/../public/database.json'));
});



// url dinâmica -> retornar apenas um usuário
app.get('/user/:id', async (req, res) => {
    let person = getUserById(req.params["id"]);
    if (person != null){
        let cityImageUrl = await getImage(person.city);
        person.cityImage = cityImageUrl;
        res.send(JSON.stringify(person));
        return true;
    }
    res.send('{"status": "error", "errorMessage": "id not found"}');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log('To shutdown the server: ctrl + c')
})