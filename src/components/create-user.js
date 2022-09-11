import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [hasError, setHasError] = useState(false);
  const [theError, setTheError] = useState("");
  const navigate = useNavigate();

  function submit_handler(e) {
    e.preventDefault();
    //console.log(username);
    const user = { username: username };
    axios
      .post("http://localhost:5000/users/add", user)
      .then((response) => {
        //console.log(response);
        setTheError("");
        setHasError(false);
        navigate("/info", {
          state: {
            text: `User ${username} added successfuly.`,
            cssClass: "text-success",
          },
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        setHasError(true);
        setUsername('');
        if (err.response.data.includes("duplicate key")) {
          setTheError(`The username ${username} already exists.`);
        } else if (
          err.response.data.includes("shorter than the minimum allowed length")
        ) {
          const len = err.response.data.substring(
            err.response.data.length - 4,
            err.response.data.length - 1
          );
          setTheError(`The username must be at least ${len} characters long.`);
        } else {
          setTheError(err.response.data);
        }
      });
  }

  function change_handler(e) {
    setUsername(e.target.value);
  }

  return (
    <div className="container pt-5 pb-5">
      <h3>Create New User</h3>
      {hasError && (
        <p id="err" className="text-danger">
          {theError}
        </p>
      )}
      <form onSubmit={submit_handler}>
        <div className="form-group">
          <label className="form-label">Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={change_handler}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary mt-3"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
