import { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList(props) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1); // -1 means no task is being edited

    useEffect(() => {
        const existingTasks = window.localStorage.getItem(props.todoListName);

        if (existingTasks) {
            setTasks(JSON.parse(existingTasks));
        } else {
            setTasks([]);
        }

    }, [props.todoListName]);

    useEffect(() => {
        if (props.todoListName.trim() === '') {
            return;
        }
        window.localStorage.setItem(props.todoListName, JSON.stringify(tasks));
    }, [props.todoListName, tasks]);

    const addNewTask = (taskDescription) => {
        console.log("Adding new task");
        console.log("New task: " + taskDescription);
        if (taskDescription.trim() === '') {
            return;
        }
        console.log("Updating tasks..");
        const newTask = { description: taskDescription, completed: false };
        setTasks(prevTasks => [...prevTasks, newTask]);
        console.log("Tasks updated");
        console.log("Tasks saved to local storage");
        setNewTask('');
    }

    const toggleTaskCompleted = (taskIndex) => {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
        setTasks(updatedTasks);
    }

    const deleteTask = (taskToDelete) => {
        const updatedTasks = tasks.filter(task => task !== taskToDelete);
        setTasks(updatedTasks);
    }

    const editTask = (taskIndex) => {

        if (editingIndex !== taskIndex) {
            setEditingIndex(taskIndex);
        } else {
            setEditingIndex(-1);
        }
    }

    const importTasks = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event) => {
            const importedTasks = event.target.result.split('\r\n');
            const newTasks = importedTasks.filter(task => task.trim() !== '').map(task => ({
                description: task,
                completed: false
            }));

            setTasks(prevTasks => [...prevTasks, ...newTasks]);

        }

    }

    const handleTaskChange = (event, taskIndex) => {
        event.preventDefault();
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].description = event.target.value;
        setTasks(updatedTasks);
    }

    const handleNewTaskCreation = (event, taskDescription) => {
        event.preventDefault();
        addNewTask(taskDescription);
    }

    const numberOfTasks = () => {
        return tasks.length;
    }

    const completedTasks = () => {
        return tasks.filter(task => task.completed).length;
    }


    const percentageComplete = () => {
        if (numberOfTasks() === 0) {
            return 0
        };
        return ((completedTasks() / numberOfTasks()) * 100).toFixed(0);
    }



    return (
        <div id='to-do-list'>
            <h1>{props.todoListName}</h1>
            <h2>Tasks</h2>
            <h3>Completed {completedTasks()} out of {numberOfTasks()}<br />{percentageComplete()}% Complete</h3>
            <label htmlFor="importTasks">Import tasks - (.txt file)</label>
            <input type='file' id='importTasks' onChange={event => importTasks(event)} />
            <form onSubmit={event => handleNewTaskCreation(event, newTask)} id='new-task-form'>
                <label htmlFor="newTask">New to-do:</label>
                <input type="text" id="newTask" value={newTask} onChange={event => setNewTask(event.target.value)} />
                <button type="submit">Add</button>
            </form>
            <ul>
                {tasks.map((task, index) => {
                    return <li key={index} className='list-item'>
                        <label className='checkbox-label'>
                            <input
                                type='checkbox'
                                checked={task.completed}
                                onChange={() => toggleTaskCompleted(index)}
                            />
                            <span className={task.completed === false ? 'checkbox' : 'checkbox-checked'}></span>
                        </label>
                        <input
                            className='task'
                            type='text'
                            value={task.description}
                            onChange={(event) => handleTaskChange(event, index)}
                            disabled={editingIndex !== index}
                        />
                        <button onClick={() => editTask(index)}>
                            {editingIndex === index ? 'Save' : 'Edit'}
                        </button>
                        <button onClick={() => deleteTask(task)}>Remove</button>
                    </li>
                })}
            </ul>
        </div>
    );

}

export default TodoList;