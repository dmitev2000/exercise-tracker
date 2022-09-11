import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ManageBtns from "./manage-btns";

const ExerciseList = () => {
  const [exercises, setExercises] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:5000/exercises").then((res) => {
      //console.log(res);
      setExercises(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || exercises === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container pt-5 pb-5 d-flex justify-content-start flex-wrap">
      <h1 className="mb-3">Exercises: </h1>
      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((e, index) => {
            return <tr key={e._id}>
              <th scope="row">{index + 1}</th>
              <td>{e.username}</td>
              <td>{e.description}</td>
              <td>{e.duration}</td>
              <td>{e.date.toString().substring(0, 10)}</td>
              <td><ManageBtns _id={e._id} /></td>
            </tr>
          })}
        </tbody>
      </table>
      <Link to='/create' className='btn btn-primary'>Add exercise</Link>
    </div>
  );
};

export default ExerciseList;
