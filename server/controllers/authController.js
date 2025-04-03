const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = (req, res) => {
    const { username, password } = req.body;
    console.log(password)
    const hash = bcrypt.hashSync(password, 10);
    console.log(hash)
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Utilisateur créé' });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: 'Utilisateur non trouvé' });

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });


        res.json({ message: 'Connexion réussie ' });
    });
};
