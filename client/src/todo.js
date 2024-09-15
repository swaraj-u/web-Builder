// import { Row, Col, Title, Typography, Input, Button, Card } from "antd";
// import { CheckCircleOutlined } from "@ant-design/icons";
// import io from "socket.io-client";
// import { Grid } from "antd";
// import { useEffect, useState } from "react";
// import Item from "antd/es/list/Item";
// const Todo = ({ socket }) => {
// 	const { Title } = Typography;
// 	const screen = Grid.useBreakpoint();
// 	const [task, setTask] = useState([]);
// 	const [taskList, setTaskList] = useState([]);

// 	const addTask = () => {
// 		socket.emit("addTask", { task });
// 		setTask("");
// 	};

// 	useEffect(() => {
// 		socket.on("allTasks", (tasks) => {
// 			setTaskList(tasks);
// 		});

// 		// Clean up when component unmounts
// 		return () => socket.off("allTasks");
// 	}, []);
// 	return (
// 		<div className="main">
// 			<div className="App">
// 				<Col xs={24} md={24}>
// 					<Row className="Rows">
// 						<Title level={2} style={{ color: "blue", margin: "1rem" }}>
// 							Task Manager
// 						</Title>
// 					</Row>
// 					<Row xs={12} md={12} className="Rows" gutter={12}>
// 						<Col xs={16} md={16} className="Cols">
// 							<Input
// 								placeholder="Task"
// 								onChange={(event) => {
// 									setTask(event.target.value);
// 								}}
// 							/>
// 						</Col>
// 						<Col xs={6} md={6} className="Cols">
// 							<Button
// 								onClick={addTask}
// 								style={{
// 									backgroundColor: "blue",
// 									height: "2rem",
// 									borderRadius: "5px",
// 									width: "100%",
// 								}}
// 							>
// 								Add Task
// 							</Button>
// 						</Col>
// 					</Row>
// 					<Row className="todo">
// 						<Col>
// 							{taskList.map((item) => (
// 								<Row span={24} key={item._id} gutter={12} justify={"space-between"}>
// 									<Col>{item.task}</Col>

// 									<Col>
// 										<Button
// 											// onClick={() => deleteTask(item._id)}
// 											style={{ width: "100%" }}
// 										>
// 											<CheckCircleOutlined />
// 										</Button>
// 									</Col>
// 								</Row> // Render task as string
// 							))}
// 						</Col>
// 					</Row>
// 				</Col>
// 			</div>
// 		</div>
// 	);
// };

// export default Todo;
import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Input, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Grid } from "antd";

const Todo = ({ socket }) => {
	const { Title } = Typography;
	const screen = Grid.useBreakpoint();
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	const addTask = () => {
		if (task.trim()) {
			socket.emit("addTask", { task });
			setTask("");
		}
	};

	useEffect(() => {
		socket.on("allTasks", (tasks) => {
			setTaskList(tasks);
		});

		// Clean up when component unmounts
		return () => socket.off("allTasks");
	}, [socket]);

	return (
		<div className="main">
			<div className="App">
				<Col xs={24} md={24}>
					<Row className="Rows">
						<Title level={2} style={{ color: "blue", margin: "1rem" }}>
							Task Manager
						</Title>
					</Row>
					<Row xs={12} md={12} className="Rows" gutter={12}>
						<Col xs={16} md={16} className="Cols">
							<Input
								placeholder="Task"
								value={task}
								onChange={(event) => setTask(event.target.value)}
							/>
						</Col>
						<Col xs={6} md={6} className="Cols">
							<Button
								onClick={addTask}
								style={{
									backgroundColor: "blue",
									height: "2rem",
									borderRadius: "5px",
									width: "100%",
								}}
							>
								Add Task
							</Button>
						</Col>
					</Row>
					<Row className="todo">
						<Col className="task-list-container">
							{" "}
							{/* Apply scrollable container */}
							{taskList.map((item) => (
								<Row span={24} key={item._id} gutter={12} justify={"space-between"}>
									<Col>{item.task}</Col>
									<Col>
										<Button
											// onClick={() => deleteTask(item._id)}
											style={{ width: "100%" }}
										>
											<CheckCircleOutlined />
										</Button>
									</Col>
								</Row>
							))}
						</Col>
					</Row>
				</Col>
			</div>
		</div>
	);
};

export default Todo;
