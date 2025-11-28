import '../FilterPage.css';

export default function PPsqftComponent({enableFilters , showFilters , handleFilters , filters}){
    return(
        <div>
            <input type= 'checkbox' id = 'ppsqftInput' onChange={() => enableFilters('PPsqFt')} />
                <label htmlFor='ppsqftInput'>Price per sqft</label> <br />

                {showFilters.PPsqFt && (
                    <div className='ppsqftRange'>
                        <label>Enter Price per sqft range</label>
                        <div className='RangeInputs'>

                        <input name='minPP' type='number' id = 'ppsqftInputs' onChange={handleFilters} value={filters.minPP} placeholder='Min'></input>
                        <span id='dash'>-</span>
                        <input name='maxPP' type = 'number' id = 'ppsqftInputs' onChange={handleFilters} value={filters.maxPP} placeholder='Max'></input>  

                        </div>
                    </div>
                )}
        </div>
    );
}