Component({
  data: {
    selected: 0,
    list: [
      {
        text: '้ฆ้กต',
        icon: '/static/img/tab1.png',
        selectedIcon: '/static/img/tab1-HL.png',
        pagePath: 'pages/index/index',
      },
      {
        text: 'ๆ็',
        icon: '/static/img/tab1.png',
        selectedIcon: '/static/img/tab1-HL.png',
        pagePath: 'pages/test/test',
      },
    ],
  },
  methods: {
    switchTab(event) {
      const dataset = event.currentTarget.dataset;

      if (dataset.index === this.data.selected) {
        return;
      }

      const url = '/' + dataset.path;
      wx.switchTab({ url });
    },
  },
});
