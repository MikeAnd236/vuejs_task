<template>
  <div id="menu-render">
    <h3>Trailer</h3>
    <ul v-for="trailer in trailers" :key="trailer.id">
      <li>
        <span class="menu-icon" v-html="trailer.icon"></span> {{ trailer.name }}
      </li>
    </ul>
    <h3>Damage</h3>
    <ul v-for="damage in damages" :key="damage.id">
      <li>
        <span class="menu-icon" v-html="damage.icon"></span> {{ damage.name }}
      </li>
    </ul>
    <h3>Administration</h3>
    <ul>
      <li>
        <i id="menu-icon" class="fas fa-draw-polygon"></i> Zoning Management
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trailers: [],
      damages: [],
    };
  },
  methods: {},
  created() {
    this.$http
      .get("https://61d3f493b4c10c001712bb63.mockapi.io/trailer")
      .then(function (data) {
        console.log(data);
        this.trailers = data.body;
      });
    this.$http
      .get("https://61d3f493b4c10c001712bb63.mockapi.io/damage")
      .then(function (data) {
        console.log(data);
        this.damages = data.body;
      });
  },
};
</script>

<style lang="scss">
#menu-render {
  box-sizing: border-box;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  line-height: 0.2;
  font-size: 12px;
  margin-left: -50px
}
ul {
  list-style-type: none;
  li {
    margin-left: -40px;
  }
}
.menu-icon {
  margin-right: 40px;
}
#menu-icon {
  margin-right: 40px;
}
</style>
