import React, { useState, useEffect, useRef } from 'react';
import './ShelfUtil.css';
import { fetch } from '../../store/csrf';
import { v4 } from 'uuid';

export default function ShelfUtil({ kindlingShelves, customShelfNames, userId, bookId }) {
	const [currentShelf, setCurrentShelf] = useState('Want To Torch');
	const [defaultShelves, setDefaultShelves] = useState(['Want To Torch', 'Torching', 'Will Torch']);
	const [customShelves, setCustomShelves] = useState([]);
	const optionsWrapper = useRef(null);
	let dropdownTimer;

	useEffect(() => {
		//create obj of users shelves for this book to check if user has put book in default shelf
		let kindlingShelfObj = {};
		kindlingShelves.forEach(({ name }) => (kindlingShelfObj[name] = 'select'));
		let unselectedDefaultShelves = defaultShelves.filter(shelf => {
			if (shelf in kindlingShelfObj) {
				setCurrentShelf(shelf);
				return false;
			}
			return true;
		});
		setDefaultShelves(unselectedDefaultShelves);

		//check if book is on any of users custom shelves and set state
		let selectedCustomShelves = customShelfNames.map(shelf => {
			if (shelf.name in kindlingShelfObj) {
				shelf.selected = true;
				return shelf;
			} else {
				shelf.selected = false;
				return shelf;
			}
		});
		setCustomShelves(selectedCustomShelves);
	}, [kindlingShelves, customShelfNames, userId]);

	// clisk on and off the drop down user clicks
	const handleShelfDropdownBtn = () => {
		optionsWrapper.current.style.display === 'none'
			? (optionsWrapper.current.style.display = 'block')
			: (optionsWrapper.current.style.display = 'none');
	};

	const handleMouseEnter = () => {
		if (optionsWrapper.current.style.display === 'block') {
			clearTimeout(dropdownTimer);
		} else {
			optionsWrapper.current.style.display = 'block';
			clearTimeout(dropdownTimer);
		}
	};

	const handleMouseLeave = () => {
		dropdownTimer = setTimeout(() => (optionsWrapper.current.style.display = 'none'), 500);
	};

	return (
		<div key={`shelfSelector${bookId}`} className='shelf-wrapper'>
			<div
				className='shelf-nameDisplay'
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{currentShelf.length > 13 ? `${currentShelf.slice(0, 13)}...` : currentShelf}
			</div>
			<div
				className='shelf-dropdownBtn'
				// stopes timer to close drop down if user moves mouse back in
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleShelfDropdownBtn}
			>
				<i className='fas fa-caret-down'></i>
			</div>
			<div
				className='shelf-optionsWrapper'
				ref={optionsWrapper}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{defaultShelves.map(shelf_name => {
					return (
						<div className='shelf-optionContainer' value={shelf_name} key={v4()}>
							{shelf_name}
						</div>
					);
				})}
				{customShelves.map(shelf => {
					return (
						<form key={v4()}>
							<div className='shelf-optionContainer customShelfOption' value={shelf.shelf_name}>
								<input id={`check${shelf.shelf_name}`} type='checkbox' />
								<label for={`check${shelf.shelf_name}`}>{shelf.shelf_name}</label>
							</div>
						</form>
					);
				})}
			</div>
		</div>
	);
}
