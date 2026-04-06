import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import './FilterPage.css';

import { FilterContext } from '../context/FilterContext';

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
import FurnishingComponent from './Components/FurnishingComponent';
import BedroomInputComponent from './Components/BedroomInputComponent';
import BathroomInputComponent from './Components/BathroomInputComponent';
import { useContext } from 'react';

const options = [
    { value: 'Perungalathur', label: 'Perungalathur' },
    { value: 'Urapakkam', label: 'Urapakkam' },
    { value: 'Vandalur', label: 'Vandalur' }
];

const sourceOptions = [
    { value: '99acres', label: '99acres' },
    { value: 'housing', label: 'housing.com' }
];

function FilterPage() {

    const {
        storeData,
        currentPage,
        setCurrentPage,
        rowsPerPage,
        handleApplyFilter,
        currentRows
    } = useContext(FilterContext)

    return (
        <div className='container'>
            <div className='Selection_block'>
                <div className='Filter_field'>
                    <p>Filter By Fields</p>

                    <PropTypeComponent />
                    <PriceComponent />
                    <PPsqftComponent />
                    <AreasqftComponent />
                    <ReraComponent />
                    <BsComponent />
                    <FurnishingComponent />
                    <BedroomInputComponent />
                    <BathroomInputComponent />

                    <LocationComponent />
                    <SourceComponent />

                    <div className='buttonDiv'>
                        <button onClick={handleApplyFilter}>
                            Apply Filter
                        </button>
                    </div>
                </div>
            </div>

            <div className='Table_block'>
                {storeData.length > 0 && <TableComponent storeData={currentRows} />}
            </div>

            <div className='page_block'>
                {storeData.length > 0 && (
                    <Pagination
                        totalPage={storeData.length}
                        rowsPerPage={rowsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                )}
            </div>
        </div>
    );
}

export default FilterPage;
