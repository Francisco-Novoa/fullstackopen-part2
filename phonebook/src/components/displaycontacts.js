import React from "react"

const TableRow = ({ person, remove }) => {
    return (
      <tr>
        <td>
          {person.name}
        </td>
        <td>
          #{person.number}
        </td>
        <td>
          <button onClick={() => { remove(person.id, person.name) }}>
            remove
          </button>
        </td>
      </tr>
    )
  }

const DisplayPhonebooks = ({ persons, remove }) => {
    return (
      <table>
  
        <thead>
          <tr>
            <th>
              Names
            </th>
            <th>
              Number
            </th>
          </tr>
        </thead>
  
        <tbody>
          {
            persons.map((person, i) => {
              return (<TableRow person={person} key={person.id} remove={remove} />)
            })
          }
        </tbody>
  
      </table>
    )
  }
  
  export default DisplayPhonebooks