import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetch } from '../../store/csrf';

export default function Test() {
	const [userShelves, setUserShelves] = useState([]);
	const sessionUser = useSelector(state => state.session.user);

	useEffect(() => {
		(async () => {
			let res = await fetch(`/api/shelves/${sessionUser.id}`);
			setUserShelves(res.data);
		})();
	}, [sessionUser]);
	console.log(userShelves);

	return <div>hello</div>;
}
