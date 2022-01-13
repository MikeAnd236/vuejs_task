<template>
  <div>
    <circle-spin loading="isLoading"></circle-spin>
  </div>
</template>
<script>
export default {
data(){
return {
        isLoading: true
      }
   }
}
</script>
<style scoped>
.spin{
    width: 10px;
    height: 10px;
}
</style>