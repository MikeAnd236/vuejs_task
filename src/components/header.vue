<template>
  <div>
    <router-link to="/add">
      <button class="header">ADD</button>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
//TODO change id to class
.header {
  margin-left: 10px;
  color: white;
  cursor: pointer;
}
.header:hover {
  background-color: tomato;
}
</style>
