// import React, { Component, useEffect } from "react";
// import {
//   Card,
//   CardText,
//   CardBody,
//   CardTitle,
//   Button,
//   Row,
//   Label,
//   Col,
//   CardHeader,
// } from "reactstrap";
// import { Control, LocalForm } from "react-redux-form";
// import axios from "axios";

// import { baseUrl } from "../Shared/baseUrl";

// class TESTING extends Component {
//   constructor(props) {
//     super(props);

//     this.handleDeleteMeals = props.handleDeleteMeals.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   //  handlePostMealAccount() {

//   //   this.props.fetchMeals(localStorage.getItem('token'));

//   //   const findLastMealId = () => {
//   //     let max = 0;
//   //     this.props.meal.map((m) => {
//   //       if (m.id > max) {
//   //         max = m.id;
//   //       }
//   //     });
//   //     return max + 1;
//   //   };

//   //   this.props.postMealAccount(findLastMealId(), this.props.user.id);
//   // }

//   async handlePostMealAccount() {
//     await this.props.fetchMealsByUser(this.props.user.id);

//     const findLastMealId = () => {
//       let max = 0;
//       this.props.meal.map((m) => {
//         if (m.id > max) {
//           max = m.id;
//         }
//       });
//       return max;
//     };

//     alert("New Meal Id" + findLastMealId());

//     this.props.postMealAccount(findLastMealId(), this.props.user.id);
//   }

//   async handleSubmit(values) {
//     await this.props.fetchMealsByUser(this.props.user.id);

//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ` + localStorage.getItem("token"),
//     };

//     const data = {
//       mealName: values.mealName,
//       categoryId: values.categoryId,
//       timeOfDayId: values.timeOfDayId,
//       description: values.description,
//       recipe: values.recipe,
//       ingredients: values.ingredients,
//     };

//     await axios.post(baseUrl + "/meals/" + this.props.user.id, data, {
//       headers: headers,
//     });

//     //  axios.get(baseUrl+"/meals/",{
//     //     headers: headers
//     //   })

//     await this.props.fetchMealsByUser(this.props.user.id);

//     // setTimeout(()=>{

//     //   this.props.fetchMeals();

//     //   const findLastMealId = () => {
//     //     let max = 0;
//     //     this.props.meal.map((m) => {
//     //       if (m.id > max) {
//     //         max = m.id;
//     //       }
//     //     });
//     //     return max;
//     //   };

//     //   alert("New Meal Id" + findLastMealId())

//     //   // this.props.postMealAccount(findLastMealId(), this.props.user.id);

//     // },2000)

//     // const params = new URLSearchParams([['mealName',values.mealName]]);

//     // const mealById=()=>{

//     //    axios.get(baseUrl+'/meal/?mealName='+values.mealName, {params});

//     // }

//     // mealById(values.mealName);

//     // alert("Find meal By Id " + mealById(values.mealName))

//     // this.props.fetchMeals()

//     // alert("New Meal Id" + findLastMealId())

//     // this.props.postMealAccount(findLastMealId(), this.props.user.id);

//     // const mealAccount = {
//     //   mealId: findLastMealId,
//     //   userId: this.props.user.id
//     // }

//     //I CANT FIGURE OUT HOW TO PASS THE DATA TO THE URL

//     // const url = baseUrl+'/mealaccount/'+{mealAccount.mealId}+'/'+parseInt(this.props.user.id);

//     // axios.post(url,mealAccount,{
//     //   headers: headers
//     // })

//     // this.props.postMeal(
//     //   values.mealName,
//     //   values.categoryId,
//     //   values.timeOfDayId,
//     //   values.description,
//     //   values.recipe,
//     //   values.ingredients
//     // );

//     //

//     // this.handlePostMealAccount();

//     // this.props.fetchMeals(this.props.token);

//     // await this.handlePostMealAccount();

//     // this.handlePostMealAccount();

//     // setTimeout(this.handlePostMealAccount(),2000)
//   }

//   render() {
//     return (
//       <>
//         <h2 className="pt-4 pb-4">Add a new Meal below</h2>

//         <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
//           <Row className="form-group">
//             <Label htmlFor="mealName" md={2}>
//               Meal Name
//             </Label>
//             <Col md={10}>
//               <Control.text
//                 model=".mealName"
//                 className="form-control"
//                 id="mealName"
//                 name="mealName"
//                 placeholder="Meal Name"
//               />
//             </Col>
//           </Row>

//           <Row className="form-group">
//             <Label htmlFor="categoryId" md={2}>
//               Category Id
//             </Label>
//             <Col md={10}>
//               <Control.text
//                 model=".categoryId"
//                 className="form-control"
//                 id="categoryId"
//                 name="categoryId"
//                 placeholder="Category Id"
//               />
//             </Col>
//           </Row>

//           <Row className="form-group">
//             <Label htmlFor="timeOfDayId" md={2}>
//               Time Of Day Id
//             </Label>
//             <Col md={10}>
//               <Control.text
//                 model=".timeOfDayId"
//                 className="form-control"
//                 id="timeOfDayId"
//                 name="timeOfDayId"
//                 placeholder="Time of day Id"
//               />
//             </Col>
//           </Row>

//           <Row className="form-group">
//             <Label htmlFor="description" md={2}>
//               Description
//             </Label>
//             <Col md={10}>
//               <Control.textarea
//                 model=".description"
//                 className="form-control"
//                 id="description"
//                 name="description"
//                 placeholder="Description"
//                 rows="3"
//               />
//             </Col>
//           </Row>

//           <Row className="form-group">
//             <Label htmlFor="recipe" md={2}>
//               Recipe
//             </Label>
//             <Col md={10}>
//               <Control.textarea
//                 type="textarea"
//                 id="recipe"
//                 model=".recipe"
//                 className="form-control"
//                 placeholder="Recipe Here"
//                 rows="3"
//               ></Control.textarea>
//             </Col>
//           </Row>
//           <Row className="form-group">
//             <Label htmlFor="ingredients" md={2}>
//               Ingredients
//             </Label>
//             <Col md={10}>
//               <Control.textarea
//                 type="textarea"
//                 id="ingredients"
//                 model=".ingredients"
//                 className="form-control"
//                 placeholder="Ingredients"
//                 rows="3"
//               ></Control.textarea>
//             </Col>
//           </Row>
//           <Row className="form-group">
//             <Col md={{ size: 10, offset: 2 }}>
//               <Button
//                 onClick={() => {
//                   this.props.fetchMealsByUser(this.props.user.id);
//                 }}
//                 type="submit"
//                 color="primary"
//               >
//                 Send Meal
//               </Button>
//             </Col>
//           </Row>
//         </LocalForm>
//       </>
//     );
//   }
// }

// const TEST = (props) => {

//   return (
//     <>
//       USER INFORMATION TEST
//       <br />
//       {props.user.id}
//       <br />
//       {props.user.username}

//       <RenderMealPlans
//       fetchMealPlansByUserId={props.fetchMealPlansByUserId}
//       postMealPlan={props.postMealPlan}
//       mealPlan={props.mealPlan.mealPlan}
//       />


//       {/* <RenderMeals
//         meal={props.meal.meal}
//         deleteMeals={props.deleteMeals}
//         handleDeleteMeals={props.handleDeleteMeals}
//         fetchMealAccount={props.fetchMealAccount}
//         postMealAccount={props.postMealAccount}
//         postMeal={props.postMeal}
//         fetchMealsByUser={props.fetchMealsByUser}
//         token={props.token}
//       /> */}


//       <TESTING
//         userId={props.user.id}
//         token={props.token}
//         user={props.user}
//         fetchMealAccount={props.fetchMealAccount}
//         postMealAccount={props.postMealAccount}
//         meal={props.meal.meal}
//         postMeal={props.postMeal}
//         fetchMealsByUser={props.fetchMealsByUser}
//         handleDeleteMeals={props.handleDeleteMeals}
//       />
//     </>
//   );
// };

// export default TEST;

// function RenderMealPlans({fetchMealPlansByUserId, postMealPlan, mealPlan}){
  
//   return(
//     <>
//   {mealPlan.map((m)=>{
//     return(
      
//       <div>
//         {m.id}
//         <br/>
//         {m.dayOfWeek}
//         <br/>
//         {m.mealId}
//       </div>
//     )
//   })}
//    </>
//   )
// }



// function RenderMeals({ meal, fetchMealsByUser, token, deleteMeals }) {
//   // const headers = {
//   //   "Content-Type": "application/json",
//   //   Authorization: `Bearer ` + localStorage.getItem("token"),
//   // };

//   // const handleDeleteButton = async (id) => {
//   //   await axios.delete(baseUrl + "/meals/" + id);
//   //   await fetchMeals();
//   // };

//   // const newMeal = {
//   //   mealName: "",
//   //   categoryId: "",
//   //   timeOfDayId: "",
//   //   description: "",
//   //   recipe: "",
//   //   ingredients: "",
//   // };

//   // const handleEditButton = async (id) => {
//   //   await axios.put(baseUrl + "/meal/" + id, newMeal, headers);
//   //   await fetchMealsByUser(id);
//   // };

//   // async function handleDelete(id) {
//   //   await deleteMeals(id);
//   //   await fetchMealsByUser(id);
//   // }

//   // const mealz = async () => {
//   //   const meal = await axios.get(baseUrl + "/meals/1", headers);
//   //   mealz();
//   //   return meal;
//   // };

//   return (
//     <>
//       {meal.map((m) => {
//         return (
//           <div className="row">
//             <div className="col-12 col-md-5 m-1">
//               <Card key={m.id} className="mt-4">
//                 <CardHeader className="h1 text-center">{m.mealName}</CardHeader>
//                 <CardTitle className="text-center h5 mt-2">
//                   <br />'{m.description}'
//                 </CardTitle>
//                 <CardBody>
//                   <CardText className="text-center">
//                     Recipe: <br /> {m.recipe}
//                   </CardText>

//                   <CardText className="text-center">
//                     Ingredients: <br /> {m.ingredients}
//                   </CardText>
//                 </CardBody>

//                 <div>
//                   <Button
//                     className="m-3"
//                     onClick={() => {
//                       // handleDeleteButton(m.id);
//                       // handleDelete(m.id);
//                       // fetchMeals();
//                     }}
//                   >
//                     Delete
//                   </Button>

//                   <Button
//                     className="m-3"
//                     onClick={() => {
//                       //similar to catcard focus?
//                       // handleEditButton(m.id);
//                     }}
//                   >
//                     Edit
//                   </Button>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// }
