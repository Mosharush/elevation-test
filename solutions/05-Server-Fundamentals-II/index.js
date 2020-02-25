// Server Fundamentals II
//---------------------﻿

// Exercise 1
const { app, get, post } = require('@eac/webserver')
const port = 5000;

const books = [
    {name: "Name of the Wind", author: "Patrick Rothfuss"},
    {name: "Of Mice and Men", author: "John Steinbeck"}
];


get( '/sanity', ({res}) => res.send('OK') );

get( '/books', ({res}) => res.json(books));

get( '/books/:index', (req, res ) => {
    const theBook = books[ req.params.index ] || null;
    res.status( theBook ? 200 : 404);

    res.json( theBook );

});

post( '/book', (req, res) => {
    books.push([].concat(req.body));
    res.status(201);
    res.end();
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
