import HTTP from '../util/http-p'

class ClassicModel extends HTTP {
  getLatest() {
    return this.request({
      url: 'classic/latest'
    })
  }

  getClassic({
    index,
    nextOrPrevious
  }) {
    return this.request({
      url: `classic/${index}/${nextOrPrevious}`,
    })
  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this.getLatestIndex()
    return latestIndex == index ? true : false
  }

  setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  getLatestIndex() {
    const index = wx.getStorageSync('latest')
    return index
  }

  getKey(index) {
    const key = 'classic-' + index
    return key
  }

}

export default ClassicModel