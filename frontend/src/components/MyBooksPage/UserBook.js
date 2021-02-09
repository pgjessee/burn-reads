import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import UserFlames from '../UserFlame';
import { fetch } from '../../store/csrf';

const UserBook = ({ userBook }) => {

    const sessionUser = useSelector(state => state.session.user);

    const [fetchedBook, setBook] = useState('');
    const [authors, setAuthors] = useState('');
    const [userBurnLink, setUserBurnLink] = useState('');
    const [bookProfileLink, setBookProfileLink] = useState('');
    const [rating, setUserRating] = useState('');


    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/books/${userBook.google_book_id}`);
            const resRating = await fetch(`/api/burns/${userBook.google_book_id}/${sessionUser.id}`)
            const { burn } = resRating.data;
            const { book } = res.data;
            let bookAuthors = book.authors;
            bookAuthors = bookAuthors.length === 1 ? bookAuthors[0] : bookAuthors.join(", ");
            let burnLink = `/${userBook.google_book_id}/reviews`;
            let profileLink = `/${userBook.google_book_id}`

            setBook(book);
            setAuthors(bookAuthors);
            setUserBurnLink(burnLink);
            setBookProfileLink(profileLink);
            setUserRating(burn.rating)

        })()
    }, [])

    return (
        <tr className="user-book-table-row">
            <td><a href={bookProfileLink}><img src={fetchedBook.smallThumbnail}/></a></td>
            <td><a href={bookProfileLink}>{fetchedBook.title}</a></td>
            <td>{authors}</td>
            <td><UserFlames rating={rating}/></td>
            <td><a href={userBurnLink}>Write a review</a></td>
        </tr>
    )
};


export default UserBook;
