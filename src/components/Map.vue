<template>
  <div class="container" id="container"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import echarts from 'echarts';
import 'echarts/extension/bmap/bmap';

@Component
export default class Map extends Vue {
  constructor() {
    super();
  }
  mounted() {
    console.log('mounted');
    this.init();
  }
  init() {
    const container = document.querySelector('#container') as HTMLDivElement;
    // const styleJson = require('../assets/data/custom_map_config.json');
    console.log({ container });
    const chart = echarts.init(container);
    chart.clear();

    const option = {
      title: {
        textStyle: {
          color: '#fff'
        },
        subtextStyle: {
          color: '#fff'
        },
        text: '疫情数据可视化',
        left: 'center'
      },
      bmap: {
        // 百度地图中心经纬度
        center: [116.405419, 39.913385],
        // 百度地图缩放
        zoom: 12,
        type: 'map',
        //mapType: 'china',
        //selectedMode: 'multiple',
        //是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
        roam: true,
        //百度地图的自定义样式
        mapStyle: {
          // styleJson
        }
      },
      series: []
    };

    chart.setOption(option as any);
    console.log({ chart });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 700px;
  width: 100%;
}
</style>
