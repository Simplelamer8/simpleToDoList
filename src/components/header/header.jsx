import styles from "./header.module.css"
import { Navbar } from "./navbar/navbar";
import { useContext, useRef } from "react";
import { TabsContext, TasksContext } from "../../context";
import { useState } from "react";

export const Header = ({updateView, setUpdateViewState}) => 
{
    const taskInfo = useContext(TasksContext);
    let tabFunction = useContext(TabsContext)[1];
    const [visible, setVisibleState] = useState(false);

    const inputRef = useRef(null);

    function showAddTask()
    {
        setVisibleState(!visible);
    }

    function addNewTask(e)
    {
        console.log(e);
        if (e["code"] !== undefined && e.code !== "Enter")
        {
            return;
        }
        console.log(taskInfo[0]);
        let tasks = taskInfo[0];
        tasks.push({taskName:inputRef.current.value, state: "todo"});
        taskInfo[1](tasks);
        inputRef.current.value = "";
        setUpdateViewState(!updateView);
    }

    return (
        <main>
            <div className={styles.left}>
                <h1>Simple To Do List</h1>
                <p>Today is awesome day. The weather is awesome, you are awesome too!</p>
                <Navbar></Navbar>
            </div>
            <div className={styles.right}>
                {
                    visible && 
                    <div className={styles.addTask}>
                        <h5>Add New To Do</h5>
                        <input type="text" placeholder="Your text" ref={inputRef} onKeyDown={(e) => addNewTask(e)} />
                        <button onClick={(e) => addNewTask(e)}>Add</button>
                    </div>
                }
                <button onClick={() => showAddTask()}></button>
            </div>
        </main>
    );
}