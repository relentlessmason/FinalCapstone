import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const ReturnToLoginComponent = () => {
    localStorage.removeItem("token");
  return (
    <>
      <Link
        to="/login"
        className="text-decoration-none">
        <Button className="submitAR ">return to login</Button>
      </Link>
    </>
  );
};

export default ReturnToLoginComponent;
