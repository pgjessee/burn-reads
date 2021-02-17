import React, { useState, useEffect, useRef } from 'react';
import './ShelfUtil.css';
import { fetch } from '../../store/csrf';

export default function ShelfUtil({ kindlingShelves, shelfNames, userId }) {
	const [shelfOptions, setShelfOptions] = useState([1, 2, 3]);
	const [shelf, setShelf] = useState('Test');
	// const optionsWrapper = useRef(null);

	useEffect(() => {
		setShelfOptions(shelfNames);
	}, [kindlingShelves, shelfNames, userId]);

	const handleShelfDropdownBtn = () => {
		// console.log(optionsWrapper);
	};

	return (
		<div className='shelf-wrapper'>
			<div className='shelf-nameDisplay'>{shelf}</div>
			<div className='shelf-dropdownBtn' onClick={handleShelfDropdownBtn}>
				<i class='fas fa-caret-down'></i>
			</div>
			<div
				className='shelf-optionsWrapper'
				value={shelf}
				ref='optionsWrapper'
				onChange={e => setShelf(e.target.value)}
			>
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
