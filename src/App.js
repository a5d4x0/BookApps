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
  // removeShelf = (book) => {
  //   console.log(book)
  //   this.setState((state) => ({
  //     books: state.books.filter((c) => c.id !== book.id)
  //   }))
  // }
  changeShelf = (book, shelf) => {
    this.setState((state) => ({
      what : state.books.map((b) => (
        (b.id === book.id) && (b.shelf = shelf)         
      ))
    }))
    BooksAPI.update(book, shelf)
  }
  addShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    book['shelf'] = shelf
    let item
    item = this.state.books
    item.push(book)
    this.setState((state) => ({
      books: item
    }))
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
          <Route path='/search' render={({ history }) => (
            <SearchBooks 
              onAddShelf={(book, shelf) => {
                this.addShelf(book, shelf)
                //history.push('/')
              }} 
              
            />
          )}/>
        </div>
      </div>
      )
  }
}

export default BooksApp
