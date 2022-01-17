<template>
  <div class="menu-render">
    <p>Trailer</p>
    <ul v-for="trailer in trailers" :key="trailer.id">
      <li>
        <span class="menu-icon" v-html="trailer.icon"></span> {{ trailer.name }}
      </li>
    </ul>
    <p>Damage</p>
    <ul v-for="damage in damages" :key="damage.id">
      <li>
        <span class="menu-icon" v-html="damage.icon"></span> {{ damage.name }}
      </li>
    </ul>
    <p>Administration</p>
    <ul>
      <li>
        <i id="menu-icon" class="fas fa-draw-polygon fa-lg"></i> Zoning
        Management
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
.menu-render {
  box-sizing: border-box;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: -150px;
  line-height: 0.2;
  font-size: 12px;
}
ul {
  list-style-type: none;
  li {
    margin-left: -40px;
    margin-top: -10px;

    i {
      width: 18px;
      height: 18px;
    }
  }
}
.menu-icon {
  margin-right: 30px;
}
#menu-icon {
  margin-right: 30px;
}
p {
  margin-bottom: 30px;
}
</style>
