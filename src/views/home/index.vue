<template>
  <div class="WHC">
    <h1>首页</h1>
    <div style="height: 40px; width: 100%">
      <icon name="icon-delivery-truck" size="25" color="blue"></icon>
    </div>
    <div style="height: 40px; width: 100%">
      <icon-svg name="box-13" width="40" height="40"></icon-svg>
    </div>
  </div>
</template>

<script>
import icon from '@/components/icon/icon.vue';
import iconSvg from '@/components/icon/svg.vue';
export default {
  components: {
    icon,
    iconSvg
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
