import React from 'react';

const CustomShelf = ({ customShelf }) => {
    return (
        <div className="custom-shelf-container">
            <div className="custom-shelf">{customShelf.shelf_name} ({customShelf.books.length})</div>
        </div>
    );
};

export default CustomShelf;
