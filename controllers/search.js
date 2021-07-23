const searchService = require('../services/search');

const getSearchResults = async (req,res) => {
    const results = await searchService.getSearchResults(req.query.searchKey);
    if(!results) return res.status(404).json();
    return res.status(200).json(results);
}

const scrape = async (req,res) => {
    console.log("scrape controller on scrape()");
    await searchService.scrape();
    res.send();
}

const getAllScrapeInstruments = async (req,res) => {
    console.log("scrape controller on getAllScrapeInstruments()");
    const scrapeInstruments = await searchService.getAllScrapeInstruments();
    if(!scrapeInstruments) return res.status(404).json();
    return res.status(200).json(scrapeInstruments);

}

const getRandomScrapeInstrument = async (req,res) => {
    const scrapeInstrument = await searchService.getRandomScrapeInstrument();
    if(!scrapeInstrument) return res.status(404).json();
    return res.status(200).json(scrapeInstrument);

}

module.exports = {
    getSearchResults,
    scrape,
    getAllScrapeInstruments,
    getRandomScrapeInstrument
};