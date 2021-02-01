# BurnReads
BurnReads is a [GoodReads](https://www.goodreads.com/) inspired place on the internet to belittle, banish, and torch books that make your eyes burn! Never again will you have to worry about organizing all the books that you hate.
Simply search for a book to set its torch status, add it to a custom kindling shelf, or leave a fiery bad review! 

## MVP

### 1. User Auth

- Create new user
- Login/Logout
- Demo login
- non-user limited access

### 2. Google Books API
- Fetch book info (image, author, description)
- User can search for books

### 3. Burn Rating/Review

- Write review/rating
- Edit review/rating
- Delete review/rating

### 4. Kindling Shelf

- Default kindling shelves (want to torch, torching, will torch)
- Create custom kindling shelves
- Edit custom kindling shelves
- Delete custom kindling shelves

### 5. Heroku Deployment
- application is hosted on live link

---
<br/>

## Database Schema

### 1. `users`
|column name|data type|constraints|
|----------|----------|----------|
|`id`|integer|primary key, not null|
|`first_name`|varchar(50)|not null|
|`email`|varchar(255)|not null, unique|
|`zip`|varchar(5)|not null|
|`hashed_pass`|string.binary|not null|

### 2. `books`
|column name|data type|constraints|
|----------|----------|----------|
|`id`|integer|primary key, not null|
|`google_book_id`|varchar(255)|not null, unique|


### 3. `kindling_shelves`
|column name|data type|constraints|
|----------|----------|----------|
|`id`|integer|primary key, not null|
|`shelf_name`|varchar(20)|not null|
|`user_id`|intger|not null|


### 4. `reviews`
|column name|data type|constraints|
|----------|----------|----------|
|`id`|integer|primary key, not null|
|`book_id`|integer|not null|
|`user_id`|intger|not null|
|`review`|varchar(500)|not null|
|`rating`|integer|not null|

---
<br/>

## Backend Routes
### 1. Sessions
- POST /api/session -- Login user
- DELETE /api/session -- Logout user

### 2. Users
- GET /api/users/:userId -- Get user info
- POST /api/users/ -- Account creation, 
- PATCH /api/users/:userId -- Edit user info

### 3. Shelves
- GET /api/shelves/:userId -- Get all kindling shelves of user
- GET /api/shelves/:shelfId -- Get all books on kindling shelf
- POST /api/shelves/new-user -- Set default kindling shelves for new user
- POST /api/shelves/ -- Create new custom kindling shelf
- POST /api/shelves/:shelfId/:googleBookId -- Add book to kindling shelf
- PATCH /api/shelves/:shelfId/:googleBookId -- Remove book from kindling shelf
- PATCH /api/shelves/:shelfId -- Rename kindling shelf
- DELETE /api/shelves/:shelfId -- Delete custom kindling shelf


### 4. Burns (Reviews/Ratings)
- GET /api/burns/:googleBookId -- Get all reviews/ratings for book
- POST /api/burns/:gooogleBookId/:userId -- Create review/rating for book
- PATCH /api/burns/:gooogleBookId/:userId -- Edit review/rating for book
- DELETE /api/burns/:gooogleBookId/:userId -- Delete review/rating for book

---
<br/>

## Components
### 1. Splash Page
- Signup form
- Login form
- Top ten burnt books

### 2. Search Results
- Book info (image, title and author)
- Burn rating
- Torch status/Kindling shelf

### 3. Book
- Image, title, authors, description
- Burn reviews/ratings
- Torch status/Kindling shelf

### 4. Profile
- Kindling shelves
- All books from all kindling shelves





