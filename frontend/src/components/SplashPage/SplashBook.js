import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetch } from '../../store/csrf';

const SplashBook = ({ splashBook }) => {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

	const [fetchedBook, setBook] = useState('');
	const [authors, setAuthors] = useState('');
	const [userBurnLink, setUserBurnLink] = useState('');
	const [bookProfileLink, setBookProfileLink] = useState('');

	useEffect(() => {
		(async () => {
			const res = await fetch(`/api/books/${splashBook.google_book_id}/${sessionUser?.id || 0}`);
			const { book } = res.data;
			let bookAuthors = book.authors;
			bookAuthors = bookAuthors.length === 1 ? bookAuthors[0] : bookAuthors.join(', ');
			let burnLink = `/${splashBook.google_book_id}/reviews`;
			let profileLink = `/${splashBook.google_book_id}`;

			setBook(book);
			setAuthors(bookAuthors);
			setUserBurnLink(burnLink);
			setBookProfileLink(profileLink);
		})();
	}, [sessionUser, splashBook.google_book_id]);

	const handleUser = e => {
		if (!sessionUser) {
			e.preventDefault();
			history.push('/login');
		}
	};

	return (
		<tr className='user-book-table-row'>
			<td className='splashbook-thumbnail'>
				<a href={bookProfileLink}>
					<img src={fetchedBook.smallThumbnail} alt={`${fetchedBook.title} thumbnail`} />
				</a>
			</td>
			<td className='splashbook-title'>
				<a href={bookProfileLink}>{fetchedBook.title}</a>
			</td>
			<td className='splashbook-authors'>{authors}</td>
			<td className='splashbook-burn-link'>
				<a href={userBurnLink} onClick={handleUser}>
					Burn this book!
				</a>
			</td>
		</tr>
	);
};

export default SplashBook;
