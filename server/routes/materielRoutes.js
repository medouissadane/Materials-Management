const express = require('express');
const { getAllMateriel} = require('../controllers/matierireControllre');
const router = express.Router();

router.get('/materiels',  getAllMateriel);


module.exports = router;