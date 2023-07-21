<template>
  <be-app-page class="index-page">
    <view class="test-map" id="test-map"></view>
  </be-app-page>
</template>

<script setup lang="ts">
import { correctCoordinate } from '@/logics/mapUtils';

const mainShipCo = [30.73833, 111.276];

const initMap = () => {
  const map = new ShipxyAPI.Map('test-map', {
    ak: '559efdd41f4c40d6bd14fbdb6bf88be5',
    defaultMapType: 'MT_SATELLITE',
    centerPoint: mainShipCo,
    zoom: 12,
    // rotate: true,
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

  // map.setBearing(10);

  const routeLatlngs = [
    [30.65, 111.33],
    [30.7, 111.272],
    [30.76, 111.278],
    [30.772, 111.21]
  ];
  L.polyline(routeLatlngs, { color: 'red' }).addTo(map);

  const startPointIcon = L.divIcon({
    html: '<div class="start-point">起</div>',
    iconSize: 18,
    className: 'start-point-wrapper'
  });
  L.marker([30.65, 111.33], { icon: startPointIcon }).addTo(map);

  const endPointIcon = L.divIcon({
    html: '<div class="end-point">终</div>',
    iconSize: 18,
    className: 'end-point-wrapper'
  });
  L.marker([30.772, 111.21], { icon: endPointIcon }).addTo(map);

  const mainShipIcon = L.divIcon({
    html: '<div class="main-ship">船</div>',
    iconSize: 25,
    className: 'main-ship-wrapper'
  });
  L.marker(mainShipCo, { icon: mainShipIcon }).addTo(map);

  // 航线组成线段的两个点坐标
  const routeLines: Recordable[] = [];
  routeLatlngs.forEach((item, index) => {
    if (index !== routeLatlngs.length - 1) {
      const nextItem = routeLatlngs[index + 1];
      routeLines.push({
        start: item,
        end: nextItem
      });
    }
  });

  // 根据船坐标计算属于航线的那条线段
  const computedShipBelongLine = (shipCo: Recordable): number => {
    const shipPoint = L.point(shipCo);
    const mainShipToRouteDistance = routeLines.map((item) => {
      const lineStart = L.point(item.start);
      const lineEnd = L.point(item.end);
      const distance = L.LineUtil.pointToSegmentDistance(shipPoint, lineStart, lineEnd);
      return distance;
    });
    const minDistance = Math.min(...mainShipToRouteDistance);
    const currentLineIndex = mainShipToRouteDistance.findIndex((item) => {
      return item === minDistance;
    });

    return currentLineIndex;
  };
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
      .start-point,
      .end-point {
        width: 18px;
        height: 18px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: green;
        color: #ffffff;
        border-radius: 50%;
      }

      .end-point {
        background-color: blue;
      }

      .main-ship {
        width: 25px;
        height: 25px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: aqua;
        color: #ffffff;
        border-radius: 50%;
      }
    }
  }
}
</style>
