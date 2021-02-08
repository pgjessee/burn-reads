import React from 'react';

import UserFlames from '../UserFlame';

function BookBurn({ burn }) {


    return (
        <div className="profile-book-burn-container">
            <span className="burn-firstname">{burn.User.first_name} burned it </span>
            <UserFlames rating={burn.rating}/>
            <div className="burn-review-container">
                <span className="burn-review">{burn.review}</span>
            </div>
        </div>
    )
};


export default BookBurn;
