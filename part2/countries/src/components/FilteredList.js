import React  from 'react'
import Weather from './Weather'

const CountryData = (props) => {
    return(
        <div>
            <h1>{props.name}</h1>
            <div>capital {props.capital}</div>
            <div>population {props.population}</div>
            <h3>Spoken languages</h3>
            <ul>
                {props.languages.map((val , i) =>{
                    return(
                        <li key = {i}>{val.name}</li>               
                    )
                } )}
            </ul>
            <img src = {props.flag} alt = "flag" height = '20%' width = '20%'/>
        </div>
    )
}
const FilteredList = ({showData, selected, choice, filtered}) =>{
    if (filtered.length > 10)
    {
        return(
            <div>
                Too many matches, spacify another filter
            </div>
        )
    }
    if (filtered.length > 1 && filtered.length < 10)
    {
        if (selected === true)
        {
            return(
                <div>
                    <CountryData key = {choice.numericCode} name = {choice.name} population = {choice.population}
                    capital = {choice.capital} languages = {choice.languages} flag = {choice.flag}/>
                    <Weather country = {choice}/>
                </div>
            )
        }

        return(
            <div>
                {filtered.map(value => <div key={value.numericCode}> {value.name}
                <button onClick={() => showData(value)}>show</button></div>)}
            </div>
        )

    }
    if(filtered.length === 1)
    {
    return(
        <div>
            {filtered.map(value => <CountryData key = {value.numericCode} name = {value.name} population = {value.population}
            capital = {value.capital} languages = {value.languages} flag = {value.flag}/>)}
            <Weather country = {filtered[0]}/>
        </div>
    )
            }
 return(
     <div></div>
 )
}

export default FilteredList