<template>
  <be-app-page class="index-page" showNavbar title="首页">
    <view class="test-map" id="test-map"></view>
  </be-app-page>
</template>

<script setup lang="ts">
import { correctCoordinate } from '@/logics/mapUtils';

const initMap = () => {
  const map = new ShipxyAPI.Map('test-map', {
    ak: '559efdd41f4c40d6bd14fbdb6bf88be5',
    centerPoint: [30.73833, 111.27472],
    rotate: true,
    attribution: {
      isShow: false
    },
    measureCtrl: {
      isShow: false
    },
    mousePostionCtrl: {
      isShow: false
    },
    zoomviewControl: {
      isShow: false
    },
    basemapsControl: {
      isShow: false
    },
    scaleCtrl: {
      isShow: false
    }
  });

  map.setBearing(10);
  map.setZoom(12);

  setTimeout(() => {
    map.setBearing(50);
    map.setZoom(12);
  }, 1000);

  const routeLatlngs = [
    [30.772, 111.21],
    [30.76, 111.278],
    [30.7, 111.272],
    [30.65, 111.33]
  ];
  const routePolyline = L.polyline(routeLatlngs, { color: 'red' }).addTo(map);

  // const routeLines =
};

onMounted(() => {
  initMap();
});
</script>

<style lang="scss" scoped>
.index-page {
  .test-map {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #a3ccff;

    :deep {
      .test-image {
        // rotate: 45deg;
      }
    }
  }
}
</style>
