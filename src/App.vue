<template>
  <el-container>
    <el-header style="height:55px; padding:7px">
      <el-row>
        <el-col :span="1">
          <img src="./assets/logo.png" width="40px" height="40px" />
        </el-col>
        <el-col :span="2">
          <div>
            <h2>PureLand</h2>
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <el-input placeholder="请输入搜索内容"></el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <Setting></Setting>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding: 0px">
      <el-row>
        <el-col style="position: relative;">
          <Map />
          <Info v-show="infoShow"></Info>
        </el-col>
        <!-- <el-col :offset="1" :sm="22" :md="5">
        </el-col> -->
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import HelloWorld from './components/HelloWorld.vue';
import Map from './components/Map.vue';
import Info from './components/Info.vue';
import Setting from './components/Setting.vue';

import { DataStore } from './services/data-store';

@Component({
  components: {
    HelloWorld,
    Map,
    Info,
    Setting
  }
})
export default class App extends Vue {
  infoShow = false;
  constructor() {
    super();
  }
  mounted() {
    DataStore.infoShowEmitter.asObservable().subscribe(show => {
      console.log(show, '检测 info show 变化');
      this.infoShow = show;
    });
  }
}
</script>

<style>
h2 {
  text-align: center;
  margin: 4px; /* 将默认的外边距去掉 */
}

body {
  margin: 0;
}

ul {
  margin: 6px; /* 将默认的外边距去掉 */
}

li {
  list-style: none; /* 将默认的列表符号去掉 */
  padding: 0; /* 将默认的内边距去掉 */
  margin: 0; /* 将默认的外边距去掉 */
  float: left; /* 往左浮动 */
  width: 70px;
}
</style>
