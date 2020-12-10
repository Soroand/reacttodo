import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import Field from "./components/field/field";
import ToDos from "./components/todos/todos";
import uuid from "react-uuid";
import "./App.css";
const getLocalStorage = () => {
	let list = localStorage.getItem("list");
	if (list) {
		return JSON.parse(localStorage.getItem("list"));
	} else {
		return [];
	}
};
function App() {
	const [value, setValue] = useState("");
	const [todos, setTodos] = useState(getLocalStorage());
	const [isEditing, setIsEditing] = useState(false);
	const [id, setId] = useState(uuid());
	const [editId, setEditId] = useState(false);

	useEffect(() => {
		todos.map((item) => {
			localStorage.setItem("Value", item.value);
			localStorage.setItem("Id", item.id);
		});
	});

	const inputValue = (event) => {
		setValue(event.target.value);
	};
	function submitTodo(e) {
		e.preventDefault();
		if (value && isEditing) {
			setTodos(
				todos.map((item) => {
					if (item.id === editId) {
						return { ...item, value: value };
					}
					return item;
				})
			);
			setValue("");
			setIsEditing(false);
			setEditId(null);
		} else if (value) {
			const newItem = {
				value: value,
				id: id,
				strike: false,
			};
			setTodos([...todos, newItem]);
			setId(uuid());
			setValue("");
		} else {
			return alert("Field cannot be empty!");
		}
	}
	const classAdd = (id) => {
		setTodos(
			todos.map((item) => {
				if (item.id === id) {
					return { ...item, strike: !item.strike };
				}
				return item;
			})
		);
	};

	const editing = (id) => {
		const editingItem = todos.find((item) => item.id === id);
		setValue(editingItem.value);
		setIsEditing(true);
		setEditId(id);
	};
	function deleteToDo(id) {
		const newToDo = todos.filter((item) => {
			return item.id != id;
		});
		setTodos(newToDo);
	}
	useEffect(() => {
		localStorage.setItem("list", JSON.stringify(todos));
	}, [todos]);
	return (
		<div className='App'>
			<div className='wrapper'>
				<Field inputValue={inputValue} submitTodo={submitTodo} value={value} />
				<ToDos
					todos={todos}
					deleteToDo={deleteToDo}
					classAdd={classAdd}
					editing={editing}
				/>
			</div>
		</div>
	);
}

export default App;
