var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.PORT || 3000;
app.get('/api/books', function(req, res) {
    res.json([
        { title: '1984', image: 'images/book1.jpg', link: '#!', description: 'A dystopian novel by George Orwell about surveillance.' },
        { title: 'Pride and Prejudice', image: 'images/book2.jpg', link: '#!', description: 'Jane Austen\'s classic romance.' },
        { title: 'To Kill a Mockingbird', image: 'images/book3.jpg', link: '#!', description: 'Harper Lee\'s story of justice and prejudice.' }
    ]);
});
app.listen(port, function() {
    console.log('App listening to port ' + port);
});