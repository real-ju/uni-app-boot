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
view {
  box-sizing: border-box;
}

@import 'uview-ui/index.scss';

page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
