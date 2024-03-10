import { useContext, useState } from "react";
import styles from "./navbar.module.css"
import { TabsContext } from "../../../context";

export const Navbar = () => 
{
    let tabFunction = useContext(TabsContext)[1];
    const [visible, setVisibleState] = useState(false);

    function showAddTask()
    {
        setVisibleState(!visible);
    }

    return (
        <ul className={styles.navbar}>
            <div className={styles.left}>
                <li onClick={() => tabFunction("todo")}>To Do</li>
                <li onClick={() => tabFunction("done")}>Done</li>
                <li onClick={() => tabFunction("trash")}>Trash</li>
            </div>
        </ul>
    );
}