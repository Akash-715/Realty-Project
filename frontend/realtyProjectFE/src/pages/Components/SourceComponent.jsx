import { useFilter } from '../../context/FilterContext';
import '../FilterPage.css';
import Select from 'react-select';

export default function SourceComponent(){

    const {enableFilters , showFilters , sourceOptions ,source , setSource} = useFilter();

    return(
        <div>
             <input type='checkbox' id='sourceInput' onChange={() => enableFilters('source')} />
                <label htmlFor='source'>Source</label> <br />

                {showFilters.source && (
                    <div className='SourceInput'>
                        <Select
                        options={sourceOptions}
                        value={source}
                        onChange={setSource}
                        placeholder = "Select a Source"
                        isClearable
                        isSearchable
                        />
                    </div>
                )}
        </div>
    );
}