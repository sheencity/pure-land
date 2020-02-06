<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="3">
          <div>
            <h2>PureLand</h2>
          </div>
        </el-col>
        <el-col :span="5">
          <div>
            <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
          </div>
        </el-col>
        <el-col :span="16">
          <div>
            <ul>
              <li>
                <span>
                  <i class="el-icon-set-up"></i>
                  <span>全选</span>
                </span>
              </li>
              <li>
                <span>
                  <i class="el-icon-office-building"></i>
                  <span>小区</span>
                </span>
              </li>
              <li>
                <span>
                  <i class="el-icon-school"></i>
                  <span>医院</span>
                </span>
              </li>
              <li>
                <span>
                  <i class="el-icon-guide"></i>
                  <span>公交</span>
                </span>
              </li>
              <li>
                <span>
                  <i class="el-icon-shopping-cart-2"></i>
                  <span>商场</span>
                </span>
              </li>
            </ul>
          </div>
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
  margin: 4px; /* 将默认的外边距去掉 */
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
