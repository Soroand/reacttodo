import React from "react";
import "./todos.css";
import { TiEdit } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";

const ToDos = ({ todos, deleteToDo, editTodo, classAdd, editing }) => {
	return (
		<div className='list'>
			<h1>ToDo List</h1>
			{todos.map((item) => {
				const { value, id, strike } = item;
				return (
					<div className='todos' key={id}>
						{<TiEdit className='edit-icon' onClick={() => editing(id)} />}
						<p
							className={strike ? "strike" : null}
							onClick={() => classAdd(id)}>
							{value}
						</p>
						<AiOutlineDelete
							className='delete-icon'
							onClick={() => deleteToDo(id)}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default ToDos;
