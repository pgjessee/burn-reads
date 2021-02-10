import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';


import { fetch } from '../../store/csrf';
import './SplashPage.css'

const SplashPage = () => {
    // const sessionUser = useSelector(state => state.session.user);

    const [burnSplashBooks, setSplashBooks] = useState([]);

    useEffect(() => {
        (async () => {

           const res = await fetch('/api/books/splash');
           const { splashBooks } = res.data;
           console.log(splashBooks)
           setSplashBooks(splashBooks)
        })()
    }, [])

    return (
        <div className="splashbooks-page-container">
            <div className="splashbooks-body-container">
                <div className="splashbooks-title-header">Top Ten Most Infamous Burned Books</div>
                <div className="splashbooks-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Disgusting Cover</th>
                                <th>Title</th>
                                <th>Shamed Author(s)</th>
                                <th>Burn It</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {userBooks.map(userBook => {
                                return <UserBook key={userBook.id}  userBook={userBook}/>
                            })} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};


export default SplashPage;
