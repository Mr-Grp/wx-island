// pages/book/book.js
import BookModel from '../../models/book.js'
import {
  random
} from '../../util/common.js'
const bookModel = new BookModel()

Page({

  data: {
    books: [],
    searching: false,
  },

  onLoad(options) {
    this._init()
  },

  _init() {
    bookModel.getHotList()
      .then(res => {
        this.setData({
          books: res
        })
      })
  },

  onBookTap(event) {
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bid=${event.detail}`
    })
  },
  onSearching(event) {
    this.setData({
      searching: true
    })
  },

  onCancel(event) {
    this.setData({
      searching: false
    })
  },

  onReachBottom() {
    this.setData({
      more: random(16)
    })
  }

})