const filters = {
  propertyType: ['Apartment', 'Flat' , 'Plot']
}

let query;

  if(filters.propertyType){
          query += ` AND ${filters.propertyType.map(() => ' propertyType like ? ').join('AND')}`
  } 

console.log(query);

