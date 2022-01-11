<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    />

    <menu-render></menu-render>
    <div id="render">
      <h2>Trailer Management</h2>
      <add-new></add-new>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menuRender from "./components/menuRender.vue";

import addNew from "./components/addNew.vue";

export default {
  components: {
    "menu-render": menuRender,

    "add-new": addNew,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Titillium+Web:wght@200&display=swap");

#app {
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  font-family: 'Poppins', sans-serif;
}
#render {
  display: flex;
  flex-direction: column;
  border: 0.5px solid #cecece;
  box-shadow: 2px 2px 2px #888888;
}
h2{
  background-color: blue;
  padding-left: 20px;
  color: white;
  padding-top: 5px ;
  padding-bottom: 5px;
}

</style>
