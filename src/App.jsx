
import React, { Component } from "react";
import "./App.css";

// Function Component
// Receives data and functions through props
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <span
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.done ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task.text}
      </span>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

// Class Component
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      tasks: []
    };
  }

  // Update input
  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  // Add task
  addTask = () => {
    const text = this.state.input.trim();

    // Prevent empty tasks
    if (text === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: text,
      done: false
    };

    this.setState({
      tasks: [...this.state.tasks, newTask],
      input: ""
    });
  };

  // Mark task as done or undo
  toggleTask = (id) => {
    this.setState({
      tasks: this.state.tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    });
  };

  // Delete task
  deleteTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter(
        (task) => task.id !== id
      )
    });
  };

  render() {
    const { input, tasks } = this.state;

    const completed = tasks.filter(
      (task) => task.done
    ).length;

    return (
      <div className="container">
        <h1>My To-Do List</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a task..."
            value={input}
            onChange={this.handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") this.addTask();
            }}
          />

          <button onClick={this.addTask}>
            Add
          </button>
        </div>

        <h3>
          {completed} of {tasks.length} tasks done
        </h3>

        <ul>
          {tasks.length === 0 ? (
            <p>No tasks yet. add one!</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={this.toggleTask}
                onDelete={this.deleteTask}
              />
            ))
          )}
        </ul>
      </div>
    );
  }
}

export default App;
