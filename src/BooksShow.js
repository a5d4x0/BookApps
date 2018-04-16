import React, { Component } from 'react';
function BooksShow(props) {
    const {book, onChangeShelf} = props
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ("imageLinks" in book)?'url('+book.imageLinks.smallThumbnail+')':'url()'}}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={book.shelf?book.shelf:"none"} onChange={(event) => onChangeShelf(book, event.target.value)}>
                            <option value="move" disabled>Move to...</option>
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
    )
}
export default BooksShow