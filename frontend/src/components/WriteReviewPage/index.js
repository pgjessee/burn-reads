import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { fetch } from '../../store/csrf';
import BurnRating from '../BurnFlame'

import './WriteReviewPage.css'

const WriteReviewPage = () => {
    const { googleBookId } = useParams()

    const sessionUser = useSelector(state => state.session.user);
    const [burn, setBurn] = useState('');
    const [rating, setRating] = useState(1);
    const [book, setBook] = useState('');
    const [authors, setAuthors] = useState('');
    const [bookLink, setBookLink] = useState('');


    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/books/${googleBookId}`);
            let bookAuthors = res.data.book.authors;
            bookAuthors = bookAuthors.length === 1 ? bookAuthors[0] : bookAuthors.join(", ");
            let bookPage = `/${googleBookId}`

            setAuthors(bookAuthors);
            setBook(res.data.book);
            setBookLink(bookPage);

        })()
    }, [])
    
    if (!sessionUser) return <Redirect to="/login" />;

    const handleSubmit = async () => {

        const newBurn = {
            review: burn,
            rating: rating
        };

        const res = await fetch(`/api/burns/${googleBookId}/${sessionUser.id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newBurn)
        });

        return;
    }

    return (
        <div className="write-review-page-container">
            <div className="burn-margin-container">
                <div className="book-page-return">
                    <h2><a className="burn-anchor-header" href={bookLink}>{book.title}</a></h2>
                </div>
                <div className="write-review-header">
                    <div className="burn-thumbnail-container">
                        <img className="burn-thumbnail" src={book.smallThumbnail}/>
                    </div>
                    <div className="burn-title">
                        <h2><a className="burn-title-anchor" href={bookLink}>{book.title}</a></h2>
                        <h3>By {authors}</h3>
                    </div>
                </div>
                <div className="shelf-selector">
                    <h3>Shelf selector goes here</h3>
                </div>
                <div className="write-review-body">
                    <h3 className="burn-book-header">Burn this Book!</h3>
                    <form onSubmit={handleSubmit}>
                        <BurnRating setRating={setRating} rating={rating}/>
                        <div className="burn-textarea-container">
                            <textarea
                                className="burn-textarea"
                                rows="20"
                                cols="80"
                                name="burn"
                                placeholder="Send it to the inferno..."
                                value={burn}
                                onChange={(e) => setBurn(e.target.value)}
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
