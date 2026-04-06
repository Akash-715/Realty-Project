import '../FilterPage.css';
import Select from 'react-select';

import { useFilter } from '../../context/FilterContext';

export default function LocationComponent(){

    const {enableFilters , showFilters , options , selectedOption ,setSelectedOption} = useFilter();

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