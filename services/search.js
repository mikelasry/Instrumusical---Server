const Instrument = require('../models/instrument');
const ScrapeInstrument = require('../models/scrape-instrument');
let axios = require('axios'); // http functionallity
let cheerio = require('cheerio'); // DOM parsing and scraping


const getSearchResults = async (searchTxt) =>{
    //TODO: massive input checking for db protection
    // break 'searchTxt' into tokens and find matches between the tokens
    // and Instrument string fields.
    return await Instrument.find({
        $text:{
            $search: searchTxt
        }
    });
}

const getFilteredSearchResult = async(filterList) => {
    
    categoryFilter = '';
    brandFilter= '';
    minPriceFilter = 0;
    maxPriceFilter = 10000;

    if(!filterList[0] == '') categoryFilter = filterList[0].toLowerCase();
    if(!filterList[1] == '') brandFilter = filterList[1].toLowerCase();
    if(!filterList[2] == ''){
        let tempFilter = filterList[2].split(/[$,-]/);
        minPriceFilter = parseInt(tempFilter[0]);
        maxPriceFilter = parseInt(tempFilter[2]);
    }
    if(categoryFilter == '' && brandFilter == ''){
        return await Instrument.aggregate([
            { 
                $match:
                {
                    $and: [
                    {category: {$exists: true}},
                    {brand: {$exists: true}},
                    {price: {$gte: minPriceFilter, $lte: maxPriceFilter}}
                    ]
                }                      
            }]);
        }
    if(categoryFilter == ''){
    return await Instrument.aggregate([
        { 
            $match:
            {
                $and: [
                {category: {$exists: true}},
                {brand: brandFilter},
                {price: {$gte: minPriceFilter, $lte: maxPriceFilter}}
                ]
            }                      
        }]);
    }
    if(brandFilter == ''){
        return await Instrument.aggregate([
            { 
                $match:
                {
                    $and: [
                    {category: categoryFilter},
                    {brand: {$exists: true}},
                    {price: {$gte: minPriceFilter, $lte: maxPriceFilter}}
                    ]
                }                      
            }]);
        }
    return await Instrument.aggregate([
        { 
            $match:
            {
                $and: [
                {category: categoryFilter},
                {brand: brandFilter},
                {price: {$gte: minPriceFilter, $lte: maxPriceFilter}}
                ]
            }                      
        }]);
}


const getCheapestResults = async() => {
    return Instrument.aggregate([
        {$group : {
            _id : "$category",
            min: {$min: "$price"}
        }}
    ]);
}
//TODO: map reduce
// handleError = (err) => { console.log(err)}
// const obj = {};
// obj.map = 'function () {emit(this.category,this.price) }';
// obj.reduce = 'function (keys,vals) {return vals.length}';
// obj.out = {inline:1};
// obj.verbose = false;
// //obj.resolveToObject = true;
// const promise = Instrument.mapReduce(obj);
// promise.then(function (model){
//     console.log(model.find({$min : price}));
//     return model.find().exec();
// }).then((docs) =>{
//     console.log(docs);
// }).then(null, handleError);



const scrape = async () => {
    console.log("scrape service on");
    const page = await axios.get("https://simple.wikipedia.org/wiki/List_of_musical_instruments"); // get HTML content
    const $ = cheerio.load(page.data);
    counter = 0;
    even = true;

   $('ul').each(()=>{ $('li')
    .each(()=>{  $('a')
        .each((index, element) => {
                if (even){
                    even = false;
                    return true;
                }else{
                    even = true;
                }
                if (counter > 1000)
                    return false;
                const link1 = $(element).attr('href');
                const name1 = $(element).attr('title');
                if(link1 && link1.startsWith('/wiki/') && !link1.includes(':') && !link1.includes('List') && !link1.includes('Main') && !link1.includes('_') ){
                    saveObject(link1, name1).catch((r)=>{
                        console.log(r);
                    });
                    
                    console.log(`(${index}) -> ${link1} -- ${name1}`);
                    counter += 1;
                } 
            }) 
        })
    });
    console.log("Scraping done");
    return true;
    
}

const saveObject = async (_link, _name) => {
    return new ScrapeInstrument({name: _name, link: _link}).updateOne();
}


const getAllScrapeInstruments = async () => {
    return ScrapeInstrument.find({});
}

const getRandomScrapeInstrument = async () => {
    return ScrapeInstrument.aggregate([{ $sample: { size: 1 } }]);
}

module.exports = {
    getSearchResults,
    getFilteredSearchResult,
    getCheapestResults,
    scrape,
    getAllScrapeInstruments,
    getRandomScrapeInstrument
}