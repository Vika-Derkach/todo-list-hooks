import React, { useEffect, useReducer, useState } from "react";
import { Context } from "./context";
import reducer from "./reducer";
import TodoList from "./TodoList";
export default function App() {
  // state = {
  //   todos: [
  //     {id: 1, title: 'First todo', completed: false},
  //     {id: 2, title: 'Second todo', completed: true},
  //   ]
  // }
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos"))
  );
  const [todoTitle, setTodoTitle] = useState("");
  // const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   const raw =  || [];
  //   setTodos(JSON.parse(raw));
  // }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const addTodo = (event) => {
    if (event.key === "Enter") {
      dispatch({
        type: "add",
        payload: todoTitle,
      });
      // setTodos([
      //   ...state,
      //   {
      //     id: Date.now(),
      //     title: todoTitle,
      //     completed: false,
      //   },
      // ]);
      setTodoTitle("");
    }
  };
  // const removeTodo = (id) => {
  //   setTodos(
  //     todos.filter((todos) => {
  //       return todos.id !== id;
  //     })
  //   );
  // };
  // const toggleTodo = (id) => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === id) {
  //         todo.completed = !todo.completed;
  //       }
  //       return todo;
  //     })
  //   );
  // };
  return (
    <Context.Provider
      value={{
        dispatch,
      }}
    >
      <div className="container">
        <h1>Todo app</h1>

        <div className="input-field">
          <input
            type="text"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
            onKeyPress={addTodo}
          />
          <label>Todo name</label>
        </div>

        <TodoList todos={state} />
      </div>
    </Context.Provider>
  );
}
