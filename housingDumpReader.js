import fs from 'fs';

const dumpData = JSON.parse(fs.readFileSync('./housingDumpData.json'));


const cleanData = dumpData.map((p) => {
  const min = p.displayPrice?.value?.[0] || 0;
  const max = p.displayPrice?.value?.[1] || 0;
  const avg = (min + max) / 2;

  return {
    url: p.url ? `https://housing.com${p.url}` : "N/A",
    title: p.title || "N/A",
    desc: p.subtitle || "N/A",
    minPrice: min,
    maxPrice: max,
    avgPrice: avg,
    pricePerSqft: p.details?.propertyConfigs[1]?.description || "N/A", 
    areaSqft: p.propertyInformation?.area || "N/A",
    Location: p.address?.address || "N/A",
    city: p?.polygonsHash?.housing_region?.name || "N/A",
    LongAddress: p.address?.longAddress || "N/A",
    BuildingStatus: p.currentPossessionStatus || "N/A",
    ReraStatus: p.tags?.includes('rera_verified') ? 'YES' : 'NO',
    Bedroom: p.propertyInformation?.bedrooms || "N/A",
    Bathroom: p.propertyInformation?.bathrooms || "N/A",
    Furnishing: p.furnishingType || "N/A",
    Latitude: p.coords?.[0] || "N/A",
    Longitude: p.coords?.[1] || "N/A",
    Source: "housing"
  };
});

fs.writeFileSync('./housingStructuredData.json', JSON.stringify(cleanData, null, 2));
