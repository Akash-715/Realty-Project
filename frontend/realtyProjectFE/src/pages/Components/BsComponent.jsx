import '../FilterPage.css';

export default function BsComponent({enableFilters , showFilters ,setFilters}){
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