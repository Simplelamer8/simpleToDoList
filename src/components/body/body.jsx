import { useContext } from "react";
import styles from "./body.module.css"
import { Tasks } from "./tasks/tasks";
import { TabsContext } from "../../context";
import { Done } from "./done/done";
import { Trash } from "./trash/trash";

export const Body = ({updateView, setUpdateViewState}) => {
  const Tab = useContext(TabsContext)[0];
  if (Tab === "todo")
  {
    return (
        <body className={styles.body}>
            <div className={styles.tabName}>
                To Do
            </div>
          <Tasks updateView = {updateView} setUpdateViewState = {setUpdateViewState}></Tasks>
        </body>
    );
  }
  else if (Tab === "done")
  {
    return (
      <body className={styles.body}>
          <div className={styles.tabName}>
              Done
          </div>
          <Done updateView = {updateView} setUpdateViewState = {setUpdateViewState}></Done>
      </body>
  );
  }
  else 
  {
    return (
      <body className={styles.body}>
          <div className={styles.tabName}>
              Trash
          </div>
          <Trash updateView = {updateView} setUpdateViewState = {setUpdateViewState}></Trash>
      </body>
  );
  }
}