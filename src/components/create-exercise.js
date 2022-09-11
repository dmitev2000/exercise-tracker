import DatePicker from "react-datepicker";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateExercise = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const usernameInputRef = useRef();
  const descriptionInputRef = useRef();
  const durationInputRef = useRef();
  const [date, setDate] = useState(new Date());

  function handle_submit(e) {
    e.preventDefault();
    console.log(usernameInputRef.current.value);
    const exercise = {
      username: usernameInputRef.current.value,
      description: descriptionInputRef.current.value,
      duration: durationInputRef.current.value,
      date: date,
    };
    //console.log(exercise);
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then(() =>
        navigate("/info", {
          state: {
            text: "New exercise added successfuly.",
            cssClass: "text-success",
          },
        })
      )
      .catch((err) => console.error(err.stack));
  }

  function compare(user1, user2) {
    if (user1.username < user2.username) {
      return -1;
    } 
    if (user1.username > user2.username) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUsers(res.data.sort(compare));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <div className="container pt-5 pb-5">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container pt-5 pb-5">
      <h1>Add Exercise: </h1>
      <form onSubmit={handle_submit}>
        <label className="form-label" htmlFor="username">
          Username:
        </label>
        <select
          id="username"
          ref={usernameInputRef}
          required
          className="form-control"
        >
          {users.map((user) => {
            return (
              <option key={user._id} value={user.username}>
                {user.username}
              </option>
            );
          })}
        </select>
        <label className="form-label" htmlFor="description">
          Description:
        </label>
        <input
          type="text"
          id="description"
          className="form-control"
          required
          ref={descriptionInputRef}
          autoComplete="off"
        />
        <label className="form-label" htmlFor="duration">
          Duration:
        </label>
        <input
          type="number"
          id="duration"
          className="form-control"
          required
          min={1}
          ref={durationInputRef}
          autoComplete="off"
        />
        <label className="form-label" htmlFor="date">
          Date:
        </label>
        <DatePicker
          id="date"
          required
          maxDate={new Date()}
          className="form-control"
          selected={date}
          onChange={(newDate) => setDate(newDate)}
        />
        <button type="submit" className="btn btn-success mt-3">
          Add
        </button>
        <Link
          to="/"
          className="btn btn-primary mt-3"
          style={{ marginLeft: "10px" }}
        >
          Home
        </Link>
      </form>
    </div>
  );
};

export default CreateExercise;
