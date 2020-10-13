/**
 * Fullstack Mooc 2020
 * Osa 2 - Puhelinluettelo
 * Katja Wallenius
 */

import React from 'react'

const Persons = ({persons, filterRule, deletePerson}) => {
  return(
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filterRule.toLowerCase()))
        .map(person =>
        <div key={person.id}>
          <li>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.name)}>delete</button>
          </li>
        </div>
        )}
    </ul>
  )
}

export default Persons;
