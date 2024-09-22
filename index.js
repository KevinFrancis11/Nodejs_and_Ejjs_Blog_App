const { name } = require('ejs');
const express = require('express');
const morgan  = require('morgan');
const app = express();


//register template engine
app.set('view engine', 'ejs');



//middleware & static file
app.use(express.static('public'));

//thirdparty middleware
app.use(morgan('dev'));


//Example of a custom middleware
// app.use((req, res, next) => {
//     console.log('new request made: ')
//     console.log('hostname: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

app.get('/', (req, res) => {
    const blogs = [
        { name: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
        { name: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
        { name: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' }
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})


app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
})


// //redirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })


//404 page using app.use middleware
/*
*This middleware works only when the other routes dont get triggered, it is like a 
*default keyword in the switch statement.So when some other routes that dont exists
*makes a request it will call the middleware.
*/
app.use((req, res) => {
    res.status(404).render('404', { title: 'not found' });
});



app.listen(3000, () => {
    console.log("Server started at port 3000");
})