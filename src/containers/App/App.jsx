import React, { useState, useEffect } from 'react';
import ToDoItem from '../../components/ToDoItem/ToDoItem/ToDoItem';
import axios from 'axios';
import './App.css';

function App() {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState('');
  const [updatedValue, setUpdateVelue] = useState('');

  useEffect(() => {
    fetchData();
    if (value) {
      postData();
    }
  }, [value]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:800/wokbase/todolist/');
      setTodo(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postData = async () => {
    try {
      await axios.post('http://localhost:800/wokbase/todolist/', { task: value });
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const updateData = async (id) => {
    try {
      await axios.put(`http://localhost:800/wokbase/todolist/${id}`, { task: updatedValue });
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:800/wokbase/todolist/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className='site__wrapper'>
      <ToDoItem todo={todo} setValue={setValue} deleteData={deleteData} updatedValue={updatedValue}
        setUpdateVelue={setUpdateVelue} updateData={updateData}/>
    </div>
  );
}

export default App;

