// components/image-button/index.js
Component({

  options: {
    multipleSlots: true
  },
  properties: {
    openType: {
      type: String
    }
  },

  data: {

  },

  attached() {

  },
  methods: {
    onGetUserInfo(event) {
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})