// const fs = require('fs');
// const _99Acres_localities = JSON.parse(fs.readFileSync('./data/99Acres/localities.json'));
// const dump = JSON.parse(fs.readFileSync('./99AcresResultsDump.json'));

// console.log(dump.length);

//  4. Mandotory list details to be parsed.
//  Locality/Area, (LOCALITY, LOCALITY_WO_CITY, SOCIETY_NAME)
//  Address, (.location properties)
//  Name/Title of property, BUILDING_NAME
//  Owner's details(name (CONTACT_NAME) , phone, email etc), 
//  Company name (CONTACT_COMPANY_NAME)
//  Map Location, 
//  Website link, (PD_URL)
//  Price, (MAX_PRICE, MIN_PRICE)
//  Price/sqft, (PRICE_SQFT, PRICE_PER_UNIT_AREA)
//  Total land area, .AREA(String) ---> Max Area and Min area For range of plots that are saled together. || MIN_AREA_SQFT, MAX_AREA_SQFT (both are strings in sq.m format)
//  Type of property(Individual house, land, flat etc), PROPERTY_TYPE
//  RERA/DTCP approved, 
//  Owner type(dealer/owner),
// BROKERAGE, 
// CARPET_AREA, FLOOR_NUM(for flats)

//Extras: .DESCRIPTION, Facing direction(FACING)
//POSTING_DATE, PROP_ID, RERA_REGISTRATION_ID, TOTAL_FLOOR
/*
AVAILABILITY =
'I'
BALCONY_ATTACHED =
'N'
BALCONY_NUM =
'1'
BATHROOM_ATTACHED =
'N'
BATHROOM_NUM =
'2'
BEDROOM_NUM =
'2'
*/
// .formated --> .isVerified, isReraRef, isPriceRange, isReadyToMovePropType, isOwner, isDealer, isBuilder, isAreaRange
// '{"payload":{"search_results":{"selected_entity_tuples":[{"id":"79221177","rank":1,"res_com":"R","attribute":"FSL","attributes":{"rtov_enabled":"Y","rtov_booked":"","hasOffer":0,"isPreLeased":""}}]}}}'


import fs from 'fs';

const dumpData = JSON.parse(fs.readFileSync('./99AcresResultsDump.json', 'utf8'));



function parseShortlistInfo(str) {
  try {
    const parsed = JSON.parse(str);
    return parsed?.formattedAreaValue || 'N/A';
  } catch (e) {
    return 'N/A';
  }
}

const properties = dumpData.map((p) => {
  const shortlistInfo = p.shortlistCustomInfo
    ? parseShortlistInfo(p.shortlistCustomInfo)
    : 'N/A';

  return {
    url: p.PROP_DETAILS_URL ? `https://99acres.com/${p.PROP_DETAILS_URL}` : "N/A",
    title: p.BUILDING_NAME || "N/A",
    desc: p.DESCRIPTION || "N/A",
    minPrice: p.MIN_PRICE,
    maxPrice: p.MAX_PRICE,
    avgPrice: p.FORMATTED?.AVG_PRICE,
    pricePerSqft: `${p.PRICE_SQFT} K/sq.ft` || "N/A",
    areaSqft: p.AREA || "N/A",
    Location: p.LOCALITY || "N/A",
    city: p.CITY || "N/A",
    LongAddress: p.FULL_ADDRESS || p.ADDRESS || "N/A",
    BuildingStatus: Array.isArray(p.SECONDARY_TAGS)
      ? (p.SECONDARY_TAGS.includes("UNDER CONSTRUCTION") ? "Under Construction" : "Ready to Move")
      : "N/A",
    ReraStatus: p.RERA_REGISTRATION_ID ? 'YES' : 'NO',
    Bedroom: p.BEDROOM_NUM || "N/A",
    Bathroom: p.BATHROOM_NUM || "N/A",
    Furnishing: p.FORMATTED?.FURNISH_LABEL || "N/A",
    Latitude: p.MAP_DETAILS?.LATITUDE || "N/A",
    Longitude: p.MAP_DETAILS?.LONGITUDE || "N/A",
    Source: "99acres",
  };
});

fs.writeFileSync('./99AcresStructuredData.json', JSON.stringify(properties, null, 2));
