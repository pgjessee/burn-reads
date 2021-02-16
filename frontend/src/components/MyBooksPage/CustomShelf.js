import React, { useEffect, useState } from 'react';

const CustomShelf = ({ customShelf }) => {
    const [shelfLink, setShelfLink] = useState('');
    const link = `/shelf/${customShelf.id}`;

    console.log(customShelf)
    useEffect(() => {
        setShelfLink(link)
    }, [])

    return (
        <div className="custom-shelf-container">
            {/* <div className="custom-shelf"><a href={shelfLink}>{customShelf.shelf_name} ({customShelf.books.length})</a></div> */}
            <div className="custom-shelf">{customShelf.shelf_name} ({customShelf.books.length})</div>
        </div>
    );
};

export default CustomShelf;
