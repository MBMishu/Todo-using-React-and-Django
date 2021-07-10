import React from "react";
import { Link } from "react-router-dom";

const SingleTodo = (props) => {
  return (
    <>
      <tr>
        <th scope="row">{props.serial}</th>
        <td>{props.item.title}</td>

        <td>{props.item.task_completed ? "completed" : "not completed"}</td>
        <td>
          {/* <Link to={`/todo/${props.item.id}`}>
            <button className="btn btn-primary"> Update</button>
          </Link> */}
          <button
            className="btn btn-primary"
            onClick={() => {
              props.updateData(
                props.item.id,
                props.item.title,
                props.item.task_completed
              );
            }}
          >
            {" "}
            Update
          </button>
        </td>
        <td>
          <button
            className=" btn btn-danger"
            onClick={() => {
              props.deleteData(props.item.id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default SingleTodo;
