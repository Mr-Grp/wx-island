import ClassicModel from '../../models/classic'
import LikeModel from '../../models/like'
const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  data: {
    classic: null,
    likeCount: 0,
    likeStatus: false,
  },

  onLoad (options) {
    const { cid, type} = options
    classicModel.getById({
      cid,
      type
    }).then(res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
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