import React from 'react'
import './Recipes.css'


class randomRecipeCard{

}

export default function RandomRecipe() {
    return(
        <div className='randomRecipe'>
            <button className="submitAR " onclick={randomRecipeCard}>
                Need a Recipe Idea?
            </button>
        </div>
    )
}