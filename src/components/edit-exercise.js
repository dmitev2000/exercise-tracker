import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";

const EditExercise = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState(undefined);
  const [date, setDate] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [duration, setDuration] = useState(undefined);

  function handle_submit(e) {
    e.preventDefault();
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };
    console.log(exercise);
    axios
      .post(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then(() =>
        navigate("/info", {
          state: {
            text: `Exercise ${id} updated successfuly.`,
            cssClass: "text-success",
          },
        })
      )
      .catch((err) => console.error(err.stack));
  }

  function handle_username_change(e) {
    setUsername(e.target.value);
  }

  function handle_description_change(e) {
    setDescription(e.target.value);
  }

  function handle_duration_change(e) {
    setDuration(e.target.value);
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((res) => {
        console.log(res.data);
        setUsername(res.data.username);
        setDate(res.data.date);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setIsLoading(false);
      })
      .catch((err) => console.error(err.stack));
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container pt-5 pb-5">
      <h1>Edit Exercise: {id}</h1>
      <form onSubmit={handle_submit}>
        <label className="form-label" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          value={username}
          id="username"
          className="form-control"
          onChange={handle_username_change}
          required
          minLength={3}
          autoComplete='off'
        />
        <label className="form-label" htmlFor="description">
          Description:
        </label>
        <input
          type="text"
          value={description}
          id="description"
          className="form-control"
          onChange={handle_description_change}
          required
          autoComplete='off'
        />
        <label className="form-label" htmlFor="duration">
          Duration:
        </label>
        <input
          type="number"
          value={duration}
          id="duration"
          className="form-control"
          onChange={handle_duration_change}
          required
          min={1}
          autoComplete='off'
        />
        <label className="form-label" htmlFor="date">
          Date:
        </label>
        <DatePicker
          id="date"
          required
          maxDate={new Date()}
          className="form-control"
          selected={Date.parse(date)}
          onChange={(new_date) => setDate(new_date)}
        />
        <button type="submit" className="btn btn-success mt-3">
          Update
        </button>
        <Link
          to="/"
          className="mt-3 btn btn-primary"
          style={{ marginLeft: "10px" }}
        >
          Home
        </Link>
      </form>
    </div>
  );
};

export default EditExercise;
