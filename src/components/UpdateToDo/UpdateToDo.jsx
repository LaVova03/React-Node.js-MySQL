import './UpdateToDo.css';

const UpdateToDo = ({ updatedValue, setUpdate, setUpdateVelue, updateData, updateId, setUpdateId }) => {

    const HandleClick = () => {
        setUpdate(false);
        updateData(updateId);
        setUpdateId('');
        setUpdateVelue('');
    }

    const handleInputChange = (event) => {
        event.preventDefault();
        setUpdateVelue(event.target.value);
    }

    return (
        <div className='UpdateToDo'>
            <label>UpdateToDo</label><br /><br />
            <input type="text" value={updatedValue} onChange={handleInputChange} />
            <button onClick={HandleClick}>Update</button>
        </div>
    )
}

export default UpdateToDo;