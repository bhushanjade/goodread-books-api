#### `NOTE : USE FOR DEVELOPMENT ONLY NOT FOR PRODUCTION.`
### [App Powered by GoodRead API](https://goodread-book-search.herokuapp.com/)
### URL: https://goodread-book-api.herokuapp.com/
### API Endpoints
- [API](www.goodreads.com)
        - `/search/books` => Search Books . It calls  `search/index.xml` 
        - `/bookDetails` => Get Book Details. It calls `book/show/`

### Configuration 
- Create `.env` file & Add
```
API_KEY=<YOUR_API_KEY>
API_URL=https://www.goodreads.com
PORT=5000
```
- run `npm run dev` To Start Development Server. `Nodemon` used for live reload.

# Features 
1. It can support all GET Goodread APIs with ALL parameters. But restriced on path.                                    
# Future/TODO Implementation:

Some of the things that I want to implement in the future version are:
1. Error Handling
1. Move implementation into single route.
2. Add unit tests.
3. Add post methods. Currently on GET Method Supported.
4. Add PM2 for process management & auto startup etc
5. Add forks.(not sure its needed. But good to have)




### Folder Structure & Details
```
├── Procfile.txt => For Heroku Deployment
└── server.js => Where actual API code is.
```
