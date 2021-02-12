import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetch } from '../../store/csrf';
import './index.css';
import BurnRating from '../BurnRating';

const SearchResults = () => {
	const { searchTerm } = useParams();
	const [maxResults, setMaxResults] = useState(10);
	const [pageNumber, setPageNumber] = useState(1);
	const [searchResults, setSearchResults] = useState(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			let res = await fetch(`/api/books/search/${searchTerm}/${pageNumber}/${maxResults}`);
			setSearchResults(res.data);
			setLoaded(true);
		})();
	}, [maxResults, pageNumber, searchTerm]);

	return (
		<>
			{loaded && (
				<div id='search-resultsWrapper'>
					<div id='search-resultsContainer'>
						{searchResults?.map(bookResult => {
							console.log(bookResult);
							return (
								<>
									<div className='search-bookContainer' key={bookResult.id}>
										<div className='search-bookThumbnailContainer'>
											<img
												className='search-bookThumbnail'
												alt='thumbnail'
												src={bookResult.smallThumbnail}
											/>
										</div>
										<div className='search-bookInfoContainer'>
											<a className='search-BookTitle' href={`/${bookResult.id}`}>
												{bookResult.title}
											</a>
											<div className='search-authorContainer'>by {bookResult.authors}</div>
											<div className='search-rating'>
												<BurnRating rating={bookResult.rating} id={bookResult.id} />{' '}
												<div className='search-ratingText'>{bookResult.rating} avg rating</div>
												{/* <BurnRating rating={4} id={bookResult.id} />
												<div className='search-ratingText'>{4} avg rating</div> */}
											</div>
										</div>
									</div>
									<hr></hr>
								</>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
};

export default SearchResults;
