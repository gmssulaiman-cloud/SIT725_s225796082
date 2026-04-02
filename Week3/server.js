var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/books', function(req, res) {
    res.json([
        {
            title: '1984',
            image: 'images/book1.jpg',
            link: '#!',
            description: 'George Orwell’s dystopian novel about surveillance and control.'
        },
        {
            title: 'Pride and Prejudice',
            image: 'images/book2.jpg',
            link: '#!',
            description: 'Jane Austen’s classic novel about love, pride, and society.'
        },
        {
            title: 'To Kill a Mockingbird',
            image: 'images/book3.jpg',
            link: '#!',
            description: 'Harper Lee’s novel about justice, empathy, and prejudice.'
        }
    ]);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('App listening to port ' + port);
});