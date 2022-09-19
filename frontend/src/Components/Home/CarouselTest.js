// import React, { useState, useEffect } from "react";
// import Carousel from "react-bootstrap/Carousel";

// function RenderCarouselCard(dayOfWeek, props) {
//   function today() {
//     let d = null;
//     dayOfWeek.map((day) => {
//       d = day.dayOfWeek + " Meals";
//     });
//     return d;
//   }

//   const newNums = () => {
//     let ok = Math.floor(Math.random() * 5) + 1;
//     let ok1 = ok - 1 + 2;
//     let ok2 = Math.floor(Math.random() * (ok - 1)) + 2;
//     let source = `https://picsum.photos/id/${ok}${ok1}${ok2}/200/300`;
//     console.log(ok + " " + ok1 + " " + ok2);
//     return source;
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   function toggleModal() {
//     setIsModalOpen(!isModalOpen);
//   }

//   return (
//     <>
//       <div className="carouselh2">{today()}</div>
//       <div class="card-deck">
//         {dayOfWeek.map((m, i) => {
//           return (
//             <>
//               <div className="carouselitem" key={i}>
//                 <img src="#" alt="" />
//                 <div>
//                   <div>
//                     <h5>{m.mealName} </h5>
//                     <p>{m.timeOfDay}</p>
//                     <p>
//                       <small class="text-muted">Last updated 3 mins ago</small>
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* <Card className=" m-3 p-2 text-center" key={i}>
//                   <CardTitle>
//                     <h3>Meal Name</h3>
//                     {m.mealName}
//                   </CardTitle>
//                   <CardBody>
//                     <CardText>
//                       <h4>Time Of Day</h4>
//                       {m.timeOfDay}
//                     </CardText>
//                   </CardBody>
//                   <div>
//                     <Button
//                       className="submitAR"
//                       onClick={() => {
//                         props.handleDeleteMealPlans(m.mealPlanId);
//                       }}
//                     >
//                       Remove
//                     </Button>
//                     <Link
//                       to={"/recipe/" + m.mealId}
//                       className="text-decoration-none"
//                     >
//                       <Button className="submitAR ">View Recipe</Button>
//                     </Link>
//                     <Button
//                       onClick={() => {
//                         toggleModal();
//                       }}
//                       className="submitAR"
//                     >
//                       Edit Meal Plan
//                     </Button>
//                     <RenderEditMealPlanModal
//                       mealId={m.mealId}
//                       mealPlanId={m.mealPlanId}
//                       isModalOpen={isModalOpen}
//                       setIsModalOpen={setIsModalOpen}
//                       props={props}
//                     />
//                   </div>
//                 </Card> */}
//             </>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// function CarouselTest(props) {
//   const data = props.mealPlan.mealPlan;
//   const [nowActive, setNowActive] = useState(0);
//   const [onHover, setOnHover] = useState(false);

//   let monday = props.mealPlan.mealPlan.filter(
//     (meal) => meal.dayOfWeek == "Monday",
//     10
//   );
//   let tuesday = props.mealPlan.mealPlan.filter(
//     (meal) => meal.dayOfWeek == "Tuesday",
//     10
//   );
//   let wednesday = props.mealPlan.mealPlan.filter(
//     (meal) => meal.dayOfWeek == "Wednesday",
//     10
//   );
//   let thursday = props.mealPlan.mealPlan.filter(
//     (meal) => meal.dayOfWeek == "Thursday",
//     10
//   );
//   let friday = props.mealPlan.mealPlan.filter(
//     (meal) => meal.dayOfWeek == "Friday",
//     10
//   );
//   let saturday = props.mealPlan.mealPlan.filter(
//     (meal) => meal.dayOfWeek == "Saturday",
//     10
//   );
//   let sunday = props.mealPlan.mealPlan.filter(
//     (meal) => meal.dayOfWeek == "Sunday",
//     10
//   );

//   // autoplay (stop in hover)
//   useEffect(() => {
//     if (!onHover && data !== null) {
//       let i = nowActive;
//       const timer = setInterval(() => {
//         if (i >= data.length - 1) {
//           setNowActive(0);
//           i = 1;
//         } else {
//           setNowActive((prev) => prev + 1);
//           i = i + 1;
//         }
//       }, 3000);
//       return () => {
//         clearTimeout(timer);
//       };
//     }
//   }, [onHover, data]);

//   // change data >> return active = 0
//   useEffect(() => {
//     setNowActive(0);
//   }, [data]);

//   const carousel = () => {
//     return (
//       <div
//         id="carouselExampleControls"
//         className="codeinfo__carousel carousel slide"
//         data-bs-ride="carousel"
//         onMouseOver={() => setOnHover(true)}
//         onMouseLeave={() => setOnHover(false)}
//       >
//         <div className="carousel-inner">
//           {data.map((e, i) => (
//             <div className={"carousel-item " + (nowActive === i && "active")}>
//               {friday.length !== 0 ? (
//                 RenderCarouselCard(friday, props)
//               ) : (
//                 <>null</>
//               )}

//               {saturday.length !== 0 ? (
//                 RenderCarouselCard(saturday, props)
//               ) : (
//                 <>null</>
//               )}

//               {sunday.length !== 0 ? (
//                 RenderCarouselCard(sunday, props)
//               ) : (
//                 <>null</>
//               )}
//             </div>
//           ))}
//         </div>

//         <button
//           className="carousel-control-prev"
//           type="button"
//           onClick={() => {
//             nowActive === 0
//               ? setNowActive(data.length - 1)
//               : setNowActive(nowActive - 1);
//           }}
//         >
//           <span className="carousel-control-prev-icon" aria-hidden="true" />
//           <span className="visually-hidden">Previous</span>
//         </button>

//         <button
//           className="carousel-control-next"
//           type="button"
//           onClick={() => {
//             nowActive === data.length - 1
//               ? setNowActive(0)
//               : setNowActive(nowActive + 1);
//           }}
//         >
//           <span className="carousel-control-next-icon" aria-hidden="true" />
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
      
//     );
//   };

//   return data !== null ? <div>{carousel()}</div> : <div>Null data</div>;
// }

// export default CarouselTest;
