<template>
  <div class="container">
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

  trainInfoLists: {
    name: string;
    list: {
      train: string;
      carriage: string;
      time: string;
    }[];
  }[] = require('../assets/data/railwaystations.json');

  constructor() {
    super();
  }

  mounted() {
    DataStore.infoEmitter.asObservable().subscribe(info => {
      console.log(info, '检测 info 变化');
      // this.info = info;
      const trainStationName = (info as Params).name;
      this.info.name = trainStationName + ' 患者同行列车信息';
      this.ms = this.getTrainList(trainStationName);
    });
  }

  getTrainList(trainStationName: string) {
    console.log('trainStationName:' + trainStationName);
    for (let trainList of this.trainInfoLists) {
      if (trainList.name === trainStationName)
        return trainList.list.map(
          trainInfo => '车次:' + trainInfo.train + ' 时间:' + trainInfo.time
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
