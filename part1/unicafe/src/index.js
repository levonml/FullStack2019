import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = (props) => {
  return(
    <div>
    <button onClick = {() => props.setGood(props.good + 1)}> good</button>
    <button onClick = {() => props.setNeutral(props.neutral + 1)}> neutral</button>
    <button onClick = {() => props.setBad(props.bad + 1)}> bad</button>
    </div>
  )
}
const Header = (props) => {
  return(
    <div>
    <h1>{props.header}</h1>
    </div>
  )
}
const Statistic = (props) =>{
  return(
    <div>
      <p>{props.text} {props.value}{props.percent}</p>
    </div>
  )
}
const Statistics = (props) =>{
  if(props.good === 0 && props.bad === 0 && props.neutral === 0){
    return(
      <div>   
        <h3>No feedback given</h3>
      </div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
        <tr>
          <td><Statistic text = 'good' /></td>
          <td><Statistic  value = {props.good} /></td>
        </tr>
        <tr>
          <td><Statistic text = 'neutral' /></td>
          <td><Statistic value = {props.neutral} /></td>
        </tr>
        <tr>
          <td><Statistic text = 'bad' /></td>
          <td><Statistic value = {props.bad} /></td>
        </tr>
        <tr>
          <td> <Statistic text = 'all'  /></td>
          <td> <Statistic value = {props.all} /></td>
        </tr>
        <tr>
          <td> <Statistic text = 'average' /></td>
          <td> <Statistic value = {props.average} /></td>
        </tr>
        <tr>
          <td><Statistic text = 'positive' /></td>
          <td><Statistic value = {props.positive} percent = '%'/></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + bad + neutral
  let average = (good - bad)/all
  let positive = good/all*100
  return (
    <div>
      <Header header = 'give feedback' />
      <Button setGood = {setGood} good = {good} setNeutral = {setNeutral}
       neutral = {neutral} setBad = {setBad} bad = {bad} />
      <Header header = 'statistics' />
      <Statistics good = {good} neutral = {neutral} bad = {bad}
      all = {all} positive = {positive} average = {average} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)