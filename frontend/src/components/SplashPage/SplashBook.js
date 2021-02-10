import React, { useState, useEffect } from 'react';

import { fetch } from '../../store/csrf';

const SplashBook = ({ splashBook }) => {


    const [fetchedBook, setBook] = useState('');
    const [authors, setAuthors] = useState('');
    const [userBurnLink, setUserBurnLink] = useState('');
    const [bookProfileLink, setBookProfileLink] = useState('');
    // const [rating, setUserRating] = useState('');


    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/books/${splashBook.google_book_id}`);
            const { book } = res.data;
            let bookAuthors = book.authors;
            bookAuthors = bookAuthors.length === 1 ? bookAuthors[0] : bookAuthors.join(", ");
            let burnLink = `/${splashBook.google_book_id}/reviews`;
            let profileLink = `/${splashBook.google_book_id}`

            setBook(book);
            setAuthors(bookAuthors);
            setUserBurnLink(burnLink);
            setBookProfileLink(profileLink);

        })()
    }, [])

    return (
        <tr className="user-book-table-row">
            <td className="splashbook-thumbnail"><a href={bookProfileLink}><img src={fetchedBook.smallThumbnail}/></a></td>
            <td className="splashbook-title"><a href={bookProfileLink}>{fetchedBook.title}</a></td>
            <td className="splashbook-authors">{authors}</td>
            <td className="splashbook-burn-link"><a href={userBurnLink}>Burn this book!</a></td>
        </tr>
    )
};


export default SplashBook;
