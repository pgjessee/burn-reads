import React, { useEffect, useState } from 'react';

export default function BurnRating({ rating }) {
	const [burnRating, setBurnRating] = useState([]);

	useEffect(() => {
		// rating is 3.2
		// check if decimal
		(() => {
			console.log(rating);
			const flames = [];
			const decimal = rating % 1; // ==> 0.2
			const ratingCeiling = Math.ceil(rating); // ==> 4
			if (ratingCeiling === rating) {
				// if rating is whole number
				for (let i = 0; i < rating; i++) {
					flames.push(<i key={i} className='fab fa-gripfire redFire'></i>);
				}
				for (let i = rating; i < 5; i++) {
					flames.push(<i className='fab fa-gripfire greyFire'></i>);
				}
				setBurnRating(flames);
			} else {
				const ratingFloor = Math.floor(rating); // ==> 3
				const greystars = 5 - ratingCeiling; // ==> 1
				// flames.push(
				//   <i
				//     className='fab fa-gripfire'
				//     styles={{ background: 'linear-gradient(to right, red 50%, grey 50%' }}
				//   ></i>
				// );
			}
		})();
	}, []);

	return (
		<>
			<div style={{ border: '1px solid black', width: '100px', height: '50px' }}>{burnRating}</div>
		</>
	);
}
