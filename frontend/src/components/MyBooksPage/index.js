import React, { useEffect, useState } from 'react';

import UserBook from './UserBook';


import { fetch } from '../../store/csrf';

const MyBooksPage = () => {
    const [userBooks, setUserBooks] = useState([]);

    useEffect(() => {
        (async () => {
           const res = await fetch('/api/books');
           const { books } = res.data;

           console.log(books);
           setUserBooks(books)
        })()
    }, [])

    return (
        <div className="mybooks-page-container">
            <div className="mybooks-body-container">
                <div className="mybooks-shelves-container">
                    <div className="default-shelves-container">

                    </div>
                    <div className="custom-shelves-container">

                    </div>
                </div>
            </div>
            <div className="mybooks-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>cover</th>
                            <th>title</th>
                            <th>author(s)</th>
                            <th>rating</th>
                            <th>review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userBooks.map(userBook => {
                            return <UserBook key={userBook.id}  userBook={userBook}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};


export default MyBooksPage;
