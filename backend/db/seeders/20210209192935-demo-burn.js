'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Burns', [
      {
        book_id: 1,
        user_id: 1,
        review: "This was the worst movie I've ever seen. Thought it would be a great movie since it said it stars my favorite actor, Michael Jordan. Spoiler alert! Michael Jordan isn't in this movie like he is in Space Jam! Lame. This movie is about burning books instead of firefighting or whatever. Didn't watch the whole thing because why would you burn books rather than fight fires?",
        rating: 5
      },
      {
        book_id: 2,
        user_id: 1,
        review: "Yep. Can't read this book because it's written in French or something with the author named Dante. Definitely think this would be a great graphic novel though lol.",
        rating: 5
      },
      {
        book_id: 3,
        user_id: 1,
        review: "**SPOILER ALERT** There's not a single character in this book named Zachariah. Makes no sense!",
        rating: 5
      },
      {
        book_id: 4,
        user_id: 1,
        review: "This book is the biggest piece of crap! And you know what crap attracts? That's right, flies! Hence the name, Lord of the Flies, becuase this book is crap!",
        rating: 5
      },
      {
        book_id: 5,
        user_id: 1,
        review: 'Thought I was reading a humanitarian book about solving world hunger. What kind of name is Katniss? More like Kat Piss, am I right?',
        rating: 5
      },
      {
        book_id: 6,
        user_id: 2,
        review: 'The movie is better than the book.',
        rating: 5
      },
      {
        book_id: 7,
        user_id: 2,
        review: "A friend suggested this to me. Didn't like or understand the content but the pictures were great. Would also make for a greate movie or graphic novel.",
        rating: 5
      },
      {
        book_id: 8,
        user_id: 2,
        review: 'Rather than breaking dawn, this book needs into ride to the sunset to a fiery death.',
        rating: 5
      },
      {
        book_id: 9,
        user_id: 2,
        review: 'Terrible novel and definitely would not be a successful and beloved tv show.',
        rating: 5
      },
      {
        book_id: 10,
        user_id: 2,
        review: 'Why is a vampire that is more than one hundred years old still in high school?',
        rating: 5
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Burns', null, {});
  }
};
