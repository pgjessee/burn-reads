import React from 'react';


const BurnFlame = ({ onClick, id, on}) => {
    return (
        <i onClick={onClick} id={id} className={`fab fa-gripfire ${on ? " flame--on" : " flame--off"}`}></i>
    )
}

export default function BurnRating({ setRating, rating}) {
    const maxRating = 5;

    const flames = [];

    for (let i = 0; i < maxRating; i++) {
        flames.push(<BurnFlame key={`flame${i}`} onClick={(e) => { e.stopPropagation(); setRating(i+1) }} id={`burn-flame-${i}`} on={i+1 <= rating}/>)
    }

    return (
        <>
        <div>
            {flames.map(flame => {
                return flame
            })}
        </div>
        </>
    )
}
