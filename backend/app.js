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

app.put("/api/stuff/:id", (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet mis à jour" }))
        .catch(error => res.status(400).json({ error }));
});

app.delete("/api/stuff/:id", (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimé" }))
        .catch(error => res.status(400).json({ error }));
})

//le :id sinifique que cette partie de la route est dynamique
app.get("/api/stuff/:id", (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

///api/stuff est l'url visée par l'application, la route sur notre API
app.get("/api/stuff", (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

//Export d'app pour pouvoir l'utiliser ailleurs
module.exports = app;