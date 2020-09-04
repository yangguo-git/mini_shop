
var regainSession = true;
const config = {

  // reqUrl: "https://tchopshop.weein.cn/busi",  //测试
  // reqUrlVersion: 'dev',

  reqUrl: "https://chopshop.weein.cn/busi",  //线上
  reqUrlVersion: 'online',

  envVersionConfig:'release',
  navigatorMNPVersion : '2.3.0'  //navigator跳转外部小程序支持版本
}
/*
 * 展示进度条的网络请求
 * url:网络请求的url
 * params:请求参数
 * message:进度条的提示信息
 * success:成功的回调函数
 * fail：失败的回调
 */

/**
 * POST 请求
 */

function postData(url, params, message, success, fail,num) {
  // console.log(url + '请求参数:', params)
  // wx.showNavigationBarLoading()
  let cookie = wx.getStorageSync('cookie');
  let infoAccess = wx.getStorageSync('infoAccess');
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  };
  let contentType = 'application/json';
  if(num){
    contentType = 'application/x-www-form-urlencoded';
  }
  wx.request({
    url: config.reqUrl + url,
    data: params,
    header: {
      'INFOINSIDE':infoAccess||'',
      'content-type': contentType,
    },
    method: 'POST',
    success: function (res) {
      // wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode != 200) {
        if (fail) { fail() }
      };
      if (res.data.errCode == "10001" && regainSession == true) {
        // console.log('session失效');
        regainSession = false;
        wx.removeStorageSync('session')
        wx.removeStorageSync('session_expiration')
        getApp().getSession_promise.then(resolve => {
          params.session = getApp().session;
          return postData(url, params, message, success, fail);
        });
      } else {
        success(res.data);
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      // util.errorMsg("网络不佳，请稍后重试！");
      if (fail) { fail()}
    },
    complete: function (res) {

    },
  })
}

/**
 * GET 请求
 */

function getData(url, params, message, success, fail,num) {
  // wx.showNavigationBarLoading()
  let cookie = wx.getStorageSync('cookie');
  let infoAccess = wx.getStorageSync('infoAccess');
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  let contentType = 'application/json';
  if(num){
    contentType = 'application/x-www-form-urlencoded';
  }
  wx.request({
    url: config.reqUrl + url,
    data: params,
    header: {
      'INFOINSIDE':infoAccess|| '',
      'Content-Type': contentType
    },
    method: 'GET',
    success: function (res) {
      // console.log(url + '返回结果:', res)
      // wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode != 200) {
        fail()
      };
      if (res.data.errCode == "10001" && regainSession == true) {
        // console.log('session失效');
        regainSession = false;
        wx.removeStorageSync('session')
        wx.removeStorageSync('session_expiration')
        getApp().getSession_promise.then(resolve => {
          
          params.session = getApp().session;
          return getData(url, params, message, success, fail);
        });
      } else {
        success(res.data);
      }

    },
    fail: function (res) {
      // wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {

    },
  })
}



/**
 * 封装小程序自带接口
 */

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}


/**
 * 微信用户登录,获取code
 */
function wxLogin() {
  return wxPromisify(wx.login)
}
/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */
function wxGetUserInfo() {
  return wxPromisify(wx.getUserInfo)
}
/**
 * 获取系统信息
 */
function wxGetSystemInfo() {
  return wxPromisify(wx.getSystemInfo)
}

// 提示语
const errorTips = "网络不佳，请稍后重试";
const systemTips = "系统维护中，请稍后重试";

module.exports = {
  // request: request,
  postData: postData,
  getData: getData,
  config,
  wxLogin: wxLogin,
  wxGetUserInfo: wxGetUserInfo,
  wxGetSystemInfo: wxGetSystemInfo,
  errorTips: errorTips,
  systemTips: systemTips
}
