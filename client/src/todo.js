import {Row , Col,Title,Typography, Input} from 'antd';
import io from 'socket.io-client';
import { Grid } from 'antd';
import { useEffect, useState } from "react"; 
const Todo=({socket})=>{
const {Title} = Typography
  const screen = Grid.useBreakpoint();
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
    <div className="main">
    <div className="App">
      <Col xs={24} md={24}>
      <Row className='Rows' >
        <Title level={2} style={{color:"blue", margin:"1rem"}}>Task Manager</Title>
      </Row>
      <Row xs={12} md={12} className='Rows' gutter={12}>
        <Col xs={16} md={16} className='Cols'>
      <Input placeholder="Task" onChange={(event) => {
        setTask(event.target.value);
      }} />
      </Col>
      <Col xs={6} md={6} className='Cols'>
      <button onClick={addTask} style={{backgroundColor:"blue",
                                        height:"2rem",
                                        borderRadius:"5px",
                                        width:"100%"}}>
                                          Add Task
      </button>
      </Col>
     
      </Row>
      <Row className='todo'>
      {taskReceived}
      </Row>
      </Col>
    </div>
    </div>
  );
}

export default Todo;
