import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardSubtitle,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Row,
  Label,
  Col,
} from "reactstrap";
import Carousel from "react-bootstrap/Carousel";
import "./Home.css";
import { Md3P } from "react-icons/md";

// function RenderCard({ mealPlan }) {
//   const MP = mealPlan.map((mp) => {
//     return (
//       <div>
//          {mp.mealName}

//       <Carousel.Caption>

//         </Carousel.Caption>
//         </div>
//     );
//   });

//   return <>
//    <Carousel.Item>

//   {MP}

//   </Carousel.Item>
//   </>;
// }

// function RenderCard({ mealPlan }) {

//   return (<>
//     {mealPlan.map((mp) =>(mp !='Breakfast') ?() => {
//       return (
//           <>
//           <Card>
//             <CardTitle>
//             {mp.mealName}
//             </CardTitle>
//             <CardBody>
//               {mp.timeOfDay}
//             </CardBody>

//           </Card>
//           </>
//       );
//     } : ()=>{
//     return(
//       <>
//       <Card>
//         Nothing to show
//       </Card>
//       </>
//     )
//     }
//     )}
//  </>
//  );
// };

export default function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);

  // let mealPlan = props.mealPlan.mealPlan;

  let monday = props.mealPlan.mealPlan.filter((meal) => (meal.dayOfWeek=='Monday'),10);
  let tuesday = props.mealPlan.mealPlan.filter((meal) => (meal.dayOfWeek=='Tuesday'),10);
  let wednesday = props.mealPlan.mealPlan.filter((meal) => (meal.dayOfWeek=='Wednesday'),10);
  let thursday = props.mealPlan.mealPlan.filter((meal) => (meal.dayOfWeek=='Thursday'),10);
  let friday = props.mealPlan.mealPlan.filter((meal) => (meal.dayOfWeek=='Friday'),10);
  let saturday = props.mealPlan.mealPlan.filter((meal) => (meal.dayOfWeek=='Saturday'),10);
  let sunday = props.mealPlan.mealPlan.filter((meal) => (meal.dayOfWeek=='Sunday'),10);

  let lunchPlan = props.mealPlan.mealPlan.filter((meal) => meal.timeOfDay == 'Lunch',10);
  let snackPlan = props.mealPlan.mealPlan.filter((meal) => meal.timeOfDay == 'Snack',10);
  let dinnerPlan = props.mealPlan.mealPlan.filter((meal) => meal.timeOfDay == 'Dinner',10);
  let dessertPlan = props.mealPlan.mealPlan.filter((meal) => meal.timeOfDay == 'Dessert',10);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  function handleDeletePlan(e){
    props.deleteMealPlan(e);
    

  }

  // onemeal={this.props.meal.meal.filter((meal) => meal.id == parseInt(match.params.id,10))[0]}

  return (
    <div className="container">
      <Carousel>
        <Carousel.Item>
          <div className="text-center">
        <h2 className="bg-secondary">Monday Meals</h2>
        <br/>
          {monday.map((m)=>{
            return(
              <Card className=" m-3 p-2 text-center">
                <CardTitle>
                  <h3>Meal Name</h3>
                {m.mealName}
                </CardTitle>
                <CardBody>
                  <CardText>
                    <h4>Time Of Day</h4>
                {m.timeOfDay}
                </CardText>
                </CardBody>
                <Button
                onClick={()=>{
                  handleDeletePlan(m.mealId)
                  props.fetchMealPlansByUserId(props.user.id)
                }}
                >Remove</Button>
              </Card>
            )
          })}
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="text-center">
        <h2 className="bg-secondary">Tuesday Meals</h2>
        <br/>
          {tuesday.map((m)=>{
            return(
              <Card className=" m-3 p-2 text-center">
                <CardTitle>
                  <h3>Meal Name</h3>
                {m.mealName}
                </CardTitle>
                <CardBody>
                  <CardText>
                    <h4>Time Of Day</h4>
                {m.timeOfDay}
                </CardText>
                </CardBody>
                <Button
                onClick={()=>{
                  handleDeletePlan(m.mealId)
                  props.fetchMealPlansByUserId(props.user.id)
                }}
                >Remove</Button>
              </Card>
            )
          })}
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="text-center">
        <h2 className="bg-secondary">Wednesday Meals</h2>
        <br/>
          {wednesday.map((m)=>{
            return(
              <Card className=" m-3 p-2 text-center">
                <CardTitle>
                  <h3>Meal Name</h3>
                {m.mealName}
                </CardTitle>
                <CardBody>
                  <CardText>
                    <h4>Time Of Day</h4>
                {m.timeOfDay}
                </CardText>
                </CardBody>
                <Button
                onClick={()=>{
                  handleDeletePlan(m.mealId)
                  props.fetchMealPlansByUserId(props.user.id)
                }}
                >Remove</Button>
              </Card>
            )
          })}
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="text-center">
        <h2 className="bg-secondary">Thursday Meals</h2>
        <br/>
          {thursday.map((m)=>{
            return(
              <Card className=" m-3 p-2 text-center">
                <CardTitle>
                  <h3>Meal Name</h3>
                {m.mealName}
                </CardTitle>
                <CardBody>
                  <CardText>
                    <h4>Time Of Day</h4>
                {m.timeOfDay}
                </CardText>
                </CardBody>
                <Button
                onClick={()=>{
                  handleDeletePlan(m.mealId)
                  props.fetchMealPlansByUserId(props.user.id)
                }}
                >Remove</Button>
              </Card>
            )
          })}
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="text-center">
        <h2 className="bg-secondary">Friday Meals</h2>
        <br/>
          {friday.map((m)=>{
            return(
              <Card className=" m-3 p-2 text-center">
                <CardTitle>
                  <h3>Meal Name</h3>
                {m.mealName}
                </CardTitle>
                <CardBody>
                  <CardText>
                    <h4>Time Of Day</h4>
                {m.timeOfDay}
                </CardText>
                </CardBody>
                <Button
                onClick={()=>{
                  handleDeletePlan(m.mealId)
                  props.fetchMealPlansByUserId(props.user.id)
                }}
                >Remove</Button>
              </Card>
            )
          })}
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="text-center">
        <h2 className="bg-secondary">Saturday Meals</h2>
        <br/>
          {saturday.map((m)=>{
            return(
              <Card className=" m-3 p-2 text-center">
                <CardTitle>
                  <h3>Meal Name</h3>
                {m.mealName}
                </CardTitle>
                <CardBody>
                  <CardText>
                    <h4>Time Of Day</h4>
                {m.timeOfDay}
                </CardText>
                </CardBody>
                <Button
                onClick={()=>{
                  handleDeletePlan(m.mealId)
                  props.fetchMealPlansByUserId(props.user.id)
                }}
                >Remove</Button>
              </Card>
            )
          })}
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="text-center">
        <h2 className="bg-secondary">Sunday Meals</h2>
        <br/>
          {sunday.map((m)=>{
            return(
              <Card className=" m-3 p-2 text-center">
                <CardTitle>
                  <h3>Meal Name</h3>
                {m.mealName}
                </CardTitle>
                <CardBody>
                  <CardText>
                    <h4>Time Of Day</h4>
                {m.timeOfDay}
                </CardText>
                </CardBody>
                <Button
                onClick={()=>{
                  handleDeletePlan(m.mealId)
                  props.fetchMealPlansByUserId(props.user.id)
                }}
                >Remove</Button>
              </Card>
            )
          })}
          </div>
        </Carousel.Item>

      </Carousel>
    </div>
  );
}

{
  /* <Carousel
activeIndex={index}
onSelect={handleSelect}
className="carousel"
>
<Carousel.Item>
  <Carousel.Caption>
    <h3>Monday Meals</h3>
    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  </Carousel.Caption>

  <RenderCard mealPlan={mealPlan} />
</Carousel.Item>
<Carousel.Item>
  <Carousel.Caption>
    <h3>Tuesday Meals</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <Carousel.Caption>
    <h3>Third slide label</h3>
    <p>
      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    </p>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <Carousel.Caption>
    <h3>Fourth slide label</h3>
    <p>
      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    </p>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <Carousel.Caption>
    <h3>Fifth slide label</h3>
    <p>
      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    </p>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <Carousel.Caption>
    <h3>Sixth slide label</h3>
    <p>
      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    </p>
  </Carousel.Caption>
</Carousel.Item>
<Carousel.Item>
  <Carousel.Caption>
    <h3>Seventh slide label</h3>
    <p>
      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    </p>
  </Carousel.Caption>
</Carousel.Item>
</Carousel> */
}
