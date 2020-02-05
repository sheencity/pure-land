<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <h2>何为净土</h2>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :offset="1" :sm="22" :md="15" style="position: relative;">
          <Map />
          <Setting></Setting>
        </el-col>
        <el-col :offset="1" :sm="22" :md="5">
          <Info></Info>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <em>底部即为底线，不可逾越</em>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import HelloWorld from './components/HelloWorld.vue';
import Map from './components/Map.vue';
import Info from './components/Info.vue';
import Setting from './components/Setting.vue';

@Component({
  components: {
    HelloWorld,
    Map,
    Info,
    Setting
  }
})
export default class App extends Vue {}
</script>

<style>
h2 {
  text-align: center;
}
</style>
