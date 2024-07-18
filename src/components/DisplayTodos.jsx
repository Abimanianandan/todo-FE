import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DisplayTodos = () => {
  const [todos, setTodos] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    fetchData();
  }, [deletedTodos]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://todos-be-1mpn.onrender.com/api/todos/allTodos"
      );
      setTodos(response.data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://todos-be-1mpn.onrender.com/api/todos/${id}`);
      setDeletedTodos((preData) => preData.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://todos-be-1mpn.onrender.com/api/todos/create",
        newTodo
      );
      alert("Todo created successfully")
      setTodos(response.data.todos);
      setNewTodo({ title: "", description: "" });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div class="row g-3 justify-content-center align-items-center mt-5">
          <form
            onSubmit={handleFormSubmit}
            className="d-flex gap-3 justify-content-center align-items-center"
          >
            <div class="col-sm-auto">
              <input
                type="text"
                id="title"
                class="form-control"
                placeholder="Title"
                name="title"
                required
                onChange={handleChange}
                value={newTodo.title}
              />
            </div>
            <div class="col-sm-auto">
              <input
                type="text"
                id="description"
                class="form-control"
                placeholder="Description"
                name="description"
                required
                value={newTodo.description}
                onChange={handleChange}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-success" type="submit">
                Add Todo
              </button>
            </div>
          </form>
        </div>
        <hr />
        <div class="row row-cols-1 row-cols-md-3 g-4 mt-3 ">
          {todos.map((item, index) => {
            return (
              <div key={index}>
                <div class="col">
                  <div class="card  text-bg-warning">
                    <div class="card-body">
                      <h5 class="card-title">{item.title}</h5>
                      <p class="card-text">{item.description}</p>
                      <div>
                        <Link className="btn btn-primary" to={`/${item._id}`}>
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger ms-3"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DisplayTodos;
