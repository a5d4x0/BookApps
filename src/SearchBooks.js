import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
class SearchBooks extends Component {
    state = {
        query: '',
        books: []
      }
      componentDidMount() {
        BooksAPI.getAll().then((books) => {
          this.setState({ books })
        })
      }
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }
    render() {
        // const { query } = this.state
        // let showingContacts
        // if (query) {
        //     const match = new RegExp(escapeRegExp(query), 'i')
        //     showingContacts = contacts.filter((contact) => match.test(contact.name))
        // } else {
        //     showingContacts = contacts
        // }
        return (
            <div className="search-books">
            <div className="search-books-bar">
            <Link className='close-search' to='/'>Close</Link>
            <div className="search-books-input-wrapper">
                
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    //value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />

            </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid"></ol>
            </div>
            <ol className="books-grid">
                {/* {
                    books.filter((showBook) => showBook.shelf === shelfName).map((book) => (
                        <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.URL+')' }}></div>
                            <div className="book-shelf-changer">
                                <select onChange={(event) => onChangeShelf(event.target.value, book)}>
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
                } */}
            </ol>
            {/* <ol className='contact-list'>
                {showingContacts.map((contact) => (
                    <li key={contact.id} className='contact-list-item'>
                    <div className='contact-avatar' style={{
                        backgroundImage: `url(${contact.avatarURL})`
                    }}/>
                    <div className='contact-details'>
                        <p>{contact.name}</p>
                        <p>{contact.email}</p>
                    </div>
                    <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                        Remove
                    </button>
                    </li>
                ))}
            </ol> */}
            </div>
        )
    }
}
export default SearchBooks
