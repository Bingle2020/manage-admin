<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(() => {
      this.$router.replace(from.fullPath);
    });
  },
};
</script>