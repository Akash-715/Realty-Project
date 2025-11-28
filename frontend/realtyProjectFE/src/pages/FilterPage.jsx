import {React , useState } from 'react';
import Select from 'react-select';


import './FilterPage.css';
import axios from 'axios';

import TableComponent from './Components/TableComponent';
import Pagination from './Components/Pagination';



const options = [
    {value: 'Perungalathur' , label: 'Perungalathur'},
    {value: 'Urapakkam' , label: 'Urapakkam'},
    {value: 'Vandalur' , label: 'Vandalur'}
]

const sourceOptions = [
    {value:'99acres' , label: '99acres'},
    {value:'housing' , label: 'housing.com'}
]


function FilterPage(){

    const [showFilters , setShowFilters] = useState({
        price: false ,
        location: false ,
        PPsqFt: false,
        area: false,
        source: false,
        rera: false
    });


    const [selectedOption , setSelectedOption] = useState(null);
    const [source , setSource] = useState(null);

    const [currentPage , setCurrentPage] = useState(1);
    const [rowsPerPage , setRowsPerPage] = useState(50);

    const [filters , setFilters] = useState({
        minValue: "",
        maxValue: "",
        minPP:"",
        maxPP:"",
        minAreaSqFt:"",
        maxAreaSqFt:"",
        reraValue: ""
    })

    const [storeData , setStoreData] = useState([]);

   
    function enableFilters(name){
        setShowFilters(prev => ({
            ...prev,
            [name] : !prev[name]
        }))
    }

    function handleFilters(event){
        const {name , value} = event.target;

        setFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const bulidQuery = () => {
        let params = new URLSearchParams();

        Object.entries(filters).forEach(([key , value]) => {
            if(value !== "" && value !== null && value !== undefined){
                params.append(key , value);
            }
        })

        if(selectedOption){
            const locationValue = selectedOption.value || selectedOption; 
            params.append("location" , locationValue);
        }
        if(source){
            const sourceValue = source.value || source;
            params.append("source" , sourceValue);
        }

        return params.toString();
    }

    
    async function handleClick(event){
        try{
            event.preventDefault();
            const params = bulidQuery();

            const response = await axios.get(`http://localhost:8080/filter/?${params}`);

            setStoreData(response.data);


        }catch(e){
            console.log(e);
    }
}

        const LastRowIndex = currentPage * rowsPerPage;
        const FirstRowIndex = LastRowIndex - rowsPerPage;
        const currentRows = storeData.slice(FirstRowIndex , LastRowIndex);


    return(
        <div className='container'>
            <div className='Selection_block'>

                <div className='Filter_field'>
                    <p>Filter By Fields</p>

                    {/* Price Field */}
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

                {/* Location Field */}
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

                {/* ppSqFt Field */}
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

                {/* areaSqFt Field */}

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

                {/*Source Field*/}
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

                {/*Rera Field*/}
                <input type='checkbox' id='reraInput' onChange={() => enableFilters('rera')} />
                <label htmlFor='rera'>Rera Status</label>

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

                <div className='buttonDiv'>
                    <button variant = 'primary' onClick={handleClick}>Apply Filter</button>
                </div>

                </div>

            </div>


            <div className='Table_block'>
                {storeData.length > 0 ?(
                    <div>
                    <TableComponent storeData = {currentRows} />

                    <Pagination
                     totalPage = {storeData.length} 
                     rowsPerPage = {rowsPerPage}
                     setCurrentPage={setCurrentPage}
                     currentPage={currentPage}/>
                    </div>
                ): (
                <p></p>
            ) }
                                              
            </div>
        </div>
    );
};

export default FilterPage;