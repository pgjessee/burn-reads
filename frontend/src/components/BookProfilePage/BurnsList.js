import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserFlames from '../UserFlame';
import { fetch } from '../../store/csrf';

function BookBurn({ burn }) {
    const sessionUser = useSelector(state => state.session.user);
    const [userBurn, setUserBurn] = useState('');

    // useEffect(() => {
    //     setUserBurn(burn)
    // }, [])

    const handleBurnDelete = async (burn) => {

        await fetch(`/api/burns/${burn.book_id}/${sessionUser.id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        });

        setUserBurn(null)
    };


    if (!sessionUser) {
        return (
            <div className="profile-book-burn-container">
                <span className="burn-firstname">{burn.User.first_name} burned it </span>
                <UserFlames rating={burn.rating}/>
                <div className="burn-review-container">
                    <span className="burn-review">{burn.review}</span>
                </div>
            </div>
        )
    }

    if (sessionUser.id === burn.user_id) {
        return (
            <div className="profile-book-burn-container">
                <span className="burn-firstname">{burn.User.first_name} burned it </span>
                <UserFlames rating={burn.rating}/>
                <div className="burn-review-container">
                    <span className="burn-review">{burn.review}</span>
                </div>
                <div className="burn-delete-container">
                    <button className="burn-delete-button" onClick={() => handleBurnDelete(burn)}>Delete</button>
                </div>
            </div>
        )
    }

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
