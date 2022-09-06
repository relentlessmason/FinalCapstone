import React from "react";

export default function AddRecipe(){
    return(
        
        <form>
    <div className="RecipeImgDiv">
        <p><img src= "../public/logo192.png" 
        placeholder="placeholder" width='100px' className='recipeImg' /></p></div>
<div className="RecipeInputHead">
        <p><input type="text" 
        name="Recipe Name" 
        placeholder='Recipe Name' /></p>
        
        <p><input type="text" 
        name="Time of Day" 
        placeholder='Time of Day / Type of Meal' /></p>
        
        <p><input type="text" 
        name="Category" 
        placeholder='Category' /></p>
        
        <p><textarea
        name="Description" 
        placeholder='Brief Description' /></p>
        

        <button>Submit</button></div>

        </form>

    )
}