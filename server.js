const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

const PORT = process.env.PORT || 3000;

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola desde Puppeteer y Express en Render!');
});

// Ruta de scrapeo
app.get('/scrape', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    await page.goto('https://comparadolar.ar/', { waitUntil: 'networkidle2' });

    // Esperar a que cargue el iframe y tomar su contenido
    const iframeElement = await page.$('iframe');
    const iframe = await iframeElement.contentFrame();

    const tableHTML = await iframe.$eval('table', el => el.outerHTML);

    await browser.close();

    res.send(tableHTML); // o res.json({ tableHTML }) si preferís JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Error durante el scrapeo');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
