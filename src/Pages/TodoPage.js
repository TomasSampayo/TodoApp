import React, { useState, useEffect } from "react";
import { TodoForm } from "../Components/TodoForm";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/TodoPage.css";
import { CardColumns, Card } from "react-bootstrap";

export const TodoPage = () => {
  const [todo, setTodo] = useState([]);
  const [addTodoTitle, setAddTodoTitle] = useState("");
  const [addTodoPost, setAddTodoPost] = useState("");
  useEffect(() => {
    getTodos();
  }, [todo]);

  const handleTitleChange = (inputValue) => {
    setAddTodoTitle(inputValue);
  };
  const handlePostChange = (inputValue) => {
    setAddTodoPost(inputValue);
  };

  const handleFormSubmit = () => {
    fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({
        title: addTodoTitle,
        post: addTodoPost,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((message) => console.log(message));
    setAddTodoPost("");
    getTodos();
  };

  const getTodos = () => {
    fetch("/api")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setTodo(data));
  };
  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const title = {
    "text-transform": "capitalize",
  };

  return (
    <>
      <h1 className="display-1">Todo By Tom</h1>
      <div className="form">
        <TodoForm
          userInputTitle={addTodoTitle}
          userInputPost={addTodoPost}
          onTitleChange={handleTitleChange}
          onPostChange={handlePostChange}
          onFormSubmit={handleFormSubmit}
        />
      </div>
      <div className="container">
        <CardColumns className="cardColumns">
          <ul>
            {todo.map((todo) => {
              return (
                <div key={todo.id} className="fullCard">
                  <Card className="shadow-lg p-3 mb-5  rounded ">
                    <Link to={`${todo.id}`} style={linkStyle}>
                      <Card.Body className="text-center">
                        <Card.Title style={title}>{todo.title}</Card.Title>
                        <Card.Text classname="postText">{todo.post}</Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                </div>
              );
            })}
          </ul>
        </CardColumns>
      </div>
    </>
  );
};
