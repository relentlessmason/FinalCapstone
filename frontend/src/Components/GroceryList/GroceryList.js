import React, { useState, useEffect } from 'react';
import './GroceryList.css';
import * as FaIcons from "react-icons/fa";

const GroceryList = () => {
	// HINT: each "item" in our list names a name,
	// a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([
		// { itemName: '', quantity: 0, isSelected: false }
	]);

	const [inputValue, setInputValue] = useState('');
	const [totalItemCount, setTotalItemCount] = useState(0);

	const handleAddButtonClick = () => {
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};

		const newItems = [...items, newItem];

		setItems(newItems);
		setInputValue('');
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
		<div className='app-background'>
			<div className='main-container'>
                <h1>Shopping List</h1>
				<div className='add-item-box'>
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='add an item...' />
					<FaIcons.FaPlus onClick={() => handleAddButtonClick()} />
				</div>
				<div className='item-list'>
					{items.map((item, index) => (
						<div className='item-container'>
							<div className='item-name' onClick={() => toggleComplete(index)}>
								{item.isSelected ? (
									<>
										<FaIcons.FaCheckCircle />
										<span className='completed'>{item.itemName}</span>
									</>
								) : (
									<>
										<FaIcons.FaCircle />
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div className='quantity'>
								<button>
									<FaIcons.FaChevronLeft onClick={() => handleQuantityDecrease(index)} />
								</button>
								<span> {item.quantity} </span>
								<button>
									<FaIcons.FaChevronRight onClick={() => handleQuantityIncrease(index)} />
								</button>
							</div>
						</div>
					))}
				</div>
                {/* <div className='total'>Total: {totalItemCount}</div> */}
                <button type="submit" className="submit">
          Print
        </button>
				
			</div>
		</div>
	);
};

export default GroceryList;