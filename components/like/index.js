Component({

  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean
    }
  },

  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  methods: {
    onLike(event) {
      let { like, count, readOnly } = this.properties
      if (readOnly) {
        return
      }
      count = like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !like
      })
      let behavior = !like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  }
})