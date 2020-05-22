import React from "react"

const ControlledInput = ({ value, onChange, label }) => {
    return (
      <div>
        <div className="bigly" >
          {label}:
        </div>
        <div style={{ display: "inline-block" }}>
          <input value={value} onChange={(e) => { onChange(e.target.value) }} />
        </div>
      </div>
    )
  }

export default ControlledInput