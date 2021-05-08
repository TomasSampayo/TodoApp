import React, { useState } from "react";
import "../styles/TodoPage.css";
import { Button, Card, Form } from "react-bootstrap";

export const EditForm = ({ id }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoPost, setTodoPost] = useState("");
  const handleTodoTitle = (event) => {
    setTodoTitle(event.target.value);
  };
  const handleTodoPost = (event) => {
    setTodoPost(event.target.value);
  };

  const handleSubmit = () => {
    fetch(`api/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: todoTitle, post: todoPost }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((message) => console.log(message));
  };
  return (
    <div>
      <Card className="text-center shadow-lg p-3 mb-5  rounded ">
        <Card.Body>
          <Card.Title className="text-white">Edit Todo</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text-white">Title</Form.Label>
              <Form.Control
                type="text"
                value={todoTitle}
                onChange={handleTodoTitle}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text-white">Post</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={todoPost}
                onChange={handleTodoPost}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
