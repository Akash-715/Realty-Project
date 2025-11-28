import '../FilterPage.css';

export default  function PriceComponent({enableFilters , showFilters , handleFilters , filters}){
    return(
        <div>
            <input type='checkbox' id = 'priceInputs'  onChange={() => enableFilters('price')}/>
                    <label htmlFor='priceInputs'>Price</label> <br />

                {showFilters.price &&(
                    <div className='PriceRange'>
                        <label>Enter Price Range</label> <br />
                        <div className='RangeInputs'>

                        <input name='minValue' type='number' id = 'priceInputs' onChange={handleFilters} value={filters.minValue} placeholder='Min'></input>
                        <span id='dash'>-</span>
                        <input name='maxValue' type = 'number' id = 'priceInputs' onChange={handleFilters} value={filters.maxValue} placeholder='Max'></input>

                        </div>

                    </div>
                )}
        </div>
    );
} 