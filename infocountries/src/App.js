import React, { useState, useEffect } from 'react';
import axios from "axios"

const ControlledInput = ({ value, onChange, label }) => {
  return (
    <div>
      <div style={{ display: "inline-block" }} >
        {label}:
      </div>
      <div style={{ display: "inline-block" }}>
        <input value={value} onChange={(e) => { onChange(e.target.value) }} />
      </div>
    </div>
  )
}

const ShowCountries = ({ countries, setFilter }) => {
  return (
    <div>
      {!!countries &&
        countries.length === 1 ?
        countries.map((country) => {
          return (
            <ShowCountry country={country} key={parseInt(country.callingCodes[0])} />
          )
        })
        : countries.length <= 10 ?

          countries.map((country) => {
            return (
              <ShowNames country={country} key={parseInt(country.callingCodes[0])} setFilter={setFilter} />
            )
          })

          : "Too many matches, please specify a different filter"
      }
    </div>
  )
}

const ShowNames = ({ country, setFilter }) => {
  return (
    <div>
      <table>
        <tbody>
          {!!country &&
            <ShowName name={country.name} setFilter={setFilter} />
          }

        </tbody>
      </table>
      <br />
    </div>
  )
}

const ShowCountry = ({ country }) => {
  return (
    <div>
      <table>
        <tbody>
          {!!country &&
            Object.entries(country).map((property, i) => {
              return (
                <ShowProperty key={i} property={property} />
              )
            })
          }
        </tbody>
      </table>
      <br />
    </div>
  )
}

const ShowName = ({ name, setFilter }) => {
  return (
    <tr>
      <th>
        {name}
      </th>
      <td>
        <button onClick={() => setFilter(name)} >
          Show
        </button>
      </td>
    </tr>

  )
}

const ShowProperty = ({ property }) => {
  return (
    <>
      {typeof (property[1]) === "string" && property[0] !== "flag" ?
        <tr>
          <th>
            {property[0]}
          </th>
          <td>
            {property[1]}
          </td>
        </tr>
        : property[0] === "flag" ?
          <tr>
            <th>
              {property[0]}
            </th>
            <td>
              <img src={property[1]} alt="flag" />
            </td>
          </tr>
          : Array.isArray(property[1]) && typeof (property[1][0]) !== "object" ?
            <tr>
              <th>
                {property[0]}
              </th>
              <td>
                {property[1].join(", ")}
              </td>
            </tr>
            :
            <>
            </>
      }
    </>
  )
}


function App() {
  //states
  const [countries, setCountries] = useState([])
  const [cFiltered, setCFiltered] = useState([])
  const [filter, setFilter] = useState([])

  //handlers
  const handleFilter = (a) => {
    setFilter(a)
    //save the keyword
    let aux = countries.filter((elem) => { return (elem.name.toLowerCase().includes(a.toLowerCase())) })
    //find if there is a match
    setCFiltered(aux)
    //saves the filtered result
  }

  //useEffect
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        setCountries(response.data)
      })
  }, [])


  return (
    <div>
      <div>
        <ControlledInput value={filter} onChange={handleFilter} label="find countries" />
      </div>
      <div>
        <ShowCountries countries={cFiltered} setFilter={handleFilter} />
      </div>
    </div>

  );
}

export default App;
