import React, { useEffect, useState } from 'react';

const CustomShelf = ({ customShelf }) => {
    // const [shelfLink, setShelfLink] = useState('');
    let [allBooks, setAllBooks] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const link = `/shelf/${customShelf.id}`;

    console.log(customShelf)
    useEffect(() => {
        setAllBooks(customShelf.books)
        setLoaded(true)
    }, [])

    let handleShelfClick = (shelf) => {
        setAllBooks(shelf.books)
        document.getElementById("mybooks-header").innerHTML = shelf.shelf_name
    }

    return (
        loaded &&
        <div className="custom-shelf-container">
            <div className="custom-shelf" onClick={() => handleShelfClick}>{customShelf.shelf_name} ({customShelf.books.length})</div>
        </div>
    );
};

export default CustomShelf;
