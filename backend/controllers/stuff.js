const Thing = require("../models/Thing");

exports.createThing = (req, res, next) => {
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
};

exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet mis à jour" }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimé" }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};