Component({
  data: {
    selected: 0,
    list: [
      {
        text: '首页',
        icon: '/static/images/tabBar/tab1.png',
        selectedIcon: '/static/images/tabBar/tab1-hl.png',
        pagePath: 'pages/index/index'
      },
      {
        text: '我的',
        icon: '/static/images/tabBar/tab2.png',
        selectedIcon: '/static/images/tabBar/tab2-hl.png',
        pagePath: 'pages/test/test'
      }
    ]
  },
  methods: {
    switchTab(event) {
      const dataset = event.currentTarget.dataset;

      if (dataset.index === this.data.selected) {
        return;
      }

      const url = '/' + dataset.path;
      wx.switchTab({ url });
    }
  }
});
