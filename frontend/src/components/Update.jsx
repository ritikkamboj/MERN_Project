import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:8000/getUser/${id}`);

    const data = await response.json();

    if (!response.ok) {
      console.log("Error in getting single user data");
      setError("Error in getting single user data");
    }
    if (response.ok) {
      setError("");
      setName(data.data.name);
      setAge(data.data.age);
      setEmail(data.data.email);
    }
    // console.log(data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // const { id } = useParams();

    const updatedData = {
      name: name,
      email: email,
      age: age,
    };
    console.log("jai ");

    const response = await fetch(`http://localhost:8000/updateUser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    console.log(response);
    if (!response.ok) {
      setError("There is some error in Updating the data");
    }
    if (response.ok) {
      setError("");
      navigate("/read");
    }

    const data = await response.json();
    console.log("data handle sccessfully", data);
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div>
      <h2> Edit the Data </h2>
      <form className="form-control" onSubmit={(e) => handleUpdate(e)}>
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

export default Update;
