import React from "react"
import ControlledInput from "./controledinput"


const NewContact = ({ newName, setNewName, newPhone, setNewPhone, HandleSubmit }) => {
    return (
      <form>
  
        <ControlledInput
          value={newName}
          onChange={setNewName}
          label={"Name"} />
  
        <ControlledInput
          value={newPhone}
          onChange={setNewPhone}
          label={"Number"} />
  
        <div
            >
          <button
            className="newcontact"
            onClick={(e) => { HandleSubmit(e) }}>
            add
            </button>
        </div>
  
      </form>
    )
  }

  export default NewContact