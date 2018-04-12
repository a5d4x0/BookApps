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
    this.setState((state) => ({
      what : state.books.map((b) => (
        (b.id === book.id) && (b.shelf = shelf)         
      ))
    }))
    BooksAPI.update(book, shelf)
  }
  searchBooks(book) {
    
  }
  render() {
    return (
      <div className="app">
        <div>
          <Route exact path='/' render={() => (
            <ListBooks
              onChangeShelf={this.changeShelf}
              books={this.state.books}
            />
          )}/> 
          <Route path='/search' render={({ history }) => (
            <SearchBooks 
              onSearchBooks={(book) => {
                this.searchBooks(book)
                history.push('/')
              }}
            />
          )}/>
        </div>
      </div>
      )
  }
}

export default BooksApp
