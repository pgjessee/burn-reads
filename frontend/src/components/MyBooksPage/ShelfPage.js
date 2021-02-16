import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import UserBook from './UserBook';
import CustomShelf from './CustomShelf';


import { fetch } from '../../store/csrf';

const ShelfPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    let { shelfId } = useParams();
    shelfId = parseInt(shelfId, 10);

    const [loaded, setLoaded] = useState(false);
    const [targetShelf, setTargetShelf] = useState([]);
    const [targetBooks, setTargetBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [customShelves, setCustomShelves] = useState([]);
    const [torchings, setTorchings] = useState({});
    const [torched, setTorched] = useState({});
    const [wantToTorch, setWantToTorch] = useState({});
    const [torchingsLink, setTorchingsLink] = useState('');
    const [torchedLink, setTorchedLink] = useState('');
    const [wanToTorchLink, setWantToTorchLink] = useState('');

    useEffect(() => {
        (async () => {
        const res = await fetch(`/api/shelves/${sessionUser.id}`);
        // const resShelf = await fetch(`api/shelves/shelf/${sessionUser.id}`)
        // console.log(resShelf.data);
        const { fullDefaultKindlingShelves, fullCustomKindlingShelves } = res.data;

        setCustomShelves(fullCustomKindlingShelves);
        let allUserBooks = [];
        let userBooks = fullDefaultKindlingShelves;
        let shelfBooks;
        for (let i = 0; i < userBooks.length; i++) {
            let el = userBooks[i];
            if (el.shelf_name === "Torching") {
                shelfBooks = el.books;
                allUserBooks.push(...shelfBooks)

                setTorchings(el);
                setTorchingsLink(`/shelf/${torchings.id}`)
            };

            if (el.shelf_name === "Torched") {
                shelfBooks = el.books;
                allUserBooks.push(...shelfBooks);

                setTorched(el)
                setTorchedLink(`/shelf/${torched.id}`)
            };

            if (el.shelf_name === "Want to Torch") {
                shelfBooks = el.books;
                allUserBooks.push(...shelfBooks);

                setWantToTorch(el)
                setWantToTorchLink(`/shelf/${wantToTorch.id}`)
            };

            if (el.id === shelfId) {
                console.log("THIS IS THA TARGET", el)
                setTargetShelf(el)
                setTargetBooks(el.books)
                console.log(targetBooks)
            }

        }

        console.log(targetBooks)
        setAllBooks(allUserBooks);
        setLoaded(true)
        })()
    }, [])

    return (
        loaded &&
        <div className="mybooks-page-container">
            <div className="mybooks-header">My Inferno</div>
            <div className="mybooks-container">
                <div className="mybooks-body-container">
                    <div className="mybooks-shelves-container">
                        <div className="default-shelves-container">
                            <div className="shelves-section-header">Kindling Shelves</div>
                            <div className="shelf-div"><a href="/mybooks">All ({allBooks.length})</a></div>
                            <div className="shelf-div"><a href={torchedLink}>Torched ({torched.books.length})</a></div>
                            <div className="shelf-div"><a href={torchingsLink}>Torching ({torchings.books.length}</a>)</div>
                            <div className="shelf-div"><a href={wanToTorchLink}>Want to Torch ({wantToTorch.books.length})</a></div>
                        </div>
                        <div className="custom-shelves-container">
                            <div className="custom-shelves-section-header"></div>
                            {customShelves.map(customShelf => {
                                return <CustomShelf key={customShelf.id} customShelf={customShelf}/>
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
                            {targetBooks.map(userBook => {
                                return <UserBook key={userBook.id}  userBook={userBook}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShelfPage;
