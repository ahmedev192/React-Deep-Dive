import { useState } from "react";

export default function Login() {
  const [enteredValues, setEnteredValues]=useState({ 
    email: "",
    password:""
  });
  
  const [didEdit, setDidEdit]=useState({
    email: false,
    password: false
  })

  function handleSubmit(event)
  { 
    event.preventDefault();
    console.log("Submitted!")
    console.log("Email"+enteredValues.email);
    console.log("Password"+enteredValues.password);
  }
  function handleInputChange(identifier,event)
  {
    setEnteredValues((prevValues)=>({
      ...prevValues,
      [identifier]:event.target.value
    }))
    setDidEdit(prevValues=>(
      {
        ...prevValues,
        [identifier]:false
      }
    ))
  }
  function handleInputBlur(identifier)
  {
    setDidEdit((prev)=>
    ({
      ...prev,
      [identifier]:true
    }))
  }
  // const inputIsValid= enteredValues.email!=="" && !enteredValues.email.includes("@")  ...validating on keystrokes
  const inputIsValid= didEdit.email && !enteredValues.email.includes("@")
  return ( 
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" onBlur={()=>handleInputBlur("email")}onChange={(event)=>handleInputChange("email",event)} value={enteredValues.email}/>
          <div className="control-error">{inputIsValid && <p>Please enter a valid email.</p>}</div>
        </div>
        
        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={(event)=>handleInputChange("password",event)} value={enteredValues.password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
