<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';

view,
scroll-view,
cover-view {
  box-sizing: border-box;
}

page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-size: 30rpx;
  color: #333333;
}
</style>
