import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import AddTask from '../components/AddTask'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar';
const HomePage = () => {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState([] )
    const [currentTask, setCurrentTask] = useState(null);
    const [filter, setFilter] = useState('all')
    

    const toggleForm = () => {
        if (showForm) {
            setCurrentTask(null);
        }
        setShowForm(!showForm);
    };

  const fetchTasks = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/tasks', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                }
            });
            setTasks(data.tasks); 
        } catch (error) {
            console.log('Error fetching tasks:', error);
        }
    };
    

  useEffect(() => {
    fetchTasks();
}, []);

  const editTask = (task) => {
    setCurrentTask(task)
    setShowForm(true)
  }

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.log('Error deleting task:', error);
    }
  };

  return (
    <div>
    <NavBar/>
    <div className="container py-5">    
    
      <button
        className="btn btn-primary position-absolute"
        style={{ top: '120px', left: '20px' }}
        onClick={toggleForm}
      >
        {showForm ? 'Close' : 'Add Task'}
      </button>

      {showForm && <AddTask currentTask={currentTask} fetchTasks={fetchTasks} setShowForm={setShowForm} setCurrentTask={setCurrentTask}/>}
    </div>
    <div className="mb-3">
        <label htmlFor="filter" className="form-label position-absolute" style={{ top: '125px', right: '300px' }}>Filter Tasks:</label>
        <select
            id="filter"
            className="form-select position-absolute"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ maxWidth: '250px', top: '120px', right: '20px' }}
        >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
        </select>
    </div>
    <h2 style={{textAlign: 'center'}}>Tasks</h2>
        <ul className="list-group">
                {tasks.filter(task => {
                if (filter === 'all') return true;
                if (filter === 'completed') return task.completed === true;
                if (filter === 'incomplete') return task.completed === false;
                return true;
            })
            .map(task => (
                <li key={task._id} className="list-group-item">
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
                <div>
                    <FontAwesomeIcon
                    icon={faEdit}
                    className="text-primary me-3"
                    style={{ cursor: 'pointer' }}
                    onClick={() => editTask(task)}
                    />
                    <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteTask(task._id)} 
                    />
                </div>
                </li>
            ))}
        </ul>
    </div> 
  )
}

export default HomePage
