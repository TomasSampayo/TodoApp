import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Delete } from "../Components/Delete";
import { EditForm } from "../Components/EditForm";
import { Button, Card } from "react-bootstrap";
import "../styles/TodoPage.css";
export const Todo = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((res) => setTodo(res));
  }, [id]);

  const editHandler = () => {
    setEdit(!edit);
  };

  return (
    <div className="container">
      <div>
        {todo.length > 0 ? (
          todo.map((data) => (
            <div>
              <div className="cardContainer" key={data.id}>
                <Card
                  className="shadow-lg p-3 mb-5  rounded text-center "
                  style={{ width: "18rem" }}
                >
                  <Card.Body>
                    <Card.Title className="postTitle text-white">
                      {data.title}
                    </Card.Title>
                    <Card.Text className="text-white">{data.post}</Card.Text>
                    <div className="row justify-content-around">
                      <Button onClick={editHandler} variant="primary sm-6">
                        Edit
                      </Button>

                      <Delete id={id} />
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <Link
                to="/"
                className="backToTodos text-white d-flex justify-content-center"
              >
                Back To Todos
              </Link>
            </div>
          ))
        ) : (
          <div>
            <p>Couldn't fetch data</p>
          </div>
        )}
        {edit ? (
          <div>
            <EditForm id={id} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
