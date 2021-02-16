import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetch } from '../../store/csrf';
import './index.css';
import BurnRating from '../BurnRating';
import PageResults from './PageResults';

const SearchResults = () => {
	const sessionUser = useSelector(state => state.session.user);
	const { searchTerm } = useParams();
	const [maxResults, setMaxResults] = useState(10);
	const [pageNumber, setPageNumber] = useState(1);
	const [searchResults, setSearchResults] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const displayAuthors = authors => {
		if (authors?.length >= 3) {
			return `${authors?.slice(0, 3).join(', ')}...`;
		}
		if (authors?.length > 1) {
			return `${authors[0]} and ${authors[1]}`;
		}
		return authors?.join(', ');
	};
	useEffect(() => {
		(async () => {
			setLoaded(false);
			let res = await fetch(
				`/api/books/search/${searchTerm}/${pageNumber}/${maxResults}/${sessionUser?.id || 0}`
			);
			setSearchResults(res.data);
			setLoaded(true);
		})();
	}, [maxResults, pageNumber, searchTerm]);

	return (
		<>
			{loaded && (
				<div id='search-resultsWrapper'>
					<div id='search-resultsContainer'>
						<PageResults
							pageNumber={pageNumber}
							setPageNumber={setPageNumber}
							maxResults={maxResults}
							setMaxResults={setMaxResults}
						/>
						{searchResults?.map(
							({ id, smallThumbnail, title, authors, rating, kindlingShelves }) => {
								return (
									<>
										<div className='search-bookContainer' key={id}>
											<div className='search-bookThumbnailContainer'>
												<img
													className='search-bookThumbnail'
													alt='thumbnail'
													src={smallThumbnail ? smallThumbnail : '/image-not-found.png'}
												/>
											</div>
											<div className='search-bookInfoContainer'>
												<a className='search-BookTitle' href={`/${id}`}>
													{title}
												</a>
												<div className='search-authorContainer'>by {displayAuthors(authors)}</div>
												<div className='search-rating'>
													<BurnRating rating={rating} id={id} />
													<div className='search-ratingText'>{rating} avg rating</div>
												</div>
											</div>
										</div>
										<hr></hr>
									</>
								);
							}
						)}
						<PageResults
							pageNumber={pageNumber}
							setPageNumber={setPageNumber}
							maxResults={maxResults}
							setMaxResults={setMaxResults}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default SearchResults;
