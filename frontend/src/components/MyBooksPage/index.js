import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserBook from './UserBook';
import CustomShelf from './CustomShelf';

import { fetch } from '../../store/csrf';
import './MyBooksPage.css'

const MyBooksPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    // const [userBooks, setUserBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [customShelves, setCustomShelves] = useState([]);
    const [torchings, setTorchings] = useState({});
    const [torched, setTorched] = useState({});
    const [wantToTorch, setWantToTorch] = useState({});


    useEffect(() => {
        (async () => {

        const res = await fetch(`/api/shelves/${sessionUser.id}`);

        const { fullDefaultKindlingShelves, fullCustomKindlingShelves } = res.data;

        setCustomShelves(fullCustomKindlingShelves);
        let allUserBooks = [];
        let userBooks = fullDefaultKindlingShelves;
        let shelfBooks;
        for (let i = 0; i < userBooks.length; i++) {
            let el = userBooks[i];
            console.log(el)
            if (el.shelf_name === "Torching") {
                shelfBooks = el.books;
                allUserBooks.push(...shelfBooks)

                setTorchings(el);
            };

            if (el.shelf_name === "Torched") {
                shelfBooks = el.books;
                allUserBooks.push(...shelfBooks);

                setTorched(el)
            };

            if (el.shelf_name === "Want to Torch") {
                shelfBooks = el.books;
                allUserBooks.push(...shelfBooks);

                setWantToTorch(el)
            };

        }

        setAllBooks(allUserBooks);

        })()
    }, [])

    return (
        <div className="mybooks-page-container">
            <div className="mybooks-body-container">
                <div className="mybooks-shelves-container">
                    <div className="default-shelves-container">
                        <div className="shelves-section-header">Kindling Shelves</div>
                        {/* <div className="shelf-div">All ({allBooks.length})</div>
                        <div className="shelf-div">Torched ({torched.books.length})</div>
                        <div className="shelf-div">Torching ({torchings.books.length})</div>
                        <div className="shelf-div">Want to Torch ({wantToTorch.books.length})</div> */}
                    </div>
                    <div className="custom-shelves-container">
                        <div className="custom-shelves-section-header"></div>
                        {/* {customShelves.map(customShelf => {
                            return <CustomShelf key={customShelf.id} customShelf={customShelf}/>
                        })} */}
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
                            {/* <th>rating</th> */}
                            <th>burn review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {allBooks.map(userBook => {
                            return <UserBook key={userBook.id}  userBook={userBook}/>
                        })} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
};


export default MyBooksPage;
