import React from 'react'

const CountrySearch = ({handleCountryChange}) =>{
    return(
        <form>
            <div>
                find countries <input  onChange = {handleCountryChange}/>
            </div>
        </form>
    )
}

 export default CountrySearch