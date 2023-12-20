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

    const HandleClose = (event) => {
        event.preventDefault();
        setUpdate(false);
    }

    return (
        <div className='UpdateToDo'>
            <button id='x-bt' onClick={HandleClose}>&#10006;</button><br />
            <label>UpdateToDo</label><br /><br />
            <input type="text" value={updatedValue} onChange={handleInputChange} />
            <button id='update__bt' onClick={HandleClick}>Update</button>
        </div>
    )
}

export default UpdateToDo;