import React from 'react'

const WeatherData = ({weather}) =>{
    return(
        <div>
            {weather.location ?<h3>Weather in { weather.location.name}</h3>: ''}
            {weather.current ?<div><strong>temperature:</strong> {weather.current.temperature} Celcius</div> : ''}
            {weather.current ?<img src =  {weather.current.weather_icons[0]} alt = 'weather_icon' height = '15%' width = '15%'/> : ''}
            {weather.current ?<div><strong>wind:</strong> {weather.current.wind_speed}mph direction { weather.current.wind_dir}</div> : ''}
        </div>
    )
}
export default WeatherData