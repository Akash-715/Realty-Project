import '../FilterPage.css';

export default function BedroomInputComponent({enableFilters , showFilters , setFilters}){
    return(
        <div>
            <input type='checkbox' id='bedroomInput' onChange={() => enableFilters('bedroom')} />
            <label htmlFor='bedroomInput'>Bedroom</label>

            {showFilters.bedroom && (
                <div className='bedroomInput'>

                    <p>Cilck no of bedrooms needed in your house!!</p>

                    <input type='checkbox' onChange={(e) => setFilters(prev => ({
                        ...prev,
                        bedroom: e.target.checked ? [...prev.bedroom , 1] : 
                        prev.bedroom.filter(p => p !== 1)
                    }))} />
                    <label>1 bedroom</label> <br />

                    <input type='checkbox' onChange={(e) => setFilters(prev => ({
                        ...prev,
                        bedroom: e.target.checked ? [...prev.bedroom , 2] : 
                        prev.bedroom.filter(p => p !== 2)
                    }))} />
                    <label>2 bedrooms</label>  <br />

                    <input type='checkbox' onChange={(e) => setFilters(prev => ({
                        ...prev,
                        bedroom: e.target.checked ? [...prev.bedroom , 3] : 
                        prev.bedroom.filter(p => p !== 3)
                    }))} />
                    <label>3 bedrooms</label>  <br />

                    <input type='checkbox' onChange={(e) => setFilters(prev => ({
                        ...prev,
                        bedroom: e.target.checked ? [...prev.bedroom , 4] : 
                        prev.bedroom.filter(p => p !== 4)
                    }))} />
                    <label>More than 3 bedrooms</label>  <br />

                </div>
            )}
            
        </div>
    );
}