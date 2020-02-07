<template>
  <div class="container" id="container"></div>
</template>

<script lang="ts">
declare const BMap: any;

import { Component, Prop, Vue } from 'vue-property-decorator';
import echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import { DataStore } from '../services/data-store';

interface Params {
  componentType: string;
  componentSubType: string;
  componentIndex: number;
  seriesType: string;
  seriesIndex: number;
  seriesId: string;
  seriesName: string;
  name: string;
  dataIndex: number;
  type: string;
}

@Component
export default class Map extends Vue {
  constructor() {
    super();
  }
  mounted() {
    console.log('mounted');
    this.init();
  }
  async init() {
    const container = document.querySelector('#container') as HTMLDivElement;
    // const styleJson = require('../assets/data/custom_map_config.json');
    console.log({ container });
    const chart = echarts.init(container);

    chart.on('click', (params: Params) => {
      console.log({ params });
      DataStore.infoShowEmitter.next(true);
      DataStore.infoEmitter.next(params);
    });
    console.log({ chart });
    DataStore.menuClickEmitter.asObservable().subscribe(async menu => {
      await this.setOption(chart, menu);
    });
    DataStore.centerPositionEmitter.asObservable().subscribe(async position => {
      await this.setPositionCenter(chart, position);
    });
    await this.setOption(chart);
  }

  async setPositionCenter(chart: echarts.ECharts, position: string) {
    const point = await this.getPoint(position);
    console.log('search point:', point);
    const styleJsonConfig = require('../assets/data/custom_map_config.json');
    const option = {
      title: {
        textStyle: {
          color: '#000000'
        },
        subtextStyle: {
          color: '#000000'
        },
        text: '疫情数据可视化',
        left: 'center'
      },
      bmap: {
        // 百度地图中心经纬度
        center: [point.lng, point.lat],
        // 百度地图缩放
        zoom: 15,
        type: 'map',
        mapType: 'china',
        // selectedMode: 'multiple',
        //是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
        roam: true,
        //百度地图的自定义样式
        mapStyle: {
          styleJson: styleJsonConfig
        }
      }
    };
    chart.setOption(option);
  }

  async setOption(chart: echarts.ECharts, type?: string) {
    const series: any[] = [];
    chart.clear();
    const styleJsonConfig = require('../assets/data/custom_map_config.json');

    chart.showLoading();

    // await this.getConfirmedOption()
    // await this.getUnConfirmedOption(),
    // await this.getHospitalOption()
    switch (type) {
      case '医院':
        series.push(await this.getHospitalOption());
        break;
      case '火车站':
        series.push(await this.getRailwayOption());
        break;
      case '飞机场':
        series.push(await this.getAirportOption());
        break;
      case '小区':
        series.push(
          await this.getConfirmedOption(),
          await this.getUnConfirmedOption()
        );
        break;
      case '全选':
        series.push(
          await this.getConfirmedOption(),
          await this.getUnConfirmedOption(),
          await this.getHospitalOption(),
          await this.getRailwayOption(),
          await this.getAirportOption()
        );
        break;
    }

    const option = {
      title: {
        textStyle: {
          color: '#000000'
        },
        subtextStyle: {
          color: '#000000'
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
        mapType: 'china',
        // selectedMode: 'multiple',
        //是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
        roam: true,
        //百度地图的自定义样式
        mapStyle: {
          styleJson: styleJsonConfig
        }
      },
      series: series
    };

    switch (type) {
      case '飞机场':
        option.bmap.zoom = 10;
        break;
      default:
        option.bmap.zoom = 12;
        break;
    }

    chart.setOption(option as echarts.EChartOption);
    chart.hideLoading();
  }
  getPoint(name: string) {
    const geo = new BMap.Geocoder();

    return new Promise<{ lng: number; lat: number }>(resolve =>
      geo.getPoint(name, resolve)
    );
  }
  async getData(names: string[]) {
    const data: { name: string; value: any[] }[] = [];
    for (const name of names) {
      const point = await this.getPoint(name);
      data.push({
        name: name,
        value: [point.lng, point.lat]
      });
    }
    return data;
  }
  async getConfirmedOption() {
    const {
      confirmed
    }: {
      confirmed: string[];
      suspected: string[];
    } = require('../assets/data/estates.json');
    return {
      name: '确诊人群',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: await this.getData(confirmed),
      symbolSize: 14,
      label: {
        color: 'white',
        formatter: '{a}\n{b}',
        position: 'right',
        backgroundColor: 'rgba(0,0,0,0.8)',
        lineHeight: 16,
        borderRadius: 2,
        borderColor: 'auto',
        padding: 6
      },
      itemStyle: {
        color: '#8b0000'
      },
      emphasis: {
        label: {
          show: true
        }
      }
    };
  }
  async getUnConfirmedOption() {
    const {
      suspected
    }: {
      confirmed: string[];
      suspected: string[];
    } = require('../assets/data/estates.json');
    return {
      name: '疑似人群',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: await this.getData(suspected),
      symbolSize: 14,
      label: {
        color: 'white',
        formatter: '{a}\n{b}',
        position: 'right',
        backgroundColor: 'rgba(0,0,0,0.8)',
        lineHeight: 16,
        borderRadius: 2,
        borderColor: 'auto',
        padding: 6
      },
      itemStyle: {
        color: '#ddb926'
      },
      emphasis: {
        label: {
          show: true
        }
      }
    };
  }
  async getHospitalOption() {
    const hospitals: {
      district: string;
      name: string;
      time: string;
    }[] = require('../assets/data/hospitals.json');
    const data = (await this.getData(hospitals.map(h => h.name))).map(d => {
      const hospital = hospitals.find(h => h.name === d.name);
      return hospital ? ((d.value[2] = hospital.time), d) : d;
    });
    return {
      name: '定点医院',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: data,
      symbolSize: 14,
      label: {
        color: 'white',
        formatter: '{a}\n{b}\n营业时间: {@[2]}',
        position: 'right',
        backgroundColor: 'rgba(0,0,0,0.8)',
        lineHeight: 16,
        borderRadius: 2,
        borderColor: 'auto',
        padding: 6
      },
      itemStyle: {
        color: '#003399'
      },
      emphasis: {
        label: {
          show: true
        }
      }
    };
  }
  async getRailwayOption() {
    const railways: {
      name: string;
      list: { train: string; carriage: string; time: string }[];
    }[] = require('../assets/data/railwaystations.json');
    const data = await this.getData(railways.map(h => h.name));
    return {
      name: '火车站',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: data,
      symbolSize: 14,
      label: {
        color: 'white',
        formatter: '{a}\n{b}',
        position: 'right',
        backgroundColor: 'rgba(0,0,0,0.8)',
        lineHeight: 16,
        borderRadius: 2,
        borderColor: 'auto',
        padding: 6
      },
      itemStyle: {
        color: '#ba55d3'
      },
      emphasis: {
        label: {
          show: true
        }
      }
    };
  }
  async getAirportOption() {
    const airports: {
      name: string;
      list: { flight: string; date: string }[];
    }[] = require('../assets/data/airport.json');

    const data = await this.getData(airports.map(h => h.name));
    return {
      name: '飞机场',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: data,
      symbolSize: 14,
      label: {
        color: 'white',
        formatter: '{a}\n{b}',
        position: 'right',
        backgroundColor: 'rgba(0,0,0,0.8)',
        lineHeight: 16,
        borderRadius: 2,
        borderColor: 'auto',
        padding: 6
      },
      itemStyle: {
        color: '#ff4d40'
      },
      emphasis: {
        label: {
          show: true
        }
      }
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 740px;
  width: 100%;
}
</style>
