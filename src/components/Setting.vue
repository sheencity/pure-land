<template>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Setting extends Vue {
  isExpand = false;
  constructor() {
    super();
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
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
