import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserBook from './UserBook';
import CustomShelf from './CustomShelf';

import { fetch } from '../../store/csrf';
import './MyBooksPage.css'

const MyBooksPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    // const [userBooks, setUserBooks] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const [allBooks, setAllBooks] = useState([]);
    const [userShelfBooks, setUserShelfBooks] = useState([]);
    const [customShelves, setCustomShelves] = useState([]);
    const [torchings, setTorchings] = useState({});
    const [torched, setTorched] = useState({});
    const [wantToTorch, setWantToTorch] = useState({});
    const [torchingsLink, setTorchingsLink] = useState('');
    const [torchedLink, setTorchedLink] = useState('');
    const [wanToTorchLink, setWantToTorchLink] = useState('');


    let allUserBooks = [];

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/shelves/${sessionUser.id}`);


            const { fullDefaultKindlingShelves, fullCustomKindlingShelves } = res.data;
            console.log(fullDefaultKindlingShelves);
            setCustomShelves(fullCustomKindlingShelves);
            let userBooks = fullDefaultKindlingShelves;
            let shelfBooks;
        for (let i = 0; i < userBooks.length; i++) {
            let el = userBooks[i];
            console.log(el)
            if (el.shelf_name === "Torching") {
                shelfBooks = el.books;
                allUserBooks.push(...shelfBooks)

                setTorchings(el);
                setTorchingsLink(`/shelf/${el.id}`)
            };

            if (el.shelf_name === "Torched") {
                shelfBooks = el.books;
                allUserBooks.push(...shelfBooks);

                setTorched(el)
                setTorchedLink(`/shelf/${el.id}`)
            };

            if (el.shelf_name === "Want to Torch") {
                shelfBooks = el.books;
                allUserBooks.push(...shelfBooks);

                setWantToTorch(el)
                setWantToTorchLink(`/shelf/${el.id}`)
            };

        }

        setAllBooks(allUserBooks);
        setLoaded(true)
        })()
    }, [])

    const handleShelfClick = (shelf) => {
        setAllBooks(shelf.books)
        document.getElementById("mybooks-header").innerHTML = shelf.shelf_name
    }

    return (
        loaded &&
        <div className="mybooks-page-container">
            <div id="mybooks-header">My Inferno</div>
            <div className="mybooks-container">
                <div className="mybooks-body-container">
                    <div className="mybooks-shelves-container">
                        <div className="default-shelves-container">
                            <div className="shelves-section-header">Kindling Shelves</div>
                            {/* <div className="shelf-div"><a href="/mybooks">All ({allBooks.length})</a></div> */}
                            <div className="shelf-div">All ({allBooks.length})</div>
                            {/* <div className="shelf-div">All</div> */}
                            <div className="shelf-div" onClick={() => handleShelfClick(torched)}>Torched ({torched.books.length})</div>
                            {/* <div className="shelf-div"><a href={torchedLink}>Torched ({torched.books.length})</a></div> */}
                            {/* <div className="shelf-div"><a href={torchingsLink}>Torching ({torchings.books.length}</a>)</div> */}
                            <div className="shelf-div" onClick={() => handleShelfClick(torchings)}>Torching ({torchings.books.length})</div>
                            {/* <div className="shelf-div"><a href={wanToTorchLink}>Want to Torch ({wantToTorch.books.length})</a></div> */}
                            <div className="shelf-div" onClick={() => handleShelfClick(wantToTorch)}>Want to Torch ({wantToTorch.books.length})</div>
                        </div>
                        <div className="custom-shelves-container">
                            <div className="custom-shelves-section-header"></div>
                            {/* {customShelves.map(customShelf => {
                                return <CustomShelf key={customShelf.id} customShelf={customShelf}/>
                            })} */}
                            {customShelves.map(customShelf => {
                                return (
                                    <div className="custom-shelf-container" key={customShelf.id}>
                                        <div className="custom-shelf" onClick={() => handleShelfClick(customShelf.books)}>{customShelf.shelf_name} ({customShelf.books.length})</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="add-shelf-div">
                            Shelf Creator Goes Here
                        </div>
                    </div>
                </div>
                <div className="mybooks-table-container">
                    <table>
                        <thead className="mybooks-table-header">
                            <tr>
                                <th>cover</th>
                                <th>title</th>
                                <th>author(s)</th>
                                <th>fire rating</th>
                                <th>burn review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBooks.map(userBook => {
                                return <UserBook key={userBook.id}  userBook={userBook}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};


export default MyBooksPage;
