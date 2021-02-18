import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetch } from '../../store/csrf';
import './index.css';
import BurnRating from '../BurnRating';
import PageResults from './PageResults';
import ShelfUtil from '../ShelfUtil';

const SearchResults = () => {
	const sessionUser = useSelector(state => state.session.user);
	const { searchTerm } = useParams();
	const [maxResults, setMaxResults] = useState(10);
	const [pageNumber, setPageNumber] = useState(1);
	const [customShelves, setCustomShelves] = useState([]);
	const [defaultShelves, setDefaultShelves] = useState([]);
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
			res = await fetch(`/api/shelves/shelf-names/${sessionUser?.id || 0}`);
			setDefaultShelves(res.data.slice(0, 3));
			setCustomShelves(res.data.slice(3, res.data.length + 1));
			setLoaded(true);
		})();
	}, [maxResults, pageNumber, searchTerm, sessionUser]);

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
							({ id, smallThumbnail, title, authors, rating, kindlingShelves }, i) => {
								return (
									<div key={`${id}${i}`}>
										<div className='search-bookContainer'>
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
													<BurnRating rating={rating} />
													<div className='search-ratingText'>{rating} avg rating</div>
												</div>
												<ShelfUtil
													kindlingShelves={kindlingShelves}
													customShelves={customShelves}
													defaultShelves={defaultShelves}
													bookId={id}
													sessionUserId={sessionUser?.id}
												/>
											</div>
										</div>
										<hr></hr>
									</div>
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
