import React from "react";
import { Link } from "react-router-dom";

export const TodoCard = ({ title, id }) => {
  return (
    <div>
      <Link to={`${id}`}>
        <h3>{title}</h3>
      </Link>
    </div>
  );
};
