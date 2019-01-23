// components/preview/index.js
Component({
  properties: {
    classic: {
      type: Object,
      observer(newVal) {
        if (newVal) {
          var typeText = {
            100: "电影",
            200: "音乐",
            300: "句子"
          } [newVal.type]
        }
        this.setData({
          typeText
        })
      }
    }
  },

  data: {
    typeText: ''
  },

  methods: {
    onTap(event) {
      const {
        id,
        type
      } = this.properties.classic
      this.triggerEvent('tapping', {
        cid: id,
        type
      }, {})
    }
  }
})