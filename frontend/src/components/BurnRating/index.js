import React, { useEffect, useState } from 'react';

export default function BurnRating({ rating, id }) {
	const [burnRating, setBurnRating] = useState([]);

	useEffect(() => {
		// rating is 3.2
		// check if decimal
		(() => {
			const flames = [];
			const decimal = Math.floor((rating % 1) * 100); // ==> 0.2
			const ratingCeiling = Math.ceil(rating); // ==> 4
			if (ratingCeiling === rating) {
				// if rating is whole number
				for (let i = 0; i < rating; i++) {
					flames.push(<i key={`${id}${i}`} className='fab fa-gripfire redFire'></i>);
				}
				for (let i = rating; i < 5; i++) {
					flames.push(<i key={`${id}${i}`} className='fab fa-gripfire greyFire'></i>);
				}
				setBurnRating(flames);
			} else {
				// if rating is float
				const ratingFloor = Math.floor(rating);
				const greystars = 5 - ratingCeiling;
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

				console.log(flames);
				setBurnRating(flames);
			}
		})();
	}, [rating]);

	return (
		<>
			<div style={{ border: '1px solid black', width: '100px', height: '50px' }}>{burnRating}</div>
		</>
	);
}
