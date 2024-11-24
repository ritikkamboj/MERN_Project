import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  async function getData() {
    const response = await fetch("http://localhost:8000/getAllUsers");

    if (!response.ok) {
      setError("some issue in fetching all the data ");
    }
    if (response.ok) {
      const data1 = await response.json();
      setData(data1.data);
      console.log(data1.data);
    }
  }

  async function handleDelete(id) {
    const response = await fetch(
      `https://mern-project-sable.vercel.app/delUser/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);

    if (!response.ok) {
      console.log(response.error);
      setError("Error in Deleting Data, Please Try Again");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
    if (response.ok) {
      setError("Data Deleted Successfully ");

      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1> All Data </h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="form-control">
        <div className="row">
          {data?.map((ele) => (
            <div key={ele._id} className="col-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card Details</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.name}</h6>
                  <p className="card-text">{ele.email}</p>
                  <p className="card-text">{ele.age}</p>
                  <Link to={`/${ele._id}`} className="card-link">
                    Edit
                  </Link>
                  <a
                    href="#"
                    className="card-link"
                    onClick={() => handleDelete(ele._id)}
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Read;
