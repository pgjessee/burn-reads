import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SplashBook from './SplashBook'

import { fetch } from '../../store/csrf';
import './SplashPage.css'

const SplashPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    const [burnSplashBooks, setSplashBooks] = useState([]);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        (async () => {

           const res = await fetch(`/api/books/splash`);
           const { splashBooks } = res.data;
           setSplashBooks(splashBooks)
           setLoaded(true)
        })()
    }, [])

    return (
        loaded &&
        <div className="splashbooks-page-container">
            <div className="splashbooks-body-container">
                <div className="splashbooks-title-header">Most Infamous Burned Books</div>
                <div className="splashbooks-table-container">
                    <table>
                        <thead className="splash-table-head">
                            <tr>
                                <th>Disgusting Cover</th>
                                <th>Title</th>
                                <th>Shamed Author(s)</th>
                                <th>Burn It</th>
                            </tr>
                        </thead>
                        <tbody>
                            {burnSplashBooks.map(splashBook => {
                                return <SplashBook key={splashBook.id}  splashBook={splashBook}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};


export default SplashPage;
