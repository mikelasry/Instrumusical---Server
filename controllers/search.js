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


module.exports = {
    getSearchResults,
    getFilteredSearchResult};