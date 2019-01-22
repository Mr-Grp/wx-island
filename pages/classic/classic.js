import ClassicModel from '../../models/classic'
import LikeModel from '../../models/like'
const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  data: {
    classic: null,
    likeCount: 0,
    likeStatus: false,
    latest: true,
    first: false,
  },

  onLoad() {
    this._init()
  },

  _init() {
    classicModel.getLatest()
      .then(res => {
        this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
        classicModel.setLatestIndex(res.index)
        wx.setStorageSync(classicModel.getKey(res.index), res)
      })
  },

  onLike(event) {
    const behavior = event.detail.behavior
    const {
      id,
      type
    } = this.data.classic
    likeModel.like({
      behavior,
      artId: id,
      category: type
    })
  },

  onNext(event) {
    this._getClassic('next')
  },

  onPrevious(event) {
    this._getClassic('previous')
  },

  _getClassic(nextOrPrevious) {
    const index = this.data.classic.index
    let key = nextOrPrevious == 'next' ? classicModel.getKey(index + 1) : classicModel.getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      classicModel.getClassic({
          index,
          nextOrPrevious
        })
        .then((res) => {
          wx.setStorageSync(classicModel.getKey(res.index), res)
          this._updateClassic(res)
        })
    } else {
      this._updateClassic(classic)
    }
  },

  _updateClassic(classic) {
    this._getLikeStatus(classic.id, classic.type)
    this.setData({
      classic,
      latest: classicModel.isLatest(classic.index),
      first: classicModel.isFirst(classic.index)
    })
  },

  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus({
      artID,
      category
    }).then((res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }

})