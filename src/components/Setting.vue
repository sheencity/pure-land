<template>
  <div>
    <ul>
      <li @click="menuClick('全选')">
        <span>
          <i class="el-icon-set-up"></i>
          <span>全选</span>
        </span>
      </li>
      <li @click="menuClick('小区')">
        <span>
          <i class="el-icon-office-building"></i>
          <span>小区</span>
        </span>
      </li>
      <li @click="menuClick('医院')">
        <span>
          <i class="el-icon-school"></i>
          <span>医院</span>
        </span>
      </li>
      <li @click="menuClick('公交')">
        <span>
          <i class="el-icon-guide"></i>
          <span>公交</span>
        </span>
      </li>
      <li @click="menuClick('火车站')">
        <span>
          <i class="el-icon-price-tag"></i>
          <span>火车站</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DataStore } from '../services/data-store';

@Component
export default class Setting extends Vue {
  isExpand = false;
  constructor() {
    super();
  }
  menuClick(menu: string) {
    DataStore.menuClickEmitter.next(menu);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999999;
}
</style>
