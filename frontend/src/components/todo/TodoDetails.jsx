import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { domain, domain2, header } from "../../env/env";

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    getSIngleData();
  }, []);

  const getSIngleData = async () => {
    await Axios({
      method: "GET",
      url: `${domain}/task-list-Details/${id}/`,
      headers: header,
    })
      .then((response) => {
        console.log(response.data);
        setTodo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mt-5">
        {todo !== null && (
          <>
            <p>Title name - {todo?.title}</p>
            <p>
              Completed - {todo.completed ? "is completd" : "is not completed"}
            </p>
            <p>Username - {todo.username?.name}</p>
          </>
        )}
      </div>
    </>
  );
};

export default TodoDetails;
