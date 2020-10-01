/*
 * Fullstack Mooc 2020
 * osa1, unicafe
 * Katja Wallenius
 *
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const StatisticsLine = ({text, value}) => {

  return(
      <tr>
        <td>
          {text}
        </td>
        <td>
          {value}
        </td>
      </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad
  
  if ((good + bad + neutral) === 0) {
    return(
        <p>
          No feedback given.
        </p>
    )
  }
  else {
    return(
      <div>
        <table>
          <tbody>
            <StatisticsLine text={'good'} value={good}/>
            <StatisticsLine text={'neutral'} value={neutral}/>
            <StatisticsLine text={'bad'} value={bad}/>
            <StatisticsLine text={'all'} value={total}/>
            <StatisticsLine text={'average'} 
            value={(good-bad)/total}/>
            <StatisticsLine text={'positive (%)'} 
            value={good/total*100}/>
          </tbody>
        </table>
      </div>    
    )
  }
}

const Button = (props) => {

  return(
      <button onClick={props.handleClick}>
        {props.text}
      </button>
  )

}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  
  return(

    <div>
      <h1>Give feedback</h1>
      <Button text={'good'} handleClick={handleGood}/>
      <Button text={'neutral'} handleClick={handleNeutral}/>
      <Button text={'bad'} handleClick={handleBad}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )

}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

