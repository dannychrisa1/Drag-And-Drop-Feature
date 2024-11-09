import { useState } from "react";
import { Tag } from "./Tag";  // Ensure Tag is defined correctly
import { TagContent } from "./Tag";
import React from "react";

export type TaskData = {
    task: string;
    status: "todo" | "doing" | "done";
    tags: Tag[];
};

export type TaskFormProps = {
    setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>;
};

export const TaskForm: React.FC<TaskFormProps> = ({ setTasks }) => {
    const [taskData, setTaskData] = useState<TaskData>({
        task: "",
        status: "todo",
        tags: [],
    });

    const checkTag = (tag: Tag) => {
        return taskData.tags.some((item) => item.text === tag.text);
    };

    const selectTag = (tag: Tag) => {
        setTaskData((prev) => {
            const isSelected = prev.tags.some((item) => item.text === tag.text);
            const newTags = isSelected
                ? prev.tags.filter((item) => item.text !== tag.text)
                : [...prev.tags, tag];
            return { ...prev, tags: newTags };
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTasks((prevTasks) => {
            const tasksArray = Array.isArray(prevTasks) ? prevTasks : [];
            return [...tasksArray, taskData];
        });
        setTaskData({ task: "", status: "todo", tags: [] });
    };

    return (
        <div className="taskForm mt-4 mb-8 lg:mx-auto w-[50%]">
            <header className="app_header">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="task"
                        value={taskData.task}
                        className="task_input w-full rounded-full border outline-0 border-blue-200 px-3 py-3"
                        placeholder="Enter your task"
                        onChange={handleChange}
                    />
                    <div className="task_form_bottom_line mb-4 lg:flex gap-4 mt-6">
                        <div className="flex gap-3 mb-4 lg:mb-0">
                            <TagContent tagName="HTML" selectTag={selectTag} selected={checkTag({ text: "HTML" })} />
                            <TagContent tagName="CSS" selectTag={selectTag} selected={checkTag({ text: "CSS" })} />
                            <TagContent tagName="JavaScript" selectTag={selectTag} selected={checkTag({ text: "JavaScript" })} />
                            <TagContent tagName="React" selectTag={selectTag} selected={checkTag({ text: "React" })} />
                        </div>
                        <div className="flex items-center gap-4">
                            <select
                                name="status"
                                value={taskData.status}
                                className="task_status"
                                onChange={handleChange}
                            >
                                <option value="todo">To do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                            <button type="submit" className="task_submit text-xs lg:text-sm text-white bg-red-600 rounded-lg p-2">
                                + Add Task
                            </button>
                        </div>
                    </div>
                </form>
            </header>
        </div>
    );
};
