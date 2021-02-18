import React, { useState, useEffect, useRef } from 'react';
import './ShelfUtil.css';
import { fetch } from '../../store/csrf';

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
				setCurrentShelf(shelf.shelf_name);
				return;
			}
			return shelf;
		});
		setDefaultShelfOptions(unselectedDefaultShelves);

		//check if book is on any of users custom shelves and set state
		let selectedCustomShelves = customShelfNames.map(shelf => {
			if (shelf.name in kindlingShelfObj) {
				shelf.selected = true;
			} else {
				shelf.selected = false;
			}
		});
		setCustomShelves(selectedCustomShelves);
	}, [kindlingShelves, customShelfNames, userId]);

	const handleShelfDropdownBtn = () => {
		if (optionsWrapper.current.style.display === 'none') {
			optionsWrapper.current.style.display = 'block';
		} else {
			optionsWrapper.current.style.display = 'none';
		}
	};

	return (
		<div
			key={`shelfSelector${bookId}`}
			className='shelf-wrapper'
			onMouseEnter={() => {
				if ((optionsWrapper.current.style.display = 'block')) {
					clearTimeout(dropdownTimer);
				}
			}}
			onMouseLeave={() => {
				dropdownTimer = setTimeout(() => (optionsWrapper.current.style.display = 'none'), 500);
			}}
		>
			<div className='shelf-nameDisplay'>
				{currentShelf.length > 13 ? `${currentShelf.slice(0, 13)}...` : currentShelf}
			</div>
			<div
				className='shelf-dropdownBtn'
				onMouseEnter={() => (optionsWrapper.current.style.display = 'block')}
				onClick={handleShelfDropdownBtn}
			>
				<i className='fas fa-caret-down'></i>
			</div>
			<div className='shelf-optionsWrapper' ref={optionsWrapper}>
				{defaultShelves.map(shelf_name => {
					return (
						<div
							className='shelf-optionContainer'
							value={shelf_name}
							key={`${shelf_name}${bookId}`}
						>
							{shelf_name}
						</div>
					);
				})}
				{customShelves.map(shelf => {
					return (
						<form>
							<div
								className='shelf-optionContainer'
								value={shelf.name}
								key={`${shelf.name}${bookId}`}
              >
                <input type='checkbox'
              </div>
						</form>
					);
				})}
			</div>
		</div>
	);
}
