import React, { useState, useEffect, useRef } from 'react';
import './ShelfUtil.css';
import { fetch } from '../../store/csrf';

export default function ShelfUtil({ kindlingShelves, shelfNames, userId, bookId }) {
	const [shelfOptions, setShelfOptions] = useState([1, 2, 3]);
	const [currentShelf, setCurrentShelf] = useState('Want To Torch');
	const optionsWrapper = useRef(null);
	let dropdownTimer;
	useEffect(() => {
		setShelfOptions(shelfNames);
	}, [kindlingShelves, shelfNames, userId]);

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
				{shelfNames.map(({ shelf_name, userId }) => {
					return (
						<div className='shelf-optionContainer' value={shelf_name} id={`${shelf_name}`}>
							{shelf_name}
						</div>
					);
				})}
			</div>
		</div>
	);
}
