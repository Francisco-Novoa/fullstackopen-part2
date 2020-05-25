import React, { useState, useEffect } from 'react'
import PhonebookService from "./services/numbers"
import DisplayPhonebooks from "./components/displaycontacts"
import ControlledInput from "./components/controledinput"
import NewContact from "./components/newcontact"
import Notification from "./components/notification"

const Title = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

const App = () => {

  //States
  //this one acts as database keeping all the phone numbers
  const [persons, setPersons] = useState([])

  //this one acts as the filtered result that is actually shown
  const [filtered, SetFiltered] = useState([])

  //this one keeps the filter keyword
  const [filter, setFilter] = useState("")

  //this one keeps an error log
  const [errorGood, setErrorGood] = useState(null)
  const [errorBad, setErrorBad] = useState(null)

  //this two keep the inputs
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState("")


  //handlers
  const HandleSubmit = (e) => {
    e.preventDefault()
    let aux = [...persons]
    if (newName !== "" && newPhone !== "") {
      //if both imputs are not empty

      let found = aux.find((person) => person.name === newName)
      //find if the name is already in persons

      if (found === undefined) {
        //if is not, add the new element to persons and the filtered version  

        PhonebookService
          .create({
            "name": newName,
            "number": newPhone
          })
          .then((returned) => {
            aux.push(
              returned
            )
            setPersons(aux)
            SetFiltered(aux)
            setErrorGood(`Added '${newName}'`)
            setTimeout(() => { setErrorGood(null) }, 5000)
          })

        //here we clean up the imputs
        setNewName("")
        setNewPhone("")
      }
      else {
        //if it is show the alert
        let result = window.confirm(`${newName} is already added to the phonebook, do you want to replace it?`);
        if (result) {
          PhonebookService.update(found.id, {
            "name": newName,
            "number": newPhone
          })
          PhonebookService
            .getAll()
            .then(data => {
              setPersons(data)
              SetFiltered(data)
            })
        }
      }
    }
    else {
      window.confirm(`you need to fill both Name and Number fields`)
    }
  }

  const handleFilter = (a) => {
    setFilter(a)
    //save the keyword
    let aux = persons.filter((elem) => { return (elem.name.toLowerCase().includes(a.toLowerCase())) })
    //find if there is a match
    SetFiltered(aux)
    //saves the filtered result
  }

  const handleRemove = (id, name) => {
    let result = window.confirm(`do you want to delete ${name}?`);
    if (result) {
      PhonebookService.remove(id, setErrorBad, name)
      PhonebookService
        .getAll()
        .then(initialNotes => {
          setPersons(initialNotes)
          SetFiltered(initialNotes)
        })
      setTimeout(() => { setErrorBad(null) }, 5000)
    }

  }


  
  //useEffects
  useEffect(() => {
    PhonebookService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
        SetFiltered(initialNotes)
      })
  }, [])



  return (
    <div className="wrapper">

      <Title text="Phonebook." />

      <ControlledInput
        value={filter}
        onChange={handleFilter}
        label={"Filter shown with"}
      />

      <Title text="Add a new contact." />

      <Notification message={errorGood} classes="good" />
      <Notification message={errorBad} classes="bad" />

      <NewContact
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        HandleSubmit={HandleSubmit}
      />

      <Title text="Numbers." />

      <DisplayPhonebooks
        persons={filtered}
        remove={handleRemove}
      />

    </div>
  )
}

export default App