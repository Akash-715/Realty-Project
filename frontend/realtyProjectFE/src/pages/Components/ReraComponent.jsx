import { useFilter } from '../../context/FilterContext';
import '../FilterPage.css';

export default function ReraComponent(){

    const {enableFilters , showFilters , filters , setFilters} = useFilter();

    return(
        <div>
             <input type='checkbox' id='reraInput' onChange={() => enableFilters('rera')} />
                <label htmlFor='rera'>Rera Status</label> <br />

                {showFilters.rera && (
                    <div className='reraInput'>
                    <input type='checkbox' checked = {filters.reraValue === "yes"} 
                    onChange={(e) => setFilters(prev => ({
                        ...prev,
                        reraValue: e.target.checked ? "yes" : "no"
                    }))} />
                    <label htmlFor='rera'>Yes</label>
                    </div>
                )}
        </div>
    );
}