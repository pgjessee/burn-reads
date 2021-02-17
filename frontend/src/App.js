import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SplashPage from './components/SplashPage';
import LoginFormPage from './components/LoginFormPage';
import SignUpFormPage from './components/SignupFormPage/SignUpFormPage';
import MyBooksPage from './components/MyBooksPage';
// import ShelfPage from './components/MyBooksPage/ShelfPage'
import BookProfilePage from './components/BookProfilePage';
import WriteReviewPage from './components/WriteReviewPage';
import SearchResults from './components/SearchResults';
import Test from './components/Test';
import * as sessionActions from './store/session';
import NavBar from './components/NavBar/NavBar';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	const LoginContainer = () => (
		<div className='container'>
			<Route exact path='/' render={() => <Redirect to='/login' />} />
			<Route path='/login' component={LoginFormPage} />
		</div>
	);

	return (
		isLoaded && (
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route exact path='/login' component={LoginContainer} />
					<Route exact={true} path='/'>
						<SplashPage />
					</Route>
					<Route path='/login'>
						<LoginFormPage />
					</Route>
					<Route path='/signup'>
						<SignUpFormPage />
					</Route>
					<Route path='/mybooks' exact={true}>
						<MyBooksPage />
					</Route>
					<Route path='/:googleBookId' exact={true}>
						<BookProfilePage />
					</Route>
					<Route path='/:googleBookId/reviews' exact={true}>
						<WriteReviewPage />
					</Route>
					<Route exact={true} path='/search/:searchTerm'>
						<SearchResults />
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
