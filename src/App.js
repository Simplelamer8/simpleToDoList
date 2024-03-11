import { createContext, useState } from 'react';
import './App.css';
import { Body } from './components/body/body';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { TabsContext, TasksContext } from './context';
import { TaskOptionContext } from './context';

function App() {
  let tasks = localStorage.getItem("tasks");
  if (tasks === null || typeof tasks !== "undefined")
  {
    tasks = [{state: "todo", taskName:"This is your firs task :)"}];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  else
  {
    tasks = JSON.parse(tasks);
  }
  const [options, setOptionsState] = useState(new Array(tasks.length).fill(false));

  function updateTasks(newTasks)
  {
    console.log('updating tasks...', newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  const [updateView, setUpdateViewState] = useState(false);

  const [tab, setTabState] = useState("todo");
  return (
    <div className="App" onClick={
        (e) => {
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL')
          {
            return;
          }
          for (let i = 0; i < options.length; i++)
          {
              options[i] = false;
          }
          setOptionsState(options);
          console.log("App.js");
          setUpdateViewState(!updateView);
        }
      }>
      <TabsContext.Provider value={[tab, setTabState]}>
        <TasksContext.Provider value={[tasks, updateTasks]}>
          <TaskOptionContext.Provider value={[options, setOptionsState]}>
        
            <Header updateView={updateView} setUpdateViewState={setUpdateViewState}></Header>
            <Body updateView={updateView} setUpdateViewState={setUpdateViewState}></Body>
            <Footer></Footer>

          </TaskOptionContext.Provider>
        </TasksContext.Provider>
      </TabsContext.Provider>
    </div>
  );
}

export default App;
