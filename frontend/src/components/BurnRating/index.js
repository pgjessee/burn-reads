import React, { useEffect, useState } from 'react';
import './BurnRating.css';

export default function BurnRating({ rating, id }) {
	const [burnRating, setBurnRating] = useState([]);
	console.log(rating, 'rating for', id);
	useEffect(() => {
		(() => {
			const flames = [];
			const decimal = Math.floor((rating % 1) * 100);
			const ratingCeiling = Math.ceil(rating);
			if (ratingCeiling === rating) {
				// if rating is whole number
				for (let i = 0; i < rating; i++) {
					console.log('this runs');
					flames.push(<i key={`${id}${i}`} className='fab fa-gripfire redFire'></i>);
				}
				for (let i = rating; i < 5; i++) {
					flames.push(<i key={`${id}${i}`} className='fab fa-gripfire greyFire'></i>);
				}
				setBurnRating(flames);
			} else {
				// if rating is float
				const ratingFloor = Math.floor(rating);
				for (let i = 0; i < ratingFloor; i++) {
					flames.push(<i key={`${id}${i}`} className='fab fa-gripfire redFire'></i>);
				}

				flames.push(
					<i
						key={`${id}${decimal}`}
						className='fab fa-gripfire percentFire'
						style={{
							backgroundImage: `-webkit-linear-gradient(1turn, firebrick ${decimal}%, lightgrey ${
								100 - decimal
							}%)`,
						}}
					></i>
				);
				for (let i = ratingCeiling; i < 5; i++) {
					flames.push(<i key={`${id}${i}`} className='fab fa-gripfire greyFire'></i>);
				}
				setBurnRating(flames);
			}
		})();
	}, [rating, id]);

	return (
		<>
			<div>{burnRating}</div>
		</>
	);
}
