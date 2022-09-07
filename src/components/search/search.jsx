import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState('null');
    const loadOptions = (inputValue) => {
        if(inputValue == false){
            inputValue = 'bandung'
        }
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            });
    };

    async function fetchText() {

        let url = 'https://ipinfo.io/json?token=fff4f3d5076780';
        let response = await fetch(url);
        let data = await response.json();
        let location = await (data.city);
        // setLoaded(location);

    }



    const [myLocation, getLocation] = useState({});

    useEffect(() => {
        fetch('https://ipinfo.io/json?token=fff4f3d5076780')
            .then(res => res.json()
                .then((data) => {
                    getLocation(data);
                })
            )
            .catch(err => {
                console.log('An error occurred:', err.res)
            });
    }, []);
    
    // console.log(myLocation);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);

    };
    const customStyles = {
        control: base => ({
          ...base,
          padding:'10px 10px 10px 40px'
        })
      };
    return (
        <div>
            <h3>Find citys here..</h3>
            <img src={`icons/search.png`} class="searchInput"/>
            <AsyncPaginate
                placeholder="Search for city"
                debounceTimeout={600}
                value = {{value:'-6.9222 107.6069' , label: myLocation.city}}
                onChange={handleOnChange}
                loadOptions={loadOptions}
                styles={customStyles}
            />
        </div>
    )
}

export default Search