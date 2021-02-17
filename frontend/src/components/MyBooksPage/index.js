import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserBook from './UserBook';

import { fetch } from '../../store/csrf';
import './MyBooksPage.css';

const MyBooksPage = () => {
	const sessionUser = useSelector(state => state.session.user);

	// const [userBooks, setUserBooks] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [allBooks, setAllBooks] = useState([]);
	const [userShelfBooks, setUserShelfBooks] = useState([]);
	const [customShelves, setCustomShelves] = useState([]);
	const [torchings, setTorchings] = useState({});
	const [torched, setTorched] = useState({});
	const [wantToTorch, setWantToTorch] = useState({});

	let allUserBooks = [];

	useEffect(() => {
		(async () => {
			const res = await fetch(`/api/shelves/${sessionUser.id}`);

			const { fullDefaultKindlingShelves, fullCustomKindlingShelves } = res.data;
			setCustomShelves(fullCustomKindlingShelves);
			let userBooks = fullDefaultKindlingShelves;
			let shelfBooks;
			for (let i = 0; i < userBooks.length; i++) {
				let el = userBooks[i];

				if (el.shelf_name === 'Torching') {
					shelfBooks = el.books;
					allUserBooks.push(...shelfBooks);

					setTorchings(el);
				}

				if (el.shelf_name === 'Torched') {
					shelfBooks = el.books;
					allUserBooks.push(...shelfBooks);

					setTorched(el);
				}

				if (el.shelf_name === 'Want to Torch') {
					shelfBooks = el.books;
					allUserBooks.push(...shelfBooks);

					setWantToTorch(el);
				}
			}

			setAllBooks(allUserBooks);
			setUserShelfBooks(allUserBooks);
			setLoaded(true);
		})();
	}, []);

	let handleShelfClick = shelf => {
		setAllBooks(shelf.books);
		document.getElementById('mybooks-header').innerHTML = shelf.shelf_name + ' Shelf';
	};

	let listAllBooks = () => {
		setAllBooks(userShelfBooks);
		document.getElementById('mybooks-header').innerHTML = 'My Inferno';
	};

	return (
		loaded && (
			<div className='mybooks-page-container'>
				<div id='mybooks-header'>My Inferno</div>
				<div className='mybooks-container'>
					<div className='mybooks-body-container'>
						<div className='mybooks-shelves-container'>
							<div className='default-shelves-container'>
								<div className='shelves-section-header'>Kindling Shelves</div>
								<div className='shelf-div' onClick={() => listAllBooks()}>
									All ({userShelfBooks.length})
								</div>
								<div className='shelf-div' onClick={() => handleShelfClick(torched)}>
									Torched ({torched.books.length})
								</div>
								<div className='shelf-div' onClick={() => handleShelfClick(torchings)}>
									Torching ({torchings.books.length})
								</div>
								<div className='shelf-div' onClick={() => handleShelfClick(wantToTorch)}>
									Want to Torch ({wantToTorch.books.length})
								</div>
							</div>
							<div className='custom-shelves-container'>
								{customShelves.map(customShelf => {
									return (
										<div className='custom-shelf-container' key={customShelf.id}>
											<div className='custom-shelf' onClick={() => handleShelfClick(customShelf)}>
												{customShelf.shelf_name} ({customShelf.books.length})
											</div>
										</div>
									);
								})}
							</div>
							<div className='add-shelf-div'>Shelf Creator Goes Here</div>
						</div>
					</div>
					<div className='mybooks-table-container'>
						<table>
							<thead className='mybooks-table-header'>
								<tr>
									<th className='mybooks-cover-column'>cover</th>
									<th className='mybooks-title-column'>title</th>
									<th className='mybooks-authors-column'>author(s)</th>
									<th className='mybooks-fire-rating-column'>fire rating</th>
									<th className='mybooks-burn-review-column'>burn review</th>
								</tr>
							</thead>
							<tbody>
								{allBooks.map(userBook => {
									return <UserBook key={userBook.id} userBook={userBook} />;
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	);
};

export default MyBooksPage;
