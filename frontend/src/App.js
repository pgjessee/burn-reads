import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignUpFormPage from './components/SignupFormPage/SignUpFormPage';
import MyBooksPage from './components/MyBooksPage';
import ShelfPage from './components/MyBooksPage/ShelfPage'
import BookProfilePage from './components/BookProfilePage';
import WriteReviewPage from './components/WriteReviewPage';
import Test from './components/Test';
import * as sessionActions from './store/session';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		isLoaded && (
			<BrowserRouter>
				<Switch>
					<Route path='/login'>
						<LoginFormPage />
					</Route>
					<Route path='/signup'>
						<SignUpFormPage />
					</Route>
					<Route path='/mybooks' exact={true}>
						<MyBooksPage />
					</Route>
					{/* <Route path='/mybooks/:shelfId' exact={true}>
						<ShelfPage />
					</Route> */}
					<Route path='/shelf/:shelfId' exact={true}>
						<ShelfPage />
					</Route>
					<Route path='/:googleBookId' exact={true} >
						<BookProfilePage />
					</Route>
					<Route path='/:googleBookId/reviews' exact={true} >
						<WriteReviewPage />
					</Route>
					<Route path='/'>
						<Test />
					</Route>
				</Switch>
			</BrowserRouter>
		)
	);
}

export default App;
