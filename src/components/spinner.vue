<template>
  <div>
    <circle-spin loading="loading"></circle-spin>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: mapState(["loading"]),
  methods: mapMutations(["isLoading"]),
};
</script>
<style scoped>
</style>