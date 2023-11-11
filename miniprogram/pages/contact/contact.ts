// 简单版
Page({
  data: {
      content: '',
      // 当前登录者信息
      login: {
          id: '2023',
          user: '大猪蹄子',
          avatar: 'https://img2.baidu.com/it/u=1581320883,910100018&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=9135844131fa04a7ad00686d88c76752'
      },
      // 聊天信息
      chatList: [{
              msgId: '2023',
              nickname: '大猪蹄子',
              avatar: 'https://img2.baidu.com/it/u=1581320883,910100018&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=9135844131fa04a7ad00686d88c76752',
              message: '一个简单的聊天对话窗口界面',
              type: 'text',
              date: '05-02 14:24' // 每隔5分钟记录一次时间
          },
          {
              msgId: '2022',
              nickname: '泡椒风爪',
              avatar: 'https://img0.baidu.com/it/u=3997048646,1811313428&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=0e1a0c5e962337e74750fba219bb3b51',
              message: '更多发送表情、视频以及图片功能,由于不好打包文件夹,请前往下方底部链接,下载完整版压缩包.',
              type: 'text'
          },
          {
              msgId: '2022',
              nickname: '泡椒风爪',
              avatar: 'https://img0.baidu.com/it/u=3997048646,1811313428&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=0e1a0c5e962337e74750fba219bb3b51',
              message: '该消息为撤回消息',
              type: 'custom'
          },
          {
              msgId: '2023',
              nickname: '大猪蹄子',
              avatar: 'https://img2.baidu.com/it/u=1581320883,910100018&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=9135844131fa04a7ad00686d88c76752',
              message: '嘞 对头,解压文件夹后,可直接使用完整版',
              type: 'text'
          },
          {
              msgId: '2022',
              nickname: '泡椒风爪',
              avatar: 'https://img0.baidu.com/it/u=3997048646,1811313428&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=0e1a0c5e962337e74750fba219bb3b51',
              message: '若出现iOS不兼容现象,请自行调整哦',
              type: 'text',
              date: '05-04 16:05'
          },

          {
              msgId: '2022',
              nickname: '泡椒风爪',
              avatar: 'https://img0.baidu.com/it/u=3997048646,1811313428&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=0e1a0c5e962337e74750fba219bb3b51',
              message: '没有用苹果手机测试啦',
              type: 'text'
          },
          {
              msgId: '2022',
              nickname: '泡椒风爪',
              avatar: 'https://img0.baidu.com/it/u=3997048646,1811313428&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=0e1a0c5e962337e74750fba219bb3b51',
              message: '该消息为撤回消息',
              type: 'custom'
          },
          {
              msgId: '2023',
              nickname: '大猪蹄子',
              avatar: 'https://img2.baidu.com/it/u=1581320883,910100018&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=9135844131fa04a7ad00686d88c76752',
              message: '请前往下方链接,使用完整版',
              type: 'text'
          },
          {
              msgId: '2023',
              nickname: '大猪蹄子',
              avatar: 'https://img2.baidu.com/it/u=1581320883,910100018&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=9135844131fa04a7ad00686d88c76752',
              message: '谢谢各位亲的点赞关注和收藏',
              type: 'text'
          },
          {
              msgId: '2022',
              nickname: '泡椒风爪',
              avatar: 'https://img0.baidu.com/it/u=3997048646,1811313428&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=0e1a0c5e962337e74750fba219bb3b51',
              message: '哈哈哈',
              type: 'text',
              date: '05-06 11:21'
          },
          {
              msgId: '2022',
              nickname: '泡椒风爪',
              avatar: 'https://img0.baidu.com/it/u=3997048646,1811313428&fm=253&app=53&size=w500&n=0&g=0n&f=jpeg?sec=1686045994&t=0e1a0c5e962337e74750fba219bb3b51',
              message: '已滑动至最底部',
              type: 'text',
              date: '05-07 19:08'
          },
      ],
  },
  onLoad() {
      this.scrollToBottom();
  },
  // 输入监听
  inputClick(e:any) {
      this.setData({
          content: e.detail.value
      })
  },
  // 发送监听
  sendClick() {
      var that = this;
      var list = this.data.chatList;
      // 获取当前时间
      var date = new Date();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minu = date.getMinutes();
      var now1 = month < 10 ? '0' + month : month;
      var now2 = day < 10 ? '0' + day : day;
      // 组装数据
      var msg = {
          msgId: this.data.login.id,
          nickname: this.data.login.user,
          avatar: this.data.login.avatar,
          message: this.data.content,
          type: 'text',
          date: now1 + '-' + now2 + ' ' + hour + ':' + minu
      }
      this.setData({
          chatList: list.concat(msg)
      }, () => {
          that.scrollToBottom();
          that.setData({
              content: ''
          })
      })
  },
  // 滑动到最底部
  scrollToBottom() {
      setTimeout(() => {
          wx.pageScrollTo({
              scrollTop: 200000,
              duration: 3
          });
      }, 600)
  },
})
