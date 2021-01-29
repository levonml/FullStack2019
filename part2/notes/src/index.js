import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const App = () => {
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      const notes = response.data
      console.log(notes)

    }
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
