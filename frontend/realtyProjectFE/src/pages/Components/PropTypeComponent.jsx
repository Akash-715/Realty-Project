import '../FilterPage.css';

export default function PropTypeComponent({enableFilters , showFilters , setFilters}){
    return(
        <div>
            <input type='checkbox' id='propTypeInput' onChange={() => {enableFilters('propType')}} />
            <label htmlFor='propTypeInput'>Property Type</label>

            {showFilters.propType && (
                <div className='propTypeInput'>
                    <input type='checkbox' onChange={(e) => {setFilters(prev => ({
                        ...prev,
                        propertyType : e.target.checked ? [...prev.propertyType , 'Apartment' , 'Flat'] :
                        prev.propertyType.filter(p => p !== 'Apartment' && p !== 'Flat')
                    }))}} />
                    <label>Apartments</label> <br />

                    <input type='checkbox' onChange={(e) => {setFilters(prev => ({
                        ...prev,
                        propertyType : e.target.checked ? [...prev.propertyType , 'Villa'] :
                        prev.propertyType.filter(p => p !== 'Villa')
                    }))}} />
                    <label>Villas</label> <br />

                    <input type='checkbox' onChange={(e) => {setFilters(prev => ({
                        ...prev,
                        propertyType : e.target.checked ? [...prev.propertyType , 'Plot' , 'Land' , 'built'] :
                        prev.propertyType.filter(p => p !== 'Plot' && p !== 'Land')
                    }))}} />
                    <label>Plots</label> <br />
                </div>
            )}
        </div>
    );
}