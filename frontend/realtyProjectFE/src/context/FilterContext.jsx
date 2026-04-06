import { createContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";

export const FilterContext = createContext()

export const useFilter = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {
    const options = [
    { value: 'Perungalathur', label: 'Perungalathur' },
    { value: 'Urapakkam', label: 'Urapakkam' },
    { value: 'Vandalur', label: 'Vandalur' }
];

const sourceOptions = [
    { value: '99acres', label: '99acres' },
    { value: 'housing', label: 'housing.com' }
];

    const [showFilters, setShowFilters] = useState({
        price: false,
        location: false,
        PPsqFt: false,
        area: false,
        source: false,
        rera: false,
        bs: false,
        propType: false,
        furnishing: false,
        bedroom: false,
        bathroom: false
    });

    const enableFilters = (name) => {
        setShowFilters(prev => ({ ...prev, [name]: !prev[name] }));
    };


    const [filters, setFilters] = useState({
        minValue: "",
        maxValue: "",
        minPP: "",
        maxPP: "",
        minAreaSqFt: "",
        maxAreaSqFt: "",
        reraValue: "",
        buildingStatus: "",
        propertyType: [],
        furnishing: "",
        bedroom: [],
        bathroom: []
    });

    const [selectedOption, setSelectedOption] = useState(null);
    const [source, setSource] = useState(null);


    const [appliedFilters, setAppliedFilters] = useState(null);


    const [storeData, setStoreData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 50;


    const handleFilters = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyFilter = () => {
        setAppliedFilters({
            filters: { ...filters },
            location: selectedOption,
            source: source
        });
    }; 

    const lastRowIndex = currentPage * rowsPerPage;
    const firstRowIndex = lastRowIndex - rowsPerPage;
    const currentRows = storeData.slice(firstRowIndex, lastRowIndex);

        const prevQueryRef = useRef("");

        const buildQuery = (data) => {
        const params = new URLSearchParams();

        Object.entries(data.filters).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
                value.forEach(v => params.append(key, v));
            } else if (value !== "" && value !== null) {
                params.append(key, value);
            }
        });

        if (data.location?.value) {
            params.append("location", data.location.value);
        }

        if (data.source?.value) {
            params.append("source", data.source.value);
        }

        return params.toString();
    };


        useEffect(() => {
        if (!appliedFilters) return;

        const fetchData = async () => {
            const query = buildQuery(appliedFilters);

            if (query === prevQueryRef.current) return;
            prevQueryRef.current = query;

            try {
                const response = await axios.get(
                    `http://localhost:8080/filter/?${query}`
                );
                setStoreData(response.data);
                setCurrentPage(1);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [appliedFilters]);

    return(
        <FilterContext.Provider value = {{
            options,
            sourceOptions,
            showFilters,
            setShowFilters,
            enableFilters,
            filters,
            setFilters,
            selectedOption,
            setSelectedOption,
            source,
            setSource,
            appliedFilters,
            setAppliedFilters,
            storeData,
            setStoreData,
            currentPage,
            setCurrentPage,
            rowsPerPage,
            handleFilters,
            handleApplyFilter,
            lastRowIndex,
            firstRowIndex,
            currentRows,
            buildQuery,
            prevQueryRef
        }}>
            {children   }
        </FilterContext.Provider>
    )


}

export default FilterProvider;