import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { fetch } from '../../store/csrf';

import ShelfUtil from '../ShelfUtil'
import BurnRating from '../BurnFlame'
import './WriteReviewPage.css'

const WriteReviewPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { googleBookId } = useParams()
    const history = useHistory();

    const [burn, setBurn] = useState('');
    const [isPrevBurn, setIsPrevBurn] = useState(false);
    const [rating, setRating] = useState(1);
    const [book, setBook] = useState('');
    const [authors, setAuthors] = useState('');
    const [bookLink, setBookLink] = useState('');
    const [defaultShelves, setDefaultShelves] = useState([]);
	const [customShelves, setCustomShelves] = useState([]);
	const [allShelves, setAllShelves] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        (async () => {
            let res = await fetch(`/api/books/${googleBookId}/${sessionUser?.id || 0}`);
            let bookAuthors = res.data.book.authors;
            let burns = res.data.burns
            bookAuthors = bookAuthors.length === 1 ? bookAuthors[0] : bookAuthors.join(", ");
            let bookPage = `/${googleBookId}`
            setAuthors(bookAuthors);
            setBook(res.data.book);
            setBookLink(bookPage);

            res = await fetch(`/api/shelves/shelf-names/${sessionUser?.id || 0}`);
            setDefaultShelves(res.data.slice(0, 3));
			setCustomShelves(res.data.slice(3, res.data.length + 1));
			setAllShelves(defaultShelves.concat(customShelves))
            let burn;
            for (let i = 0; i < burns.length; i++) {
                burn = burns[i];
                if (burn.user_id === sessionUser.id) {
                    setIsPrevBurn(true);
                    break;
                }
            };

            setLoaded(true)
        })()
    }, [sessionUser])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isPrevBurn) {
            return setErrors([
                "You have already burned this book! Once is enough!"
            ]);
        } else {

            history.push(`/${googleBookId}`);
            const newBurn = {
                review: burn,
                rating: rating
            };


            const res = await fetch(`/api/burns/${googleBookId}/${sessionUser.id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newBurn)
            });
        }

    }

    return (
        loaded &&
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
                <div className="burn-shelf-selector-container">
                    {/* <h3>Shelf selector goes here</h3> */}
                    <ShelfUtil
                    kindlingShelves={allShelves}
                    customShelves={customShelves}
                    defaultShelves={defaultShelves}
                    bookId={book.id}
                    userId={sessionUser?.id}
                    />
                </div>
                <div className="write-review-body">
                    <h3 className="burn-book-header">Burn this Book!</h3>
                    <form onSubmit={handleSubmit}>
                        <BurnRating setRating={setRating} rating={rating}/>
                        <div className="review-errors-container">
                            <ul>
                                {errors.map((error, idx) => (
                                    <li className="review-err" key={idx}>
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        </div>
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
