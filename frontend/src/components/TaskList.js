import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get("/api/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  const addTask = () => {
    if (!title.trim()) return;
    axios.post("/api/tasks", { title })
      .then(() => {
        setTitle("");
        fetchTasks();
      });
  };

  const completeTask = (id) => {
    axios.put(`/api/tasks/${id}`)
      .then(fetchTasks);
  };

  return (
    <div className="task-container">
      <h2>Tasks</h2>
      <div className="task-input">
        <input
          type="text"
          value={title}
          placeholder="Enter new task"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span className={task.completed ? "done" : ""}>{task.title}</span>
            {!task.completed && (
              <button onClick={() => completeTask(task.id)}>Complete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
