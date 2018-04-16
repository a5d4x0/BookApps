import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksShow from './BooksShow'
import * as _ from 'lodash';
class SearchBooks extends Component {
    state = {
        query: '',
        books: []
      }
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }
    searchBooks =  _.debounce(query => {
        BooksAPI.search(query.trim()).then(book => {
            (Array.isArray(book))&&this.setState(state => ({
                books: book
              }))
        })
    }, 400)
    render() {
        const {shelfBooks, onAddShelf} = this.props
        const { query } = this.state.query
    
        return (
            <div className="search-books">
            <div className="search-books-bar">
            <Link className='close-search' to='/'>Close</Link>
            <div className="search-books-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.searchBooks(event.target.value)}
                />
            </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid"></ol>
            </div>
            <ol className="books-grid">
           
            {
               
                this.state.books.map((book) => (

                    <li key={book.id}>
                        {shelfBooks.map((item) => {
                            (item.id === book.id) &&
                            ( book['shelf'] = item.shelf)
                        })}
                        <BooksShow 
                            book={book}
                            onChangeShelf={onAddShelf}
                        />
                    </li>  
                ))
            }
            </ol>
            </div>
        )
    }
}
export default SearchBooks
