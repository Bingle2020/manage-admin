<template>
  <svg class="svg" aria-hidden="true" :style="size">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
export default {
    data() {
        return {
            size: {}
        }
    },
  props: ["name", "width", "height"],
  created() {
      if(this.width) {
          this.size.width = this.width + 'px';
      }
      if(this.height) {
          this.size.height = this.height + 'px';
      }
  }
};
</script>