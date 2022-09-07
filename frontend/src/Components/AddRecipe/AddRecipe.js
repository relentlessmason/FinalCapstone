import React from "react";
import placeholder from "./Plain_onigiri.png";
import './AddRecipe.css';

export default function AddRecipe(){
    return(
        
<form>
    
    <div className="wrapper">

    <div className="leftWrapper">
        
        <div className="RecipeImgDiv">
        
            <p><img src= {placeholder} //generic image
            className='recipeImg' /></p>
            
        </div>
<br />
        <div className="ingredients">

            <span> ingredient 1</span>
            <span> ingredient 2</span>
            <span> ingredient 3</span>
            <span> ingredient 4</span>
            <span> ingredient 5</span>
            <span> ingredient 6</span>
            <span> ingredient 7</span>
            <p>*insert add ingredient button here*</p>

        </div>

    </div>

        <div className="recipeFormHeaderDiv">
        
        <p><strong>Recipe Name</strong> <br />
        <input type="text" 
        name="Recipe Name" 
        placeholder='Recipe Name' /></p>
        
        <p><strong>T. O. D.</strong> <br />
        <input type="text" 
        name="Time of Day" 
        placeholder='Time of Day / Type of Meal' /></p>
        
        <p><strong>Categories</strong> <br />
        <input type="text" 
        name="Category" 
        placeholder='Category' /></p>
        
        <p><strong>Tell us about it!</strong> <br />
        <textarea
        name="Description" 
        placeholder='Brief Description' /></p>
        

        <button className="submitAR">
            Submit
            </button>
            
        </div>

 </div>

        

        
        </form>

    )
}