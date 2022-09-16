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
      {/* <QuickLook
        showDetailsHandle={showDetailsHandle}
        mealPlan={props.mealPlan}
      /> */}
      <br />
      {/* {showDetails && <Details data={data} />}    */}

      <Carousel
      handleUpdateMealPlans={props.handleUpdateMealPlans}
      handleDeleteMealPlans={props.handleDeleteMealPlans}
      user={props.user}
      mealPlan={props.mealPlan}
      />
    </>
  );
}

export default Home;
