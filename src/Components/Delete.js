import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Delete = ({ id }) => {
  const history = useHistory();
  const deleteTodo = () => {
    fetch(`/api/${id}`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    history.push("/");
  };
  return (
    <div>
      <Link to="/">
        {" "}
        <Button onClick={deleteTodo}>Delete</Button>
      </Link>
    </div>
  );
};
