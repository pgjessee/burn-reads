import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetch } from '../../store/csrf';
import * as sessionActions from '../../store/session';
import { useHistory, Redirect } from 'react-router-dom';

export default function Test() {
	const [userShelves, setUserShelves] = useState([]);
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!sessionUser) return;
		(async () => {
			let res = await fetch(`/api/shelves/${sessionUser.id}`);
			setUserShelves(res.data);
		})();
	}, [sessionUser]);

	console.log(userShelves);

	const handleLogoutBtn = e => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	return !sessionUser ? (
		<Redirect to='/login' />
	) : (
		<>
			<button onClick={handleLogoutBtn} style={{ width: '200px', height: '20px' }}>
				Logout
			</button>
			<div>hello</div>
		</>
	);
}
