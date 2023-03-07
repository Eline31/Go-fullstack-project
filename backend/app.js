const express = require("express");
//Appel de la méthode express
const app = express();

//Import de mongoose
const mongoose = require("mongoose");

//On importe le modèle Thing que l'on a créé
const Thing = require("./models/Thing");

mongoose.connect("mongodb+srv://User1:1Fjqe9HlN9pUh5yM@cluster0.2ol13jn.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

//Middleware qui intercepte les req qui ont un content-type json, permet d'accéder au body de la requête, comme bodyparser
app.use(express.json());

//Ajout d'un middleware général (appliqué à toutes les routes) pour parer à l'erreur CORS
app.use((req, res, next) => {
    //accéder à notre API depuis n'importe quelle origine *
    res.setHeader('Access-Control-Allow-Origin', '*');
    //ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post("/api/stuff", (req, res, next) => {
    //Suppression du champs id qui ne sera pas le bon car générer automatiquement par la BDD
    delete req.body._id;
    const thing = new Thing({
        //utilisation de ... (spread) pour récupérer et copier le contenu du body 
        ...req.body
    });
    //La méthode save() renvoie une promesse
    thing.save()
        .then(() => res.status(201).json({ message: "Objet enregistré !" }))
        .catch((error) => res.status(400).json({ error }));
});

///api/stuff est l'url visée par l'application, la route sur notre API
app.get("/api/stuff", (req, res, next) => {
    const stuff = [
        {
            _id: "fkepokf",
            title: "Mon premier objet",
            description: "Les infos de mon premier objet",
            imageUrl: "",
            price: 4900,
            userId: "kpfrpkf",
        },
        {
            _id: "jfeozgg",
            title: "Mon deuxième objet",
            description: "Les infos de mon deuxième objet",
            imageUrl: "",
            price: 2900,
            userId: "joivzjv",
        },
    ];
    res.status(200).json(stuff);
});

//Export d'app pour pouvoir l'utiliser ailleurs
module.exports = app;