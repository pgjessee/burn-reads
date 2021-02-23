import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './ShelfUtil.css';
import { fetch } from '../../store/csrf';
import { v4 } from 'uuid';

export default function ShelfUtil({ defaultShelves, customShelves, userId, bookId }) {
	// this reduce did not work
	const [currentKindlingShelvesObj, setCurrentKindlingShelvesObj] = useState({});
	const [currentDefaultShelves, setCurrentDefaultShelves] = useState(defaultShelves);
	const [defaultShelfOptions, setDefaultShelfOptions] = useState([]);
	const [currentCustomShelves, setCurrentCustomShelves] = useState(customShelves);
	const [customShelfOptions, setCustomShelfOptions] = useState([]);
	const [currentDisplayShelf, setCurrentDisplayShelf] = useState({ shelf_name: bookId });
	const [displayShelfLoaded, setDisplayShelfLoaded] = useState(false);
	const [removeFromShelfBtn, setRemoveFromShelfBtn] = useState(false);
	const [newShelfName, setNewShelfName] = useState('');
	const [reloadShelves, setReloadShelves] = useState(false);
	const [loaded, setLoaded] = useState(true);
	const optionsWrapper = useRef(null);
	const newShelfInput = useRef(null);
	const newShelfBtn = useRef(null);
	const addShelfBtn = useRef(null);
	const history = useHistory();
	let dropdownTimer;

	// gets any updates to book kindling shelves

	useEffect(() => {
		setLoaded(false);
		if (!userId) {
			setCurrentDisplayShelf(currentDefaultShelves[2]);
			setDefaultShelfOptions(currentDefaultShelves.slice(0, 2));
		} else {
			let updatedDefaultShelfOptions = [];
			let noShelfDisplayIdx;
			// sets up defualt shelves for display
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

			// sets up custom shelves for display
			let updatedCustomShelves = currentCustomShelves.map(shelf => {
				if (shelf.shelf_name in currentKindlingShelvesObj) {
					shelf.selected = true;
					return shelf;
				} else {
					shelf.selected = false;
					return shelf;
				}
			});
			setCustomShelfOptions(updatedCustomShelves);
		}

		setLoaded(true);
	}, [
		currentDefaultShelves,
		userId,
		currentKindlingShelvesObj,
		removeFromShelfBtn,
		bookId,
		currentCustomShelves,
	]);

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
		if (currentDisplayShelf.onShelf) {
			const res = await fetch(`/api/shelves/${currentDisplayShelf.id}/${newShelfId}/${bookId}`, {
				method: 'PATCH',
			});
			delete updatedKindlingObj[currentDisplayShelf.shelf_name];
		} else {
			const res = await fetch(`/api/shelves/${newShelfId}/${bookId}`, {
				method: 'POST',
			});
		}
		updatedKindlingObj[newShelfName] = newShelfId;
		setCurrentKindlingShelvesObj(updatedKindlingObj);
		setReloadShelves(true);
	};

	const handleCustomShelfClick = async e => {
		const shelfId = parseInt(e.target.value);
		const { checked } = e.target;
		const shelfName = e.target.getAttribute('data-value');
		let res;
		const updatedKindlingObj = { ...currentKindlingShelvesObj };
		if (checked) {
			res = await fetch(`/api/shelves/${shelfId}/${bookId}`, { method: 'POST' });
			if (res.data) {
				updatedKindlingObj[shelfName] = res.data.kindling_shelf_id;
			}
		} else {
			res = await fetch(`/api/shelves/${shelfId}/${bookId}`, { method: 'DELETE' });
			if (res.data) {
				delete updatedKindlingObj[shelfName];
			}
		}
		setCurrentKindlingShelvesObj(updatedKindlingObj);
		setReloadShelves(true);
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

	const cleanUpNewShelfInput = () => {
		newShelfBtn.current.classList.remove('hide');
		addShelfBtn.current.classList.add('hide');
		newShelfInput.current.classList.add('hide');
		handleMouseLeave();
	};
	const handleNewShelf = async e => {
		e.preventDefault();
		const res = await fetch('/api/shelves/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				shelf_name: newShelfName,
				user_id: userId,
			}),
		});
		const updatedKindlingObj = { ...currentKindlingShelvesObj };
		const updatedCurrentCustomShelves = [...currentCustomShelves, res.data];
		updatedKindlingObj[res.data.shelf_name] = res.data.id;
		setCurrentCustomShelves(updatedCurrentCustomShelves);
		setCurrentKindlingShelvesObj(updatedKindlingObj);
		cleanUpNewShelfInput();
		setReloadShelves(true);
	};

	// displays dropdown when clicking btn
	const handleShelfDropdownBtn = () => {
		cleanUpNewShelfInput();
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
		if (document.activeElement === newShelfInput.current) return;
		dropdownTimer = setTimeout(() => (optionsWrapper.current.style.display = 'none'), 500);
	};

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
						<span className='removeShelfBtnPlaceholder'></span>
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
					{customShelfOptions.map(({ shelf_name, id, selected }) => {
						return (
							<div key={v4()}>
								<form>
									<div className='shelf-optionContainer customShelfOption' value={shelf_name}>
										<input
											id={`check${shelf_name}`}
											type='checkbox'
											defaultChecked={selected}
											onChange={handleCustomShelfClick}
											value={id}
											data-value={shelf_name}
										/>
										<label htmlFor={shelf_name} value={shelf_name}>
											{shelf_name}
										</label>
									</div>
								</form>
							</div>
						);
					})}
					<hr className='blackLine'></hr>
					<div className='newShelfInputContainer'>
						<div
							ref={newShelfBtn}
							className='newShelfInputBtn'
							onClick={() => {
								newShelfBtn.current.classList.add('hide');
								addShelfBtn.current.classList.remove('hide');
								newShelfInput.current.classList.remove('hide');
							}}
						>
							Add a Shelf
						</div>
						<div ref={addShelfBtn} className='addShelfInputBtn hide' onClick={handleNewShelf}>
							Add
						</div>
						<div>
							<form onSubmit={handleNewShelf}>
								<input
									ref={newShelfInput}
									className='newShelfInput hide'
									onChange={e => setNewShelfName(e.target.value)}
									onFocus={() => clearTimeout(dropdownTimer)}
									value={newShelfName}
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	);
}
