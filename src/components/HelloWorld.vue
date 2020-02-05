<template>
  <div class="container" id="container">c</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import echarts from 'echarts';
import 'echarts/extension/bmap/bmap';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  constructor() {
    super();
  }
  mounted() {
    console.log('mounted');
    this.init();
  }
  init() {
    const container = document.querySelector('#container') as HTMLDivElement;
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
          styleJson: [
            {
              featureType: 'water',
              elementType: 'all',
              stylers: {
                color: '#d1d1d1'
              }
            },
            {
              featureType: 'land',
              elementType: 'all',
              stylers: {
                color: '#f3f3f3'
              }
            },
            {
              featureType: 'railway',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'highway',
              elementType: 'all',
              stylers: {
                color: '#fdfdfd'
              }
            },
            {
              featureType: 'highway',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'arterial',
              elementType: 'geometry',
              stylers: {
                color: '#fefefe'
              }
            },
            {
              featureType: 'arterial',
              elementType: 'geometry.fill',
              stylers: {
                color: '#fefefe'
              }
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'green',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'subway',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'manmade',
              elementType: 'all',
              stylers: {
                color: '#d1d1d1'
              }
            },
            {
              featureType: 'local',
              elementType: 'all',
              stylers: {
                color: '#d1d1d1'
              }
            },
            {
              featureType: 'arterial',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'boundary',
              elementType: 'all',
              stylers: {
                color: '#fefefe'
              }
            },
            {
              featureType: 'building',
              elementType: 'all',
              stylers: {
                color: '#d1d1d1'
              }
            },
            {
              featureType: 'label',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#999999'
              }
            }
          ]
        }
      },
      series: []
    };

    chart.setOption(option as any);
    console.log({chart});

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 400px;
  width: 400px;
}
</style>
