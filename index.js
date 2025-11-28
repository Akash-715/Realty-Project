const puppeteer = require('puppeteer');
const setAwaitTimeout = require('timers/promises').setTimeout;
const fs = require('fs');
const _99Acres_localities = JSON.parse(fs.readFileSync('./data/99Acres/localities.json'));

async function launchBrowser(){
    try{
        const browser = await puppeteer.launch({headless: false});
        return browser;
    }
    catch(exception){
        console.log('Error while launching the browser: '+ exception);
    }
}
//  1. Traverse through all the paginations for a given url
//  2. Set a locality map
//  3. Raw dump data fetched
//  4. Mandotory list details to be parsed. Locality/Area, Address, Name/Title of property, Owner's details(name, phone, email etc), Map Location, Website link,
//      Price, Price/sqft, Total land area, Type of property(Individual house, land, flat etc), RERA/DTCP approved, Owner type(dealer/owner),
//      
async function startScraping(portal, options) {
    switch(portal){
        case '99Acres' : {
            const browser = await launchBrowser();
            const page = await browser.newPage();
            const constructURL = (localities, page) => {
                return `https://www.99acres.com/search/property/buy/dummy?city=34&locality=${encodeURIComponent(localities.reduce((a,b) => a+','+b))}&page=${page?page:1}`;
            }
            const scrapeProperties = async function(url) {
                let page = await browser.newPage();
                await page.goto(url);
                await setAwaitTimeout(1000*10);
                let results = await page.evaluate(getPropertiesList);
                await page.close();
                return results;
            }
            const localities = options.localities;
            const PROPERTIES_PER_PAGE = 25;
            let properties = [];
            let totalPropertyCount = 25;//Initial
            let totalPages = 1;//Initial
            let currPage = 1;
            let promises = [];
            let retryCount = 0;
            const retryLimit = 5;
            for(currPage; currPage <= totalPages; currPage++){
                try{
                    let url = constructURL(localities,currPage);
                    // if(currPage == 1){
                    let result = await scrapeProperties(url); 
                    properties.push(...result.properties);
                    if(result.total > totalPropertyCount){
                        totalPropertyCount = result.total;
                        totalPages = Math.ceil(totalPropertyCount/PROPERTIES_PER_PAGE);
                    }
                    // }
                    // else{
                    //     promises.push(scrapeProperties(url));
                    // }
                    // if(currPage%5 == 0 || (currPage != 1 && currPage==totalPages) ){
                    //     let results = await Promise.all(promises);
                    //     results.forEach(result => {
                    //         properties.push(...result.properties);
                    //         if(result.total > totalPropertyCount){
                    //             totalPropertyCount = result.total;totalPages = Math.ceil(totalPropertyCount/PROPERTIES_PER_PAGE);
                    //         }
                    //     })
                    // }
                }
                catch(e){
                    console.error(e);
                    if(retryCount <= retryLimit)currPage--;
                    retryCount++;
                }
               
            }
            await browser.close();
            return properties;
        };
        case 'NoBroker' : {
            
        }
    }
}

(async() => {
    let result = await startScraping('99Acres',{localities: [692,656,654]});
    let _99AcresDump = JSON.parse(fs.readFileSync('./99AcresResultsDump.json'));
    _99AcresDump.push(...result);
    fs.writeFileSync('./99AcresResultsDump.json', JSON.stringify(_99AcresDump));
    console.log(result?.length);
})()

function getPropertiesList(){
    try{
        const totalPropertyCount = __initialData__?.srp?.pageData?.count;
        return {properties: __initialData__?.srp?.pageData?.properties, total: totalPropertyCount};
    }
    catch(e){
        console.error(e);
        return {properties: [], total: 0};
    }
}