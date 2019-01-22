import config from "../config"

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}

class HTTP {
  request(params) {
    wx.request({
      url: `${config.apiBaseUrl}${params.url}`,
      method: params.method ? params.method : "GET",
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      data: params.data,
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    wx.showToast({
      title: tips[error_code ? error_code : 1],
      icon: 'none',
      duration: 2000
    })
  }
}

export default HTTP