import { useContext, useState } from "react";
import styles from "./trash.module.css"
import { TasksContext } from "../../../context";
import trash from "../../../images/trash.svg"
import moveBack from "../../../images/moveBack.svg"



export const Trash = ({updateView, setUpdateViewState}) => {
    const taskInfo = useContext(TasksContext);
    const tasks = taskInfo[0];

    const [checkedState, setCheckedState] = useState(
        tasks.map((elem, ind) => elem.state.includes("done"))
    );
    
    function handleCheckChange(index)
    {
        const updatedCheckState = checkedState.map((elem, ind) =>
            ind === index ? !elem : elem
        )

        setCheckedState(updatedCheckState);
    }

    function deleteTaskForever(index)
    {
        tasks.splice(index, 1);
        taskInfo[1](tasks);
        setUpdateViewState(!updateView);
    }

    function moveTaskBackToDo(index)
    {
        tasks[index].state = "todo";
        taskInfo[1](tasks);
        setUpdateViewState(!updateView);
    }

    return (
    <ul className={styles.tasks}>
        {
            tasks.map((elem, ind) => 
                elem.state.includes("trash") && 
                <li>
                    <div className={styles.task}>
                        <label className={checkedState[ind] ? styles.checked : null}>
                            <input type="checkbox" checked={checkedState[ind]} onChange={() => handleCheckChange(ind)} />
                            {elem.taskName}
                        </label>
                    </div>
                    <div className={styles.taskOptions}>
                        <ul>
                            <li onClick={() => deleteTaskForever(ind)}>
                                <img src={trash} alt=""/>
                                <p>Delete Forever</p>
                            </li>
                            <li onClick={() => moveTaskBackToDo(ind)}>
                                <img src={moveBack} alt="" />
                                <p>Move Back To To Do </p>
                            </li>
                        </ul>
                    </div>
                </li>
                )
        }
   </ul>
  );
}