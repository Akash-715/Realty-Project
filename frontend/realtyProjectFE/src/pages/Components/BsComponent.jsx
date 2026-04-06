import '../FilterPage.css';
import { useFilter } from '../../context/FilterContext';

export default function BsComponent(){

    const {enableFilters, showFilters, setFilters} = useFilter()

    return(
        <div>
            <input type='checkbox' id='bsInput' onChange={() => enableFilters('bs')} />
                <label htmlFor='bsInput'>Building Status</label> <br />

                {showFilters.bs && (
                    <div className='bsInput'> 
                        <input type='radio' name = 'buildingStatus' value= "Ready to Move"
                        onChange={(e) => setFilters(prev => ({
                            ...prev,
                            'buildingStatus': e.target.value
                        }))} />
                        <label>Ready to Move!!</label> <br />

                        <input type='radio' name = 'buildingStatus' value= "Under Construction"
                         onChange={(e) => setFilters(prev => ({
                            ...prev,
                            'buildingStatus': e.target.value
                        }))}/> 

                        <label>Under Construction</label>

                    </div>
                )}
        </div>
    );
}