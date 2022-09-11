import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ManageBtns = ({ _id }) => {
  const navigate = useNavigate();

  function handle_delete() {
    axios
      .delete(`http://localhost:5000/exercises/${_id}`)
      .then(
        navigate("/info", {
          state: {
            text: `The exercise ${_id} has been deleted.`,
            cssClass: "text-danger",
          },
        })
      )
      .catch((err) => console.error(err.stack));
  }

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Link
        className="btn btn-primary"
        style={{ margin: "2px 5px", minWidth: "70px" }}
        to={"/edit/" + _id}
        state={{ id: _id }}
      >
        Edit
      </Link>
      <button
        className="btn btn-danger"
        style={{ margin: "10px", minWidth: "70px" }}
        onClick={handle_delete}
      >
        Delete
      </button>
    </div>
  );
};

export default ManageBtns;
