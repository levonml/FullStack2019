import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CountrySearch from './components/CountrySearch'
import FilteredList from './components/FilteredList'
const App = () => {
    const[country, setCountry] = useState([])
    const[newSearch, setNewSearch] = useState('')
    const[selected, setSelected] = useState(false)
    const[choice, setChoice] = useState([])

    useEffect(() =>{
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountry(response.data)
            })
    }, [])
    const handleCountryChange = (event) =>{
        setNewSearch(event.target.value.replace(/[^\w\s]/gi, ""))
        setSelected(false)
    }
    const showData = (selectedCountry) => {
        setSelected(true)
        setChoice(selectedCountry)
    }
    let filtered
    let myReg = new RegExp( `${newSearch}`, 'i');
    if (newSearch){
        filtered = country.filter(value => myReg.test(value.name) )
    }
    else
        filtered = []
    

    return(
        <div>
            <CountrySearch  handleCountryChange = {handleCountryChange} />
            <FilteredList filtered = {filtered} selected = {selected} 
            showData = {showData} choice = {choice}/>
        </div>
    )
}
export default App