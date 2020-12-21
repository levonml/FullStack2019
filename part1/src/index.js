import React from 'react'
import ReactDOM from 'react-dom'

const PART = (props) => {
  return(
    <div>
      <p>{props.section} {props.practice}</p>
    </div>
  )
}
const Header = (props) => {
  return(
  <div>
    <h1>{props.course}</h1> 
  </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <PART section = {props.parts[0]['name']} practice = {props.parts[0]['exercises']} />
      <PART section = {props.parts[1]['name']} practice = {props.parts[1]['exercises']} />
      <PART section = {props.parts[2]['name']} practice = {props.parts[2]['exercises']} />  
    </div>
  )
}
const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.parts[0]['exercises']
       + props.parts[1]['exercises'] + props.parts[2]['exercises']}</p>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [ 
      {
        name:'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <>
     <Header course = {course['name']} />
     <Content parts = {course['parts']} />
     <Total parts={course['parts']}/>  
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
