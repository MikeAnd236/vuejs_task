<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    />

    <menu-render></menu-render>
    <div class="render-total">
      <nav><h2>Trailer Management</h2></nav>
      <div class="render">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import menuRender from "./components/menuRender.vue";

export default {
  components: {
    "menu-render": menuRender,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Titillium+Web:wght@200&display=swap");

@media screen and (max-width: 800px) {
  body {
    background: #e7e7e7;
  }
  .menu-render {
    display: none;
  }
}

#app {
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
  text-overflow: clip;
}
.render-total {
  display: flex;
  flex-direction: column;
}
.render {
  display: flex;
  flex-direction: column;
  border: 0.5px solid #cecece;
  box-shadow: 2px 2px 2px #888888;
  margin-right: -100px;
  margin-left: -180px;
  width: 900px;
  position: relative;
  z-index: 1;
  background: white;
}
nav {
  h2 {
    background-color: rgb(12, 119, 185);
    padding-left: 60px;
    color: white;
    padding-top: 7px;
    padding-bottom: 7px;
    margin: -10px -130px 0 -250px;
    font-size: 18px;
    z-index: 2;
  }
}
</style>
