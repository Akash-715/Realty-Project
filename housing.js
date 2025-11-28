import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";

let localities = ['new_perungalathur','urapakkam','vandalur'];



async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 const constructURL = function(locality, page = 1){
    return `https://housing.com/in/buy/chennai/${locality}?page=${page}`;
};


async function scrapper(locality){
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({headless: false});

    const results =await pagination(locality,browser);

    return results;
}

async function scrapeProperties(url,browser){
    let page = await browser.newPage();
    await page.goto(url);
    await delay(10000);
    let results = await page.evaluate(getProperties);
    await page.close();
    return results;
}

async function pagination(localities,browser){
            const PROPERTIES_PER_PAGE = 30;
            let properties = [];
            let totalPropertyCount = 25;//Initial
            let totalPages;
            if(localities == 'new_perungalathur'){
            totalPages = 2; }
            if(localities == 'vandalur'){
            totalPages = 2; }
            if(localities == 'urapakkam'){
            totalPages = 2; }
            let currPage = 1;
            let promises = [];
            let retryCount = 0;
            const retryLimit = 5;
            for(currPage; currPage <= totalPages; currPage++){
                try{
                    let url = constructURL(localities,currPage);
                    // if(currPage == 1){
                    let result = await scrapeProperties(url,browser); 
                    properties.push(...result.properties);
                    // if(result.total > totalPropertyCount){
                    //     totalPropertyCount = result.total;
                    //     totalPages = Math.ceil(totalPropertyCount/PROPERTIES_PER_PAGE);
                    // }
                   
                }catch(e){
                    console.error(e);
                    if(retryCount <= retryLimit)currPage--;
                    retryCount++;
                }
            }
            await browser.close();
            return properties;
}


(async() => {
    let properties = [];
    for(const loc of localities){
        let result = await scrapper(loc);
        properties.push(...result);
    }
    fs.writeFileSync('./housingDumpData.json',JSON.stringify(properties,null,2));
})()

function getProperties(){
    try {
       let properties = []
   __INITIAL_STATE__.searchResults.listings.forEach(item => {
  __INITIAL_STATE__.searchResults.data[item.id] != undefined ? properties.push(__INITIAL_STATE__.searchResults.data[item.id]) : true;
})
        return { properties, total: properties.length };
    } catch(e) {
        console.error(e);
        return { properties: [], total: 0 };
    }
}
