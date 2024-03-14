import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, geo_Api_Url } from "../../Api";

const Search = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);
    const handleChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    const loadOptions = (inputValue) => {
        return fetch(
            `${geo_Api_Url}/cities?minpopulation=1000000&namePrefix=${inputValue}`, 
            geoApiOptions)
            .then((response) => response.json())
            .then((response) => {
                return{
                    options: response.data.map((city) => {
                        return{
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err))
    };

    return (
        <div>
            <AsyncPaginate 
                placeholder="Search with city name"
                debounceTimeout={600}
                value={search}
                onChange={handleChange}
                loadOptions={loadOptions}
            />
        </div>
    );
};

export default Search;