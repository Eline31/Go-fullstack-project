const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = (req, res, next) => {
    //10 représente le nombre de tours de hachage
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch(error => res.status(400).json({ error }))
        })
        //erreur 500 = erreur de serveur
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {

};