import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    this.setState((state) => {
      state.books.map((b) => (
        (b.id === book.id) && (b.shelf = shelf)         
      ))
    })
    BooksAPI.update(book, shelf)
  }
  addShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    book['shelf'] = shelf
    this.setState((state) => {
      state.books.push(book)
    })
  }
  render() {
    return (
      <div className="app">
        <div>
          <Route exact path='/' render={() => (
            <ListBooks
              books={this.state.books}
              onChangeShelf={this.changeShelf}
            />
          )}/> 
          <Route path='/search' render={({}) => (
            <SearchBooks 
              shelfBooks={this.state.books}
              onAddShelf={(book, shelf) => {
                this.addShelf(book, shelf)
              }} 
            />
          )}/>
        </div>
      </div>
      )
  }
}

export default BooksApp
