import React from 'react';

export default function PageResults({ pageNumber, setPageNumber, setMaxResults, maxResults }) {
	return (
		<div className='search-maxResultsContainer'>
			<div
				className='previousBtn resultsBtn'
				onClick={() => (pageNumber === 1 ? setPageNumber(1) : setPageNumber(pageNumber - 1))}
			>
				Previous
			</div>
			<div className='search-maxResultsTitleContainer'>
				<div className='search-maxResultsTitle1'>Showing</div>
				<form className='search-maxResultsForm'>
					<select
						className='search-maxResultsSelectBox'
						onChange={e => setMaxResults(parseInt(e.target.value, 10))}
						value={maxResults}
					>
						<option className='search-maxResultsOption' value='10'>
							10
						</option>
						<option className='search-maxResultsOption' value='20'>
							20
						</option>
						<option className='search-maxResultsOption' value='30'>
							30
						</option>
						<option className='search-maxResultsOption' value='40'>
							40
						</option>
					</select>
				</form>
				<div className='search-maxResultsTitle2'>Results</div>
			</div>
			<div className='nextBtn resultsBtn' onClick={() => setPageNumber(pageNumber + 1)}>
				Next
			</div>
		</div>
	);
}
