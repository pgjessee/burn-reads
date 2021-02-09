import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserBook from './UserBook';


import { fetch } from '../../store/csrf';
import './MyBooksPage.css'

const MyBooksPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    const [userBooks, setUserBooks] = useState([]);
    const [allBooks, setAllBooks] = useState('');
    const [wantTorched, setWantTorched] = useState('');

    useEffect(() => {
        (async () => {
        //    const res = await fetch('/api/books');
           const resShelves = await fetch(`/api/shelves/${sessionUser.id}`);
           console.log(resShelves.data)
        //    const { books } = res.data;

        //    setUserBooks(books)
        })()
    }, [])

    return (
        <div className="mybooks-page-container">
            <div className="mybooks-body-container">
                <div className="mybooks-shelves-container">
                    <div className="default-shelves-container">
                        <div className="shelves-section-header">Kindling Shelves</div>
                        <div className="shelf-div"></div>
                        <div className="shelf-div"></div>
                        <div className="shelf-div"></div>
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
