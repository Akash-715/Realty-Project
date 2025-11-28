import '../FilterPage.css';
import Select from 'react-select';

export default function LocationComponent({enableFilters , showFilters , options , selectedOption ,setSelectedOption}){
    return(
        <div>
             <input type='checkbox' id= 'locationInputs' onChange={() => enableFilters('location')} />
                <label htmlFor='locationInputs'>Location </label> <br />

                {showFilters.location &&(
                    <div className='locationFields'>
                        <Select 
                        options = {options}
                        value = {selectedOption}
                        onChange={setSelectedOption}
                        placeholder = 'Select a Location'
                        isClearable
                        isSearchable
                        />
                     </div>

                )}
        </div>
    );
}