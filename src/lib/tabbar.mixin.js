// 在页面onShow中设置tabbar的index
export default {
  methods: {
    setTabBarIndex(index) {
      if (
        typeof this.$mp.page.getTabBar === 'function' &&
        this.$mp.page.getTabBar()
      ) {
        this.$mp.page.getTabBar().setData({
          selected: index
        });
      }
    }
  }
};
