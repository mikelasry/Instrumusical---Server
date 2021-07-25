const searchService = require('../services/search');

const getSearchResults = async (req,res) => {
    const results = await searchService.getSearchResults(req.query.searchKey);
    if(!results) return res.status(404).json();
    return res.status(200).json(results);
}


const getFilteredSearchResult = async (req,res) => {
    const results = await searchService.getFilteredSearchResult(req.query.searchKey);
    if(!results) return res.status(404).json();
    return res.status(200).json(results);
}

const getCheapestResults = async (req,res) => {
    const results = await searchService.getCheapestResults();
    if(!results) return res.status(404).json();
    return res.status(200).json(results);
}


const scrape = async (req,res) => {
    await searchService.scrape();
    res.send();
}

const getAllScrapeInstruments = async (req,res) => {
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
    getFilteredSearchResult,
    getCheapestResults,
    scrape,
    getAllScrapeInstruments,
    getRandomScrapeInstrument
};
