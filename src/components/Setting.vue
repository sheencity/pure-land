<template>
  <div class="container" @click="stopPropagation">
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-aim"
      circle
      v-show="!isExpand"
      @click="isExpand = true"
    ></el-button>
    <el-card class="box-card" v-show="isExpand">
      设置设置
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Setting extends Vue {
  private isExpand = false;
  constructor() {
    super();
    document.onclick = () => {
      this.isExpand = !this.isExpand;
      console.log('click', this.isExpand);
    };
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
