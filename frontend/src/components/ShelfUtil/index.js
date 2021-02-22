import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './ShelfUtil.css';
import { fetch } from '../../store/csrf';
import { v4 } from 'uuid';

export default function ShelfUtil({ defaultShelves, customShelves, userId, bookId }) {
	// this reduce did not work
	const [currentKindlingShelvesObj, setCurrentKindlingShelvesObj] = useState({});
	const [removeFromShelfBtn, setRemoveFromShelfBtn] = useState(false);
	const [currentDefaultShelves, setCurrentDefaultShelves] = useState(defaultShelves);
	const [currentCustomShelves, setCurrentCustomShelves] = useState(customShelves);
	const [currentDisplayShelf, setCurrentDisplayShelf] = useState({ shelf_name: bookId });
	const [displayShelfLoaded, setDisplayShelfLoaded] = useState(false);
	const [defaultShelfOptions, setDefaultShelfOptions] = useState([]);
	const [reloadShelves, setReloadShelves] = useState(false);
	const [customShelfOptions, setCustomShelfOptions] = useState([]);
	const [loaded, setLoaded] = useState(true);
	const optionsWrapper = useRef(null);
	const history = useHistory();
	let dropdownTimer;

	// gets any updates to book kindling shelves

	useEffect(() => {
		setLoaded(false);

		if (!userId) {
			setCurrentDisplayShelf(currentDefaultShelves[2]);
			setDefaultShelfOptions(currentDefaultShelves.slice(0, 2));
		} else {
			console.log(bookId);
			console.log('default shelevs ', currentDefaultShelves);
			console.log('kindling obj ', currentKindlingShelvesObj);
			let updatedDefaultShelfOptions = [];
			let noShelfDisplayIdx;
			currentDefaultShelves.forEach((shelf, idx) => {
				// gets index of want to torch shelf in case book not on any default shelves
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
			// if book is not on any shelf
			if (updatedDefaultShelfOptions.length === 3) {
				setCurrentDisplayShelf(...updatedDefaultShelfOptions.splice(noShelfDisplayIdx, 1));
			}

			setDefaultShelfOptions(updatedDefaultShelfOptions);
		}

		setLoaded(true);
	}, [currentDefaultShelves, userId, currentKindlingShelvesObj, removeFromShelfBtn, bookId]);

	//gets kindliing shelves for book
	useEffect(() => {
		setDisplayShelfLoaded(false);
		(async () => {
			const obj = {};
			let res = await fetch(`/api/shelves/${bookId}/${userId || 0}`);
			res.data.forEach(shelf => {
				obj[shelf.name] = shelf.id;
			});

			setCurrentKindlingShelvesObj(obj);
			setDisplayShelfLoaded(true);
		})();
	}, [bookId, userId, reloadShelves]);

	const handleDisplayShelfClick = async e => {
		if (!userId) history.push('/login');

		if (!currentDisplayShelf.onShelf) {
			// book is not on any default shelf
			const newKindlingBook = {};
			newKindlingBook[currentDisplayShelf.shelf_name] = currentDisplayShelf.id;
			let res = await fetch(`/api/shelves/${currentDisplayShelf.id}/${bookId}`, {
				method: 'POST',
			});
			setCurrentKindlingShelvesObj({ ...currentKindlingShelvesObj, ...newKindlingBook });
		} else {
		}
	};
	const handleDefaultShelfOptionClick = async e => {
		if (!userId) history.push('/login');
		const newShelfName = e.target.getAttribute('data-value');
		const newShelfId = parseInt(e.target.getAttribute('data-shelfid'));
		const updatedKindlingObj = { ...currentKindlingShelvesObj };

		// there is a book already on a default shelf so we need to remove it
		console.log(`current display is on shelf: ${currentDisplayShelf.onShelf}
    bookId: ${bookId}
    `);
		if (currentDisplayShelf.onShelf) {
			const res = await fetch(`/api/shelves/${currentDisplayShelf.id}/${newShelfId}/${bookId}`, {
				method: 'PATCH',
			});
			console.log('patch response', res.data);
			delete updatedKindlingObj[currentDisplayShelf.shelf_name];
		} else {
			const res = await fetch(`/api/shelves/${newShelfId}/${bookId}`, {
				method: 'POST',
			});
			console.log('patch response', res.data);
		}
		updatedKindlingObj[newShelfName] = newShelfId;
		console.log('updated Kindling Obj', updatedKindlingObj);
		setCurrentKindlingShelvesObj(updatedKindlingObj);
		// setReloadShelves(true);
	};

	const handleRemoveFromShelf = async () => {
		const res = await fetch(`/api/shelves/${currentDisplayShelf.id}/${bookId}`, {
			method: 'DELETE',
		});
		if (res.data) {
			const updatedKindlingObj = { ...currentKindlingShelvesObj };
			delete updatedKindlingObj[setCurrentDisplayShelf.shelf_name];
			setCurrentKindlingShelvesObj(updatedKindlingObj);
			setReloadShelves(true);
		}
	};

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

	// const handleDefaultShelfClick = async e => {
	//
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
					onClick={handleDisplayShelfClick}
					style={currentDisplayShelf?.onShelf ? { cursor: 'default' } : {}}
				>
					{displayShelfLoaded && currentDisplayShelf?.onShelf ? (
						<div
							className='removeShelfBtn'
							onMouseOver={() => setRemoveFromShelfBtn(true)}
							onMouseLeave={() => setRemoveFromShelfBtn(false)}
						>
							{!removeFromShelfBtn ? (
								<i className='fas fa-check' onClick={handleRemoveFromShelf}></i>
							) : (
								<i className='fas fa-times' onClick={handleRemoveFromShelf}></i>
							)}
						</div>
					) : (
						<span></span>
					)}
					{displayShelfLoaded ? (
						currentDisplayShelf.shelf_name.length > 13 ? (
							`${currentDisplayShelf.shelf_name.slice(0, 13)}...`
						) : (
							currentDisplayShelf.shelf_name
						)
					) : (
						<span></span>
					)}
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
								onClick={handleDefaultShelfOptionClick}
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
