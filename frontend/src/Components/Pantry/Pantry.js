import React from "react";
import { Control, LocalForm } from "react-redux-form";
import { Label, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./Pantry.css";

export default function Pantry(props){

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
                id="pantry"
                className="form-control"
                type="textarea"
                name="item"
                placeholder="'Chicken, rice, milk...'"
                rows="6"
                
                />

            </Col>
          </Row>
          <Button
              onClick={(e) => {
                e.preventDefault();
                //not sure how to gather multiple input fields and put them into db yet
              }}
              className="submitAR"
              type="submit"
            >
              Add to Pantry
            </Button>
        </div>
          
      </LocalForm>
    )
}
