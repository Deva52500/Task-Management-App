import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'

const AddTask = ({currentTask, fetchTasks, setShowForm, setCurrentTask}) => {
    const [title,setTitle]= useState('')
    const [description,setDescription]= useState('')
    const [completed,setCompleted]= useState('no')
    const navigate= useNavigate()

    useEffect(()=>{
      if(currentTask){
        setTitle(currentTask.title)
        setDescription(currentTask.description)
        setCompleted(currentTask.completed)
      }
    },[currentTask])


    const onSubmit = async (e) =>{
      e.preventDefault()
      if (currentTask){
        editTask(currentTask._id, title, description, completed)

      }else{
        addTask()
      }
    }

    const editTask = async (id, title, description, completed) => {
      try{
        const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, 
            {title,description,completed},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        if (response.data.success){
            setTitle('')
            setDescription('')
            setCompleted('no');
            fetchTasks();
            setShowForm(false);
            setCurrentTask(null);
            navigate('/')
        }
    }catch(error){
        console.log(error)
    }

  }

    const addTask = async() =>{
        try{
                const response = await axios.post('http://localhost:5000/api/tasks', 
                    {title,description,completed},{
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                if (response.data.success){
                    setTitle('')
                    setDescription('')
                    setCompleted('no');
                    fetchTasks();
                    setShowForm(false);
                    setCurrentTask(null);
                    navigate('/')
                }
            }catch(error){
                console.log(error)
            }
    };

  return (
    <div className="card p-4" style={{ maxWidth: '400px', marginTop: '80px' }}>
      <h4 className="mb-3">{currentTask ?"Edit Task": "Add Task"}</h4>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={title} placeholder="Enter title" onChange={(e)=>setTitle(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="3" value={description} placeholder="Enter description" onChange={(e)=>setDescription(e.target.value)}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="completed" className="form-label">Completed</label>
          <select className="form-select" id="completed" value={completed} 
            onChange={(e) => setCompleted(e.target.value)}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddTask;
