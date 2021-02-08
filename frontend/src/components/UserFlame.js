import React from 'react';

const UserFlame = ({ id }) => {
    return (
        <i id={id} className="fab fa-gripfire"></i>
    )
};

export default function UserFlames( {rating} ) {
    const userRating = rating;

    const flames = [];

    for (let i = 0; i < userRating; i++) {
        flames.push(<UserFlame key={`flame${i}`} id={`burn-flame-${i}`}/>)
    }

    return (
        <>
        <span>
            {flames.map(flame => {
                return flame
            })}
        </span>
        </>
    )
};
