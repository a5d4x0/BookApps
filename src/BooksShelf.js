import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BooksShow from './BooksShow'
function BooksShelf(props) {
    const { books, onChangeShelf } = props
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
                                <BooksShow 
                                    book={book}
                                    onChangeShelf={onChangeShelf}
                                />
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
export default BooksShelf
