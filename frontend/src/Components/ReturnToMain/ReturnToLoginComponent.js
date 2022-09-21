import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const ReturnToLoginComponent = () => {
    localStorage.removeItem("token");
  return (
    <>
      <Link
        to="/login"
        className="text-decoration-none">
        <button className="submit ">return to login</button>
      </Link>
    </>
  );
};

export default ReturnToLoginComponent;
