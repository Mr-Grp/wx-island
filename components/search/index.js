// components/search/search.js
import SearchModel from '../../models/search.js'
import BookModel from '../../models/book.js'
import paginationBev from '../behaviors/pagination.js'
const searchModel = new SearchModel()
const bookModel = new BookModel()

Component({

  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  attached() {
    this.setData({
      historyWords: searchModel.getHistory()
    })

    searchModel.getHot()
      .then(res => {
        this.setData({
          hotWords: res.hot
        })
      })
  },

  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },

  methods: {

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          searchModel.addToHistory(q)
          this._hideLoadingCenter()
        })
    },

    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      this.initialize()
      this._closeResult()
    },

    onBookTap(event) {
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${event.detail}`
      })
    },

    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked()
          }, () => {
            this.unLocked()
          })
      }
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})