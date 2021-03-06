import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';


import { fetch } from '../../store/csrf';
import BookBurn from './BurnsList';
import ShelfUtil from '../ShelfUtil'
import './BookProfilePage.css';

function BookProfilePage() {
	const { googleBookId } = useParams();
	const history = useHistory();

	const sessionUser = useSelector(state => state.session.user);
	const [googleBook, setBook] = useState('');
	const [bookBurns, setBurns] = useState([]);
	const [authors, setAuthors] = useState('');
	const [reviewsLink, setReviewsLink] = useState('');
	const [defaultShelves, setDefaultShelves] = useState([]);
	const [customShelves, setCustomShelves] = useState([]);
	const [allShelves, setAllShelves] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			let res = await fetch(`/api/books/${googleBookId}/${sessionUser?.id || 0}`);
			const data = res.data;
			const { book, burns } = data;

			let bookAuthors = book.authors;
			bookAuthors = bookAuthors.length === 1 ? bookAuthors[0] : bookAuthors.join(', ');
			const writeBurn = `/${googleBookId}/reviews`;
			setBook(book);
			setBurns(burns);
			setAuthors(bookAuthors);
			setReviewsLink(writeBurn);
			res = await fetch(`/api/shelves/shelf-names/${sessionUser?.id || 0}`);

			setDefaultShelves(res.data.slice(0, 3));
			setCustomShelves(res.data.slice(3, res.data.length + 1));
			setAllShelves(defaultShelves.concat(customShelves))
			setLoaded(true)
		})();
	}, [sessionUser]);

	const handleUser = (e) => {
		if (!sessionUser) {
			e.preventDefault();
			history.push('/login')
		}
	};

	const handleBurns = (e) => {
		e.preventDefault();
		let existingBurns = [];

		let burn;
		for (let i = 0; i < bookBurns.length; i++) {
			burn = bookBurns[i];

			if (burn.user_id !== sessionUser.id) {
				existingBurns.push(burn)
			};

		};

		setBurns(existingBurns);

	};


	return (
		loaded &&
		<div className='book-profile-page-container'>
			<div className='book-profile-margin-container'>
				<div className='profile-grid-container'>
					<div className='profile-thumbnail-shelf-select-container'>
						<div className='profile-thumbnail-container'>
							<img
								className='book-profile-thumbnail'
								src={googleBook.smallThumbnail ? googleBook.smallThumbnail : '/image-not-found.png'}
							/>
						</div>
						<div className='shelf-selector-container'>
							{/* <h3>Shelf Selector goes here</h3> */}
							<ShelfUtil
							kindlingShelves={allShelves}
							customShelves={customShelves}
							defaultShelves={defaultShelves}
							bookId={googleBook.id}
							userId={sessionUser?.id}
							/>
						</div>
					</div>
					<div className='profile-info-container'>
						<div className='profile-title-container'>
							<h2>{googleBook.title}</h2>
						</div>
						<div className='profile-authors-container'>
							<h2>By {authors}</h2>
						</div>
						<div className='profile-description-container'>
							{/* <span>{googleBook.description}</span> */}
							{googleBook.description}
						</div>
					</div>
				</div>
				<div className='button-link-burn'>
					<NavLink to={reviewsLink}>
						<button className='burn-book-button' onClick={handleUser}>Burn this book</button>
					</NavLink>
				</div>
				<div className='profile-burns-container'>
					<div className='book-burns-header'>This Book's Burns</div>
					{bookBurns.map(burn => {
						return <BookBurn key={burn.user_id} burn={burn} onDelete={handleBurns}/>;
					})}
				</div>
			</div>
		</div>
	);
}

export default BookProfilePage;
