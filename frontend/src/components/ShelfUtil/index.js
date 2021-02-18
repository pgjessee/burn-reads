import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './ShelfUtil.css';
import { fetch } from '../../store/csrf';
import { v4 } from 'uuid';

export default function ShelfUtil({
	kindlingShelves,
	defaultShelves,
	customShelves,
	userId,
	bookId,
	sessionUserId,
}) {
	const [currentShelf, setCurrentShelf] = useState({ shelf_name: 'Want To Torch' });
	const [defaultShelfOptions, setDefaultShelfOptions] = useState([]);
	const [customShelfOptions, setCustomShelfOptions] = useState([]);
	const optionsWrapper = useRef(null);
	const history = useHistory();
	let dropdownTimer;

	useEffect(() => {
		//create obj of users shelves for this book to check if user has put book in default shelf
		let kindlingShelfObj = {};
		kindlingShelves.forEach(({ name, id }) => (kindlingShelfObj[name] = id));

		//check if book is on any default shelves
		let unselectedDefaultShelves = [];
		for (let i = 0; i < defaultShelves.length; i++) {
			let shelf = defaultShelves[i];
			if (shelf.shelf_name in kindlingShelfObj) {
				setCurrentShelf(shelf);
			} else {
				unselectedDefaultShelves.push(shelf);
			}
		}
		if (currentShelf.shelf_name === 'Want To Torch') {
			setDefaultShelfOptions(unselectedDefaultShelves.slice(0, 2));
		} else {
			setDefaultShelfOptions(unselectedDefaultShelves);
		}

		//check if book is on any of users custom shelves and set state
		let selectedCustomShelves = customShelves.map(shelf => {
			if (shelf.name in kindlingShelfObj) {
				shelf.selected = true;
				return shelf;
			} else {
				shelf.selected = false;
				return shelf;
			}
		});
		setCustomShelfOptions(selectedCustomShelves);
	}, [kindlingShelves, customShelves, userId]);

	// displays dropdown when clicking btn
	const handleShelfDropdownBtn = () => {
		optionsWrapper.current.style.display === 'none'
			? (optionsWrapper.current.style.display = 'block')
			: (optionsWrapper.current.style.display = 'none');
	};

	// adds feature that dropdown will not immediately dissappear when mouse leaves
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

	const handleDefaultShelfClick = async e => {
		if (!sessionUserId) history.push('/login');
		let shelf_name = e.target.getAttribute('data-value');
		let id = e.target.getAttribute('data-shelfId');
		let res = await fetch(`/api/shelves/${id}/${bookId}`, {
			method: 'PATCH',
		});

		if (res.ok) {
			setCurrentShelf({ shelf_name, id });
			res = await fetch(`/api/shelves/${id}/${bookId}`, {
				method: 'POST',
			});
		}
	};

	return (
		<div key={`shelfSelector${bookId}`} className='shelf-wrapper'>
			<div
				className='shelf-nameDisplay'
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{currentShelf.id ? <i className='fas fa-check'></i> : <span></span>}
				{currentShelf.shelf_name.length > 13
					? `${currentShelf.shelf_name.slice(0, 13)}...`
					: currentShelf.shelf_name}
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
				{defaultShelfOptions.map(({ shelf_name, id }) => {
					return (
						<div
							className='shelf-optionContainer'
							data-value={shelf_name}
							data-shelfId={id}
							key={v4()}
							onClick={handleDefaultShelfClick}
						>
							{shelf_name}
						</div>
					);
				})}
				{customShelfOptions.map(({ shelf_name, id }) => {
					return (
						<form key={v4()}>
							<div className='shelf-optionContainer customShelfOption' value={shelf_name}>
								<input id={`check${shelf_name}`} type='checkbox' data-shelfId={`${id}`} />
								<label htmlFor={`check${shelf_name}`}>{shelf_name}</label>
							</div>
						</form>
					);
				})}
			</div>
		</div>
	);
}
