import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import './TodoListBrowser.css';

function TodoListBrowser() {
    // This component will allow you to navigate between different todo lists

    const [currentTodoListName, setCurrentTodoListName] = useState(''); // This will be the name of the todo list that is currently being viewed
    const [todoListNames, setTodoListNames] = useState([]); // This will be a list of all the todo list names
    const [newTodoListName, setNewTodoListName] = useState(''); // This will be the name of the new todo list that is being created
    const [navMenuIsOpen, setNavMenuIsOpen] = useState(false); // This will be a boolean that determines whether the navigation menu is open or not


    useEffect(() => {
        const storedTodoListNames = window.localStorage.getItem('todoListNames');
        const storedCurrentTodoListName = window.localStorage.getItem('currentTodoListName');

        if (storedTodoListNames) {
            const parsedNames = JSON.parse(storedTodoListNames);
            setTodoListNames(parsedNames);

            if (storedCurrentTodoListName) {
                setCurrentTodoListName(storedCurrentTodoListName);
            } else if (parsedNames.length > 0) {
                setCurrentTodoListName(parsedNames[0]);
            }
        }
        else {
            updateTodoListNames(['To-do List']);
            setCurrentTodoListName('To-do List');
        }

    }, []);


    const updateTodoListNames = (updatedTodoListNames) => {
        setTodoListNames(updatedTodoListNames);
        window.localStorage.setItem('todoListNames', JSON.stringify(updatedTodoListNames));
    };

    const addNewTodoList = (event) => {
        event.preventDefault();
        if (newTodoListName === '' || todoListNames.includes(newTodoListName)) {
            return;
        }
        const updatedTodoListNames = [...todoListNames, newTodoListName];
        setTodoListNames(updatedTodoListNames);
        window.localStorage.setItem('todoListNames', JSON.stringify(updatedTodoListNames));
        setNewTodoListName('');
    };

    const renameTodoList = (todoListName) => {
        const newName = window.prompt('Enter new name for to-do list');
        if (newName === null || newName === '' || todoListNames.includes(newName)) {
            return;
        }

        const todoListContents = window.localStorage.getItem(todoListName);
        if (todoListContents) {
            window.localStorage.setItem(newName, todoListContents);
        }

        window.localStorage.removeItem(todoListName);

        const updatedTodoListNames = todoListNames.map(name => name === todoListName ? newName : name);
        updateTodoListNames(updatedTodoListNames);
        changeTodoList(newName);
    }

    const changeTodoList = (todoListName) => {
        setCurrentTodoListName(todoListName);
        window.localStorage.setItem('currentTodoListName', todoListName);
    };

    const deleteTodoList = (todoListName) => {
        const listToDelete = todoListName;
        let updatedTodoListNames = todoListNames.filter(todoListName => todoListName !== listToDelete);
        if (listToDelete === currentTodoListName) {
            if (updatedTodoListNames.length === 0) {
                window.alert('You must have at least one to-do list');
                return;
            }


        }
        window.localStorage.removeItem(listToDelete);
        updateTodoListNames(updatedTodoListNames);
        changeTodoList(updatedTodoListNames[0]);
    };

    const duplicateTodoList = (todoListName) => {
        const newListName = todoListName + ' (copy)';
        if (todoListNames.includes(newListName)) {
            return;
        };

        let todoListContents = window.localStorage.getItem(todoListName);
        if (!todoListContents) {
            todoListContents = '[]';
        }
        window.localStorage.setItem(newListName, todoListContents);

        const updatedTodoListNames = [...todoListNames, newListName];
        updateTodoListNames(updatedTodoListNames);
    };



    return (
        <div id='to-do-main'>
            <button className={navMenuIsOpen === true ? "hamburger open" : "hamburger"} type="button" aria-label="Menu" aria-controls="navigation" onClick={() => setNavMenuIsOpen(!navMenuIsOpen)}>
                ↦
            </button>
            <nav id="to-do-list-browser" className={navMenuIsOpen === true ? "open" : ""}>


                <ul className={navMenuIsOpen === true ? "open" : ""}>
                    <li>
                        <label htmlFor="new-todo-list-name">Create New List:</label>
                        <input type="text" id="new-todo-list-name" value={newTodoListName} onChange={(event) => setNewTodoListName(event.target.value)} />
                        <button type="submit" onClick={addNewTodoList}>Create</button>
                    </li>
                    {todoListNames.map(todoListName =>
                        <li key={todoListName}>
                            <button onClick={() => changeTodoList(todoListName)}>{todoListName}</button>
                            <div className='button-group'>
                                <button onClick={() => renameTodoList(todoListName)}>Rename</button>
                                <button onClick={() => deleteTodoList(todoListName)}>Delete</button>
                                <button onClick={() => duplicateTodoList(todoListName)}>Copy</button>
                            </div>
                        </li>)
                    }
                </ul>


            </nav>
            <TodoList todoListName={currentTodoListName} />
        </div>
    )

}

export default TodoListBrowser;