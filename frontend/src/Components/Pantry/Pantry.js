import React from "react";
import { Control, LocalForm } from "react-redux-form";
import { Label, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { User } from "../../Redux/user";
import "./Pantry.css";

export default function Pantry(props){
    let userId = User.id;
    console.log('user id', props);
    return(
      <LocalForm
      id="form"
      onSubmit={(values)=> props.handlePostPantry(values)} 
      >
       
        <div className="pantry">
          <Row className="form-group">
            <Label htmlFor="pantry" md={12}>
              My Pantry List
            </Label>
            <Col md={12} className="input-group">
              <Control.textarea
                model=".pantry"
                id="ingredientsName"
                className="form-control"
                type="textarea"
                name="ingredientsName"
                placeholder="'Chicken, rice, milk...'"
                rows="6"
                
                />

            </Col>
          </Row>
          <button
              className="submitAR"
              type="submit"
            >
              Add to Pantry
            </button>
        </div>

       
          
      </LocalForm>
    )
}
