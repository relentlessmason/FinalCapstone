import React from "react";
import placeholder from "./Plain_onigiri.png";

export default function AddRecipe(){
    return(
        
        <form>
        <div className="wrapper">
        <div className="RecipeImgDiv">
        <p><img src= {placeholder} //generic image
        className='recipeImg' /></p></div>

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
        

        <button className="submit">
            Submit</button>
            </div>
            </div>

        <div className="ingredients">

            
        </div>
        </form>

    )
}