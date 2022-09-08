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
            <h4>Don't forget the ingredients!</h4>
            <input type="text" name="ingredient" placeholder="Ingredient 1"/>
            <input type="text" name="ingredient" placeholder="Ingredient 2"/>
            <input type="text" name="ingredient" placeholder="Ingredient 3"/>
            <input type="text" name="ingredient" placeholder="Ingredient 4"/>
            <input type="text" name="ingredient" placeholder="Ingredient 5"/>
            <input type="text" name="ingredient" placeholder="Ingredient 6"/>
            <input type="text" name="ingredient" placeholder="Ingredient 7"/>
            <button className="submitAR" type="button">Add Ingredient</button>

        </div>

    </div>

        <div className="recipeFormHeaderDiv">
        
        <label>Recipe Name</label>
        <input type="text" 
        name="Recipe Name" 
        placeholder='Recipe Name' />
        
        <label>T. O. D.</label>

        <select value="TimeOfDay" className="TimeOfDay">
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Snack">Snack</option>
        <option value="Dinner">Dinner</option>
        </select>
        
        <label>Categories</label>
        <input type="text" 
        name="Category" 
        placeholder='Category' />
        
        <label>Tell us about it!</label>
        <textarea
        name="Description" 
        placeholder='Brief Description' />
        

        <button className="submitAR">
            Submit
            </button>
            
        </div>

 </div>

        

        
        </form>

    )
}