import React, { useState, useEffect } from 'react';

// import BurnRating from '../BurnRating';
import UserFlame from '../UserFlame';

const UserBook = ({ userBook }) => {
	const [fetchedBook, setBook] = useState('');
	const [authors, setAuthors] = useState('');
	const [userBurnLink, setUserBurnLink] = useState('');
	const [bookProfileLink, setBookProfileLink] = useState('');


	useEffect(() => {
		let bookAuthors = userBook.authors;
		bookAuthors =
			typeof bookAuthors === 'string'
				? bookAuthors
				: bookAuthors.length === 1
				? bookAuthors[0]
				: bookAuthors.join(', ');
		let burnLink = `/${userBook.id}/reviews`;
		let profileLink = `/${userBook.id}`;

		setBook(userBook);
		setAuthors(bookAuthors);
		setUserBurnLink(burnLink);
		setBookProfileLink(profileLink);
	}, [userBook]);

	return (
		<tr className='user-book-table-row'>
			<td className='mybooks-thumbnail-cell'>
				<a href={bookProfileLink}>
					<img
						src={fetchedBook.smallThumbnail}
						className='mybooks-thumbnail-image'
						alt={`${fetchedBook.title} thumbnail`}
					/>
				</a>
			</td>
			<td>
				<a href={bookProfileLink} className='mybooks-title'>
					{fetchedBook.title}{' '}
				</a>
			</td>
			<td>{authors}</td>
			<td className='mybooks-fire-rating'>
				{/* <BurnRating rating={fetchedBook.rating} id={fetchedBook.id} /> */}
				<UserFlame rating={fetchedBook.userRating} />
			</td>
			<td className='mybooks-burn-link'>
				<a href={userBurnLink}>Burn this book!</a>
			</td>
		</tr>
	);
};

export default UserBook;
