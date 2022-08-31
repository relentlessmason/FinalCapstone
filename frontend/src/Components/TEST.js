import React, {Component, useEffect,useCallback} from 'react'
import {
  Card,
  CardImg,
  CardText,
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
  CardHeader
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";


class TESTING extends Component {
  constructor(props){
    super(props);

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleRefresh=this.handleRefresh.bind(this);
  }

  handleSubmit(values) {
    this.props.postMeal(
      values.mealName,
      values.categoryId,
      values.timeOfDayId,
      values.description,
      values.recipe,
      values.ingredients
    );
  }


  handleRefresh(){
   this.props.fetchMeals();
  };

 

  

  render() { 

    

    return (<>
      <h2>Hello this is our practice page</h2>
      
      {/* <RenderMeals 
      meal={props.meal.meal} /> */}

      {/* we can use this form to practice input */}

      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
        
      <Row className="form-group">
        <Label htmlFor="mealName" md={2}>
          Meal Name
        </Label>
        <Col md={10}>
          <Control.text
            model=".mealName"
            className="form-control"
            id="mealName"
            name="mealName"
            placeholder="Meal Name"
          />
        </Col>
      </Row>

      <Row className="form-group">
        <Label htmlFor="categoryId" md={2}>
          Category Id
        </Label>
        <Col md={10}>
          <Control.text
            model=".categoryId"
            className="form-control"
            id="categoryId"
            name="categoryId"
            placeholder="Category Id"
          />
        </Col>
      </Row>

      <Row className="form-group">
        <Label htmlFor="timeOfDayId" md={2}>
          Time Of Day Id
        </Label>
        <Col md={10}>
          <Control.text
            model=".timeOfDayId"
            className="form-control"
            id="timeOfDayId"
            name="timeOfDayId"
            placeholder="Time of day Id"
          />
        </Col>
      </Row>

      <Row className="form-group">
        <Label htmlFor="description" md={2}>
          Description
        </Label>
        <Col md={10}>
          <Control.textarea
            model=".description"
            className="form-control"
            id="description"
            name="description"
            placeholder="Description"
            rows="3"
          />
        </Col>
      </Row>

      <Row className="form-group">
        <Label htmlFor="recipe" md={2}>
          Recipe
        </Label>
        <Col md={10}>
          <Control.textarea
            type="textarea"
            id="recipe"
            model=".recipe"
            className="form-control"
            placeholder="Recipe Here"
            rows="3"
          ></Control.textarea>
        </Col>
      </Row>
      <Row className="form-group">
        <Label htmlFor="ingredients" md={2}>
          Ingredients
        </Label>
        <Col md={10}>
          <Control.textarea
            type="textarea"
            id="ingredients"
            model=".ingredients"
            className="form-control"
            placeholder="Ingredients"
            rows="3"
          ></Control.textarea>
        </Col>
      </Row>
      <Row className="form-group">
        <Col md={{ size: 10, offset: 2 }}>
          <Button
         onClick={()=>{
          this.props.memoizedCallback();
         }}
          type="submit" 
          color="primary">
            Send Meal
          </Button>
        </Col>
      </Row>
      </LocalForm>
    </>);
  }
}
 
const TEST = (props) => {

  // useEffect(() => {
  //   props.postMeal();
    
  // }, [props.meal.meal, props.postMeal]);

  
  const memoizedCallback = useCallback(
    () => {
     props.fetchMeals();
    },
    [props.meal, props.postMeal],
  );
 


  return ( 
  <>
  <RenderMeals
  meal={props.meal.meal}
  />

  <TESTING
  meal={props.meal.meal}
  postMeal={props.postMeal}
  fetchMeals={props.fetchMeals}
  memoizedCallback={memoizedCallback}
  />
  
  </> );
}
 
export default TEST;







  function RenderMeals({ meal }) {

   
   

    return (
      
      <>     
          {meal.map((m) => {
            return(
              <div className="row">
                <div className='col-12 col-md-5 m-1'>
              <Card key={m.id} className='mt-4' >
                <CardHeader className="h2">{m.mealName}</CardHeader>
                <CardBody>
                <CardText className="text-center">
                    ID: {m.id}
                  </CardText>

                  <CardText className="text-center">
                    Description: {m.description}
                  </CardText>

                  <CardText className="text-center">
                    Recipe: {m.recipe}
                  </CardText>

                  <CardText className="text-center">
                    Ingredients: {m.ingredients}
                  </CardText>
                  
                </CardBody>             
              </Card>
              </div>
              </div>
               )})}
        </>
    );
  }



