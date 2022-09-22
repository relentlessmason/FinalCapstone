import { Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const RenderBlank = () => {
  return (
    <div className="container ">
      <div className="row justify-content-center">
        <Card className="col-3 text-center mt-4 recipe">
          <CardTitle className="norecipe m-3">No recipe to display</CardTitle>
          <CardBody>
            <Link to="/add-recipe" className="text-decoration-none ">
              <button className="submit buttonzz mb-1">Add a Recipe</button>
            </Link>{" "}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default RenderBlank;
