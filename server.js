const express = require('express');
const request = require('request');

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    require('dotenv').config();
}

const cors = require('cors');
const PORT = process.env.PORT || '5000';

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
// Set up the express app
const app = express();
const BOOK_SEARCH_PATH = 'search/index.xml';
const BOOK_SHOW_PATH = 'book/show/';

app.use(cors());
//todo : Find A workaround.
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('combined'))
}
/*
* Basic Server which call goodread API.
* Only SUpported path 
* BOOK_SEARCH_PATH = 'search/index.xml';
* BOOK_SHOW_PATH = 'book/show/';
* 
* TODO : MOVE into single route.
*/
app.get('/search/books', (req, res) => {

    console.log(req.query);
    let api_path = req.query.path;

    //Added to limit API misuse. Remove this you can acces any goodread GET API with this.
    if (api_path.indexOf(BOOK_SEARCH_PATH) > -1) {
        sendRequest(req, res);

    } else {
        sendErrorRequest(res, BOOK_SEARCH_PATH);
    }

});


app.get('/bookDetails', (req, res) => {

    let api_path = req.query.path;
//Added to limit API misuse. Remove this you can acces any goodread GET API with this.
    if (api_path.indexOf(BOOK_SHOW_PATH) > -1) {
        sendRequest(req, res);
    } else {
        sendErrorRequest(res, BOOK_SHOW_PATH);
    }
});


/**
 * sendErrorRequest
 * Only SUpported path
 * BOOK_SEARCH_PATH = 'search/index.xml';
 * BOOK_SHOW_PATH = 'book/show/';
 */
function sendErrorRequest(res, ALLOWED_PATH) {
    res.status(400).json({
        'status': 'Bad Request',
        "ALLOWED_PATH": ALLOWED_PATH
    });
}

function sendRequest(req, res) {
    let query = req.query;
    let api_path = query.path;
    query['key'] = API_KEY;
    const URL = `${API_URL}/${api_path}`;
    console.log(req.query);
    req.pipe(request.get(URL, {
        'qs': {
            ...query
        }
    })).pipe(res);
}


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
