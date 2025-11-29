import { Parser } from 'json2csv';
import mysql from 'mysql2/promise';
import { readFile, writeFile } from 'fs/promises';
import { exec } from 'child_process';


/*
async function transformData(){
    const rawData = await readFile('./99AcresStructuredData.json', 'utf-8');
    const jsonData = JSON.parse(rawData);

    const fields = ['title','price','pricePerSqft','areaSqft','location','city','bedrooms','bathrooms','furnishing','facing','reraStatus','latitude','longitude','propertyUrl'];

    const parser = new Parser({ fields });
    const csv = parser.parse(jsonData);

    await writeFile('./99AcresData.csv', csv);
    console.log("Success!!!");   
 }

exec('start excel "./99AcresData.csv"', (err) => {
    if (err) {
      console.error("Couldn't open in Excel:", err.message);
    } else {
      console.log(" CSV opened in Excel!");
    }
});

transformData();

*/


// DataBase Storage 

async function storeData(){
  const pool = await mysql.createPool({
    host :'127.0.0.1',
    user : 'root',
    password : '1234',
    database : 'realtydata',
  });

  try{
  let raw = await readFile('./housingStructuredData.json','utf-8');
  const properties = JSON.parse(raw);

  for (const p of properties) {

    let area = p.areaSqft?.match(/\d+/g) || [];
    let ppSqFt = p.pricePerSqft?.match(/\d+/g) || [];

    let ppSqFtNum = ppSqFt[0] ?? 0;
    let minAreaSqFt = area[0] ?? 0;
    let maxAreaSqFt = area[1] ?? 0;

  await pool.query(
    `INSERT INTO propertyData (
      url, Title, Description, minPrice, maxPrice, avgPrice,propertyType, pricePerSqft,
      areaSqft, Location, city, LongAddress, BuildingStatus, ReraStatus,
      Bedroom, Bathroom, Furnishing, Latitude, Longitude, Source , ppSqFtNum ,
      minAreaSqFt , maxAreaSqFt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ? , ? , ?)`,
    [
      p.url,
      p.title,
      p.desc,
      p.minPrice,
      p.maxPrice,
      p.avgPrice,
      p.propertyType,
      p.pricePerSqft,
      p.areaSqft,
      p.Location,
      p.city,
      p.LongAddress,
      p.BuildingStatus,
      p.ReraStatus,
      p.Bedroom,
      p.Bathroom,
      p.Furnishing,
      p.Latitude,
      p.Longitude,
      p.Source,
      ppSqFtNum,
      minAreaSqFt,
      maxAreaSqFt
    ]
  );
}

console.log("All data processed.");
} catch (e) {
  console.error('Error reading or inserting data:', e.message);
} finally {
  await pool.end(); // Close the pool when done
}
}
storeData();