import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return(
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  
  let parts = props.parts
  const allParts = parts.map(part => <Part name={part.name} exercises={part.exercises} />)
  return (
    <>
      {allParts}
    </>
  )
}

const Total = (props) => {
  let parts = props.parts
  let sum = 0
  parts.forEach(part => {
    sum += part.exercises
  })
  return(
    <>
      <p>Number of exercises {sum}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
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
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}
 
ReactDOM.render(<App />,
  document.getElementById('root')
);

