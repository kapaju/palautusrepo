/**
 * Fullstack Mooc 2020
 * Osa 2 - Puhelinluettelo
 * Katja Wallenius
 */

import React from 'react'

const Filter = ({filterRule, handleFilter}) => {
  return(
    <div>
      Filter visible by: <input value={filterRule} onChange={handleFilter}></input>
    </div>
  )
}

export default Filter;