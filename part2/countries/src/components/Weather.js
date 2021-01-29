import React, {useState, useEffect} from 'react';
import axios from 'axios';
import WeatherData from './WeatherData'

const Weather = ({country}) => {
    const[countryWeather, setCountryWeather] = useState([]);
    useEffect(() => {
      });
    useEffect(() => {
        const api = process.env.REACT_APP_KEY_API;
        const urlWeather = `http://api.weatherstack.com/current?access_key=${api}&query= ${country.name}`;
        axios
            .get(urlWeather)
            .then(response => {
                setCountryWeather(response.data)
            })

        },[country])
        let weather = countryWeather;
    return(
        <div>
            <WeatherData weather = {weather} />
        </div>
    )
}
export default Weather