import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetch } from '../../store/csrf'

import './WriteReviewPage.css'

function WriteReviewPage() {
    const { googleBookId } = useParams()

    const sessionUser = useSelector(state => state.session.user);
    const [review, setReview] = useState('');
    const [book, setBook] = useState(null);
    const [authors, setAuthors] = useState('')

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/books/${googleBookId}`);
            let bookAuthors = res.data.book.authors;
            bookAuthors = bookAuthors.length === 1 ? bookAuthors[0] : bookAuthors.join(", ");

            setAuthors(bookAuthors)
            setBook(res.data.book);
        })()
    }, [])

    return (
        <div className="write-review-page-container">
            <div className="burn-margin-container">
                <div className="book-page-return">
                    <h2><a href={googleBookId}>{book.title}</a></h2>
                </div>
                <div className="write-review-header">
                    <div className="burn-thumbnail">
                        <img src={book.smallThumbnail}/>
                    </div>
                    <div className="burn-title">
                        <h2><a href={googleBookId}>{book.title}</a></h2>
                        <h3>By {authors}</h3>
                    </div>
                </div>
                <div className="shelf-selector">
                    <h3>Shelf selector goes here</h3>
                </div>
                <div className="write-review-body">
                    <h3 className="burn-book-header">Burn this Book!</h3>
                    <form>
                        <div>Rating Fires go here</div>
                        <div className="burn-textarea-container">
                            <textarea
                                className="burn-textarea"
                                rows="20"
                                cols="80"
                                name="burn"
                                placeholder="Send it to the inferno..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                            />
                        </div>
                        <div className="burn-submit-container">
                            <button className="burn-submit" type="submit">Torch</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}


export default WriteReviewPage;
