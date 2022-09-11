import { Link, useLocation } from "react-router-dom";

const Info = () => {
  const location = useLocation();  
  return (
    <div className="container pt-5 pb-5">
        <h3 className={location.state.cssClass}>{location.state.text}</h3>
        <Link to='/' className="mt-3 btn btn-primary">Home</Link>
    </div>
  )
}

export default Info;