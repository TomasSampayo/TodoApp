import React from "react";
import "../styles/Form.css";
import { Button, Form, Card } from "react-bootstrap";
import "../styles/todoForm.css";

export const TodoForm = ({
  userInputTitle,
  userInputPost,
  onTitleChange,
  onPostChange,
  onFormSubmit,
}) => {
  const handleTodoTitle = (event) => {
    onTitleChange(event.target.value);
  };
  const handleTodoPost = (event) => {
    onPostChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit();
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Card
          className="shadow-lg p-3 mb-5  rounded"
          style={{ width: "18rem" }}
        >
          <Card.Body>
            <Card.Title className="title">New Todo</Card.Title>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label className="title">Title</Form.Label>
              <Form.Control
                className="titleForm"
                type="text"
                value={userInputTitle}
                onChange={handleTodoTitle}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="title">Content</Form.Label>
              <Form.Control
                type="text"
                className="postForm"
                value={userInputPost}
                onChange={handleTodoPost}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button
              className="submit-button"
              type="submit"
              variant="outline-primary"
            >
              Add Todo
            </Button>{" "}
          </Card.Body>
        </Card>
      </Form>
    </>
  );
};
