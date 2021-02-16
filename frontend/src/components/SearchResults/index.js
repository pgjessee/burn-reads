import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetch } from '../../store/csrf';
import './index.css';
import BurnRating from '../BurnRating';

const SearchResults = () => {
  const sessionUser = useSelector(state => state.session.user);
  const { searchTerm } = useParams();
	const [maxResults, setMaxResults] = useState(10);
	const [pageNumber, setPageNumber] = useState(1);
	const [searchResults, setSearchResults] = useState(null);
	const [loaded, setLoaded] = useState(false);

  const handleMaxResultsSubmit = async (e) => {
    console.log(e.target.value)
  }

	useEffect(() => {
		(async () => {
      console.log('this runs', maxResults)
      setLoaded(false)
			let res = await fetch(`/api/books/search/${searchTerm}/${pageNumber}/${maxResults}/${sessionUser?.id || 0}`);
      setSearchResults(res.data);
			setLoaded(true);
      console.log('this also runs')
		})();
	}, [maxResults, pageNumber, searchTerm]);

	return (
		<>
			{loaded && (
				<div id='search-resultsWrapper'>
					<div id='search-resultsContainer'>
            <div id='search-maxResultsContainer'>
              <div id='search-maxResultsTitle1'>Showing</div>
                <form id='search-maxResultsForm'>
                  <select id='search-maxResultsSelectBox' onChange={(e) => setMaxResults(parseInt(e.target.value, 10))} value={maxResults} >
                    <option className='search-maxResultsOption' value='10'>10</option>
                    <option className='search-maxResultsOption' value='20'>20</option>
                    <option className='search-maxResultsOption' value='30'>30</option>
                    <option className='search-maxResultsOption' value='40'>40</option>
                  </select>
                </form>
                <div id='search-maxResultsTitle2'>Results</div>
            </div>
						{searchResults?.map(( {id, smallThumbnail, title, authors, rating, kindlingShelves} ) => {
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
											<div className='search-authorContainer'>by {authors}</div>
											<div className='search-rating'>
												<BurnRating rating={rating} id={id} />
												<div className='search-ratingText'>{rating} avg rating</div>
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
