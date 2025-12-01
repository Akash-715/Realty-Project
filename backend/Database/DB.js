import mysql from 'mysql2';

let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'realtydata'
}).promise();


export async function filter(filters){
    let query = "SELECT * FROM propertydata where 1=1 ";
    const params = [];

    //price filter
    if(filters.minValue && filters.maxValue){
        query += `AND ((maxPrice = 0 AND minPrice BETWEEN ? AND ?)
                    OR 
                    ( maxPrice > 0 AND minPrice >= ? AND maxPrice <= ?))`;

        params.push(Number(filters.minValue) , Number(filters.maxValue) , Number(filters.minValue) , Number(filters.maxValue));
        
    }

    //areaSqft filter
    if(filters.minAreaSqFt && filters.maxAreaSqFt){
        query +=`
        AND (
        (maxAreaSqFt = 0 AND minAreaSqFt BETWEEN ? AND ?)
        OR
        (maxAreaSqFt > 0 AND minAreaSqFt >= ? AND maxAreaSqFt <= ?)
        )`;

        params.push(Number(filters.minAreaSqFt) , Number(filters.maxAreaSqFt) , Number(filters.minAreaSqFt) , Number(filters.maxAreaSqFt));
    }

    //ppSqft filter
    if(filters.minPP && filters.maxPP){
        query += ` AND ppSqFTNum BETWEEN ? AND ? `;

        params.push(Number(filters.minPP) , Number(filters.maxPP));
    }

    //location filter
    if(filters.location){
        query += ' AND Location like ? ';

        params.push(`%${filters.location}%`);
    }

    //source filter
    if(filters.source){
        query += ` AND Source  LIKE ? `;

        params.push(`%${filters.source}%`);
    }

    //rera filter
    if(filters.reraValue){
        query += ` AND ReraStatus like ? `;

        params.push(`%${filters.reraValue}%`);
    }

    //Building Status
    if(filters.buildingStatus){
        query += 'AND BuildingStatus like ?';

        params.push(`%${filters.buildingStatus}%`);
    }

    //PropertyType
    if (filters.propertyType) {
    if (!Array.isArray(filters.propertyType)) filters.propertyType = [filters.propertyType];

    filters.propertyType = filters.propertyType.filter(v => v && v.trim() !== "");

    if (filters.propertyType.length > 0) {
        query += ` AND ( ${filters.propertyType
            .map(() => 'TRIM(propertyType) LIKE ?')
            .join(' OR ')} )`;

        params.push(...filters.propertyType.map(v => `%${v}%`));
        }
    }


    //Furnishing
    if(filters.furnishing){
        query += ' AND furnishing LIKE ? ';

        params.push(`${filters.furnishing}`);
    }

    //Bedroom
    if (filters.bedroom) {
    if (!Array.isArray(filters.bedroom)) filters.bedroom = [filters.bedroom];

    if (filters.bedroom.length > 0) {
        query += ` AND ( ${filters.bedroom
            .map(n => (n > 3 ? 'Bedroom >= ?' : 'Bedroom = ?'))
            .join(' OR ')} )`;

        params.push(...filters.bedroom.map(n => n));
        }
    }


    //Bathroom
    if (filters.bathroom) {
    if (!Array.isArray(filters.bathroom)) filters.bathroom = [filters.bathroom];

    if (filters.bathroom.length > 0) {
        query += ` AND ( ${filters.bathroom
            .map(n => (n > 3 ? 'Bathroom >= ?' : 'Bathroom = ?'))
            .join(' OR ')} )`;

        params.push(...filters.bathroom.map(n => n));
        }
    }

    

    if(params.length > 0){

        console.log(query)
        console.log(params);

    const [rows] = await pool.query(query , params);
    return rows;
    }

}