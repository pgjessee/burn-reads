import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './ShelfUtil.css';
import { fetch } from '../../store/csrf';
import { v4 } from 'uuid';
import { set } from 'js-cookie';

export default function ShelfUtil({
	kindlingShelves,
	defaultShelves,
	customShelves,
	userId,
	bookId,
}) {
	// this reduce did not work
	// const [currentKindlingShelvesObj, setCurrentKindlingShelvesObj] = useState(
	// 	kindlingShelves.reduce((kindlingShelfObj, { name, id }) => (kindlingShelfObj[name] = id), {})
	// );
	const [currentDefaultShelves, setCurrentDefaultShelves] = useState(defaultShelves);
	const [currentCustomShelves, setCurrentCustomShelves] = useState(customShelves);
	const [currentDisplayShelf, setCurrentDisplayShelf] = useState({ shelf_name: 'test' });

	const [defaultShelfOptions, setDefaultShelfOptions] = useState([]);
	const [customShelfOptions, setCustomShelfOptions] = useState([]);
	const [reload, setReload] = useState(false);
	const [loaded, setLoaded] = useState(true);
	const optionsWrapper = useRef(null);
	const history = useHistory();
	let dropdownTimer;

	// gets any updates to book kindling shelves
	useEffect(() => {
		const obj = {};
		let res = fetch(`/api/shelves/${bookId}/${userId || 0}`);
		// setCurrentKindlingShelvesObj(obj);
		// console.log(res.data);
	}, [bookId, userId]);

	/*
	useEffect(() => {
		setLoaded(false);
		if (!sessionUserId) {
			setCurrentDisplayShelf(currentDefaultShelves[2]);
			setDefaultShelfOptions(currentDefaultShelves.slice(0, 2));
		} else {
			console.log('default shelevs ', currentDefaultShelves);
			console.log('kindling obj ', currentKindlingShelvesObj);
			let updatedDefaultShelfOptions = [];
			let noShelfDisplayIdx;
			currentDefaultShelves.forEach((shelf, idx) => {
				if (shelf.shelf_name === 'Want to Torch') {
					noShelfDisplayIdx = idx;
				}
				if (shelf.shelf_name in currentKindlingShelvesObj) {
					shelf.onShelf = true;
					setCurrentDisplayShelf(shelf);
				} else {
					shelf.onShelf = false;
					updatedDefaultShelfOptions.push(shelf);
				}
			});
			// if book is not on any she
			if (updatedDefaultShelfOptions.length === 3) {
				setCurrentDisplayShelf(...updatedDefaultShelfOptions.splice(noShelfDisplayIdx, 1));
			}

			setDefaultShelfOptions(updatedDefaultShelfOptions);
		}

		setLoaded(true);
	}, [currentDefaultShelves, sessionUserId, currentKindlingShelvesObj]);

	const handleDisplayShelfClick = async e => {
		if (!sessionUserId) history.push('/login');
		console.log(bookId);
		console.log(currentDisplayShelf);
		const newKindlingBook = {};
		newKindlingBook[currentDisplayShelf.shelf_name] = currentDisplayShelf.id;
		setCurrentKindlingShelvesObj({ ...currentKindlingShelvesObj, ...newKindlingBook });
		if (!currentDisplayShelf.onShelf) {
			//create new kindling book on displayed shelf
			// setCurrentKindlingShelvesObj({});
			// console.log(newObj);
			// newObj[currentDisplayShelf.shelf_name] = currentDisplayShelf.id;
			// setCurrentKindlingShelvesObj(newObj);
			// let res = await fetch(`/api/shelves/${currentDisplayShelf.id}/${bookId}`, {
			// 	method: 'POST',
			// });
		}
		// delete updatedKindlingShelfObj.
	};
	const handleDefaultShelfOptionClick = () => {
		if (!sessionUserId) history.push('/login');
	};

*/

	// const setupDefaultShelves = kindlingShelfObj => {
	// 	//check if book is on any default shelves
	// 	let CurShelfIdx;
	// 	let unselectedDefaultShelves = [];
	// 	for (let i = 0; i < defaultShelves.length; i++) {
	// 		let shelf = defaultShelves[i];
	// 		if (shelf.shelf_name in kindlingShelfObj) {
	// 			console.log(shelf.shelf_name);
	// 			shelf.onShelf = true;
	// 			CurShelfIdx = i;
	// 			setCurrentDisplayShelf(shelf);
	// 		} else {
	// 			unselectedDefaultShelves.push(shelf);
	// 		}
	// 	}

	// 	if (!CurShelfIdx) {
	// 		// if book isn't on any kindling shelves
	// 		setDefaultShelfOptions(unselectedDefaultShelves.slice(0, 2));
	// 		// console.log(unselectedDefaultShelves[1]);
	// 		setCurrentDisplayShelf(unselectedDefaultShelves[2]);
	// 	}
	// };

	// useEffect(() => {
	// 	setLoaded(false);
	// 	//create obj of users shelves for this book to check if user has put book in default shelf
	// 	let kindlingShelfObj = {};
	// 	console.log('these are the current kindling shelves', curKindlingShelves);
	// 	curKindlingShelves.forEach(({ name, id }) => (kindlingShelfObj[name] = id));
	// 	setupDefaultShelves(kindlingShelfObj);

	// 	//check if book is on any of users custom shelves and set state
	// 	let selectedCustomShelves = customShelves.map(shelf => {
	// 		if (shelf.name in kindlingShelfObj) {
	// 			shelf.selected = true;
	// 			return shelf;
	// 		} else {
	// 			shelf.selected = false;
	// 			return shelf;
	// 		}
	// 	});
	// 	setCustomShelfOptions(selectedCustomShelves);

	// 	setLoaded(true);
	// }, [kindlingShelves, customShelves, userId, reload]);

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

	// const handleCurShelfClick = async e => {
	// 	if (!sessionUserId) history.push('/login');
	// 	// if the displayed shelf is not a kindling book
	// 	if (!currentDisplayShelf.onShelf) {
	// 		// const shelfId = defaultShelves.reduce((shelfId, { shelf_name, id }) => {
	// 		// 	if (shelf_name === 'Want to Torch') return (shelfId = id);
	// 		// 	return shelfId;
	// 		// });
	// 		let res = await fetch(`/api/shelves/${currentDisplayShelf.id}/${bookId}`, {
	// 			method: 'POST',
	// 		});

	// 		const selectedCurrentDisplayShelf = currentDisplayShelf;
	// 		// kindledCurShelf.id = shelfId;
	// 		selectedCurrentDisplayShelf.onShelf = true;
	// 		kindlingShelves.push(selectedCurrentDisplayShelf);
	// 		setCurrentDisplayShelf(selectedCurrentDisplayShelf);
	// 		setReload(true);
	// 	}
	// };

	// const handleDefaultShelfClick = async e => {
	// 	if (!sessionUserId) history.push('/login');
	// 	const newShelfName = e.target.getAttribute('data-value');
	// 	const newShelfId = parseInt(e.target.getAttribute('data-shelfid'));
	// 	if (currentDisplayShelf.onShelf) {
	// 		//book is on a default shelf
	// 		const oldShelfId = currentDisplayShelf.id;
	// 		let res = await fetch(`/api/shelves/${oldShelfId}/${newShelfId}/${bookId}`, {
	// 			method: 'PATCH',
	// 		});
	// 		setCurKindlingShelves([...curKindlingShelves, res.data]);
	// 	} else {
	// 		// no preivous default shelf selected
	// 		let res = await fetch(`/api/shelves/${newShelfId}/${bookId}`, {
	// 			method: 'POST',
	// 		});
	// 		setCurKindlingShelves([...curKindlingShelves, res.data]);
	// 	}

	// 	// //set up unselected default shelves
	// 	// const newUnselectedDefaultShelves = defaultShelfOptions.map(shelf => {
	// 	// 	const { shelf_name } = shelf;

	// 	// 	if (shelf_name === newShelfName) {
	// 	// 		shelf = {
	// 	// 			shelf_name: currentDisplayShelf.shelf_name,
	// 	// 			id: currentDisplayShelf.id,
	// 	// 			onShelf: true,
	// 	// 		};
	// 	// 	}
	// 	// 	return shelf;
	// 	// });
	// 	// setDefaultShelfOptions(newUnselectedDefaultShelves);

	// 	//update kindling shelves
	// 	const updatedKindlingShelves = curKindlingShelves.filter(({ shelf_name }) => {
	// 		if (shelf_name === currentDisplayShelf.shelf_name) {
	// 			return false;
	// 		}
	// 		return true;
	// 	});

	// 	setCurKindlingShelves(updatedKindlingShelves);
	// 	// setCurrentDisplayShelf({ shelf_name: newShelfName,id: newShelfId,onShelf: true });
	// 	setReload(true);
	// };

	return (
		loaded && (
			<div key={`shelfSelector${bookId}`} className='shelf-wrapper'>
				<div
					className='shelf-nameDisplay'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					// onClick={handleDisplayShelfClick}
				>
					{currentDisplayShelf?.onShelf ? <i className='fas fa-check'></i> : <span></span>}
					{currentDisplayShelf?.shelf_name.length > 13
						? `${currentDisplayShelf?.shelf_name.slice(0, 13)}...`
						: currentDisplayShelf?.shelf_name}
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
								data-shelfid={id}
								key={v4()}
								// onClick={handleDefaultShelfOptionClick}
							>
								{shelf_name}
							</div>
						);
					})}
					{customShelfOptions.map(({ shelf_name, id }) => {
						return (
							<form key={v4()}>
								<div className='shelf-optionContainer customShelfOption' value={shelf_name}>
									<input id={`check${shelf_name}`} type='checkbox' data-shelfid={`${id}`} />
									<label htmlFor={`check${shelf_name}`}>{shelf_name}</label>
								</div>
							</form>
						);
					})}
				</div>
			</div>
		)
	);
}
