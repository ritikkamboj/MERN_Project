import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  console.log(name, email, age);

  async function handleSubmit(e) {
    e.preventDefault();

    const newData = {
      name: name,
      email: email,
      age: age,
    };
    console.log("jai ");
    try {
      const response = await fetch("http://localhost:8000/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error(
          "There is some error in communicaion between FE and backend"
        );
      }
      if (response.ok) {
        setError("");
        navigate("/read");
      }

      const data = await response.json();
      console.log("data handle sccessfully", data);
    } catch (err) {
      setError(err.message);

      console.log(err.message);
    } finally {
      setName("");
      setEmail("");
      setAge();
    }
  }

  return (
    <div>
      <h2> Enter the Data </h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form className="form-control" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
