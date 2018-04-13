import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
class SearchBooks extends Component {
    state = {
        query: '',
        books: []
      }
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }
    searchBooks(query) {
        BooksAPI.search(query.trim()).then(book => {
            this.setState(state => ({
                books: book
              }))
        })
    }
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
                    <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ("imageLinks" in book)?'url('+book.imageLinks.smallThumbnail+')':'url()'}}></div>
                        <div className="book-shelf-changer">
                        <select defaultValue={book.shelf?book.shelf:"none"} onChange={(event) => onAddShelf(book, event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                        </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                    </div>
                </li>  
                ))
            }
            </ol>
            </div>
        )
    }
}
export default SearchBooks
