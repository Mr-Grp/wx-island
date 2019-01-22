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
    console.log(this.properties.openType)
  },
  methods: {
    onGetUserInfo(event) {
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})