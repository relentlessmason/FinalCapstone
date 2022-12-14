import React, { useState, useEffect } from "react";
import "./GroceryList.css";
import * as FaIcons from "react-icons/fa";

function RenderIngredients({ meal, mealPlan }) {
  let eachIngredient = [];
  

 meal.map((m)=>{
  mealPlan.map((mp)=>{
    let ingredients = m.ingredients.split(/\s+/);
    let matching = mp.mealId==m.id;
    if(matching){
      eachIngredient.push(...ingredients)
    }
  })
 })

  const ingredient = eachIngredient.map((ingredient) => {
    return (
      <>
        <div className="item-container">
          <div className="item-name">
            <FaIcons.FaCircle />
            <span className="">{ingredient}</span>
          </div>
        </div>
      </>
    );
  });
  return ingredient;
}

const GroceryList = (props) => {
  // HINT: each "item" in our list names a name,
  // a boolean to tell if its been completed, and a quantity

  const [items, setItems] = useState([
    // { itemName: '', quantity: 0, isSelected: false }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [startingIngredients, setStartingIngredients] = useState([]);

  let eachIngredient = [];
  

 props.meal.meal.map((m)=>{
  props.mealPlan.mealPlan.map((mp)=>{
    let ingredients = m.ingredients.split(/\s+/);
    let matching = mp.mealId==m.id;
    if(matching){
      eachIngredient.push(...ingredients)
    }
  })
 })
 

  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setInputValue("");
    //calculateTotal();
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
    //calculateTotal();
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity--;

    setItems(newItems);
    //calculateTotal();
  };

  const toggleComplete = (index) => {
    const newItems = [...items];

    newItems[index].isSelected = !newItems[index].isSelected;

    setItems(newItems);
  };

  // const calculateTotal = () => {
  // 	const totalItemCount = items.reduce((total, item) => {
  // 		return total + item.quantity;
  // 	}, 0);

  // 	setTotalItemCount(totalItemCount);
  // };

  return (
    <div className="app-background mt-4">
      <div className="main-container">
        <h1>Shopping List</h1>
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-item-input"
            placeholder="add an item..."
          />
          <FaIcons.FaPlus onClick={() => handleAddButtonClick()} />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name" onClick={() => toggleComplete(index)}>
                {item.isSelected ? (
                  <>
                    <FaIcons.FaCheckCircle />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FaIcons.FaCircle />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className="quantity">
                <button>
                  <FaIcons.FaChevronLeft
                    onClick={() => handleQuantityDecrease(index)}
                  />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FaIcons.FaChevronRight
                    onClick={() => handleQuantityIncrease(index)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <RenderIngredients
          items={items}
          setItems={setItems}
          meal={props.meal.meal}
          mealPlan={props.mealPlan.mealPlan}
        />
        {/* <div className='total'>Total: {totalItemCount}</div> */}
        <button type="submit" className="submit" onClick={window.print}>
          Print
        </button>
      </div>
    </div>
  );
};

export default GroceryList;
