import React, { useState } from "react";
import './ToDoItem.css';
import UpdateToDo from './../../UpdateToDo/UpdateToDo';

const ToDoItem = ({ todo, setValue, deleteData, updatedValue, setUpdateVelue, updateData }) => {

    const [inputValue, setInputVelue] = useState('');
    const [isUpdate, setUpdate] = useState(false);
    const [updateId, setUpdateId] = useState('');

    const HendleChange = (id) => {
        setUpdate(true);
        setUpdateId(id)
    }

    const addValue = (event) => {
        event.preventDefault();
        setValue(inputValue);
        setInputVelue('');
    }

    const handleInputChange = (event) => {
        event.preventDefault();
        setInputVelue(event.target.value);
    }


    return (
        <div className="toDoItem">
            <div>
                <input id='inputAdd' type="text" value={inputValue} onChange={handleInputChange} />
                <button id='buttonAdd' onClick={addValue}>Add ToDo</button>
            </div>
            <ul id="ulTask">
                {todo?.map((el, i) => {
                    return (
                        <li id='liItem' key={i}>Task {i + 1}: {el.task}
                            <div className="wrap">
                                <button id="deleteItem" onClick={() => { deleteData(el.id) }}>delete</button>
                                <button id="updateItem" onClick={() => { HendleChange(el.id) }}>update</button>
                                {isUpdate ? <UpdateToDo updatedValue={updatedValue} setUpdate={setUpdate}
                                    setUpdateVelue={setUpdateVelue} updateData={updateData} updateId={updateId}
                                    setUpdateId={setUpdateId} /> : null}
                            </div>
                        </li>

                    )
                })}
            </ul>
        </div>
    )
}

export default ToDoItem;