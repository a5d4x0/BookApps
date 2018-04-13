import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksShelf from './BooksShelf'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    /**获取服务器端存储的显示在书架上的书 */
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
/**用于更改图书的书架类别 */
  changeShelf = (book, shelf) => {
    this.setState((state) => {
      state.books.map((b) => (
        (b.id === book.id) && (b.shelf = shelf)         
      ))
    })
    BooksAPI.update(book, shelf)
  }
  /**把书从搜索页面添加到书架上 */
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
            <BooksShelf
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
