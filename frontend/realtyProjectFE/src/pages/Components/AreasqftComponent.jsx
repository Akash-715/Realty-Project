import '../FilterPage.css';

export default function AreasqftComponent({enableFilters ,showFilters , filters , handleFilters}){
    return(
        <div>
            <input type = 'checkbox' id = 'areaInput' onChange={() => enableFilters('area')} />
                <label htmlFor='areaInput'>Total Area sqft</label> <br />

                {showFilters.area && (
                <div className='AreaInput'>
                        <label>Enter Total Area sqft range</label>
                        
                    <div className='AreaRange'>
                            
                        <input name='minAreaSqFt' type='number' id = 'areaInputs' onChange={handleFilters} value={filters.minAreaSqFt} placeholder='Min sqft'></input>
                        <span id='dash'>-</span>
                        <input name='maxAreaSqFt' type = 'number' id = 'areaInputs' onChange={handleFilters} value={filters.maxAreaSqFt} placeholder='Max sqft'></input> 

                    </div>
                </div>
                )}
        </div>
    );
}