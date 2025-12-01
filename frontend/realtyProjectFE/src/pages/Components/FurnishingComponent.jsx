import '../FilterPage.css';

export default function FurnishingComponent({enableFilters , showFilters , setFilters}){
    return(
        <div>
            <input type='checkbox' id='furnishingInput' onChange={() => enableFilters('furnishing')} />
            <label htmlFor='furnishingInput'>Furnishing</label> <br />

            {showFilters.furnishing && (
                <div className='furnishingInput'>

                    <input type='radio' name='furnishing' value = 'Furnished'  
                     onChange={(e) => setFilters(prev => ({
                        ...prev,
                        furnishing: e.target.value
                    })) } />
                    <label>Furnished</label> <br />

                     <input type='radio' name='furnishing' value = 'Semifurnished'  
                     onChange={(e) => setFilters(prev => ({
                        ...prev,
                        furnishing: e.target.value
                    })) } />
                    <label>Semi Furnished</label> <br />

                     <input type='radio' name='furnishing' value = 'Unfurnished'  
                     onChange={(e) => setFilters(prev => ({
                        ...prev,
                        furnishing: e.target.value
                    })) } />
                    <label>Not Furnished</label> <br />
                </div>
            )}
        </div>
    );
}