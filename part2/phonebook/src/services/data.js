//import React from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
} 

const  create = (newObject) => {
    const res = axios.post(baseUrl, newObject)
    return res.then(response =>{
       // console.log('post ---', response.data);
       // console.log('respons = ', response);
         return response.data
    })
}
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
   // return request
    return request.then(response =>{
        const res = response.data
        console.log("detele.response - ", res);
        console.log("delete.response.data - ", res.data);
        return res
    })
    //const res = persons.filter(i => i.id !== id)
    //return res
}
    const update = (id, note) => {
        const request = axios.put(`${baseUrl}/${id}`, note)
        return request.then(response => response.data)
    }

const dataServices = {getAll, create, remove, update}
export default dataServices