/**
 * Fullstack Mooc 2020
 * Osa 2 - Puhelinluettelo
 * Katja Wallenius
 */

import React from 'react'

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {

  return(
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm;