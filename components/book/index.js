// components/book/index.js
Component({

  properties: {
    book: Object,
    showLike: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onTap(event) {
      const bid = this.properties.book.id
      this.triggerEvent('booktap', bid)
    }
  }
})
