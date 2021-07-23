const Instrument = require('../models/instrument');
const ScrapeInstrument = require('../models/scrape-instrument');
let axios = require('axios'); // http functionallity
let cheerio = require('cheerio'); // DOM parsing and scraping


const getSearchResults = async (searchTxt) =>{
    //TODO: massive input checking for db protection

    // break 'searchTxt' into tokens and find matches between the tokens
    // and Instrument string fields.

    return Instrument.find({
        $text:{
            $search: searchTxt
        }
    });
}

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
    scrape,
    getAllScrapeInstruments,
    getRandomScrapeInstrument
}