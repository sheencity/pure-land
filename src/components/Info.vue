<template>
  <div class="container" v-show="isInfoShow">
    <el-card class="box-card">
      {{ info.name }}
      <p v-for="m in ms" v-bind:key="m">{{ m }}</p>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
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
export default class Info extends Vue {
  info: any = {};
  ms: string[] = [];
  isInfoShow = false;

  trainInfoLists: {
    name: string;
    list: {
      train: string;
      carriage: string;
      date: string;
    }[];
  }[] = require('../assets/data/railwaystations.json');

  flightLists: {
    name: string;
    list: {
      flight: string;
      date: string;
    }[];
  }[] = require('../assets/data/airport.json');

  constructor() {
    super();
  }

  mounted() {
    DataStore.infoEmitter.asObservable().subscribe(info => {
      this.isInfoShow =
        (info as Params).seriesName === '火车站' ||
        (info as Params).seriesName === '飞机场';
      console.log(info, '检测 info 变化');
      const name = (info as Params).name;
      this.info.name = name + ' 患者同行信息';

      if ((info as Params).seriesName === '火车站') {
        this.ms = this.getTrainList(name);
      } else {
        this.ms = this.getFlightList(name);
      }
    });
  }

  getTrainList(trainStationName: string) {
    console.log('trainStationName:' + trainStationName);
    for (let trainList of this.trainInfoLists) {
      if (trainList.name === trainStationName)
        return trainList.list.map(
          trainInfo => '车次:' + trainInfo.train + ' 时间:' + trainInfo.date
        ) as string[];
    }
    return [];
  }

  getFlightList(airportName: string) {
    console.log('airportName:' + airportName);
    for (let filghtList of this.flightLists) {
      if (filghtList.name === airportName)
        return filghtList.list.map(
          flightInfo => '航班:' + flightInfo.flight + ' 时间:' + flightInfo.date
        ) as string[];
    }
    return [];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: absolute;
  top: 5px;
  left: 10px;
  z-index: 999999999;
}
</style>
