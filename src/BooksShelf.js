import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class BooksShelf extends Component {
    render() {
        const { books, onChangeShelf } = this.props
        const shelfNames = ['currentlyReading', 'wantToRead', 'read']
        const showShelf = {
            'currentlyReading':'Currently Reading',
            'wantToRead':'Want to Read',
            'read':'Read'
        }
        return (
            <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                {/**遍历三种书架，将对应的书籍添加到书架上 */
                    shelfNames.map((shelfName) => (
                    <div key={shelfName} className="bookshelf">
                        <h2 className="bookshelf-title">{showShelf[shelfName]}</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                        {
                            books.filter((showBook) => showBook.shelf === shelfName).map((book) => (
                                <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.smallThumbnail+')' }}></div>
                                    <div className="book-shelf-changer">
                                        <select defaultValue={shelfName} onChange={(event) => onChangeShelf(book, event.target.value)}>
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
                    </div>
                )) }
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
            </div>
        )
    }
}
export default BooksShelf
