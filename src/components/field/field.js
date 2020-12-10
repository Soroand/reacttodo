import React, { useState } from "react";
import "./field.css";

const Field = ({ inputValue, submitTodo, value }) => {
	return (
		<form action='submit' onSubmit={submitTodo} className='form'>
			<h1>Enter Todo</h1>
			<div className='submit-area'>
				<input type='text' name='text' onChange={inputValue} value={value} />
				<button type='submit'>Submit</button>
			</div>
		</form>
	);
};

export default Field;
