import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetch } from '../../store/csrf'

function WriteReviewPage() {
    const { googleBookId } = useParams()

    const sessionUser = useSelector(state => state.session.user);
    const [review, setReview] = useState('');
    const [book, setBook] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/books/${googleBookId}`);
            const body = await res.json();
            console.log(body)
            setBook(body)
        })()
    }, [])

    return (
        <h1>Hello World</h1>
    )

}


export default WriteReviewPage;
