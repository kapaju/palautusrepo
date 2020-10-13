import React from 'react';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  
  let totalExercises = course.parts.reduce((sum, part) =>
    sum + part.exercises, 0)

  return(
    <p><strong>Total of {totalExercises} exercises </strong></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>   
      {course.parts.map(part => 
        <Part key={part.id} part={part}/>
        )}
    </div>
  )
}

const Course = ({ courses }) => {
  return(
    <div>
      {courses.map((course) => {
        return(
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} /> 
          </div>
        )
      })}
    </div>
  )
}

export default Course