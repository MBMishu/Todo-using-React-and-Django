import React, { useState, useEffect } from "react";
import Axios from "axios";
import { domain, domain2, header } from "../../env/env";
import SingleTodo from "./SingleTodo";
import { alertService } from "../app/service";
import { Alert } from "../app/Alert";
import { useGlobalState } from "../../state/provider";

export const Todo = () => {
  const [{ profile }, dispatch] = useGlobalState();
  const [todos, setTodos] = useState(null);
  const [title, setTitle] = useState(null);
  const [complete, setComplete] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await Axios({
      method: "GET",
      url: `${domain}/task-list/`,
      headers: header,
    })
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const previousTodo = async () => {
    await Axios({
      method: "GET",
      url: todos?.previous,
      headers: header,
    })
      .then((response) => {
        // console.log(response.data.results);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const nextTodo = async () => {
    await Axios({
      method: "GET",
      url: todos?.next,
      headers: header,
    })
      .then((response) => {
        // console.log(response.data.results);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteData = (id) => {
    console.log(id);
    Axios({
      method: "DELETE",
      url: `${domain}/task-delete/${id}/`,
      headers: header,
    })
      .then((response) => {
        getData();
        alertService.error("You have deleted successfully!!", {
          id: "left-alert",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addData = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      url: `${domain}/task-create/`,
      headers: header,
      data: {
        title: title,
        task_completed: false,
        username: profile.prouser,
      },
    })
      .then((response) => {
        alertService.success(response.data["msg"], {
          id: "left-alert",
        });

        getData();
        setTitle("");
      })
      .catch((error) => {
        alertService.error("Try Again!", {
          id: "left-alert",
        });
      });
  };

  const updateData = (id, title, task_completed) => {
    let completed;
    if (task_completed) {
      completed = false;
    } else {
      completed = true;
    }
    Axios({
      method: "Post",
      url: `${domain}/task-update/${id}/`,
      headers: header,
      data: {
        title: title,
        task_completed: completed,
      },
    })
      .then((response) => {
        getData();
        alertService.success(response.data["msg"], {
          id: "left-alert",
        });
      })
      .catch((error) => {
        // console.log();
      });
  };

  return (
    <>
      <div className="container mt-4">
        <Alert id="left-alert" />

        <div className="row">
          <div className="col-lg-5 col-md-5 my-auto mx-auto">
            {/* add data */}
            <h2 className="text-center">Add Todo in list</h2>
            <form onSubmit={addData}>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text">Title</span>
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="todo title"
                  className="form-control"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  required
                />
              </div>
              <div className="d-flex justify-content-center mt-3 mb-3 login_container">
                <button className="btn btn-primary" type="submit">
                  Add todo
                </button>
              </div>
            </form>
          </div>
          {/* show my data */}
          <div className="col-lg-6 col-md-6">
            <h2 className="text-center">My Task List</h2>
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Completed</th>
                  <th scope="col">Details</th>
                  <th scope="col">Deleted</th>
                </tr>
              </thead>
              <tbody>
                {todos !== null &&
                  todos.results?.map((item, i) => {
                    return (
                      <>
                        <SingleTodo
                          item={item}
                          key={item.id}
                          serial={i}
                          deleteData={deleteData}
                          updateData={updateData}
                        />
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end">
            <li class="page-item">
              {todos?.previous !== null ? (
                <button onClick={previousTodo} class="page-link" tabindex="-1">
                  Previous
                </button>
              ) : (
                <button class="page-link" tabindex="-1" disabled>
                  Previous
                </button>
              )}
            </li>

            <li class="page-item">
              {todos?.next !== null ? (
                <button onClick={nextTodo} class="page-link">
                  Next
                </button>
              ) : (
                <button class="page-link" disabled>
                  Next
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Todo;
