import { useState } from "react";

export default function Player({initalName,symbol,isActive,onChangeName}) {

const [name, setPlayerName] = useState(initalName);
const [isEditing, setIsEditing] = useState(false);

function handleEditClick() {
        setIsEditing(editing=>!editing);
        if(isEditing){
        onChangeName(symbol,playerName);
        }
}
function handleChange(event){
    setPlayerName(event.target.value);
}
    
let playerName = <span className='player-name'>{name}</span>;
if(isEditing){
    playerName = <input type='text' required value ={name} onChange={handleChange}/>
}


    return(
        <li className={isActive ? 'active' : undefined}>
            <span id='player'>
                {playerName}                
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
            </li>
    );

}