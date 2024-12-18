const express = require('express');
const router = express.Router();
const Disease = require('../models/dieseaeModel');

// Fetch plant disease details by disease name
router.get('/details/', async (req, res) => {
    const idName = req.query.name;
    
    try {
        const disease = await Disease.findOne({ disease_name: idName });
        
        if (!disease) {
            return res.status(404).json({ message: 'Disease not found' });
        }

        res.status(200).json(disease);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


   

module.exports = router;
