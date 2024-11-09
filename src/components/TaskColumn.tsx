// import Todo from "../assets/direct-hit.png";

import React from "react";
import { DropArea } from "./DropArea";
import TaskCard from "./TaskCard";
import { TaskData } from "./TaskForm";

type taskColumnProps = {
    title: string
    icon: string
    tasks: TaskData[],
    status: "todo" | "doing" | "done";
    handleDelete: (taskIndex: number) => void
    setActiveCard: React.Dispatch<React.SetStateAction<null>>
    onDrop: (status:any, index:number) => void
}

const TaskColumn = ({ title, icon, tasks, status, handleDelete, setActiveCard, onDrop }: taskColumnProps) => {

    const validTasks = Array.isArray(tasks) ? tasks : [];

    return (
        <section className='task_column'>
            <h2 className='task_column_heading flex items-center gap-3 font-bold'>
                <img className='task_column_icon' src={icon} alt='' width={20} height={20} />
                {title}
            </h2>

            <DropArea onDrop={() => onDrop(status, 0 )} />

            {validTasks.map(
                (task, index) =>
                    task.status === status && (
                        <React.Fragment key={index}>
                            <TaskCard
                                key={index}
                                title={task.task}
                                tags={task.tags}
                                handleDelete={() => handleDelete(index)}
                                index={index}
                                setActiveCard={setActiveCard}
                            />
                            <DropArea onDrop={() => onDrop(status, index + 1 )} />
                        </React.Fragment>
                    )
            )}
        </section>
    );
};

export default TaskColumn;
