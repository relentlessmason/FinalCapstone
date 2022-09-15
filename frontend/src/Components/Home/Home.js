import { Link } from "react-router-dom";
import QuickLook from "./QuickLook";
import Carousel  from "./Carousel";
import Details from "./Details";

import { useState } from "react";
import "./Home.css";

function Home(props) {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };

  return (
    <>
      <div>
        ID:
        {"  " + props.user.id}
        <br />
        USERNAME:
        {"  " + props.user.username}
      </div>

      {/* <QuickLook
        fetchMealPlansByUserId={props.fetchMealPlansByUserId}
        fetchMealsByUser={props.fetchMealsByUser}
        showDetailsHandle={showDetailsHandle}
        mealPlan={props.mealPlan}
      /> */}
      <br />
      {/* {showDetails && <Details data={data} />}    */}

      <Carousel
      deleteMealPlan={props.deleteMealPlan}
      fetchMealPlansByUserId={props.fetchMealPlansByUserId}
      user={props.user}
      mealPlan={props.mealPlan}
      />
    </>
  );
}

export default Home;
