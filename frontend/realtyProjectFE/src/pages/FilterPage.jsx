import {React , useState } from 'react';
import Select from 'react-select';


import './FilterPage.css';
import axios from 'axios';

import TableComponent from './Components/TableComponent';
import Pagination from './Components/Pagination';
import PriceComponent from './Components/PriceComponent';
import LocationComponent from './Components/LocationComponent';
import PPsqftComponent from './Components/PPsqftCompnent';
import AreasqftComponent from './Components/AreasqftComponent';
import SourceComponent from './Components/SourceComponent';
import ReraComponent from './Components/ReraComponent';
import BsComponent from './Components/BsComponent';
import PropTypeComponent from './Components/PropTypeComponent';



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
        rera: false,
        bs: false,
        propType: false
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
        reraValue: "",
        buildingStatus: "",
        propertyType: []
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

            if(Array.isArray(value)){
                value.forEach(v => params.append(key ,v));
            }
            else if(value !== "" && value !== null && value !== undefined){
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
        //Pagination logic
        const LastRowIndex = currentPage * rowsPerPage;
        const FirstRowIndex = LastRowIndex - rowsPerPage;
        const currentRows = storeData.slice(FirstRowIndex , LastRowIndex);


    return(
        <div className='container'>
            <div className='Selection_block'>

                <div className='Filter_field'>
                    <p>Filter By Fields</p>

                <PropTypeComponent enableFilters = {enableFilters} showFilters = {showFilters} 
                setFilters = {setFilters} />
                    
                <PriceComponent  enableFilters={enableFilters} showFilters={showFilters}
                handleFilters={handleFilters} filters={filters} />

                <PPsqftComponent enableFilters={enableFilters} showFilters={showFilters}
                filters={filters} handleFilters={handleFilters} />

                <AreasqftComponent enableFilters={enableFilters} showFilters={showFilters}
                filters={filters} handleFilters={handleFilters} />

                <ReraComponent enableFilters={enableFilters} showFilters={showFilters}
                filters={filters} setFilters={setFilters} />

                <BsComponent enableFilters={enableFilters} showFilters={showFilters}
                setFilters={setFilters} />

                <LocationComponent enableFilters={enableFilters} options={options} 
                selectedOption={selectedOption} showFilters={showFilters} 
                setSelectedOption={setSelectedOption} />

                <SourceComponent enableFilters={enableFilters} sourceOptions={sourceOptions}
                source={source} setSource={setSource} showFilters={showFilters} />

                {/* Submit Button */}
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