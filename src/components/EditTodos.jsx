import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTodos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editTodos, setEditTodos] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://todos-be-1mpn.onrender.com/api/todos/${id}`
        );
        setEditTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTodos((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://todos-be-1mpn.onrender.com/api/todos/${id}`,
        editTodos
      );
      alert("Todo Updated Successfully")
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row g-3 justify-content-center align-items-center mt-5">
        <form
          onSubmit={handleFormSubmit}
          className="d-flex gap-3 justify-content-center align-items-center"
        >
          <div className="col-auto">
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Title"
              name="title"
              value={editTodos.title || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="description"
              className="form-control"
              placeholder="Description"
              name="description"
              value={editTodos.description || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-success" type="submit">
              Update Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodos;
