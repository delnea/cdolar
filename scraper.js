const puppeteer = require('puppeteer');

module.exports = async function scrape() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: 'new'
    });
    const page = await browser.newPage();
    await page.goto('https://comparadolar.ar/', { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
        const table = document.querySelector('table');
        if (!table) return [];

        return Array.from(table.rows).map(row =>
            Array.from(row.cells).map(cell => cell.innerText.trim())
        );
    });

    await browser.close();
    return data;
}