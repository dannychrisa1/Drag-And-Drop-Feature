import { useEffect, useState } from 'react';
import './App.css'
import { TaskData, TaskForm } from './components/TaskForm'
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import TaskColumn from './components/TaskColumn';

const oldTasks: any = localStorage.getItem("tasks")

function App() {

  const [tasks, setTasks] = useState<TaskData[] | []>(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex: number) => {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
  
    setTasks(newTasks.length > 0 ? newTasks : []); // Avoid null state

    console.log('deleted task')
};

const onDrop = (status:any, position:any ) => {
  console.log(`${activeCard} isx going to place into ${status} and at the position ${position}`)

  if(activeCard == null || activeCard === undefined )return
  
  const TaskToMove = tasks[activeCard]
  const updatedTasks = tasks.filter((task, index) =>  index !== activeCard)

  updatedTasks.splice(position, 0, {
    ...TaskToMove,
    status:status
  })

  setTasks(updatedTasks)

}

  return (
    <>
      <div className='mx-6'>
        <TaskForm setTasks={setTasks} />
        <main className="app_main flex flex-col md:flex-row justify-between">
          <TaskColumn
            title="To do"
            icon={todoIcon}
            tasks={tasks}
            status="todo"
            handleDelete={handleDelete}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
          <TaskColumn
            title="Doing"
            icon={doingIcon}
            tasks={tasks}
            status="doing"
            handleDelete={handleDelete}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
          <TaskColumn
            title="Done"
            icon={doneIcon}
            tasks={tasks}
            status="done"
            handleDelete={handleDelete}
            setActiveCard={setActiveCard}
            onDrop={onDrop}
          />
        </main>

        {/* <h1 className='text-2xl mt-4'>Active Card - {activeCard}</h1> */}
      </div>
    </>
  )
}

export default App
