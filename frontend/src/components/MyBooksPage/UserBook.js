import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import UserFlames from '../UserFlame';
import { fetch } from '../../store/csrf';

const UserBook = ({ userBook }) => {
    // const sessionUser = useSelector(state => state.session.user);

    const [fetchedBook, setBook] = useState('');
    const [authors, setAuthors] = useState('');
    const [userBurnLink, setUserBurnLink] = useState('');
    const [bookProfileLink, setBookProfileLink] = useState('');


    useEffect(() => {

            let bookAuthors = userBook.authors;
            bookAuthors = bookAuthors.length === 1 ? bookAuthors[0] : bookAuthors.join(", ");
            let burnLink = `/${userBook.id}/reviews`;
            let profileLink = `/${userBook.id}`

            setBook(userBook);
            setAuthors(bookAuthors);
            setUserBurnLink(burnLink);
            setBookProfileLink(profileLink);
    }, [])

    return (
        <tr className="user-book-table-row">
            <td><a href={bookProfileLink}><img src={fetchedBook.smallThumbnail}/></a></td>
            <td><a href={bookProfileLink}>{fetchedBook.title}</a></td>
            <td>{authors}</td>
            <td><UserFlames rating={fetchedBook.rating}/></td>
            <td><a href={userBurnLink}>Write a review</a></td>
        </tr>
    )
};


export default UserBook;
