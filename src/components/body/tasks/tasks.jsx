import { useContext, useState } from "react";
import styles from "./tasks.module.css"
import { TaskOptionContext, TasksContext } from "../../../context";
import trash from "../../../images/trash.svg"


export const Tasks = ({updateView, setUpdateViewState}) => {
    const taskInfo = useContext(TasksContext);
    const optionInfo = useContext(TaskOptionContext);
    let options = optionInfo[0]; // stopped in an attempt to add feature when the right click on the task opens an option to delete the task, stopped at using context to toggle the cases when the option should be shown and hidden: should be hidden when user clicks away from the task or right clicks again.
    const tasks = taskInfo[0];

    const [checkedState, setCheckedState] = useState(
        tasks.map((elem, ind) => elem.state === "done")
    );
    
    function handleCheckChange(index)
    {
        const updatedCheckState = checkedState.map((elem, ind) =>
            ind === index ? !elem : elem
        )

        updatedCheckState.map((elem, ind) => 
            {
                if (elem && !tasks[ind].state.includes("trash"))
                {
                    tasks[ind].state = "done";
                }
                else if (!tasks[ind].state.includes("trash")) 
                {
                    tasks[ind].state = "todo";
                }
            }
        )

        console.log("tasks.jsx");
        taskInfo[1](tasks);
        setCheckedState(updatedCheckState);
    }

    function moveToTrash(index)
    {
        tasks[index].state = tasks[index].state + "trash";
        taskInfo[1](tasks);
        setUpdateViewState(!updateView);
    }

    function showOptions(e, index)
    {
        e.preventDefault();
        for (let i = 0; i < options.length; i++)
        {
            if (i !== index)
            {
                options[i] = false;
            }
        }
        options[index] = !options[index];
        console.log(options);
        if (e.button === 2)
        {
            optionInfo[1](options);
            setUpdateViewState(!updateView);
        }
    }

    return (
    <ul className={styles.tasks}>
        {
            tasks.map((elem, ind) => 
            {
                console.log(elem);
                return elem.state === "todo" &&
                <li key={ind}>
                    <div className={styles.task} onContextMenu={(e) => showOptions(e, ind)}>
                        <label className={checkedState[ind] ? styles.checked : null}>
                            <input type="checkbox" checked={checkedState[ind]} onChange={() => setTimeout(() => handleCheckChange(ind), 0)} />
                            {elem.taskName}
                        </label>

                        {
                            options[ind] &&
                            <div className={styles.taskOptions} onClick={() => moveToTrash(ind)}>
                                <img src={trash} alt="" />
                                <p>Move to Trash</p>
                            </div>
                        }
                    </div>
                </li>
            })
        }
   </ul>
  );
}