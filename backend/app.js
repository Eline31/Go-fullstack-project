const express = require("express");
//Appel de la méthode express
const app = express();

app.use((req, res, next) => {
    console.log("Requête reçue !");
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
})

app.use((req, res, next) => {
    res.json({ message: "Votre requêtre a bien été reçue !" });
    next();
});

app.use((req, res) => {
    console.log("Réponse envoyée avec succès !");
});

//Export d'app pour pouvoir l'utiliser ailleurs
module.exports = app;