import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SplashPage from './components/SplashPage';
import LoginFormPage from './components/LoginFormPage';
import SignUpFormPage from './components/SignupFormPage/SignUpFormPage';
import BookProfilePage from './components/BookProfilePage';
import WriteReviewPage from './components/WriteReviewPage';
import SearchResults from './components/SearchResults';
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
					<Route exact={true} path='/'>
						<SplashPage />
					</Route>
					<Route path='/login'>
						<LoginFormPage />
					</Route>
					<Route path='/signup'>
						<SignUpFormPage />
					</Route>
					<Route path='/:googleBookId' exact={true}>
						<BookProfilePage />
					</Route>
					<Route path='/:googleBookId/reviews' exact={true}>
						<WriteReviewPage />
					</Route>
					<Route path='/search-results'>
						<SearchResults />
					</Route>
				</Switch>
			</BrowserRouter>
		)
	);
}

export default App;
