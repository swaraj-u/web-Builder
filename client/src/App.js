import './App.css';
import { useEffect, useState } from "react"; 
import io from 'socket.io-client'; 
const socket = io.connect("http://localhost:5000"); // connection with backend

function App() {

  const [task, setTask] = useState("");
  const [taskReceived, setTaskReceived] = useState("");
 
  const addTask = () => {
    socket.emit("addTask", {task})
  };

  useEffect(() => {
    socket.on("receiveTask", (data) => {
      setTaskReceived(data.task);
    })
  }, [socket]);
  return (
    <div className="App">
      <input placeholder="Task" onChange={(event) => {
        setTask(event.target.value);
      }} />
      <button onClick={addTask}>Add Task</button>
      <h1>Task</h1>
      {taskReceived}
    </div>
  );
}

export default App;
