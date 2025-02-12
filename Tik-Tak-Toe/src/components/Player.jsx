import { useState } from "react";

export default function Player({name, symbol, isActive, onChangeName})
{   
    const [isEditing, setIsEditing]=useState(false);
    const [Player_Name, setPlayer_Name]=useState(name);
    let playerName= <span className="player-name">{Player_Name}</span>;
    if(isEditing)
    {
       playerName= <input type="text" value={Player_Name} onChange={handleChange} required/>
    }
    function handleChange(event)
    {
     setPlayer_Name(event.target.value);
    }
    function handleClick()
    {
    setIsEditing((editing)=>!editing);
    if(isEditing)
    {
        onChangeName(symbol,Player_Name)
    }
    }
    return (
        <li className={(isActive)? "active": undefined} >
        <span className="player">
        {playerName}
       
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{(isEditing)? "Save":"Edit"}</button>
       </li>
    );

}
