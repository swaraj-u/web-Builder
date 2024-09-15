import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Todo from "./todo";

const socket = io.connect("http://localhost:5000"); // connection with backend

function App() {
	return <Todo socket={socket} />;
}

export default App;
