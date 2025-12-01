const filters = {
  propertyType: ['Apartment', 'Flat' , 'Plot'],
  bedroom: [2 , 3]
}

let query = '';
const params = [];

 if(filters.bedroom){
        query += ` AND ${filters.bedroom.map((n) => {
            if(n > 3){return 'Bedroom >= ?'}

            else{ return 'Bedroom = ?' }
        }).join(' OR ')}`;

        params.push(...filters.bedroom.map((n) => `%${n}%`))
}

console.log(query);
console.log(params);

