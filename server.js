const express = require('express');
const scrape = require('./scraper');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        const data = await scrape();
        res.json(data);
    } catch (err) {
        res.status(500).send('Error al scrapear');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});