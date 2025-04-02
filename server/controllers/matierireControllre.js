const db = require('../config/db');

exports.getAllMateriel = (req, res) => {
    db.query('SELECT * FROM materiels', (err, results) => {
        if (err) {
          res.status(500).json({ error: 'Erreur lors de la récupération des matériels' });
        } else {
          res.json(results);
        }
      });
};
