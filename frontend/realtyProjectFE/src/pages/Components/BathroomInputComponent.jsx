import '../FilterPage.css';

export default function BathroomInputComponent({enableFilters , showFilters , setFilters}){
    return(
        <div> 
            <input type='checkbox' id='bedroomInput' onChange={() => enableFilters('bathroom')} />
            <label htmlFor='bedroomInput'>Bathroom</label>

            {showFilters.bathroom && (
                <div className='bedroomInput'>

                    <p>Cilck no of bathrooms needed in your house!!</p>
                    
                    <input type='checkbox' onChange={(e) => setFilters(prev => ({
                        ...prev,
                        bathroom: e.target.checked ? [...prev.bathroom , 1] : 
                        prev.bathroom.filter(p => p !== 1)
                    }))} />
                    <label>1 bathroom</label> <br />

                    <input type='checkbox' onChange={(e) => setFilters(prev => ({
                        ...prev,
                        bathroom: e.target.checked ? [...prev.bathroom , 2] : 
                        prev.bathroom.filter(p => p !== 2)
                    }))} />
                    <label>2 bathrooms</label>  <br />

                    <input type='checkbox' onChange={(e) => setFilters(prev => ({
                        ...prev,
                        bathroom: e.target.checked ? [...prev.bathroom , 3] : 
                        prev.bathroom.filter(p => p !== 3)
                    }))} />
                    <label>3 bathrooms</label>  <br />

                    <input type='checkbox' onChange={(e) => setFilters(prev => ({
                        ...prev,
                        bathroom: e.target.checked ? [...prev.bathroom , 4] : 
                        prev.bathroom.filter(p => p !== 4)
                    }))} />
                    <label>More than 3 bathrooms</label>  <br />

                </div>
            )}
        </div>
    );
}