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

@Component
export default class Info extends Vue {
  info: any = {};
  ms = ['第一个', '第二个'];

  constructor() {
    super();
  }
  mounted() {
    DataStore.infoEmitter.asObservable().subscribe(info => {
      console.log(info, '检测 info 变化');
      this.info = info;
    });
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
